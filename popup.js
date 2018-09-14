let model = "";
chrome.storage.local.get("model", function(result) {
    model = result.model;
    console.log("getting data for "+model);

    var xhr = new XMLHttpRequest();
    xhr.open("GET", "https://projects.fivethirtyeight.com/2018-midterm-election-forecast/house/home.json", true);
    xhr.onreadystatechange = function() {
    if (xhr.readyState == 4) {
        var resp = JSON.parse(xhr.responseText);
        let date = resp.nationalTrends[0].date;
        let party1 = resp.nationalTrends[0].candidate;
        let party2 = resp.nationalTrends[1].candidate;
        let winprob1 = resp.nationalTrends[0].models[model].winprob;
        let winprob2 = resp.nationalTrends[1].models[model].winprob;
        let textBox = document.getElementById('stats');

        let out = "In the "+model+" model, "+party1+" have a chance of "+Math.round(winprob1)+"% to take back the House";
        textBox.textContent = out;
    }
    }
    xhr.send();
});