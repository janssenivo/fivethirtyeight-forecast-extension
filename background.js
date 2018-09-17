// will run on startup
// - initializes local storage
// - periodically update the badge icon every 3 hours

// initialization
chrome.runtime.onInstalled.addListener(function() {
  chrome.browserAction.setBadgeBackgroundColor({ color: [0, 96, 180, 255] });
  chrome.browserAction.setBadgeText({text: ''});
  chrome.storage.local.get("model", function(result) {
    if (result === undefined || result.model === undefined) {
      chrome.storage.local.set({model: "classic"}, function() {
        console.log("Initializing: model is now set to classic. Nate can sleep");
      });    
    } else {
      console.log("Model currently is " + result.model);
    }
    getForecast(function(stats) {
      chrome.browserAction.setBadgeText({text: stats.badgeprob});
    });
  });
});

// set alarm to update badge icon every 3 hours
var checkInterval = 180; // minutes
chrome.alarms.create("checkServer", {
  delayInMinutes: 1,
  periodInMinutes: checkInterval
});

chrome.alarms.onAlarm.addListener(function(alarm) {
  if (alarm.name === "checkServer") {
    console.log(Date.now()+" updating badge icon periodically");
    getForecast(function(stats) {
      chrome.browserAction.setBadgeText({text: stats.badgeprob});
    });
  }
});