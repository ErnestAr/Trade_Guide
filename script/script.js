var queryURL = "";
var stockCard = $("#stockcard");
var cryptoCard = $("#cryptocard");
var btnSearch = $(".btn");
var srchRes = $(".searchrlt");
var recommend = $(".rcmd");

//This function should:
//1.  switch search class to crypto
//2. change css for cards
//3.  call for crypto fetch if on stock
function changeToCrypto(event) {
  stockCard.removeClass("stockcardlg");
  stockCard.addClass("stockcard");
  cryptoCard.removeClass("cryptocard");
  cryptoCard.addClass("cryptocardlg");
  btnSearch.removeClass("searchstock");
  btnSearch.addClass("searchcrypto");

  var results = $(".searchrlt").children();

  $(".rcmd").children().remove();
  getCryptoNews();
}

//This function should:
//1.  switch search class to stock
//2. change css for cards
//3.  call for stock fetch if on crypto
function changeToStock(event) {
  stockCard.removeClass("stockcard");
  stockCard.addClass("stockcardlg");
  cryptoCard.removeClass("cryptocardlg");
  cryptoCard.addClass("cryptocard");
  btnSearch.removeClass("searchcrypto");
  btnSearch.addClass("searchstock");

  var results = $(".searchrlt").children();
  for (let i = 0; i < results.length; i++) {
    results[i].text("");
  }
  var recom = $(".rcmd").children().remove();
}

//Get news feed for crypto
function getCryptoNews() {
  fetch(
    "https://cors-anywhere.herokuapp.com/https://api.coingecko.com/api/v3/search/trending"
  )
    .then((response) => {
      return response.json();
    })
    .then(function (data) {
      var coinInfo = data.coins;
      for (let i = 0; i < coinInfo.length; i++) {
        coinInfo[i].item.name;
        coinInfo[i].item.small;
        recommend.append("<img src='" + coinInfo[i].item.small + "'>");
        recommend.append("<p> " + coinInfo[i].item.name + "</p>");
      }
    })
    .catch((err) => {
      console.error(err);
    });
}

//Get search results for crypto
function getCryptoSearch(searchValue) {
  srchRes.children().eq(3).children().eq(0).remove();
  fetch(
    "https://coingecko.p.rapidapi.com/coins/" +
      searchValue +
      "?localization=true&tickers=true&market_data=true&community_data=true&developer_data=true&sparkline=false",
    {
      method: "GET",
      headers: {
        "x-rapidapi-key": "8b17728432mshba3ee6ce5f02d4ep1b54b8jsne29ee33b766f",
        "x-rapidapi-host": "coingecko.p.rapidapi.com",
      },
    }
  )
    .then((response) => {
      return response.json();
    })
    .then(function (data) {
      srchRes.append("<img src='" + data.image.small + "'>");
      srchRes.append("<p> " + data.name + "</p>");
      srchRes.append(
        "<p> " + "Price: CAD $" + data.market_data.current_price.cad + "</p>"
      );
      srchRes.append("<p>" + data.description.en + "</p>");
      srchRes.append("<p> " + "Homepage: " + data.links.homepage + "</p>");
      srchRes.append("<p> " + "Genesis Date: " + data.genesis_date + "</p>");
    })
    .catch((err) => {
      console.error(err);
    });
}

//This event listener calls to changeToCrypto function
cryptoCard.on("click", function (event) {
  changeToCrypto(event);
});

//This event listener calls to changeToStock function
stockCard.on("click", function (event) {
  changeToStock(event);
});

btnSearch.on("click", function (event) {
  event.preventDefault();
  var searchTopic = btnSearch.attr("id");
  if (searchTopic === "searchcrypto") {
    var searchValue = btnSearch.parent().children().eq(0).val().toLowerCase();
    getCryptoSearch(searchValue);
  }
});
