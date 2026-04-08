/**
 * AliExpress Global Switcher - Configuration
 * @author svtcore
 * @license MIT
 * @link https://github.com/svtcore
 */

/**
 * AliExpress domain patterns for detection and redirection
 */
export const ALIEXPRESS_DOMAINS = {
  /**
   * All known AliExpress TLDs to watch for redirects.
   * aliexpress.ru is kept here for detection/redirect purposes even though
   */
  tlds: ['aliexpress.com', 'aliexpress.ru', 'aliexpress.us'],

  /**
   * Language-based subdomains of aliexpress.com
   */
  regionalSubdomains: [
    'pt', 'es', 'fr', 'de', 'it', 'nl',
    'tr', 'ja', 'ko', 'th', 'ar', 'he', 'pl'
  ],

  /** Target global domain for all redirects */
  globalHost: 'www.aliexpress.com',

  /**
   * Cookie-setting endpoint hosts
   * login.aliexpress.ru is included so cookies are cleared on the .ru domain
   * before we redirect away, preventing the site from bouncing back
   */
  cookieHosts: ['login.aliexpress.com', 'login.aliexpress.ru'],

  /** Cookies to clear before applying new region/currency */
  cookiesToClear: [
    { url: 'https://www.aliexpress.com', name: 'aep_usuc_f' },
    { url: 'https://wp.aliexpress.com', name: 'aep_usuc_f' }
  ]
};

/**
 * Supported locales for the bLocale cookie parameter.
 * Keys match AliExpress setCommonCookie.htm accepted values.
 */
export const LOCALES = {
  'en_US': 'English',
  'pt_BR': 'Português (Brasil)',
  'es_ES': 'Español',
  'fr_FR': 'Français',
  'de_DE': 'Deutsch',
  'it_IT': 'Italiano',
  'nl_NL': 'Nederlands',
  'tr_TR': 'Türkçe',
  'ja_JP': '日本語',
  'ko_KR': '한국어',
  'th_TH': 'ภาษาไทย',
  'ar_AR': 'العربية',
  'he_IL': 'עברית',
  'pl_PL': 'Polski',
  'vi_VN': 'Tiếng Việt',
  'id_ID': 'Bahasa Indonesia'
};

export const LOCALE_TO_SUBDOMAIN = {
  'en_US': 'www',
  'pt_BR': 'pt',
  'es_ES': 'es',
  'fr_FR': 'fr',
  'de_DE': 'de',
  'it_IT': 'it',
  'nl_NL': 'nl',
  'tr_TR': 'tr',
  'ja_JP': 'ja',
  'ko_KR': 'ko',
  'th_TH': 'th',
  'ar_AR': 'ar',
  'he_IL': 'he',
  'pl_PL': 'pl',
  'vi_VN': 'www',   // no dedicated subdomain
  'id_ID': 'www'    // no dedicated subdomain
};

/**
 * Country code leads  to default bLocale
 * Falls back to 'en_US' for unlisted countries
 */
