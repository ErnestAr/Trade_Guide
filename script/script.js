var queryURL = ""
var stockCard = $('#stockcard')
var cryptoCard = $('#cryptocard')
var btnSearch = $(".btn")
var srchRes = $(".searchrlt")




//This function should:
//1.  switch search class to crypto 
//2. change css for cards
//3.  call for crypto fetch if on stock
function changeToCrypto (event) {
    stockCard.removeClass( "stockcardlg")
    stockCard.addClass("stockcard")
    cryptoCard.removeClass("cryptocard")
    cryptoCard.addClass("cryptocardlg")
    btnSearch.removeClass("searchstock")
    btnSearch.addClass("searchcrypto")

    var results = $(".searchrlt").children()
    for (let i = 0; i < results.length; i++) {
        results[i].text("")
        
    }
    var recom = $(".rcmd").children()
    for (let i = 0; i < recom.length; i++) {
        recom[i].text("")
        
    }
    getCryptoNews();
}



//This function should:
//1.  switch search class to stock 
//2. change css for cards
//3.  call for stock fetch if on crypto
function changeToStock (event) {
    stockCard.removeClass( "stockcard")
    stockCard.addClass("stockcardlg")
    cryptoCard.removeClass("cryptocardlg")
    cryptoCard.addClass("cryptocard")
    btnSearch.removeClass("searchcrypto")
    btnSearch.addClass("searchstock")
    
    var results = $(".searchrlt").children()
    for (let i = 0; i < results.length; i++) {
        results[i].text("")
        
    }
    var recom = $(".rcmd").children()
    for (let i = 0; i < recom.length; i++) {
        recom[i].text("")
        
    }

}


//Get news feed for crypto
 function getCryptoNews() {

 }


//Get search results for crypto
function getCryptoSearch (searchValue) {
    fetch("https://coingecko.p.rapidapi.com/coins/" + searchValue + "?localization=true&tickers=true&market_data=true&community_data=true&developer_data=true&sparkline=false", {
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "8b17728432mshba3ee6ce5f02d4ep1b54b8jsne29ee33b766f",
            "x-rapidapi-host": "coingecko.p.rapidapi.com"
        }
    })
    .then(response => {
        return response.json()
    })
    .then(function (data) {
        console.log(data);
            //get name
            srchRes.children().eq(0).text(data.name)
           //get price
            srchRes.children().eq(1).attr("src", data.image.small)
            //get info
            srchRes.children().eq(2).text( "Price: CAD $" + data.market_data.current_price.cad)
            srchRes.children().eq(3).text(data.description.en)
            srchRes.children().eq(4).text("Twitter audience: " + data.community_data.twitter_followers)
            srchRes.children().eq(5).text("Genesis Date: " + data.genesis_date)



      })
    .catch(err => {
        console.error(err);
    });
    

    
    //get name

    //get price

    //get info
}




//This event listener calls to changeToCrypto function
cryptoCard.on("click", function(event) {
    changeToCrypto(event);
})

//This event listener calls to changeToStock function
stockCard.on("click", function(event) {
    changeToStock(event);
})

btnSearch.on("click", function (event) {
    event.preventDefault();
    var searchTopic = btnSearch.attr("id");
    if(searchTopic==="searchcrypto") {
    var searchValue = btnSearch.parent().children().eq(0).val();
    getCryptoSearch(searchValue)
    }   
  });


