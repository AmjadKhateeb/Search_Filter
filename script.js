const quoteList = document.getElementById('quoteList');
const searchInput = document.getElementById('searchInput');
const errorElement = document.getElementById('error');

let quotes = [];

async function fetchQuotes() {
  try {
    const response = await fetch('https://dummyjson.com/quotes');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    quotes = data.quotes;
    displayQuotes(quotes);
  } catch (error) {
    errorElement.textContent = 'Failed to fetch quotes. Please try again later.';
    console.error('Error fetching quotes:', error);
  }
}

function displayQuotes(filteredQuotes) {
  quoteList.innerHTML = '';
  filteredQuotes.forEach(quote => {
    const li = document.createElement('li');
    li.textContent = quote.quote;
    quoteList.appendChild(li);
  });
}

searchInput.addEventListener('input', () => {
  const searchTerm = searchInput.value.toLowerCase();
  const filtered = quotes.filter(q => q.quote.toLowerCase().includes(searchTerm));
  displayQuotes(filtered);
});


fetchQuotes();
