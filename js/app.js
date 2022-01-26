/**
 * @author github.com/svtcore
 */

$(document).ready(function() {
    chrome.storage.sync.get("alidata", function(obj) {
        if (typeof obj.alidata != 'undefined') {
            var alidata = JSON.parse(obj.alidata);
            if (alidata[0].country_currency_mode) $("#country_currency_mode").prop('checked', true);
            $("#country option[value=" + alidata[0].region + "]").attr('selected', 'selected');
            $("#currency option[value=" + alidata[0].currency + "]").attr('selected', 'selected');
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
    jsonArg.country_currency_mode = 0;
    arrayArg.push(jsonArg);
    var jsonArray = JSON.stringify(arrayArg);
    chrome.storage.sync.set({ "alidata": jsonArray }, function() {
        console.log("Created default alidata key")
    });
}

function deleteKey() {
    chrome.storage.sync.remove('alidata', function() {
        console.log('Data have been deleted from storage');
    });
}

function updateKey() {
    deleteKey();
    var arrayArg = new Array();
    var jsonArg = new Object();
    jsonArg.currency = $("#currency :selected").val();
    jsonArg.region = $("#country :selected").val();
    jsonArg.locale = "en_US";
    jsonArg.site = "glo";
    if ($('#country_currency_mode').is(":checked")) jsonArg.country_currency_mode = 1;
    else jsonArg.country_currency_mode = 0;
    arrayArg.push(jsonArg);
    var jsonArray = JSON.stringify(arrayArg);
    chrome.storage.sync.set({ "alidata": jsonArray }, function() {
        console.log("Updated key")
    });
}

$('select').change(function() {
    updateKey();
});
$("#country_currency_mode").change(function() {
    updateKey();
    $("#country_currency_mode_message").text("Refresh page to apply mode")
});
$('#github').click(function() {
    chrome.tabs.create({ url: 'https://github.com/svtcore' });
    return false;
});