export const COUNTRY_TO_LOCALE = {
  // English
  us: 'en_US', uk: 'en_US', au: 'en_US', ca: 'en_US', nz: 'en_US',
  ie: 'en_US', sg: 'en_US', hk: 'en_US', in: 'en_US', ph: 'en_US',
  za: 'en_US', ng: 'en_US', ke: 'en_US', gh: 'en_US', jm: 'en_US',
  tt: 'en_US', bb: 'en_US', bz: 'en_US', gy: 'en_US', fj: 'en_US',
  // German
  de: 'de_DE', at: 'de_DE', ch: 'de_DE', li: 'de_DE',
  // French
  fr: 'fr_FR', be: 'fr_FR', lu: 'fr_FR', mc: 'fr_FR',
  sn: 'fr_FR', ci: 'fr_FR', cm: 'fr_FR', mg: 'fr_FR',
  ml: 'fr_FR', bf: 'fr_FR', ne: 'fr_FR', tg: 'fr_FR',
  bj: 'fr_FR', gn: 'fr_FR', td: 'fr_FR', ga: 'fr_FR',
  cg: 'fr_FR', dj: 'fr_FR', cf: 'fr_FR', gf: 'fr_FR',
  gp: 'fr_FR', mq: 'fr_FR', re: 'fr_FR', nc: 'fr_FR',
  pf: 'fr_FR', yt: 'fr_FR', wf: 'fr_FR',
  // Spanish
  es: 'es_ES', mx: 'es_ES', ar: 'es_ES', co: 'es_ES',
  cl: 'es_ES', pe: 'es_ES', ve: 'es_ES', ec: 'es_ES',
  gt: 'es_ES', bo: 'es_ES', do: 'es_ES', hn: 'es_ES',
  py: 'es_ES', sv: 'es_ES', ni: 'es_ES', cr: 'es_ES',
  pa: 'es_ES', uy: 'es_ES', pr: 'es_ES', gq: 'es_ES',
  // Portuguese
  br: 'pt_BR', pt: 'pt_BR', ao: 'pt_BR', mz: 'pt_BR',
  cv: 'pt_BR', st: 'pt_BR',
  // Italian
  it: 'it_IT', sm: 'it_IT', va: 'it_IT',
  // Dutch
  nl: 'nl_NL', sr: 'nl_NL', an: 'nl_NL', aw: 'nl_NL',
  cw: 'nl_NL', sx: 'nl_NL', bq: 'nl_NL',
  // Turkish
  tr: 'tr_TR',
  // Japanese
  jp: 'ja_JP',
  // Korean
  kr: 'ko_KR',
  // Thai
  th: 'th_TH',
  // Arabic
  sa: 'ar_AR', ae: 'ar_AR', eg: 'ar_AR', iq: 'ar_AR',
  jo: 'ar_AR', kw: 'ar_AR', lb: 'ar_AR', ly: 'ar_AR',
  ma: 'ar_AR', om: 'ar_AR', qa: 'ar_AR', tn: 'ar_AR',
  ye: 'ar_AR', bh: 'ar_AR', dz: 'ar_AR', mr: 'ar_AR',
  ps: 'ar_AR', so: 'ar_AR',
  // Hebrew
  il: 'he_IL',
  // Polish
  pl: 'pl_PL',
  // Vietnamese
  vn: 'vi_VN',
  // Indonesian
  id: 'id_ID'
};

/**
 * default currency code
 */
export const COUNTRY_TO_CURRENCY = {
  us: 'USD', uk: 'GBP', de: 'EUR', fr: 'EUR', es: 'EUR',
  it: 'EUR', nl: 'EUR', be: 'EUR', at: 'EUR', fi: 'EUR',
  ie: 'EUR', pt: 'EUR', gr: 'EUR', ee: 'EUR', lv: 'EUR',
  lt: 'EUR', sk: 'EUR', si: 'EUR', lu: 'EUR', mt: 'EUR',
  cy: 'EUR', hr: 'EUR', mc: 'EUR', sm: 'EUR', va: 'EUR',
  ad: 'EUR',
  br: 'BRL', ca: 'CAD', au: 'AUD', nz: 'NZD',
  jp: 'JPY', kr: 'KRW', in: 'INR', tr: 'TRY',
  sa: 'SAR', ae: 'AED', il: 'ILS', pl: 'PLN',
  se: 'SEK', no: 'NOK', dk: 'DKK', ch: 'CHF',
  th: 'THB', sg: 'SGD', hk: 'HKD', mx: 'MXN',
  ua: 'UAH', eg: 'EGP', za: 'ZAR', ng: 'NGN',
  ph: 'PHP', vn: 'VND', id: 'IDR', my: 'MYR',
  tw: 'TWD', cz: 'CZK', hu: 'HUF', ro: 'RON',
  bg: 'BGN', ru: 'USD', by: 'USD', kz: 'KZT',
  ar: 'ARS', co: 'COP', cl: 'CLP', pe: 'PEN',
  ke: 'KES', gh: 'GHS', bd: 'BDT', pk: 'PKR',
  lk: 'LKR', np: 'NPR', kh: 'KHR', mm: 'MMK',
  mn: 'MNT', ge: 'GEL', am: 'AMD', az: 'AZN',
  kg: 'KGS', tj: 'TJS', uz: 'UZS', md: 'MDL'
};

/**
 * Complete list of supported countries
 */
