
import { useState, useEffect } from "react";
import "../css/App.css";
import ListBooks from "./ListBooks";
import * as BooksAPI from "../utils/BooksAPI";

function App() {
  const [books, setBooks] = useState([]);
  const [showSearchPage, setShowSearchpage] = useState(false);

  useEffect(() => {
    const getBooks = async () => {
      const res = await BooksAPI.getAll();
      setBooks(res);
    };

    getBooks();
  }, []);

  return (
    <div className="app">
      {showSearchPage ? (
        <div className="search-books">
          <div className="search-books-bar">
            <a
              className="close-search"
              onClick={() => setShowSearchpage(!showSearchPage)}
            >
              Close
            </a>
            <div className="search-books-input-wrapper">
              <input
                type="text"
                placeholder="Search by title, author, or ISBN"
              />
            </div>
          </div>
          <div className="search-books-results">
            <ol className="books-grid"></ol>
          </div>
        </div>
      ) : <ListBooks books={books}/>}
    </div>
  );
}

export default App;
