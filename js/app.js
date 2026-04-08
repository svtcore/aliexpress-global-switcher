/**
 * AliExpress Global Switcher - Popup Controller
 * @author svtcore
 * @license MIT
 * @link https://github.com/svtcore
 */

import {
  COUNTRIES,
  CURRENCIES,
  LOCALES,
  DEFAULT_SETTINGS,
  STORAGE_KEY,
  getLocaleForCountry,
  getCurrencyForCountry
} from './config.js';

/**
 * Controls the extension popup UI: loads/saves settings,
 * populates dropdowns, and auto-detects locale and currency
 * when the user changes the selected country.
 */
class PopupController {

  /** DOM element references (resolved in #cacheElements). */
  #els = {};

  constructor() {
    document.addEventListener('DOMContentLoaded', () => this.#init());
  }

  // Initialisation

  #init() {
    this.#cacheElements();
    this.#populateDropdowns();
    this.#loadSettings();
    this.#bindEvents();
  }

  #cacheElements() {
    this.#els = {
      globalMode:    document.getElementById('global_mode'),
      countries:     document.getElementById('countries'),
      currencies:    document.getElementById('currencies'),
      locales:       document.getElementById('locales'),
      message:       document.getElementById('message'),
      github:        document.getElementById('github')
    };
  }

  // Dropdown population

  #populateDropdowns() {
    this.#fillSelect(this.#els.countries, COUNTRIES);
    this.#fillSelect(this.#els.currencies, CURRENCIES);
    this.#fillLocaleSelect();
  }

  /**
   * Populate a <select> element with <option> entries.
   * @param {HTMLSelectElement} select
   * @param {Object<string,string>} map - key to display label
   */
  #fillSelect(select, map) {
    const fragment = document.createDocumentFragment();
    for (const [value, label] of Object.entries(map)) {
      const opt = document.createElement('option');
      opt.value = value;
      opt.textContent = label;
      fragment.appendChild(opt);
    }
    select.appendChild(fragment);
  }

  /**
   * Populate locale <select> with language names and subdomain hints
   */
  #fillLocaleSelect() {
    const select = this.#els.locales;
    const fragment = document.createDocumentFragment();
    for (const [locale, label] of Object.entries(LOCALES)) {
      const opt = document.createElement('option');
      opt.value = locale;
      opt.textContent = label;
      fragment.appendChild(opt);
    }
    select.appendChild(fragment);
  }

  // Settings persistence

  #loadSettings() {
    chrome.storage.sync.get(STORAGE_KEY, (result) => {
      let settings;
      try {
        settings = result[STORAGE_KEY]
          ? JSON.parse(result[STORAGE_KEY])
          : { ...DEFAULT_SETTINGS };
      } catch {
        settings = { ...DEFAULT_SETTINGS };
      }

      this.#els.globalMode.checked = !!settings.globalMode;
      this.#els.countries.value    = settings.region  || 'us';
      this.#els.currencies.value   = settings.currency || 'USD';
      this.#els.locales.value      = settings.locale   || 'en_US';
    });
  }

  #saveSettings() {
    const settings = {
      currency:      this.#els.currencies.value,
      region:        this.#els.countries.value,
      locale:        this.#els.locales.value,
      site:          'glo',
      globalMode:    this.#els.globalMode.checked,
      applySettings: true   // signal background to re-apply cookies
    };

    chrome.storage.sync.set(
      { [STORAGE_KEY]: JSON.stringify(settings) },
      () => this.#showMessage('Changes will be applied after page reload')
    );
  }

  // Event binding

  #bindEvents() {
    // Any change in controls leads to save
    const inputs = [
      this.#els.globalMode,
      this.#els.countries,
      this.#els.currencies,
      this.#els.locales
    ];
    for (const el of inputs) {
      el.addEventListener('change', () => this.#saveSettings());
    }

    // When country changes, auto-detect locale and currency
    this.#els.countries.addEventListener('change', () => {
      this.#onCountryChange();
    });



    // GitHub link
    this.#els.github.addEventListener('click', (e) => {
      e.preventDefault();
      chrome.tabs.create({ url: 'https://github.com/svtcore' });
    });
  }

  /**
   * When country changes, suggest the matching locale and currency.
   */
  #onCountryChange() {
    const countryCode = this.#els.countries.value;

    const suggestedLocale = getLocaleForCountry(countryCode);
    if (LOCALES[suggestedLocale]) {
      this.#els.locales.value = suggestedLocale;
    }

    const suggestedCurrency = getCurrencyForCountry(countryCode);
    if (CURRENCIES[suggestedCurrency]) {
      this.#els.currencies.value = suggestedCurrency;
    }
  }

  // UI helpers

  #showMessage(text) {
    this.#els.message.textContent = text;
    setTimeout(() => { this.#els.message.textContent = ''; }, 3000);
  }
}

// Bootstrap
new PopupController();