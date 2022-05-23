const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");
const errorMessage = document.getElementById("errorMessage");

// Get quote from API
async function getQuotes() {
  showLoading();
  const proxyUrl = "https://cors-anywhere.herokuapp.com/";
  const apiUrl =
    "https://api.forismatic.com/api/1.0/?method=getQuote&format=html&lang=en&callback=?";
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    // manage unknown author
    if (data.quoteAuthor == "") {
      authorText.innerText = "Unknown";
    } else {
      authorText.innerText = data.quoteAuthor;
    }
    // manage long quote
    if (data.quoteText.length >= 50) {
      quoteText.classList.add("long-quote");
    } else {
      quoteText.classList.remove("long-quote");
    }
    quoteText.innerText = data.quoteText;
    removeLoading();
  } catch (error) {
    showErrorMessage(error)
    console.log(error);
  }
}

function showErrorMessage(error){
    loader.hidden = true;
    errorMessage.hidden = false
    errorMessage.innerText = "Error \n " + error;
}

// Loader
function showLoading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
  errorMessage.hidden = true
}

// hide loading
function removeLoading() {
  if (!loader.hidden) {
    quoteContainer.hidden = false;
    loader.hidden = true;
  }
}

// tweet quote
function tweetQuote() {
  const quote = quoteText.innerText;
  const author = authorText.innerText;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
  window.open(twitterUrl, "_blank");
}

// add listener to the button
newQuoteBtn.addEventListener("click", getQuotes);
twitterBtn.addEventListener("click", tweetQuote);

//run function
getQuotes();
// loading()
