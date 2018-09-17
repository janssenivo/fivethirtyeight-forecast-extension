// reaches out to projects.fivethirtyeight.com for latest model stats

const getForecast = function (cb) {

  chrome.storage.local.get("model", function (result) {
    let model = result.model;
    console.log("getting data for " + model);

    // house forecast
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "https://projects.fivethirtyeight.com/2018-midterm-election-forecast/house/home.json", true);
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4) {
        let resp = JSON.parse(xhr.responseText);
        let stats = resp.nationalTrends;
        let rv = {
          model: model,
          date: stats[0].date,
          party1: stats[0].candidate,
          party2: stats[1].candidate,
          winprob1: parseFloat((stats[0].models[model].winprob)).toFixed(1),
          winprob2: parseFloat((stats[1].models[model].winprob)).toFixed(1),
          badgeprob: ""+Math.round(stats[0].models[model].winprob)
        }
        console.log(rv);
        return cb(rv);
      }
    }
    xhr.send();
  });

}
