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
            button.style.backgroundColor = "#ff0000";
        }
        button.addEventListener('click', function() {
            button.style.backgroundColor = "#ffff00";            
            chrome.storage.local.set({model: item}, function() {
                console.log('forecast is ' + item);
            });
        });
        page.appendChild(button);
    }
    }
    constructOptions(kButtonModels);
});