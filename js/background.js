function link_replace(url) {
  try {
    let result = url.replace("aliexpress.ru", "aliexpress.com");
    return result;
  }
  catch {
    console.log("Error while replacing link, redirect to main");
    link = "https://aliexpress.com"
    return link;
  }
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
      //checking if key exist
      if (typeof obj.alidata != 'undefined') {
        try {
          //parse data
          var alidata = JSON.parse(obj.alidata);
          data = alidata[0];
          if (changeInfo.status == "loading") {
            if (data.global_mode) {
              if (tab.url.includes("aliexpress.ru")) {
                try {
                  //switch setting up ru version to glo
                  fetch("https://login.aliexpress.com/setCommonCookie.htm?fromApp=false&currency=USD&region=US&bLocale=en_US&site=glo&province=&city=", {
                    credentials: 'include'
                  });
                  delay(500).then(fetch("https://login.aliexpress.ru/setCommonCookie.htm?fromApp=false&currency=USD&region=US&bLocale=en_US&site=glo&province=&city=", {
                    credentials: 'include'
                  }))
                  //replace current ru link to glo version
                  delay(500).then(chrome.tabs.update(tab.id, { url: link_replace(tab.url) }));
                }
                catch {
                  console.log("Error while set cookies on the ru version")
                }
              }
            }
          }
          else if (changeInfo.status = "complete") {
            if (tab.url.includes("aliexpress.com")) {
              //Processing on the first run or when country or currency were change
              if (data.country_currency == 0 || data.country_currency_mode) {
                //after loading page delete cookies whose include data of region and currency
                try {
                  chrome.cookies.remove({ url: "https://www.aliexpress.com", name: "aep_usuc_f" });
                  chrome.cookies.remove({ url: "https://wp.aliexpress.com", name: "aep_usuc_f" });
                  fetch("https://login.aliexpress.ru/setCommonCookie.htm?fromApp=false&currency=" + data.currency + "&region=" + (data.region).toUpperCase() + "&bLocale=en_US&site=glo&province=&city=", {
                    credentials: 'include'
                  });
                  fetch("https://login.aliexpress.com/setCommonCookie.htm?fromApp=false&currency=" + data.currency + "&region=" + (data.region).toUpperCase() + "&bLocale=en_US&site=glo&province=&city=", {
                    credentials: 'include'
                  }).then(function () {
                    try {
                      //check if data is configured if no, save new key data
                      if (data.country_currency == 0) {
                        var key_data_array = new Array();
                        data.country_currency = 1;
                        key_data_array.push(data);
                        var jsonArray = JSON.stringify(key_data_array);
                        chrome.storage.sync.set({ "alidata": jsonArray }, function () {
                          console.log("Configuaration saved")
                        });
                        chrome.tabs.update(tab.id, { url: tab.url });
                      }

                    }
                    catch {
                      console.log("Error while saving config data")
                    }
                  });
                }
                catch {
                  console.log("Error while set cookies on the glo version")
                }
              }
            }
          }
        }
        catch {
          console.log("Error while processing key data")
        }
      } else {
        console.log("Key [alidata] not found in storage")
      }
    });
  }
});

function createDefaultKey() {
  try {
    var arr_data = new Array();
    var json_data = new Object();
    json_data.currency = "USD";
    json_data.region = "US";
    json_data.b_locale = "en_US";
    json_data.site = "glo";
    json_data.global_mode = 1;
    json_data.country_currency_mode = 0;
    json_data.country_currency = 0;
    json_data.shipment_method_mode = 0;
    json_data.shipment_method_id = 0;
    arr_data.push(json_data);
    var jsonArray = JSON.stringify(arr_data);
    chrome.storage.sync.set({ "alidata": jsonArray }, function () {
      console.log("Key [alidata] has been created in storage")
    });
  } catch (e) {
    console.log(e);
  }
}