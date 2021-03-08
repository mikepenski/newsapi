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
const currentPageContainer = document.querySelector("#current-page");
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
* eventListener for classification
*/
countryFilter.addEventListener("change", () => {

    type = "country";

    resource = "top-headlines";

    queryStringObject["country"] = countryFilter.value;

    var queryString = JSON.stringify(queryStringObject);
    queryString = queryString.replaceAll(':', '=').replaceAll(',', '&').replaceAll('"', '').slice(1, -1);

    fetchPosts(type, resource, queryString);
});


/*
* eventListener for classification
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
* fetch posts
*/


let html = '';

let fetchPosts =  async (type, resource, queryString) => {

    console.log(queryString)
  

    let url = `http://cors-anywhere.herokuapp.com/http://newsapi.org/v2/${resource}?${queryString}&apiKey=${apiKey}`;
    console.log(url)
    const request = new Request(url);
    
    fetch(request)
      .then(response => response.json())
      .then((news) => {

        totalResultsContainer.innerHTML = `items: ${news.totalResults}`;

        console.log(news)

        let posts = news.articles;

        console.log(posts)

        if(type == "country" || "loadmore"){
            html = '';
       }

        posts.forEach(element => {

            html += `<div class="col-md-3 mb-4">`;
            html += `<img src="${element.urlToImage}" />`;
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


 var url = "https://newsapi.org/v2/top-headlines?country=us&apiKey=b94c18ab87f549949b86e0f7d9f33def";
>         var req = new Request(url);
>         fetch(req)
>             .then(function (response) {
>                 console.log(response.json());
>             });
>         $(document).ready(function () {
>             $ajax({ url: "https://newsapi.org/v2/top-headlines?country=us&apiKey=49a539dd227b4feebd4cd98ebfaa417e" }).then(function (data) {
>                 alert(JSON.stringify(data));
>                 alert(data.source);
>                 for (i = 0; i < data.articles.length; i++) {
>                     var title = data.articles[i].title;
>                     alert(title);
>                     var author = data.articles[i].author;
>                     alert(author)
>                     var urltoimage = data.articles[i].urlToImage;
>                     var url = data.articles[i].url;
>                     var publishAt = data.articles[i].publishAt;
>                     var description = data.articles[i].description;
>                     $('.title').append(data.articles[i].title);
>                     $('.author').append(data.articles[i].author);
>                     $('#list').append('<div class="my image"><a target="_blank" href="' + data.articles[i].url + '"><img src ="' + data.articles[i].urlToImage + '" style="width:250px" /></a></div> <br />');
>                     $('#list').append(data.articles[i].url + '<br />' + data.articles[i].publishAt + '</div><br />');
>                     $('#list').append(data.articles[i].description );
>                     var var_title = data.articles[i].title;
>                     var var_author = data.articles[i].author;
>                     var var_urltoimage = data.articles[i].urlToImage;
>                     var var_url = data.articles[i].url;
>                     var var_publishAt = data.articles[i].publishAt;
>                     var var_description = data.articles[i].description;
>                     var start_wrapper = '<div id="wrapper">';
>                     var prn_title = '<div class="my_title">';
>                     prn_title = prn_title + var_title;
>                     prn_title = prn_title + '</div>';
>                     var prn_author = '<div class="my_left_text">';
>                     prn_author = prn_author + var_author;
>                     prn_author = prn_author + '</div>';
>                     var prn_image = 'div class ="my_content">';
>                     prn_image = prn_image + '<a target="_blank" href="' + var_url + '"><img src="' + var_urltoimage + '" style="width:250px" /></a>';
>                     prn_image = prn_image + '</div>';
>                     var prn_content = '<div class="my_content">';
>                     prn_content = prn_content + var_description;
>                     prn_content = prn_content + '</div>';
>                     var prn_url = '<div class="my_left_text">';
>                     prn_url = prn_url + var_url;
>                     prn_url = prn_url + '</div>';
>                     var prn_date = '<div class="my_left_text">';
>                     prn_date = prn_date + var_publishedAt;
>                     prn_date = prn_date + '</div>';
>                     var end_wrapper = '</div>';
>                     $('#list').append(start_wrapper + prn_title + prn_author + prn_image + prn_content + prn_url + prn_date + end_wrapper);
>                 }
>             });
>         });
*/
