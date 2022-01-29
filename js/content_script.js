/**
 * @author svtcore
 * @license GPL-3.0
 * @link https://github.com/svtcore
 * 
 */


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
    $('.comet-modal-content').attr("hidden", false);
    $('.comet-modal-mask .comet-modal-wrap').css("position", "");
});

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
        var global_url = "";
        if (current_url.search("aliexpress.ru") != -1) {
            //if page aliexpress.ru
            //check if enabled redirect to global version
            if (alidata[0].global_mode) {
                //if enabled redirect to global
                chrome.storage.sync.remove('alidata_temp', function() {
                    console.log('Temp link has been deleted from storage');
                });
                global_url = (current_url.replace('aliexpress.ru', 'aliexpress.com')).split("?")[0];
                createTempLink(global_url);
                cookielink = "https://login.aliexpress.com/setCommonCookie.htm?fromApp=false&currency=" + currency + "&region=" + region + "&bLocale=" + alidata[0].locale + "&site=" + alidata[0].site + "&province=&city=";
                ajax = true;
            } else {
                //if not enabled global redirect then check if turned on country and currency mode
                if (alidata[0].country_currency_mode) {
                    if ((alidata[0].currency).toUpperCase() != currency || (alidata[0].region).toUpperCase() != region) {
                        cookielink = "https://login.aliexpress.ru/setCommonCookie.htm?fromApp=false&currency=" + alidata[0].currency + "&region=" + (alidata[0].region).toUpperCase() + "&bLocale=" + b_locale + "&site=" + site + "&province=&city=";
                        ajax = true;
                    }
                }
            }
        } else {
            //if opened global version check if turned on country and currency mode
            if (alidata[0].country_currency_mode) {
                if ((alidata[0].currency).toUpperCase() != currency || (alidata[0].region).toUpperCase() != region) {
                    cookielink = "https://login.aliexpress.com/setCommonCookie.htm?fromApp=false&currency=" + alidata[0].currency + "&region=" + (alidata[0].region).toUpperCase() + "&bLocale=" + b_locale + "&site=" + site + "&province=&city=";
                    ajax = true;
                }
            }
            //if enebled auto switch to shipment
            if (alidata[0].shipment_method_mode) {
                if (current_url.search("item") != -1) {
                    $('.comet-btn.comet-btn-text.product-dynamic-shipping-moreOptions').click();
                    $('.comet-modal-content').attr("hidden", true);
                    $(".comet-btn.comet-btn-text").click();
                    //once it set selected and then reset default, so do it again in loop
                    for (var i = 0; i < 10; i++) {
                        $(".dynamic-shipping-line.dynamic-shipping-contentLayout span").each(function() {
                            if ($(this).text() == shipment_methods["en"][alidata[0].shipment_method_id]) {
                                $(this).click();
                            }
                        });
                    };
                    $('.comet-icon.comet-icon-close').click();
                }
            }
        }
        //ajax true if need to change settings
        if (ajax) {
            $.ajax({
                type: "GET",
                url: cookielink,
                xhrFields: {
                    withCredentials: true,
                },
                success: function(msg) {
                    if (alidata[0].global_mode) {
                        console.log(msg);
                        chrome.storage.sync.get('alidata_temp', function(obj) {
                            if (typeof obj.alidata_temp != 'undefined') {
                                var data = JSON.parse(obj.alidata_temp);
                                link = String(data[data.length - 1].link);
                                window.location.href = link;
                            } else {
                                window.location.href = current_url;
                            }
                        });
                    }
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
    var x = document.cookie;
    var y = x.split(';');
    for (var i = 0; i < y.length; i++) {
        var val = y[i].trim();
        if (val.startsWith('aep_usuc_f')) {
            var aep = val.split('&');
            aep[0] = aep[0].replace("aep_usuc_f=", "");
            return aep;
        }
    }
}

function createTempLink(value) {
    var arrayArg = new Array();
    var jsonArg = new Object();
    jsonArg.link = value;
    arrayArg.push(jsonArg);
    var jsonArray = JSON.stringify(arrayArg);
    chrome.storage.sync.set({ "alidata_temp": jsonArray }, function() {
        console.log("Created key with temp link")
    });
}

function createDefaultKey() {
    var arrayArg = new Array();
    var jsonArg = new Object();
    jsonArg.currency = "USD";
    jsonArg.region = "US";
    jsonArg.locale = "en_US";
    jsonArg.site = "glo";
    jsonArg.global_mode = 0;
    jsonArg.country_currency_mode = 0;
    jsonArg.shipmet_method_mode = 0;
    jsonArg.shipment_method_id = 0;
    arrayArg.push(jsonArg);
    var jsonArray = JSON.stringify(arrayArg);
    chrome.storage.sync.set({ "alidata": jsonArray }, function() {
        console.log("Created default alidata key")
    });
}