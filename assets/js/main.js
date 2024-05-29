// link : "https://newsapi.org/v2/top-headlines?country=us&category=sports&apiKey=596d0d9e5e854419b619c58505778880"
// html elements 
var newsContainer = document.querySelector('.news-container');
var navLinkes = document.querySelectorAll('nav ul li a ');
var asideLinks = document.querySelectorAll("aside ul li a ");
// app var 
var palceholderImage =
    "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/681px-Placeholder_view_vector.svg.png";


var currentCategoryCode = "business";
var currentCountryCode = "eg";


// functions 
async function getNews(countryCode, category) {
    var response = await fetch(`https://newsapi.org/v2/top-headlines?country=${countryCode}&category=${category}&apiKey=596d0d9e5e854419b619c58505778880`)
    var data = await response.json();
    console.log(data);
    displayArticles(data.articles);
}
getNews("eg", "business");

function displayArticles(arr) {
    newsContainer.innerHTML = ""
    for (var i = 0; i < arr.length; i++) {
        newsContainer.innerHTML += `   
            <article class="col-md-4 ">
            <div class="inner h-100 shadow">
              <img src="${arr[i].urlToImage || palceholderImage}" class='w-100' alt=" Photo" />
              <div class="article-body p-3">
                <h2 class="h5"> ${arr[i].title}</h2>
                <p> ${arr[i].description}</p>
                <a class="btn btn-primary" href='${arr[i].url}'>Read More</a>
              </div>
            </div>
          </article>
          `;

    }

}

// events 
for (var i = 0; i < navLinkes.length; i++) {
    navLinkes[i].addEventListener("click", function (e) {
        var activeLink = document.querySelector('nav ul li  .active');
        activeLink.classList.remove('active');
        e.target.classList.add('active');
        currentCountryCode = e.target.getAttribute("data-country");
        getNews(currentCountryCode, currentCategoryCode);
    })
}

for (var i = 0; i < asideLinks.length; i++) {
    asideLinks[i].addEventListener("click", function (e) {
        var activeLink = document.querySelector('aside ul li .active');
        activeLink.classList.remove('active');
        e.target.classList.add('active');
        currentCategoryCode = e.target.getAttribute("data-category");
        getNews(currentCountryCode, currentCategoryCode);
    })
}




