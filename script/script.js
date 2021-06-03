
var stockCard = $("#stockcard");
var cryptoCard = $("#cryptocard");
var btnSearch = $(".btn");
var srchRes = $(".searchrlt");
var recommend = $(".rcmd");
var newsSec = $(".news")


//Change layout and button class to crypto
function changeToCrypto(event) {
  stockCard.removeClass("stockcardlg");
  stockCard.addClass("stockcard");
  cryptoCard.removeClass("cryptocard");
  cryptoCard.addClass("cryptocardlg");
  btnSearch.removeClass("searchstock");
  btnSearch.addClass("searchcrypto");

  srchRes.children().remove();
  recommend.children().remove();
  
  getCryptoNews();
}



//Change to stocks layout and change button class
//Change layout and button class to stock
function changeToStock(event) {
  stockCard.removeClass("stockcard");
  stockCard.addClass("stockcardlg");
  cryptoCard.removeClass("cryptocardlg");
  cryptoCard.addClass("cryptocard");
  btnSearch.removeClass("searchcrypto");
  btnSearch.addClass("searchstock");

  srchRes.children().remove();
  recommend.children().remove();

    getStockRecs();
    getStockNews();
}




//fetch stock search 
function getStockSearch(searchValue){
    srchRes.children().remove();
    fetch("https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-summary?symbol=" + searchValue  +"&region=US", {
        method: "GET",
        headers: {
           "x-rapidapi-key": "cc1be2c279msh0c79bca34154d17p122150jsn9ba23118deaf",
            "x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com"
        }
   })
   .then(response => {
        return response.json();
   })
    .then(function (data) {
    console.log(data)
    srchRes.append("<h2> " + "<strong> " +  data.symbol + "</strong> " +  "</h2>");
    srchRes.append("<p> " + data.quoteType.longName + "</p>");
    var marketPrice = data.price.regularMarketPrice.raw * 1.21
    marketPrice = marketPrice.toFixed(2)
    srchRes.append("<p> " + "Price: $" + marketPrice + " CAD" + "</p>");
    srchRes.append("<p> " + data.summaryProfile.longBusinessSummary + "</p>");
    srchRes.append("<a href=" + data.summaryProfile.website + ">" + data.summaryProfile.website + "</a>");
   })
   .catch(err => {
   console.error(err);
   });
}



//fetch recommended stocks
function getStockRecs(){
    fetch("https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-recommendations?symbol=INTC", {
	method: "GET",
	headers: {
		"x-rapidapi-key": "cc1be2c279msh0c79bca34154d17p122150jsn9ba23118deaf",
		"x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com"
	}
    })
    .then(response => {
        return response.json();
    })
    .then(function (data) {
    recommend.append("<h2> Top 5 Recommended Stocks <h2/>")
    for (i=0;i<7;i++){
        recommend.append("<p>" + data.finance.result[0].quotes[i].symbol + " " + "- " + data.finance.result[0].quotes[i].shortName + "<br>" + "$" + (data.finance.result[0].quotes[i].regularMarketPrice * 1.21).toFixed(2) + "</p>")
    }
    
    })
    .catch(err => {
	console.error(err);
    });
}



//fetch stock news
function getStockNews(){
    newsSec.children().remove();
    fetch(
    "https://gnews.io/api/v4/search?q=stocks&token=45a93e37179e59245a6328124c1b7c89"
    )
    .then((response) => {
      return response.json();
    })
    .then(function (data) {
        console.log(data)
    newsSec.append("<h2>Trending News</h2>");
    for (let i = 0; i < 3; i++) {
        newsSec.append("<h4> " + data.articles[i].title + "</h4>");
        newsSec.append("<p> " + data.articles[i].content + "</p>");
      }
    })
    .catch((err) => {
     console.error(err);
    });

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
      var coinInfo = data.coins;

      for (let i = 0; i < coinInfo.length; i++) {
        coinInfo[i].item.name;
        coinInfo[i].item.small;
        recommend.append("<img src='" + coinInfo[i].item.small + "'>");
        recommend.append("<p> " + coinInfo[i].item.name + "</p>");
      newsSec.append("<h3>Trending News</h3>");
      }
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

      srchRes.append("<p> " + "Homepage: " + data.links.homepage + "</p>");

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

 if (searchTopic === "searchstock") {
        var searchValue = btnSearch.parent().children().eq(0).val().toLowerCase();
        getStockSearch(searchValue);
  }
});
