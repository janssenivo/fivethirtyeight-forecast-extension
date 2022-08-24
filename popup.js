// fires when the extension icon is clicked
// will display the forecast text and update the icon

window.addEventListener('click',function(e){
  if(e.target.href!==undefined){
    chrome.tabs.create({url:e.target.href})
  }
})

getForecast(function(stats) {
  let textBox = document.getElementById('stats');
  let out = "<i>Nate says:</i> in the <b>"+stats.model+"</b> model, "+stats.party+" have a chance of <b>"+stats.winprob+"%</b> to keep the Senate";
  textBox.innerHTML = out;
  chrome.browserAction.setBadgeText({text: stats.badgeprob});
});