var queryURL = "";
var stockCard = $("#stockcard");
var cryptoCard = $("#cryptocard");
var btnSearch = $(".btn");
var srchRes = $(".searchrlt");
var recommend = $(".rcmd");
var newsSec = $(".news")

//change layout to crypto
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


//Change layout and button class to stock
function changeToStock(event) {
  stockCard.removeClass("stockcard");
  stockCard.addClass("stockcardlg");
  cryptoCard.removeClass("cryptocardlg");
  cryptoCard.addClass("cryptocard");
  btnSearch.removeClass("searchcrypto");
  btnSearch.addClass("searchstock");

  recommend.children().remove();

  getStockNews();
}

//Get news feed  and recomendations for crypto
function getCryptoNews() {
  //Fetch Top 7 crypto section
  fetch(
    "https://cors-anywhere.herokuapp.com/https://api.coingecko.com/api/v3/search/trending"
  )
    .then((response) => {
      return response.json();
    })
    .then(function (data) {
      var coinInfo = data.coins;
      recommend.append("<h3>Top 7 Cryptocurrencies</h3>");
      for (let i = 0; i < coinInfo.length; i++) {
        recommend.append("<img src='" + coinInfo[i].item.small + "'>");
        recommend.append("<p> " + coinInfo[i].item.name + "</p>");
      }
    })
    .catch((err) => {
      console.error(err);
    });
  //fetch news section
  newsSec.children().remove();
  fetch(
    "https://cors-anywhere.herokuapp.com/https://gnews.io/api/v4/search?q=cryptocurrency&token=08ddb227701538687b737079c4e03f8e"
  )
    .then((response) => {
      return response.json();
    })
    .then(function (data) {
      newsSec.append("<h3>Trending News</h3>");
      for (let i = 0; i < 5; i++) {
        newsSec.append("<h6> " + data.articles[i].title + "</h6>");
        newsSec.append("<p> " + data.articles[i].content + "</p>");
      }
    })
    .catch((err) => {
      console.error(err);
    });
}

//Get search results for crypto
function getCryptoSearch(searchValue) {
  srchRes.children().remove();
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
      srchRes.append(
        "<p> <a href='" + data.links.homepage + "'>Bitcoin Home Page</a></p>"
      );
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
//This event listener calls for search results depending on button class
btnSearch.on("click", function (event) {
  event.preventDefault();
  var searchTopic = btnSearch.attr("id");
  if (searchTopic === "searchcrypto") {
    var searchValue = btnSearch.parent().children().eq(0).val().toLowerCase();
    getCryptoSearch(searchValue);
  }
});
