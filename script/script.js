var stockCard = $("#stockcard");
var cryptoCard = $("#cryptocard");
var btnSearch = $(".btn");
var srchRes = $(".searchrlt");
var recommend = $(".rcmd");
var newsSec = $(".news");

//Change layout and button class to crypto
function changeToCrypto(event) {
  srchRes.children().remove();
  srchRes.append("<h4>Search Results...</h4>")
  srchRes.css("height", "327px");
  stockCard.removeClass("stockcardlg");
  stockCard.addClass("stockcard");
  cryptoCard.removeClass("cryptocard");
  cryptoCard.addClass("cryptocardlg");
  btnSearch.attr("id", "searchcrypto");
  recommend.children().remove();
  if (localStorage.getItem("lastcrypto")!==null) {
    $(".lastsrch").text( "Recent Input: "  + localStorage.getItem("lastcrypto"))
  } else {
    $(".lastsrch").css("display", "none")
  }
  getCryptoNews();
}

//Change to stocks layout and change button class
//Change layout and button class to stock
function changeToStock(event) {
  srchRes.children().remove();
  srchRes.append("<h4>Search Results...</h4>")
  srchRes.css("height", "327px");
  stockCard.removeClass("stockcard");
  stockCard.addClass("stockcardlg");
  cryptoCard.removeClass("cryptocardlg");
  cryptoCard.addClass("cryptocard");
  btnSearch.attr("id", "searchstock");
  recommend.children().remove();
  if (localStorage.getItem("laststock")!==null) {
    $(".lastsrch").text( "Recent Input: "  + localStorage.getItem("laststock"))
  } else {
    $(".lastsrch").css("display", "none")
  }
  getStockRecs();
  getStockNews();
}

//fetch stock search
function getStockSearch(searchValue) {

  srchRes.css("height", "fit-content");
  srchRes.children().remove();
  fetch(
    "https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-summary?symbol=" +
      searchValue +
      "&region=US",
    {
      method: "GET",
      headers: {
        "x-rapidapi-key": "8b17728432mshba3ee6ce5f02d4ep1b54b8jsne29ee33b766f",
        "x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
      },
    }
  )
    .then((response) => {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      srchRes.append(
        "<h4 style='padding:10px'> " +
          "<strong> " +
          data.symbol +
          "</strong> " +
          "</h4>"
      );
      srchRes.append("<p> " + data.quoteType.longName + "</p>");
      var marketPrice = data.price.regularMarketPrice.raw * 1.21;
      marketPrice = marketPrice.toFixed(2);
      srchRes.append("<p> " + "Price: <strong> $" + marketPrice + " CAD" + "</p></br>");
      
      srchRes.append("<div><canvas id='myChart' ></canvas> </div>")
      createChartStock(searchValue);
      srchRes.append(
        "<p> " + data.summaryProfile.longBusinessSummary + "</p></br>"
      );
      srchRes.append(
          "<p> <a style = 'font-size: 25px; margin-left: 0px;' href='" + data.summaryProfile.website + "'>Home Page</a></p>"
      )
      localStorage.setItem("laststock",  data.symbol)    
      
    })
    .catch((err) => {
      console.error(err);
      srchRes.children().remove()
      srchRes.append("<h4>Search Results...</h4><p>Unable to complete request at the momement. Please try again later.</p>")
      srchRes.height("310px");
    });
}

//fetch recommended stocks
function getStockRecs() {
  recommend.height("fit-content")
  fetch(
    "https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-recommendations?symbol=INTC",
    {
      method: "GET",
      headers: {
        "x-rapidapi-key": "8b17728432mshba3ee6ce5f02d4ep1b54b8jsne29ee33b766f",
        "x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
      },
    }
  )
    .then((response) => {
      return response.json();
    })
    .then(function (data) {
      recommend.append(
        "<h3 style= 'margin:10px; padding-top:5px'> Top 5 Recommended Stocks <h2/>"
      );
      for (i = 0; i <data.finance.result[0].quotes.length; i++) {
        recommend.append(
          "<h6 style= 'margin:10px' id='" + data.finance.result[0].quotes[i].symbol + "'>" +
            data.finance.result[0].quotes[i].symbol +
            " - " +
            data.finance.result[0].quotes[i].shortName +
            "</h6><p style= 'margin-left:10px'> $ " +
            (
              data.finance.result[0].quotes[i].regularMarketPrice * 1.21
            ).toFixed(2) +
            "</p><br>"
        );
      }
    })
    .catch((err) => {
      console.error(err);
      recommend.height("310px")
      recommend.append(
        "<p style='margin-left:10px'>Unable to complete request at the momement. Please try again later.</p>"
      );
    });
}

