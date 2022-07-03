function link_replace(url) {
  let result = url.replace("aliexpress.ru", "aliexpress.com");
  return result;
}

chrome.storage.sync.get("alidata", function (obj) {
  if (typeof obj.alidata == 'undefined') {
    createDefaultKey();
  }
});

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (tab.url.includes("aliexpress")) {
    //load settings from storage
    if (changeInfo.status == "loading") {
      chrome.storage.sync.get("alidata", function (obj) {
        if (typeof obj.alidata != 'undefined') {
          var alidata = JSON.parse(obj.alidata);
          data = alidata[0];
          if (data.global_mode) {
            if (tab.url.includes("aliexpress.ru")) {
              //switch setting up ru version to glo
              /*fetch("https://login.aliexpress.ru/setCommonCookie.htm?fromApp=false&currency=USD&region=US&bLocale=en_US&site=glo&province=&city=", {
                credentials: 'include'
              });
              fetch("https://login.aliexpress.com/setCommonCookie.htm?fromApp=false&currency=USD&region=US&bLocale=en_US&site=glo&province=&city=", {
                credentials: 'include'
              });*/
              fetch("https://login.aliexpress.ru/setCommonCookie.htm?fromApp=false&currency=" + data.currency + "&region=" + data.region + "&bLocale=en_US&site=glo&province=&city=", {
                credentials: 'include'
              });
              fetch("https://login.aliexpress.com/setCommonCookie.htm?fromApp=false&currency=" + data.currency + "&region=" + data.region + "&bLocale=en_US&site=glo&province=&city=", {
                credentials: 'include'
              });
              chrome.tabs.update(tab.id, { url: link_replace(tab.url) });
            }
          }
        }
      });
    }
  }
});

function createDefaultKey() {
  try {
    var arrayArg = new Array();
    var jsonArg = new Object();
    jsonArg.currency = "USD";
    jsonArg.region = "US";
    jsonArg.b_locale = "en_US";
    jsonArg.site = "glo";
    jsonArg.global_mode = 1;
    jsonArg.country_currency_mode = 0;
    jsonArg.shipment_method_mode = 0;
    jsonArg.shipment_method_id = 0;
    arrayArg.push(jsonArg);
    var jsonArray = JSON.stringify(arrayArg);
    chrome.storage.sync.set({ "alidata": jsonArray }, function () {
      console.log("Created default alidata key")
    });
  } catch (e) {
    console.log(e);
  }
}