export const COUNTRIES = {
  af: 'Afghanistan',
  ala: 'Aland Islands',
  al: 'Albania',
  gba: 'Alderney',
  dz: 'Algeria',
  as: 'American Samoa',
  ad: 'Andorra',
  ao: 'Angola',
  ai: 'Anguilla',
  ag: 'Antigua and Barbuda',
  ar: 'Argentina',
  am: 'Armenia',
  aw: 'Aruba',
  asc: 'Ascension Island',
  au: 'Australia',
  at: 'Austria',
  az: 'Azerbaijan',
  bs: 'Bahamas',
  bh: 'Bahrain',
  bd: 'Bangladesh',
  bb: 'Barbados',
  by: 'Belarus',
  be: 'Belgium',
  bz: 'Belize',
  bj: 'Benin',
  bm: 'Bermuda',
  bt: 'Bhutan',
  bo: 'Bolivia',
  ba: 'Bosnia and Herzegovina',
  bw: 'Botswana',
  br: 'Brazil',
  bn: 'Brunei',
  bg: 'Bulgaria',
  bf: 'Burkina Faso',
  bi: 'Burundi',
  kh: 'Cambodia',
  cm: 'Cameroon',
  ca: 'Canada',
  cv: 'Cape Verde',
  bq: 'Caribbean Netherlands',
  ky: 'Cayman Islands',
  cf: 'Central African Republic',
  td: 'Chad',
  cl: 'Chile',
  cx: 'Christmas Island',
  cc: 'Cocos (Keeling) Islands',
  co: 'Colombia',
  km: 'Comoros',
  zr: 'Congo, The Democratic Republic Of The',
  cg: 'Congo, The Republic of Congo',
  ck: 'Cook Islands',
  cr: 'Costa Rica',
  ci: "Cote D'Ivoire",
  hr: 'Croatia',
  cw: 'Curacao',
  cy: 'Cyprus',
  cz: 'Czech Republic',
  dk: 'Denmark',
  dj: 'Djibouti',
  dm: 'Dominica',
  do: 'Dominican Republic',
  ec: 'Ecuador',
  eg: 'Egypt',
  sv: 'El Salvador',
  gq: 'Equatorial Guinea',
  er: 'Eritrea',
  ee: 'Estonia',
  et: 'Ethiopia',
  fk: 'Falkland Islands (Malvinas)',
  fo: 'Faroe Islands',
  fj: 'Fiji',
  fi: 'Finland',
  fr: 'France',
  gf: 'French Guiana',
  pf: 'French Polynesia',
  ga: 'Gabon',
  gm: 'Gambia',
  ge: 'Georgia',
  de: 'Germany',
  gh: 'Ghana',
  gi: 'Gibraltar',
  gr: 'Greece',
  gl: 'Greenland',
  gd: 'Grenada',
  gp: 'Guadeloupe',
  gu: 'Guam',
  gt: 'Guatemala',
  ggy: 'Guernsey',
  gn: 'Guinea',
  gw: 'Guinea-Bissau',
  gy: 'Guyana',
  ht: 'Haiti',
  hn: 'Honduras',
  hk: 'Hong Kong, China',
  hu: 'Hungary',
  is: 'Iceland',
  in: 'India',
  id: 'Indonesia',
  iq: 'Iraq',
  ie: 'Ireland',
  il: 'Israel',
  it: 'Italy',
  jm: 'Jamaica',
  jp: 'Japan',
  jey: 'Jersey',
  jo: 'Jordan',
  kz: 'Kazakhstan',
  ke: 'Kenya',
  ki: 'Kiribati',
  kr: 'Korea',
  ks: 'Kosovo',
  kw: 'Kuwait',
  kg: 'Kyrgyzstan',
  la: "Lao People's Democratic Republic",
  lv: 'Latvia',
  lb: 'Lebanon',
  ls: 'Lesotho',
  lr: 'Liberia',
  ly: 'Libya',
  li: 'Liechtenstein',
  lt: 'Lithuania',
  lu: 'Luxembourg',
  mo: 'Macau, China',
  mk: 'Macedonia',
  mg: 'Madagascar',
  mw: 'Malawi',
  my: 'Malaysia',
  mv: 'Maldives',
  ml: 'Mali',
  mt: 'Malta',
  mh: 'Marshall Islands',
  mq: 'Martinique',
  mr: 'Mauritania',
  mu: 'Mauritius',
  yt: 'Mayotte',
  mx: 'Mexico',
  fm: 'Micronesia',
  md: 'Moldova',
  mc: 'Monaco',
  mn: 'Mongolia',
  mne: 'Montenegro',
  ms: 'Montserrat',
  ma: 'Morocco',
  mz: 'Mozambique',
  mm: 'Myanmar',
  na: 'Namibia',
  nr: 'Nauru',
  np: 'Nepal',
  nl: 'Netherlands',
  an: 'Netherlands Antilles',
  nc: 'New Caledonia',
  nz: 'New Zealand',
  ni: 'Nicaragua',
  ne: 'Niger',
  ng: 'Nigeria',
  nu: 'Niue',
  nf: 'Norfolk Island',
  mp: 'Northern Mariana Islands',
  no: 'Norway',
  om: 'Oman',
  other: 'Other Country',
  pk: 'Pakistan',
  pw: 'Palau',
  ps: 'Palestine',
  pa: 'Panama',
  pg: 'Papua New Guinea',
  py: 'Paraguay',
  pe: 'Peru',
  ph: 'Philippines',
  pl: 'Poland',
  pt: 'Portugal',
  pr: 'Puerto Rico',
  qa: 'Qatar',
  re: 'Reunion',
  ro: 'Romania',
  rw: 'Rwanda',
  blm: 'Saint Barthelemy',
  kn: 'Saint Kitts and Nevis',
  lc: 'Saint Lucia',
  maf: 'Saint Martin',
  vc: 'Saint Vincent and the Grenadines',
  ws: 'Samoa',
  sm: 'San Marino',
  st: 'Sao Tome and Principe',
  sa: 'Saudi Arabia',
  sn: 'Senegal',
  srb: 'Serbia',
  sc: 'Seychelles',
  sl: 'Sierra Leone',
  sg: 'Singapore',
  sx: 'Sint Maarten',
  sk: 'Slovakia',
  si: 'Slovenia',
  sb: 'Solomon Islands',
  so: 'Somalia',
  za: 'South Africa',
  sgs: 'South Georgia and the South Sandwich Islands',
  ss: 'South Sudan',
  es: 'Spain',
  lk: 'Sri Lanka',
  pm: 'St. Pierre and Miquelon',
  sr: 'Suriname',
  sz: 'Swaziland',
  se: 'Sweden',
  ch: 'Switzerland',
  tw: 'Taiwan, China',
  tj: 'Tajikistan',
  tz: 'Tanzania',
  th: 'Thailand',
  tls: 'Timor-Leste',
  tg: 'Togo',
  to: 'Tonga',
  tt: 'Trinidad and Tobago',
  tn: 'Tunisia',
  tr: 'Turkey',
  tm: 'Turkmenistan',
  tc: 'Turks and Caicos Islands',
  tv: 'Tuvalu',
  ug: 'Uganda',
  ua: 'Ukraine',
  ae: 'United Arab Emirates',
  uk: 'United Kingdom',
  us: 'United States',
  uy: 'Uruguay',
  uz: 'Uzbekistan',
  vu: 'Vanuatu',
  va: 'Vatican City State (Holy See)',
  ve: 'Venezuela',
  vn: 'Vietnam',
  vg: 'Virgin Islands (British)',
  vi: 'Virgin Islands (U.S.)',
  wf: 'Wallis And Futuna Islands',
  ye: 'Yemen',
  zm: 'Zambia',
  eaz: 'Zanzibar',
  zw: 'Zimbabwe'
};

