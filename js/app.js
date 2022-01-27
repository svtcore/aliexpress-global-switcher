/**
 * @author svtcore
 * @license GPL-3.0
 * @link https://github.com/svtcore
 * 
 */

var countries = {
    "af": "Afghanistan",
    "ala": "Aland Islands",
    "al": "Albania",
    "gba": "Alderney",
    "dz": "Algeria",
    "as": "American Samoa",
    "ad": "Andorra",
    "ao": "Angola",
    "ai": "Anguilla",
    "ag": "Antigua and Barbuda",
    "ar": "Argentina",
    "am": "Armenia",
    "aw": "Aruba",
    "asc": "Ascension Island",
    "au": "Australia",
    "at": "Austria",
    "az": "Azerbaijan",
    "bs": "Bahamas",
    "bh": "Bahrain",
    "bd": "Bangladesh",
    "bb": "Barbados",
    "by": "Belarus",
    "be": "Belgium",
    "bz": "Belize",
    "bj": "Benin",
    "bm": "Bermuda",
    "bt": "Bhutan",
    "bo": "Bolivia",
    "ba": "Bosnia and Herzegovina",
    "bw": "Botswana",
    "br": "Brazil",
    "bn": "Brunei",
    "bg": "Bulgaria",
    "bf": "Burkina Faso",
    "bi": "Burundi",
    "kh": "Cambodia",
    "cm": "Cameroon",
    "ca": "Canada",
    "cv": "Cape Verde",
    "bq": "Caribbean Netherlands",
    "ky": "Cayman Islands",
    "cf": "Central African Republic",
    "td": "Chad",
    "cl": "Chile",
    "cx": "Christmas Island",
    "cc": "Cocos (Keeling) Islands",
    "co": "Colombia",
    "km": "Comoros",
    "zr": "Congo, The Democratic Republic Of The",
    "cg": "Congo, The Republic of Congo",
    "ck": "Cook Islands",
    "cr": "Costa Rica",
    "ci": "Cote D'Ivoire",
    "hr": "Croatia (local name: Hrvatska)",
    "cw": "Curacao",
    "cy": "Cyprus",
    "cz": "Czech Republic",
    "dk": "Denmark",
    "dj": "Djibouti",
    "dm": "Dominica",
    "do": "Dominican Republic",
    "ec": "Ecuador",
    "eg": "Egypt",
    "sv": "El Salvador",
    "gq": "Equatorial Guinea",
    "er": "Eritrea",
    "ee": "Estonia",
    "et": "Ethiopia",
    "fk": "Falkland Islands (Malvinas)",
    "fo": "Faroe Islands",
    "fj": "Fiji",
    "fi": "Finland",
    "fr": "France",
    "gf": "French Guiana",
    "pf": "French Polynesia",
    "ga": "Gabon",
    "gm": "Gambia",
    "ge": "Georgia",
    "de": "Germany",
    "gh": "Ghana",
    "gi": "Gibraltar",
    "gr": "Greece",
    "gl": "Greenland",
    "gd": "Grenada",
    "gp": "Guadeloupe",
    "gu": "Guam",
    "gt": "Guatemala",
    "ggy": "Guernsey",
    "gn": "Guinea",
    "gw": "Guinea-Bissau",
    "gy": "Guyana",
    "ht": "Haiti",
    "hn": "Honduras",
    "hk": "Hong Kong,China",
    "hu": "Hungary",
    "is": "Iceland",
    "in": "India",
    "id": "Indonesia",
    "iq": "Iraq",
    "ie": "Ireland",
    "il": "Israel",
    "it": "Italy",
    "jm": "Jamaica",
    "jp": "Japan",
    "jey": "Jersey",
    "jo": "Jordan",
    "kz": "Kazakhstan",
    "ke": "Kenya",
    "ki": "Kiribati",
    "kr": "Korea",
    "ks": "Kosovo",
    "kw": "Kuwait",
    "kg": "Kyrgyzstan",
    "la": "Lao People's Democratic Republic",
    "lv": "Latvia",
    "lb": "Lebanon",
    "ls": "Lesotho",
    "lr": "Liberia",
    "ly": "Libya",
    "li": "Liechtenstein",
    "lt": "Lithuania",
    "lu": "Luxembourg",
    "mo": "Macau,China",
    "mk": "Macedonia",
    "mg": "Madagascar",
    "mw": "Malawi",
    "my": "Malaysia",
    "mv": "Maldives",
    "ml": "Mali",
    "mt": "Malta",
    "mh": "Marshall Islands",
    "mq": "Martinique",
    "mr": "Mauritania",
    "mu": "Mauritius",
    "yt": "Mayotte",
    "mx": "Mexico",
    "fm": "Micronesia",
    "md": "Moldova",
    "mc": "Monaco",
    "mn": "Mongolia",
    "mne": "Montenegro",
    "ms": "Montserrat",
    "ma": "Morocco",
    "mz": "Mozambique",
    "mm": "Myanmar",
    "na": "Namibia",
    "nr": "Nauru",
    "np": "Nepal",
    "nl": "Netherlands",
    "an": "Netherlands Antilles",
    "nc": "New Caledonia",
    "nz": "New Zealand",
    "ni": "Nicaragua",
    "ne": "Niger",
    "ng": "Nigeria",
    "nu": "Niue",
    "nf": "Norfolk Island",
    "mp": "Northern Mariana Islands",
    "no": "Norway",
    "om": "Oman",
    "other": "Other Country",
    "pk": "Pakistan",
    "pw": "Palau",
    "ps": "Palestine",
    "pa": "Panama",
    "pg": "Papua New Guinea",
    "py": "Paraguay",
    "pe": "Peru",
    "ph": "Philippines",
    "pl": "Poland",
    "pt": "Portugal",
    "pr": "Puerto Rico",
    "qa": "Qatar",
    "re": "Reunion",
    "ro": "Romania",
    "ru": "Russian Federation",
    "rw": "Rwanda",
    "blm": "Saint Barthelemy",
    "kn": "Saint Kitts and Nevis",
    "lc": "Saint Lucia",
    "maf": "Saint Martin",
    "vc": "Saint Vincent and the Grenadines",
    "ws": "Samoa",
    "sm": "San Marino",
    "st": "Sao Tome and Principe",
    "sa": "Saudi Arabia",
    "sn": "Senegal",
    "srb": "Serbia",
    "sc": "Seychelles",
    "sl": "Sierra Leone",
    "sg": "Singapore",
    "sx": "Sint Maarten",
    "sk": "Slovakia (Slovak Republic)",
    "si": "Slovenia",
    "sb": "Solomon Islands",
    "so": "Somalia",
    "za": "South Africa",
    "sgs": "South Georgia and the South Sandwich Islands",
    "ss": "South Sudan",
    "es": "Spain",
    "lk": "Sri Lanka",
    "pm": "St. Pierre and Miquelon",
    "sr": "Suriname",
    "sz": "Swaziland",
    "se": "Sweden",
    "ch": "Switzerland",
    "tw": "Taiwan,China",
    "tj": "Tajikistan",
    "tz": "Tanzania",
    "th": "Thailand",
    "tls": "Timor-Leste",
    "tg": "Togo",
    "to": "Tonga",
    "tt": "Trinidad and Tobago",
    "tn": "Tunisia",
    "tr": "Turkey",
    "tm": "Turkmenistan",
    "tc": "Turks and Caicos Islands",
    "tv": "Tuvalu",
    "ug": "Uganda",
    "ua": "Ukraine",
    "ae": "United Arab Emirates",
    "uk": "United Kingdom",
    "us": "United States",
    "uy": "Uruguay",
    "uz": "Uzbekistan",
    "vu": "Vanuatu",
    "va": "Vatican City State (Holy See)",
    "ve": "Venezuela",
    "vn": "Vietnam",
    "vg": "Virgin Islands (British)",
    "vi": "Virgin Islands (U.S.)",
    "wf": "Wallis And Futuna Islands",
    "ye": "Yemen",
    "zm": "Zambia",
    "eaz": "Zanzibar",
    "zw": "Zimbabwe",
};
var currencies = {
    "USD": "USD ( US Dollar )",
    "EUR": "EUR ( Euro )",
    "UAH": "UAH ( Ukraine Hryvnia )",
    "RUB": "RUB ( Russian Rouble )",
    "AFN": "AFN ( Afghan Afghani )",
    "ALL": "ALL ( Albanian Lek )",
    "AOA": "AOA ( Angolan Kwanza )",
    "XCD": "XCD ( East Carribean Dollar )",
    "AMD": "AMD ( Armenian Dram )",
    "AWG": "AWG ( Aruban Florin )",
    "SHP": "SHP ( St. Helena Pound )",
    "AUD": "AUD ( Australian Dollar )",
    "AZN": "AZN ( Azerbaijan New Manat )",
    "BSD": "BSD ( Bahamian Dollar )",
    "BHD": "BHD ( Bahraini Dinar )",
    "BDT": "BDT ( Bangladeshi Taka )",
    "BYR": "BYR ( Belarusian Ruble )",
    "BZD": "BZD ( Belize Dollar )",
    "XOF": "XOF ( CFA Franc BCEAO )",
    "BMD": "BMD ( Bermudian Dollar )",
    "BTN": "BTN ( Bhutan Ngultrum )",
    "BAM": "BAM ( Bosnian Mark )",
    "BWP": "BWP ( Botswana Pula )",
    "NOK": "NOK ( Norwegian Kroner )",
    "BRL": "BRL ( Brazilian Real )",
    "BND": "BND ( Brunei Dollar )",
    "BGN": "BGN ( Bulgarian Lev )",
    "BIF": "BIF ( Burundi Franc )",
    "KHR": "KHR ( Cambodian Riel )",
    "XAF": "XAF ( CFA Franc BEAC )",
    "CAD": "CAD ( Canadian Dollar )",
    "CVE": "CVE ( Cape Verde Escudo )",
    "KYD": "KYD ( Cayman Islands Dollar )",
    "CLP": "CLP ( Chilean Peso )",
    "KMF": "KMF ( Comoros Franc )",
    "CDF": "CDF ( Congolese Franc )",
    "NZD": "NZD ( New Zealand Dollar )",
    "CRC": "CRC ( Costa Rican Colon )",
    "CZK": "CZK ( Czech Koruna )",
    "DKK": "DKK ( Danish Krone )",
    "DJF": "DJF ( Djibouti Franc )",
    "DOP": "DOP ( Dominican Peso )",
    "EGP": "EGP ( Egyptian Pound )",
    "ERN": "ERN ( Eritrean Nakfa )",
    "XPF": "XPF ( CFP Franc )",
    "NIO": "NIO ( Nicaraguan Cordoba Oro )",
    "NGN": "NGN ( Nigerian Naira )",
    "OMR": "OMR ( Omani Rial )",
    "PKR": "PKR ( Pakistan Rupee )",
    "PGK": "PGK ( Papua New Guinea Kina )",
    "PYG": "PYG ( Paraguay Guarani )",
    "PHP": "PHP ( Philippine Peso )",
    "PLN": "PLN ( Polish Zloty )",
    "QAR": "QAR ( Qatari Rial )",
    "RON": "RON ( Romanian New Leu )",
    "RWF": "RWF ( Rwandan Franc )",
    "WST": "WST ( Samoan Tala )",
    "STD": "STD ( Sao Tome/Principe Dobra )",
    "SAR": "SAR ( Saudi Riyal )",
    "RSD": "RSD ( Serbian Dinar )",
    "SCR": "SCR ( Seychelles Rupee )",
    "SLL": "SLL ( Sierra Leone Leone )",
    "SGD": "SGD ( Singapore Dollar )",
    "SBD": "SBD ( Solomon Islands Dollar )",
    "SOS": "SOS ( Somali Shilling )",
    "ZAR": "ZAR ( South African Rand )",
    "KRW": "KRW ( Korean Won )",
    "LKR": "LKR ( Sri Lanka Rupee )",
    "SRD": "SRD ( Suriname Dollar )",
    "SZL": "SZL ( Swaziland Lilangeni )",
    "SEK": "SEK ( Swedish Krona )",
    "CHF": "CHF ( Swiss Franc )",
    "TWD": "TWD ( Taiwan Dollar )",
    "TJS": "TJS ( Tajikistan Somoni )",
    "TZS": "TZS ( Tanzanian Shilling )",
    "THB": "THB ( Thai Baht )",
    "TOP": "TOP ( Tongan Pa'anga )",
    "TTD": "TTD ( Trinidad/Tobago Dollar )",
    "TND": "TND ( Tunisian Dinar )",
    "TRY": "TRY ( Turkish Lira )",
    "TMT": "TMT ( Turkmenistan New Manat )",
    "UGX": "UGX ( Uganda Shilling )",
    "AED": "AED ( Utd. Arab Emir. Dirham )",
    "GBP": "GBP ( United Kingdom Pound )",
    "UYU": "UYU ( Uruguayan Peso )",
    "UZS": "UZS ( Uzbekistan Som )",
    "VUV": "VUV ( Vanuatu Vatu )",
    "VEF": "VEF ( Venezuelan Bolivar Fuerte )",
    "VND": "VND ( Vietnamese Dong )",
    "YER": "YER ( Yemen Rial )",
    "ZMW": "ZMW ( Zambian Kwacha )",
    "ZWL": "ZWL ( Zimbabwe Dollar )",
    "ETB": "ETB ( Ethiopian Birr )",
    "FKP": "FKP ( Falkland Islands Pound )",
    "FJD": "FJD ( Fiji Dollar )",
    "GMD": "GMD ( Gambian Dalasi )",
    "GEL": "GEL ( Georgian Lari )",
    "GHS": "GHS ( Ghanaian New Cedi )",
    "GIP": "GIP ( Gibraltar Pound )",
    "GTQ": "GTQ ( Guatemalan Quetzal )",
    "GNF": "GNF ( Guinea Franc )",
    "GYD": "GYD ( Guyanan Dollar )",
    "HTG": "HTG ( Haitian Gourde )",
    "HNL": "HNL ( Honduran Lempira )",
    "HKD": "HKD ( Hong Kong Dollar )",
    "HUF": "HUF ( Hungarian Forint )",
    "ISK": "ISK ( Iceland Krona )",
    "INR": "INR ( Indian Rupee )",
    "IDR": "IDR ( Indonesian Rupiah )",
    "IQD": "IQD ( Iraqi Dinar )",
    "ILS": "ILS ( Israeli New Shekel )",
    "JMD": "JMD ( Jamaican Dollar )",
    "JPY": "JPY ( Japanese Yen )",
    "KZT": "KZT ( Kazakhstan Tenge )",
    "KES": "KES ( Kenyan Shilling )",
    "KWD": "KWD ( Kuwaiti Dinar )",
    "KGS": "KGS ( Kyrgyzstanian Som )",
    "LAK": "LAK ( Lao Kip )",
    "LBP": "LBP ( Lebanese Pound )",
    "LSL": "LSL ( Lesotho Loti )",
    "LRD": "LRD ( Liberian Dollar )",
    "LYD": "LYD ( Libyan Dinar )",
    "MOP": "MOP ( Macanese pataca )",
    "MKD": "MKD ( Macedonian Denar )",
    "MWK": "MWK ( Malawi Kwacha )",
    "MYR": "MYR ( Malaysian Ringgit )",
    "MVR": "MVR ( Maldive Rufiyaa )",
    "MUR": "MUR ( Mauritius Rupee )",
    "MXN": "MXN ( Mexican peso )",
    "MDL": "MDL ( Moldovan Leu )",
    "MNT": "MNT ( Mongolian Tugrik )",
    "MAD": "MAD ( Moroccan Dirham )",
    "MZN": "MZN ( Mozambique New Metical )",
    "MMK": "MMK ( Myanmar Kyat )",
    "NAD": "NAD ( Namibia Dollar )",
    "NPR": "NPR ( Nepalese Rupee )",
    "ARS": "ARS ( Argentine Peso )",
    "PEN": "PEN ( Peruvian Nuevo Sol )",
    "DZD": "DZD ( Algerian Dinar )",
    "JOD": "JOD ( Jordanian Dinar )",
    "BOB": "BOB ( Bolivian Mvdol )",
    "COP": "COP ( Unidad de Valor Real )",
    "BBD": "BBD ( Barbados Dollar )",
    "PAB": "PAB ( Panamanian balboa )",
};

