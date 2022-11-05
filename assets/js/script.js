var url = "https://hp-api.herokuapp.com/api/characters";
var wordsEl = document.getElementById('words');
var lettersEl = document.getElementById('letters')

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
    for (let i = 0; i < 5; i++) {
        randomWords.push(nameArr[Math.floor((Math.random() * nameArr.length))]);
        let li = document.createElement('li')
        li.innerHTML = randomWords[i];
        wordsEl.appendChild(li);
    }

    singleArr = randomWords.join('').replace(/\s+/g, '');
    splitArr = singleArr.split('');
    console.log(splitArr); 
    renderLetters(splitArr)
}

function renderLetters (splitArr) {
    const capitalArr = splitArr.map(letters => {
        return letters.toUpperCase();
      });

    for (let i = 0; i < splitArr.length; i++) {
        let div = document.createElement('div');
        let h3 = document.createElement('h3');
        lettersEl.append(div);
        h3.innerHTML = capitalArr[i];
        div.append(h3);
    }


}

