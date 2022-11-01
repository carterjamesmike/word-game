var url = "https://hp-api.herokuapp.com/api/characters"


queryData();
nameArr = [];

function queryData () {

    fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            for (var i = 0; i <data.length; i++)
            nameArr.push(data[i].name);
        })
};
console.log(nameArr);