/**
 * Supported currencies
 */
export const CURRENCIES = {
  USD: 'USD - US Dollar',
  EUR: 'EUR - Euro',
  GBP: 'GBP - British Pound',
  UAH: 'UAH - Ukraine Hryvnia',
  CAD: 'CAD - Canadian Dollar',
  AUD: 'AUD - Australian Dollar',
  BRL: 'BRL - Brazilian Real',
  JPY: 'JPY - Japanese Yen',
  KRW: 'KRW - Korean Won',
  TRY: 'TRY - Turkish Lira',
  PLN: 'PLN - Polish Zloty',
  ILS: 'ILS - Israeli Shekel',
  SEK: 'SEK - Swedish Krona',
  NOK: 'NOK - Norwegian Kroner',
  DKK: 'DKK - Danish Krone',
  CHF: 'CHF - Swiss Franc',
  THB: 'THB - Thai Baht',
  INR: 'INR - Indian Rupee',
  SGD: 'SGD - Singapore Dollar',
  HKD: 'HKD - Hong Kong Dollar',
  MXN: 'MXN - Mexican Peso',
  SAR: 'SAR - Saudi Riyal',
  AED: 'AED - UAE Dirham',
  NZD: 'NZD - New Zealand Dollar',
  AFN: 'AFN - Afghan Afghani',
  ALL: 'ALL - Albanian Lek',
  AOA: 'AOA - Angolan Kwanza',
  XCD: 'XCD - East Caribbean Dollar',
  AMD: 'AMD - Armenian Dram',
  AWG: 'AWG - Aruban Florin',
  SHP: 'SHP - St. Helena Pound',
  AZN: 'AZN - Azerbaijan Manat',
  BSD: 'BSD - Bahamian Dollar',
  BHD: 'BHD - Bahraini Dinar',
  BDT: 'BDT - Bangladeshi Taka',
  BYR: 'BYR - Belarusian Ruble',
  BZD: 'BZD - Belize Dollar',
  XOF: 'XOF - CFA Franc BCEAO',
  BMD: 'BMD - Bermudian Dollar',
  BTN: 'BTN - Bhutan Ngultrum',
  BAM: 'BAM - Bosnian Mark',
  BWP: 'BWP - Botswana Pula',
  BND: 'BND - Brunei Dollar',
  BGN: 'BGN - Bulgarian Lev',
  BIF: 'BIF - Burundi Franc',
  KHR: 'KHR - Cambodian Riel',
  XAF: 'XAF - CFA Franc BEAC',
  CVE: 'CVE - Cape Verde Escudo',
  KYD: 'KYD - Cayman Islands Dollar',
  CLP: 'CLP - Chilean Peso',
  KMF: 'KMF - Comoros Franc',
  CDF: 'CDF - Congolese Franc',
  CRC: 'CRC - Costa Rican Colon',
  CZK: 'CZK - Czech Koruna',
  DJF: 'DJF - Djibouti Franc',
  DOP: 'DOP - Dominican Peso',
  EGP: 'EGP - Egyptian Pound',
  ERN: 'ERN - Eritrean Nakfa',
  XPF: 'XPF - CFP Franc',
  NIO: 'NIO - Nicaraguan Cordoba',
  NGN: 'NGN - Nigerian Naira',
  OMR: 'OMR - Omani Rial',
  PKR: 'PKR - Pakistan Rupee',
  PGK: 'PGK - Papua New Guinea Kina',
  PYG: 'PYG - Paraguay Guarani',
  PHP: 'PHP - Philippine Peso',
  QAR: 'QAR - Qatari Rial',
  RON: 'RON - Romanian Leu',
  RWF: 'RWF - Rwandan Franc',
  WST: 'WST - Samoan Tala',
  STD: 'STD - Sao Tome Dobra',
  RSD: 'RSD - Serbian Dinar',
  SCR: 'SCR - Seychelles Rupee',
  SLL: 'SLL - Sierra Leone Leone',
  SBD: 'SBD - Solomon Islands Dollar',
  SOS: 'SOS - Somali Shilling',
  ZAR: 'ZAR - South African Rand',
  LKR: 'LKR - Sri Lanka Rupee',
  SRD: 'SRD - Suriname Dollar',
  SZL: 'SZL - Swaziland Lilangeni',
  TWD: 'TWD - Taiwan Dollar',
  TJS: 'TJS - Tajikistan Somoni',
  TZS: 'TZS - Tanzanian Shilling',
  TOP: "TOP - Tongan Pa'anga",
  TTD: 'TTD - Trinidad/Tobago Dollar',
  TND: 'TND - Tunisian Dinar',
  TMT: 'TMT - Turkmenistan Manat',
  UGX: 'UGX - Uganda Shilling',
  UYU: 'UYU - Uruguayan Peso',
  UZS: 'UZS - Uzbekistan Som',
  VUV: 'VUV - Vanuatu Vatu',
  VEF: 'VEF - Venezuelan Bolivar',
  VND: 'VND - Vietnamese Dong',
  YER: 'YER - Yemen Rial',
  ZMW: 'ZMW - Zambian Kwacha',
  ZWL: 'ZWL - Zimbabwe Dollar',
  ETB: 'ETB - Ethiopian Birr',
  FKP: 'FKP - Falkland Islands Pound',
  FJD: 'FJD - Fiji Dollar',
  GMD: 'GMD - Gambian Dalasi',
  GEL: 'GEL - Georgian Lari',
  GHS: 'GHS - Ghanaian Cedi',
  GIP: 'GIP - Gibraltar Pound',
  GTQ: 'GTQ - Guatemalan Quetzal',
  GNF: 'GNF - Guinea Franc',
  GYD: 'GYD - Guyanan Dollar',
  HTG: 'HTG - Haitian Gourde',
  HNL: 'HNL - Honduran Lempira',
  HUF: 'HUF - Hungarian Forint',
  ISK: 'ISK - Iceland Krona',
  IDR: 'IDR - Indonesian Rupiah',
  IQD: 'IQD - Iraqi Dinar',
  JMD: 'JMD - Jamaican Dollar',
  KZT: 'KZT - Kazakhstan Tenge',
  KES: 'KES - Kenyan Shilling',
  KWD: 'KWD - Kuwaiti Dinar',
  KGS: 'KGS - Kyrgyzstanian Som',
  LAK: 'LAK - Lao Kip',
  LBP: 'LBP - Lebanese Pound',
  LSL: 'LSL - Lesotho Loti',
  LRD: 'LRD - Liberian Dollar',
  LYD: 'LYD - Libyan Dinar',
  MOP: 'MOP - Macanese Pataca',
  MKD: 'MKD - Macedonian Denar',
  MWK: 'MWK - Malawi Kwacha',
  MYR: 'MYR - Malaysian Ringgit',
  MVR: 'MVR - Maldive Rufiyaa',
  MUR: 'MUR - Mauritius Rupee',
  MDL: 'MDL - Moldovan Leu',
  MNT: 'MNT - Mongolian Tugrik',
  MAD: 'MAD - Moroccan Dirham',
  MZN: 'MZN - Mozambique Metical',
  MMK: 'MMK - Myanmar Kyat',
  NAD: 'NAD - Namibia Dollar',
  NPR: 'NPR - Nepalese Rupee',
  ARS: 'ARS - Argentine Peso',
  PEN: 'PEN - Peruvian Sol',
  DZD: 'DZD - Algerian Dinar',
  JOD: 'JOD - Jordanian Dinar',
  BOB: 'BOB - Bolivian Boliviano',
  COP: 'COP - Colombian Peso',
  BBD: 'BBD - Barbados Dollar',
  PAB: 'PAB - Panamanian Balboa'
};