var shipment_methods = {
    "en": {
        0: " via AliExpress Standard Shipping",
        1: " via AliExpress Saver Shipping",
        2: " via AliExpress Premium Shipping",
        3: " via Cainiao Standard for Special Goods",
        4: " via Cainiao Super Economy for Special Goods",
        5: " via Cainiao Super Economy Global",
        6: " via Cainiao Warehouse Standard Shipping",
        7: " via Cainiao Expedited Economy",
        8: " via China Post Air Parcel",
        9: " via Turkey Post",
        10: " via Seller's Shipping Method",
        11: " via FedEx",
        12: " via DHL",
        13: " via e-EMS",
    }
};

$(document).ready(function() {
    chrome.storage.sync.get("alidata", function(obj) {
        if (typeof obj.alidata != 'undefined') {
            var alidata = JSON.parse(obj.alidata);
            if (alidata[0].global_mode) $("#global_mode").prop('checked', true);
            if (alidata[0].country_currency_mode) $("#country_currency_mode").prop('checked', true);
            if (alidata[0].shipment_method_mode) $("#shipment_method_mode").prop('checked', true);
            for (var key in countries) {
                $('#countries').append("<option value='" + key + "'>" + countries[key] + "</option>");
            }
            for (var key in currencies) {
                $('#currencies').append("<option value='" + key + "'>" + currencies[key] + "</option>");
            }
            for (var key_1 in shipment_methods) {
                for (var key_2 in shipment_methods[key_1]) {
                    $('#shipment_methods').append("<option value='" + key_2 + "'>" + shipment_methods[key_1][key_2] + "</option>");
                }
            }
            $("#countries option[value=" + alidata[0].region + "]").attr('selected', 'selected');
            $("#currencies option[value=" + alidata[0].currency + "]").attr('selected', 'selected');
            $("#shipment_methods option[value=" + alidata[0].shipment_method_id + "]").attr('selected', 'selected');
        } else {
            createDefaultKey()
        }
    });
});