//fetch stock news
function getStockNews() {
  newsSec.children().remove();
  newsSec.height("fit-content")
  fetch(
    "https://gnews.io/api/v4/search?q=stocks&token=45a93e37179e59245a6328124c1b7c89"
  )
    .then((response) => {
      return response.json();
    })
    .then(function (data) {
      newsSec.append("<h3 style='margin-top: 15px'>Trending News</h3>");
      for (let i = 0; i < 3; i++) {
        newsSec.append(
          "<div class='article'><h5> " +
            data.articles[i].title +
            "</h5> <p>" 
            + data.articles[i].description  + " " +"<a href=" + data.articles[i].url + ">" + "Read more." + "</a>" + 
            "</p></br></div> "
        );
      }
    })
    .catch((err) => {
      console.error(err);
      newsSec.height("310px")
      newsSec.append("<p>Unable to complete request at the momement. Please try again later.</p>")
    });
}

//Get news feed  and recomendations for crypto
function getCryptoNews() {
  //Fetch Top 7 crypto section
  recommend.height("fit-content")
  fetch(
    "https://api.coingecko.com/api/v3/search/trending"
  )
    .then((response) => {
      return response.json();
    })
    .then(function (data) {
      var coinInfo = data.coins;
      recommend.append(
        "<h3 style= 'margin:10px'>Top 7 Recommended Crypto</h3>"
      );
      for (let i = 0; i < coinInfo.length; i++) {
        recommend.append(
          "<div class=><img  class='inline' id ='" + coinInfo[i].item.name + "' src='" +
            coinInfo[i].item.small +
            "'><p class='inline'> " +
            coinInfo[i].item.name +
            "</p> </div>"
        );
      }
      
    })
    .catch((err) => {
      console.error(err);
      recommend.height("310px")
      recommend.append(
        "<p style='margin-left:10px'>Unable to complete request at the momement. Please try again later.</p>"
      );
      
    });

  //fetch news section
  newsSec.children().remove();
  newsSec.height("fit-content")
  fetch(
    "https://gnews.io/api/v4/search?q=cryptocurrency&token=08ddb227701538687b737079c4e03f8e"
  )
    .then((response) => {
      return response.json();
    })
    .then(function (data) {
      var coinInfo = data.coins;
      newsSec.append("<h3 style='margin-top: 15px'>Trending News</h3>");
      for (let i = 0; i < 5; i++) {
        newsSec.append(
          "<div class='article'><h5> " +
            data.articles[i].title +
            "</h5> <p>" +
            data.articles[i].description  + "<a href=" + data.articles[i].url + ">" + "Read more." + "</a>" + 
            "</p></br></div> "
            
        );
      }
    })
    .catch((err) => {
      console.error(err);
      newsSec.height("310px")
      newsSec.append("<p>Unable to complete request at the momement. Please try again later.</p>")
    });
}

