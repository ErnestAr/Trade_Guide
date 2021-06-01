var stockCard = $('#stockcard')
var cryptoCard = $('#cryptocard')
var search = $(#"searchforminput") //need to add this as id in bootstrap input form

//This function should:
//1.  switch search class to crypto 
//2. change css for cards
//3.  call for crypto fetch if on stock
function changeToCrypto (event) {
    stockCard.removeClass( "stockcardlg")
    stockCard.addClass("stockcard")
    cryptoCard.removeClass("cryptocard")
    cryptoCard.addClass("cryptocardlg")
    search.removeClass("searchstock")
    search.addClass("searchcrypto")

    var results = $(".searchrlt").children()
    for (let i = 0; i < results.length; i++) {
        results[i].text("")
        
    }
    var recom = $(".rcmd").children()
    for (let i = 0; i < recom.length; i++) {
        recom[i].text("")
        
    }






    //Analia could you put your fetch function call for  crypto news here
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
    search.removeClass("searchcrypto")
    search.addClass("searchstock")
    
    var results = $(".searchrlt").children()
    for (let i = 0; i < results.length; i++) {
        results[i].text("")
        
    }
    var recom = $(".rcmd").children()
    for (let i = 0; i < recom.length; i++) {
        recom[i].text("")
        
    }
     //Analia could you put your fetch function call for stock news here
}






//This event listener calls to changeToCrypto function
cryptoCard.on("click", function(event) {
    changeToCrypto(event);
})

//This event listener calls to changeToStock function
stockCard.on("click", function(event) {
    changeToStock(event);
})


