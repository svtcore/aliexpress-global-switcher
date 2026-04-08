# AliExpress Global Switcher

> A Chrome extension that automatically redirects any regional AliExpress domain to your preferred version of the site and applies the correct locale, currency, and delivery country.

![Screenshot](https://github.com/svtcore/aliexpress-global-switcher/blob/main/screenshot.png)

---

## Problem

AliExpress sometimes forces users onto a regional domain — most commonly `aliexpress.ru` or a language-specific subdomain such as `de.aliexpress.com` — even when the global `www.aliexpress.com` is requested. This makes it harder to shop in the preferred language, currency, or delivery region.

Related community reports: [#1](https://www.reddit.com/r/Aliexpress/comments/u3566t/is_aliexpress_broken/) · [#2](https://www.reddit.com/r/Aliexpress/comments/fq4ylc/aliexpresscom_redirecting_to_ru/) · [#3](https://www.reddit.com/r/Aliexpress/comments/hac0n1/aliexpresscom_keeps_redirecting_me_to_russian/) · [#4](https://www.reddit.com/r/Aliexpress/comments/35r87s/why_the_f_is_aliexpress_in_russian/)

---

## Features

- **Automatic redirect** — intercepts navigation to `aliexpress.ru`, `aliexpress.us`, and all language subdomains (`de.`, `fr.`, `es.`, `pt.`, `it.`, `nl.`, `tr.`, `ja.`, `ko.`, `th.`, `ar.`, `he.`, `pl.aliexpress.com`) before any network request is made.
- **Locale-aware routing** — routes you to the correct language subdomain based on your selected locale (e.g. `de.aliexpress.com` for `de_DE`).
- **Cookie-based region & currency** — sets the AliExpress session cookies (`aep_usuc_f`) so that the delivery country and currency are applied instantly on every page load.
- **Auto-detection** — selecting a country in the popup automatically suggests the matching locale and currency.
- **Global Mode toggle** — redirect and cookie injection can be enabled or disabled at any time without reinstalling the extension.
- **Sync storage** — settings are stored in `chrome.storage.sync` and follow the user across devices.

---

## Installation

### From a release archive (recommended)

1. Download the latest release from the [Releases page](https://github.com/svtcore/aliexpress-global-switcher/releases) and extract the archive.
2. Open Chrome and navigate to `chrome://extensions`.
3. Enable **Developer mode** (toggle in the top-right corner).
4. Click **Load unpacked** and select the extracted folder.

### From source

```bash
git clone https://github.com/svtcore/aliexpress-global-switcher.git
```

Then follow steps 2–4 above, pointing **Load unpacked** at the cloned folder.

---

## Usage

1. Click the extension icon in the Chrome toolbar to open the popup.
2. Enable **Global Mode**.
3. Select your **Country**, **Currency**, and **Language**.
4. Reload any AliExpress tab — the extension will redirect you to the correct domain and apply the chosen settings.

> **Note:** Settings are saved automatically after each change. They take effect on the next page load.

---

## How It Works

The extension uses two event hooks inside a Manifest V3 service worker:

| Hook | Purpose |
|------|---------|
| `webNavigation.onBeforeNavigate` | Detects a regional domain *before* any network request is sent and performs an immediate tab redirect. |
| `tabs.onUpdated` (status: `complete`) | Re-applies cookies and redirects after a page finishes loading — used when the user changes settings in the popup. |

Cookie injection is done by calling the AliExpress `setCommonCookie.htm` endpoint with the selected `region`, `currency`, and `bLocale` parameters, and by clearing any stale `aep_usuc_f` cookies beforehand.

---

## Permissions

| Permission | Reason |
|------------|--------|
| `tabs` | Read the current tab URL and perform redirects |
| `storage` | Persist user settings via `chrome.storage.sync` |
| `cookies` | Clear stale region/currency cookies before applying new values |
| `webNavigation` | Intercept navigation before a network request is made |

---

## Contributing

Pull requests are welcome. For significant changes, please open an issue first to discuss what you would like to change.

---

## License

[MIT](https://github.com/svtcore/aliexpress-global-switcher/blob/main/LICENSE)
