"use strict";

const body = document.querySelector("body");


/*
* adding padding to body (header height)
*/
function resizeContent(){
    const header = document.querySelector("header")
    let header_height = header.offsetHeight;

    body.style.paddingTop = header_height + "px";

}
resizeContent();

window.onresize = resizeContent;

//vars
const proxyUrl = "https://cors-anywhere.herokuapp.com/"
const apiKey = "a606571defc0487ebf2c75c117349706";
const postContainer = document.querySelector("#posts .container .row");
const loadmoreButton = document.querySelector("#loadmore");
const totalResultsContainer = document.querySelector("#totalResults");
const numberOfPages = document.querySelector("#item-pages");

const siteSearch = document.querySelector("#site-search");

//filter
const countryFilter = document.querySelector("#country-filter");

let type;

let resource = "top-headlines";
//let resource = "everything";

//get - set query filter helper function
var queryStringObject = {
    country: "de",
    pageSize: 12,
    page: 1,
    //q: "tesla",
};

var queryString = JSON.stringify(queryStringObject);
queryString = "&" +queryString.replaceAll(':', '=').replaceAll(',', '&').replaceAll('"', '').slice(1, -1);


/*
* eventListener for country filter
*/
countryFilter.addEventListener("change", () => {

    type = "country";

    resource = "top-headlines";

    queryStringObject["country"] = countryFilter.value;
    queryStringObject["pageSize"] = 12;

    var queryString = JSON.stringify(queryStringObject);
    queryString = queryString.replaceAll(':', '=').replaceAll(',', '&').replaceAll('"', '').slice(1, -1);

    fetchPosts(type, resource, queryString);
});


/*
* eventListener for siteSearch
*/
siteSearch.addEventListener("submit", (e) => {

    e.preventDefault();

    type = "search";

    resource = "everything";

    delete queryStringObject.country;

    queryStringObject["q"] = document.querySelector("#seachInput").value;

    var queryString = JSON.stringify(queryStringObject);
    queryString = queryString.replaceAll(':', '=').replaceAll(',', '&').replaceAll('"', '').slice(1, -1);

    fetchPosts(type, resource, queryString);
});


/*
* loading animation
*/

let loader = (status) =>{

    if(status == true){

        body.classList.add("loading");
      
        let loadingContainer = document.createElement('div');
        loadingContainer.className = 'loadingContainer';

        body.appendChild(loadingContainer);

        let loader = `<div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>`;
        
        loadingContainer.innerHTML = loader;

    }

    if(status == false){

        body.classList.remove("loading");
       
        let loadingContainer = document.querySelector(".loadingContainer");
        loadingContainer.parentNode.removeChild(loadingContainer);

    }

}


/*
* fetch posts
*/

let html = '';

let fetchPosts =  async (type, resource, queryString) => {

    loader(true);
  
    console.log(queryString)
  
    let url = `http://cors-anywhere.herokuapp.com/http://newsapi.org/v2/${resource}?${queryString}&apiKey=${apiKey}`;
    console.log(url)
    const request = new Request(url);
    
    fetch(request)
      .then(response => response.json())
      .then((news) => {

        loader(false);

        totalResultsContainer.innerHTML = `items: ${news.totalResults}`;

        console.log(news)

        let posts = news.articles;

        console.log(posts)

        if(type == "country" || "loadmore"){
            html = '';
       }

        posts.forEach(element => {

            html += `<div class="item col-md-3 mb-4">`;
            html += `<div class="image">`;
            html += `<img src="${element.urlToImage}" />`;
            html += `</div>`;
            html += `<div clas="title">${element.title}</div>`;
            html += `<div class="text-center py-4 align-items-end d-flex flex-wrap">`;
            html += `<div class="date mb-4">${element.publishedAt}</div>`;
            html += `<a href="${element.url}" target="_blank" rel="nofollow" class="btn btn-secondary">read more</a>`;
            html += `</div>`;
            html += `</div>`;

            
        });

        postContainer.innerHTML = html;

      })
      .catch(error => {
        console.log(error);
      });

}

fetchPosts(type, resource, queryString);


/*
* eventListener for loadmoreButton
*/

loadmoreButton.addEventListener("click", (e) => {

    e.preventDefault();

    type = "loadmore";

        queryStringObject["pageSize"] = queryStringObject["pageSize"] + 12;

        var queryString = JSON.stringify(queryStringObject);
        queryString = "&" +queryString.replaceAll(':', '=').replaceAll(',', '&').replaceAll('"', '').slice(1, -1);

        fetchPosts(type, resource, queryString);
  
});
