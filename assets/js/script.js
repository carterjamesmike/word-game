var url = "https://hp-api.herokuapp.com/api/characters";
var wordsEl = document.getElementById('words');

queryData();
nameArr = [];
singleArr = [];


function queryData () {
    fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            for (var i = 0; i <data.length; i++) {
                nameArr.push(data[i].name);
            }
        renderArray();
        })
};

function renderArray () {
    const randomWords = [];
    for (let i = 0; i < 5; i++) {
        randomWords.push(nameArr[Math.floor((Math.random() * nameArr.length))]);
        let li = document.createElement('li')
        li.innerHTML = randomWords[i];
        wordsEl.appendChild(li);
    }
    split(randomWords);
}

function split (randomWords) {
    for (let i = 0; i < randomWords.length; i++) {
        singleArr.push(randomWords[i].split(""));
        let li = document.createElement('li');
        li.innerHTML = singleArr[i];
        wordsEl.appendChild(li);
    }
}

console.log(singleArr);





