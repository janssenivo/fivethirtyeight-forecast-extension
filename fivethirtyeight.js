// reaches out to projects.fivethirtyeight.com for latest model stats

const getForecast = function (cb) {

  chrome.storage.local.get("model", function (result) {
    let model = result.model;
    console.log("getting data for " + model);

    // house forecast
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "https://projects.fivethirtyeight.com/2022-election-forecast/senate_us_latest.json", true);
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4) {
        let resp = JSON.parse(xhr.responseText);
        let party = "Democrats"
        console.log(resp);
        // 2022 format parsing
        let flavor = resp.find((flavor)=>{return flavor.type==model});
        console.log(flavor);
        let dems = flavor.candidates.find((candidate)=>{return candidate.candidate==party});
        console.log(dems);
        let winprob = dems.winprob;
        let rv = {
          model: model,
          date: dems.date,
          party: party,
          winprob: parseFloat(dems.winprob).toFixed(1),
          badgeprob: Math.round(dems.winprob)+"%"
        }
        console.log(rv);
        return cb(rv);
      }
    }
    xhr.send();
  });

}
