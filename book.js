const searchField = document.getElementById("search-field");
const searchButton = document.getElementById("search-button");
const searchedBook = document.getElementById("searched-book");
const error = document.getElementById("error");
const spinner = document.getElementById("spinner");
const matchResult = document.getElementById("match-result");
// load data
const loadData = () => {
  const searchText = searchField.value;
  error.innerText = "";
  // search field empty error
  if (searchText === "") {
    error.innerText = "Search field can not be empty";
    matchResult.innerText = "";
    searchedBook.textContent = "";
    return;
  }
  const url = `https://openlibrary.org/search.json?q=${searchText}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      // no result error
      if (`${data.numFound === 0}`) {
        spinner.classList.add("d-none");
        error.innerText = "No result found";
        matchResult.innerText = "";
      }
      displayBook(data);
    });
  spinner.classList.remove("d-none");
  // clear search text
  searchField.value = "";
};

// display search result
const displayBook = (property) => {
  const searchedBook = document.getElementById("searched-book");
  // clear previous result
  searchedBook.textContent = "";
  const books = property.docs;
  books.forEach((book) => {
    const div = document.createElement("div");
    div.classList.add("col");
    div.innerHTML = `
    <div class="card h-100 gy-4" style="width: 18rem;">
          <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top img-fluid" alt="book-cover">
          <ul class="list-group list-group-flush">
            <li class="list-group-item">Book Name: ${book.title}</li>
            <li class="list-group-item">Author: ${book.author_name[0]}</li>
            <li class="list-group-item">Publisher: ${book.publisher[0]}</li>
            <li class="list-group-item">First Publish Year: ${book.publish_year[0]}</li>
          </ul>          
        </div>
    `;
    searchedBook.appendChild(div);
    spinner.classList.add("d-none");
    error.innerText = "";
    // total search result found
    matchResult.innerText = `Total result found: ${property.numFound}.`;
  });
};
