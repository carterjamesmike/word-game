var url = "https://hp-api.herokuapp.com/api/characters";
var wordsEl = document.getElementById('words');
var lettersEl = document.getElementById('letters');
const input = document.querySelectorAll('input');

queryData();
var nameArr = [];
var singleArr = [];


function queryData () {
    fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            for (var i = 0; i <data.length; i++) {
                nameArr.push(data[i].name);
            }
        buildArrays();
        })
};

function buildArrays () {
    const randomWords = [];
    for (let i = 0; i < 2; i++) {
        randomWords.push(nameArr[Math.floor((Math.random() * nameArr.length))]);
        let li = document.createElement('li')
        li.innerHTML = randomWords[i];
        wordsEl.appendChild(li);
    }

    singleArr = randomWords.join('').replace(/\s+/g, '');
    splitArr = singleArr.split('');
    //console.log(splitArr); 
    const capitalArr = splitArr.map(letters => {
        return letters.toUpperCase();
      });
    shuffle(capitalArr);
}

function renderLetters (splitArr) {
    const capitalArr = splitArr.map(letters => {
        return letters.toUpperCase();
      });

    for (let i = 0; i < splitArr.length; i++) {
        //let div = document.createElement('div');
        let h3 = document.createElement('h3');
        lettersEl.append(h3);
        h3.innerHTML = capitalArr[i];
        //div.append(h3);
    }
}

function shuffle (capitalArr) {
    var shuffleArr = [];
    let counter = capitalArr.length;
    console.log(capitalArr)
    while (counter > 0) {
        let shuffleLetter = (Math.floor(Math.random()* counter))
        counter--;
        shuffleArr.push(capitalArr[shuffleLetter]);
        capitalArr.splice(shuffleLetter, 1);
    }
    renderLetters(shuffleArr);
}
 

for (let i =0; i < input.length; i++) {
    input[i].addEventListener("input", function(e) {
        console.log(e.data);
      });
}