function createDefaultKey() {
    var arrayArg = new Array();
    var jsonArg = new Object();
    jsonArg.currency = "USD";
    jsonArg.region = "US";
    jsonArg.locale = "en_US";
    jsonArg.site = "glo";
    jsonArg.global_mode = 0;
    jsonArg.country_currency_mode = 0;
    jsonArg.shipment_method_mode = 0;
    jsonArg.shipment_method_id = 0;
    arrayArg.push(jsonArg);
    var jsonArray = JSON.stringify(arrayArg);
    chrome.storage.sync.set({ "alidata": jsonArray }, function() {
        console.log("Created default alidata key")
    });
}

function deleteKey() {
    chrome.storage.sync.remove('alidata', function() {
        console.log('Key has been deleted from storage');
    });
    chrome.storage.sync.remove('alidata_temp', function() {
        console.log('Temp link has been deleted from storage');
    });
}

function updateKey() {
    deleteKey();
    var arrayArg = new Array();
    var jsonArg = new Object();
    jsonArg.currency = $("#currencies :selected").val();
    jsonArg.region = $("#countries :selected").val();
    jsonArg.locale = "en_US";
    jsonArg.site = "glo";
    if ($('#global_mode').is(":checked")) jsonArg.global_mode = 1;
    else jsonArg.global_mode = 0;
    if ($('#country_currency_mode').is(":checked")) jsonArg.country_currency_mode = 1;
    else jsonArg.country_currency_mode = 0;
    if ($('#shipment_method_mode').is(":checked")) jsonArg.shipment_method_mode = 1;
    else jsonArg.shipment_method_mode = 0;
    jsonArg.shipment_method_id = $("#shipment_methods :selected").val();
    arrayArg.push(jsonArg);
    var jsonArray = JSON.stringify(arrayArg);
    chrome.storage.sync.set({ "alidata": jsonArray }, function() {
        console.log("Key successful updated")
    });
}

$("select, #global_mode, #country_currency_mode, #shipment_method_mode").change(function() {
    updateKey();
    $("#message").text("Changes will be apply after reload page")
});

$('#github').click(function() {
    chrome.tabs.create({ url: 'https://github.com/svtcore' });
    return false;
});