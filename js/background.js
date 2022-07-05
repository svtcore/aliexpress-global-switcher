function link_replace(url) {
  let result = url.replace("aliexpress.ru", "aliexpress.com");
  return result;
}

function delay(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}

chrome.storage.sync.get("alidata", function (obj) {
  if (typeof obj.alidata == 'undefined') {
    createDefaultKey();
  }
});

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (tab.url.includes("aliexpress")) {
    //load settings from storage
    chrome.storage.sync.get("alidata", function (obj) {
      if (typeof obj.alidata != 'undefined') {
        var alidata = JSON.parse(obj.alidata);
        data = alidata[0];
        if (changeInfo.status == "loading") {
          if (data.global_mode) {
            if (tab.url.includes("aliexpress.ru")) {
              console.log(data.currency + " " + data.region);
              //switch setting up ru version to glo
              fetch("https://login.aliexpress.com/setCommonCookie.htm?fromApp=false&currency=USD&region=US&bLocale=en_US&site=glo&province=&city=", {
                credentials: 'include'
              }).then(response => console.log(response));
              delay(500).then(fetch("https://login.aliexpress.ru/setCommonCookie.htm?fromApp=false&currency=USD&region=US&bLocale=en_US&site=glo&province=&city=", {
                credentials: 'include'
              }))
              delay(500).then(chrome.tabs.update(tab.id, { url: link_replace(tab.url) }));
            }
          }
        }
        else if (changeInfo.status = "complete") {
          if (tab.url.includes("aliexpress.com")) {
            if (data.country_currency == 0 || data.country_currency_mode) {
              chrome.cookies.remove({ url: "https://www.aliexpress.com", name: "aep_usuc_f" });
              chrome.cookies.remove({ url: "https://wp.aliexpress.com", name: "aep_usuc_f" });
              fetch("https://login.aliexpress.ru/setCommonCookie.htm?fromApp=false&currency=" + data.currency + "&region=" + (data.region).toUpperCase() + "&bLocale=en_US&site=glo&province=&city=", {
                credentials: 'include'
              }).then(response => console.log(response));
              fetch("https://login.aliexpress.com/setCommonCookie.htm?fromApp=false&currency=" + data.currency + "&region=" + (data.region).toUpperCase() + "&bLocale=en_US&site=glo&province=&city=", {
                credentials: 'include'
              }).then(function () {
                if (data.country_currency == 0) {
                  var arrayArg = new Array();
                  data.country_currency = 1;
                  arrayArg.push(data);
                  var jsonArray = JSON.stringify(arrayArg);
                  chrome.storage.sync.set({ "alidata": jsonArray }, function () {
                    console.log("Created default alidata key")
                  });
                  chrome.tabs.update(tab.id, { url: tab.url });
                }
              });
            }
          }
        }
      }
    });
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
    jsonArg.country_currency = 0;
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