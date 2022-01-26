/**
 * @author github.com/svtcore
 */


chrome.storage.sync.get("alidata", function(obj) {
    if (typeof obj.alidata != 'undefined') {
        var alidata = JSON.parse(obj.alidata);
        var current_url = String(window.location);
        var cookie_arr = getCookies();
        var site = getCurrentSite(cookie_arr);
        var currency = getCurrentCurrency(cookie_arr).toUpperCase();
        var region = getCurrentRegion(cookie_arr).toUpperCase();
        var b_locale = getCurrentLocale(cookie_arr);
        var ajax = false;
        var domain = "com";
        if (alidata[0].country_currency_mode) {
            if (site == "rus") domain = "ru";
            if ((alidata[0].currency).toUpperCase() != currency || (alidata[0].region).toUpperCase() != region) {
                cookielink = "https://login.aliexpress." + domain + "/setCommonCookie.htm?fromApp=false&currency=" + alidata[0].currency + "&region=" + (alidata[0].region).toUpperCase() + "&bLocale=" + b_locale + "&site=" + site + "&province=&city=";
                ajax = true;
            }
        }
        if (ajax) {
            $.ajax({
                type: "GET",
                url: cookielink,
                xhrFields: {
                    withCredentials: true,
                },
                success: function(msg) {
                    if (alidata[0].country_currency_mode) {
                        window.location.href = current_url;
                    }
                },
                error: function(msg) {
                    console.log(msg);
                }
            });
        }
    } else {
        createDefaultKey()
        window.location.reload();
    }
});

function getCurrentSite(cookie_arr) {
    for (var j = 0; j < cookie_arr.length; j++) {
        key = cookie_arr[j].split('=')[0];
        value = cookie_arr[j].split('=')[1];
        if (key == "site") return value;
    }
}

function getCurrentCurrency(cookie_arr) {
    for (var j = 0; j < cookie_arr.length; j++) {
        key = cookie_arr[j].split('=')[0];
        value = cookie_arr[j].split('=')[1];
        if (key == "c_tp") return value;
    }
}

function getCurrentRegion(cookie_arr) {
    for (var j = 0; j < cookie_arr.length; j++) {
        key = cookie_arr[j].split('=')[0];
        value = cookie_arr[j].split('=')[1];
        if (key == "region") return value;
    }
}

function getCurrentLocale(cookie_arr) {
    for (var j = 0; j < cookie_arr.length; j++) {
        key = cookie_arr[j].split('=')[0];
        value = cookie_arr[j].split('=')[1];
        if (key == "b_locale") return value;
    }
}

function getCookies() {
    var cookies = document.cookie;
    var cookies_arr = cookies.split(';');
    for (var i = 0; i < cookies_arr.length; i++) {
        var val = cookies_arr[i].trim();
        if (val.startsWith('aep_usuc_f')) {
            var aep = val.split('&');
            aep[0] = aep[0].replace("aep_usuc_f=", "");
            return aep;
        }
    }
}

function createDefaultKey() {
    var arrayArg = new Array();
    var jsonArg = new Object();
    jsonArg.currency = "USD";
    jsonArg.region = "US";
    jsonArg.locale = "en_US";
    jsonArg.site = "glo";
    jsonArg.country_currency_mode = 0;
    arrayArg.push(jsonArg);
    var jsonArray = JSON.stringify(arrayArg);
    chrome.storage.sync.set({ "alidata": jsonArray }, function() {
        console.log("Created default alidata key")
    });
}