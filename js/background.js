/**
 * AliExpress Global Switcher - Background Service Worker
 * @author svtcore
 * @license MIT
 * @link https://github.com/svtcore
 */

import {
  ALIEXPRESS_DOMAINS,
  DEFAULT_SETTINGS,
  STORAGE_KEY,
  getHostForLocale
} from './config.js';

/**
 * Manages AliExpress regional global redirects and cookie configuration
 */
class AliExpressSwitcher {

  /** @type {string} */
  static TAG = '[AliExpress Switcher]';

  constructor() {
    this.#ensureDefaults();
    this.#registerListeners();
  }

  // Storage

  /** Ensure default settings exist on first install */
  #ensureDefaults() {
    chrome.storage.sync.get(STORAGE_KEY, (result) => {
      if (!result[STORAGE_KEY]) {
        this.#save(DEFAULT_SETTINGS);
        console.log(AliExpressSwitcher.TAG, 'Default settings created');
      }
    });
  }

  /** @returns {Promise<object>} current settings */
  #load() {
    return new Promise((resolve) => {
      chrome.storage.sync.get(STORAGE_KEY, (result) => {
        try {
          resolve(result[STORAGE_KEY]
            ? JSON.parse(result[STORAGE_KEY])
            : { ...DEFAULT_SETTINGS });
        } catch {
          resolve({ ...DEFAULT_SETTINGS });
        }
      });
    });
  }

  /** Persist settings to chrome.storage.sync */
  #save(settings) {
    chrome.storage.sync.set(
      { [STORAGE_KEY]: JSON.stringify(settings) },
      () => console.log(AliExpressSwitcher.TAG, 'Settings saved')
    );
  }

  // URL helpers

  /**
   * Check whether a URL belongs to any AliExpress domain
   * @param {string} url
   * @returns {boolean}
   */
  #isAliExpress(url) {
    try {
      const host = new URL(url).hostname;
      return ALIEXPRESS_DOMAINS.tlds.some((tld) => host.endsWith(tld));
    } catch {
      return false;
    }
  }

  /**
   * Check whether a URL must be redirected to the user's preferred host
   * Returns false if already on the preferred host
   * @param {string} url
   * @param {string} locale - user's preferred locale
   * @returns {boolean}
   */
  #needsRedirect(url, locale) {
    try {
      const host = new URL(url).hostname;
      const preferredHost = getHostForLocale(locale);

      // Already on the preferred host - no redirect needed
      if (host === preferredHost) return false;

      // Country-specific TLDs always need redirect
      if (host.endsWith('aliexpress.ru')) {
        return true;
      }

      // Language subdomains of aliexpress.com that differ from preferred
      return ALIEXPRESS_DOMAINS.regionalSubdomains.some(
        (sub) => host === `${sub}.aliexpress.com`
      );
    } catch {
      return false;
    }
  }

  /**
   * Convert any regional URL to the user's preferred version
   * Uses the locale setting to determine the target subdomain
   * @param {string} url
   * @param {string} locale - could be nl_NL
   * @returns {string}
   */
  #toPreferredUrl(url, locale) {
    try {
      const parsed = new URL(url);
      const host = parsed.hostname;
      const targetHost = getHostForLocale(locale);

      // Country-specific TLDs
      if (host.endsWith('aliexpress.ru')) {
        parsed.hostname = targetHost;
        return parsed.href;
      }

      // Language subdomains
      for (const sub of ALIEXPRESS_DOMAINS.regionalSubdomains) {
        if (host === `${sub}.aliexpress.com`) {
          parsed.hostname = targetHost;
          return parsed.href;
        }
      }

      return url;
    } catch {
      return `https://${getHostForLocale(locale)}`;
    }
  }

  // Cookie management

  /**
   * Build the setCommonCookie URL for a given host.
   * @param {string} host - e.g. 'login.aliexpress.com'
   * @param {object} settings
   * @returns {string}
   */
  #buildCookieUrl(host, settings) {
    const params = new URLSearchParams({
      fromApp: 'false',
      currency: settings.currency,
      region: settings.region.toUpperCase(),
      bLocale: settings.locale,
      site: settings.site,
      province: '',
      city: ''
    });
    return `https://${host}/setCommonCookie.htm?${params}`;
  }

  /**
   * Set AliExpress cookies on all relevant domains.
   * @param {object} settings
   */
  async #setCookies(settings) {
    const opts = { credentials: 'include' };
    const requests = ALIEXPRESS_DOMAINS.cookieHosts.map((host) =>
      fetch(this.#buildCookieUrl(host, settings), opts).catch(() => {})
    );
    await Promise.allSettled(requests);
  }

  /** Remove region/currency cookies so fresh values take effect */
  async #clearCookies() {
    const removals = ALIEXPRESS_DOMAINS.cookiesToClear.map((c) =>
      chrome.cookies.remove(c).catch(() => {})
    );
    await Promise.allSettled(removals);
  }

  // Event listeners

  #registerListeners() {
    /**
     * webNavigation.onBeforeNavigate fires before any network request is made
     * - the fastest possible interception point in case when domain blocked, far earlier than tabs.onUpdated
     * URL filters limit it to AliExpress domains only for efficiency
     */
    chrome.webNavigation.onBeforeNavigate.addListener(
      (details) => {
        if (details.frameId !== 0) return; // main frame only
        this.#onBeforeNavigate(details);
      },
      {
        url: [
          { hostSuffix: 'aliexpress.com' },
          { hostSuffix: 'aliexpress.ru' },
          { hostSuffix: 'aliexpress.us' }
        ]
      }
    );

    /**
     * tabs.onUpdated with status 'complete' is used only to re-apply
     * cookie/region settings after the user changes preferences in the popup
     */
    chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
      if (changeInfo.status === 'complete' && tab.url && this.#isAliExpress(tab.url)) {
        this.#onPageComplete(tabId, tab);
      }
    });
  }

  /**
   * @param {{ tabId: number, url: string }} details
   */
  async #onBeforeNavigate(details) {
    const settings = await this.#load();
    if (!settings.globalMode) return;
    if (!this.#needsRedirect(details.url, settings.locale)) return;

    try {
      // Set cookies on all relevant domains in parallel - don't await,
      // redirect immediately and cookies will be applied on the target
      this.#setCookies(settings).catch(() => {});

      const targetUrl = this.#toPreferredUrl(details.url, settings.locale);
      chrome.tabs.update(details.tabId, { url: targetUrl });
      console.log(AliExpressSwitcher.TAG, 'Fast redirect to ', targetUrl);
    } catch (err) {
      console.error(AliExpressSwitcher.TAG, 'Fast redirect failed:', err);
    }
  }

  /**
   * Fires after page fully loads - re-applies cookies/region when the user
   * changed settings in the popup (applySettings flag)
   */
  async #onPageComplete(tabId, tab) {
    const settings = await this.#load();
    if (!settings.applySettings) return;

    try {
      await this.#clearCookies();
      await this.#setCookies(settings);

      settings.applySettings = false;
      this.#save(settings);

      const targetUrl = this.#toPreferredUrl(tab.url, settings.locale);
      chrome.tabs.update(tabId, { url: targetUrl });
      console.log(AliExpressSwitcher.TAG, 'Settings applied, redirected to ', targetUrl);
    } catch (err) {
      console.error(AliExpressSwitcher.TAG, 'Apply settings failed:', err);
    }
  }
}

// Bootstrap

new AliExpressSwitcher();