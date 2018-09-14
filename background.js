chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.local.get("model", function(result) {
    if (result === undefined || result.model === undefined) {
      chrome.storage.local.set({model: "deluxe"}, function() {
        console.log("Initializing: model is now set to deluxe. Nate can sleep");
      });    
    } else {
      console.log("Model currently is " + result.model);
    }
  });
});