/**
 * Default settings for new installations
 */
export const DEFAULT_SETTINGS = {
  currency: 'USD',
  region: 'us',
  locale: 'en_US',
  site: 'glo',
  globalMode: true,
  applySettings: false
};

/**
 * Storage key used in chrome.storage.sync
 */
export const STORAGE_KEY = 'alidata_v2';

/**
 * Helper: resolve locale for a given country code
 * @param {string} countryCode - lowercase country code
 * @returns {string} locale string
 */
export function getLocaleForCountry(countryCode) {
  return COUNTRY_TO_LOCALE[countryCode] || 'en_US';
}

/**
 * Helper: resolve default currency for a given country code
 * @param {string} countryCode - lowercase country code
 * @returns {string} currency code
 */
export function getCurrencyForCountry(countryCode) {
  return COUNTRY_TO_CURRENCY[countryCode] || 'USD';
}

/**
 * Helper: resolve subdomain for a given locale
 * @param {string} locale
 * @returns {string} subdomain
 */
export function getSubdomainForLocale(locale) {
  return LOCALE_TO_SUBDOMAIN[locale] || 'www';
}

/**
 * Helper: build the full host for a locale
 * @param {string} locale
 * @returns {string} hostname
 */
export function getHostForLocale(locale) {
  const sub = getSubdomainForLocale(locale);
  return `${sub}.aliexpress.com`;
}
