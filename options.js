let page = document.getElementById('buttonDiv');
let curModel = "";
chrome.storage.local.get("model", function(result) {
  curModel = result.model;
  console.log(curModel);
  const kButtonModels = ['lite', 'classic', 'deluxe'];
  function constructOptions(kButtonModels) {
    for (let item of kButtonModels) {
      let button = document.createElement('button');
      button.textContent = item;
      if (curModel === item) {
        button.style.border="5px solid #f99500";
      }
      button.addEventListener('click', function() {
        button.style.backgroundColor = "#f99500";
        chrome.storage.local.set({model: item}, function() {
          console.log('forecast is ' + item);
          getForecast(function(stats) {
            chrome.browserAction.setBadgeText({text: stats.badgeprob});
            window.close();
          });
        });
      });
      page.appendChild(button);
    }
  }
  constructOptions(kButtonModels);
});