//Get search results for crypto
function getCryptoSearch(searchValue) {
  srchRes.css("height", "fit-content");
  srchRes.children().remove();
  fetch( "https://api.coingecko.com/api/v3/coins/" + searchValue)
    .then((response) => {
      return response.json();
    })
    .then(function (data) {
      srchRes.append("<img  src='" + data.image.small + "'>");
      srchRes.append("<h5 > " + data.name + "</h5>");
          if (data.market_data.current_price.cad.toString()[1]!==".") {
            srchRes.append(
              "<p> " +
                "Price: <strong>  $" +data.market_data.current_price.cad + ".00 CAD</p> </br>")
          } else {
            srchRes.append(
              "<p> " +
                "Price: <strong>  $" +data.market_data.current_price.cad + " CAD</p> </br>")
          }
      srchRes.append("<div><canvas id='myChart' ></canvas> </div>")

      srchRes.append("<p>" + data.description.en + "</p> </br>");

      srchRes.append(
        "<p> <a style = 'font-size: 25px; margin-left: 0px;' href='" + data.links.homepage + "'>Home Page</a></p>"
      );
      if(data.genesis_date!==null){
      srchRes.append("<p> " + "Genesis Date: " + data.genesis_date + "</p>");

      

      } else {
        srchRes.append("<p> " + "Genesis Date: N/A </p>");
      }
    createChartCrypto(searchValue)
      localStorage.setItem("lastcrypto", data.name)
    })
    .catch((err) => {
      console.error(err);
      srchRes.children().remove()
      srchRes.append("<h4>Search Results...</h4><p>Unable to complete request at the momement. Please try again later.</p>")
      srchRes.height("309px");
    });

}


function createChartCrypto(searchValue){
    fetch(
      "https://api.coingecko.com/api/v3/coins/" + searchValue + "/market_chart?vs_currency=cad&days=30&interval=daily"
    )
      .then((response) => {
        return response.json();
      })
      .then(function (data) {
        var dataPrices = data.prices
        var prices =[]
        var date = []
        for (let i = 0; i < dataPrices.length; i++) {
          prices.push(dataPrices[i][1].toFixed(2)) 
          var unix =(dataPrices[i][0])
          var dateForm =  moment(unix, "x").format("MMM-Do")
          date.push(dateForm)
        }
          var ctx = document.getElementById("myChart");
          var myChart = new Chart(ctx, {
            type: 'line',
            data: {
              labels: date,
              datasets: [
                { 
                  data: prices,
                  label: searchValue.charAt(0).toUpperCase() + searchValue.slice(1),
                  borderColor: "#9FD8CB",
                  fill: "#CACFD6"
                }
              ]
            },
            options: {
              responsive: true,
              
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  position: 'top',
                },
                title: {
                  display: true,
                  text: '1 Week (CAD)'
                }
                
              },
              tension: 0,
            },
          });
      })
      .catch((err) => {
        console.error(err);
      });
}


function createChartStock(searchValue){
      //fetch data
      fetch("https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-chart?interval=1d&symbol=" + searchValue +"&range=1mo&region=CA", {
        "method": "GET",
        "headers": {
          "x-rapidapi-key": "8b17728432mshba3ee6ce5f02d4ep1b54b8jsne29ee33b766f",
          "x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com"
        }
      })
      .then((response) => {
        return response.json();
      })
      .then(function (data) {
        var date = []
        var prices = []
        for (let i = 0; i <  data.chart.result[0].timestamp.length; i++) {
          var priceCad = data.chart.result[0].indicators.quote[0].open[i]*1.21
          var priceCut = priceCad.toFixed(2)
          prices.push(priceCut)
          var unix =data.chart.result[0].timestamp[i]*1000
          var dateForm =  moment(unix, "x").format("MMM-Do")
          date.push(dateForm)
          debugger;
        }
        //Chart create
        var ctx = document.getElementById("myChart");
        var myChart = new Chart(ctx, {
          type: 'line',
          data: {
            labels: date,
            datasets: [
              { 
                data: prices,
                label: searchValue.charAt(0).toUpperCase() + searchValue.slice(1),
                borderColor: "#9FD8CB",
                fill: "#CACFD6"
              }
            ]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: 'top',
              },
              title: {
                display: true,
                text: '1 Week (CAD)'
              }
              
            },
            tension: 0,
          },
        });
      })
      .catch(err => {
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



recommend.on("click", function (event) {
   var clickIcon = event.target.id.replace(/\s/g, '-')
   var searchTopic = btnSearch.attr("id");
   var searchValue = clickIcon.toLowerCase();
   if (searchTopic === "searchcrypto") {
    getCryptoSearch(searchValue);
  }
  if (searchTopic === "searchstock") {
    getStockSearch(searchValue);
  }
})



$(document).ready(changeToStock());


