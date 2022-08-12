
import { useState, useEffect } from "react";
import "../css/App.css";
import ListBooks from "./ListBooks";
import BookShelf from "./BookShelf";
import * as BooksAPI from "../utils/BooksAPI";

function App() {

  const [showSearchPage, setShowSearchpage] = useState(false);
  const [filterdBooks, setfilterdBooks] = useState([]);
  const [currentlyReading , setcurrentlyReading] = useState([]); 
  const [readBefore , setreadBefore] =  useState([]);
  const [wantToRead , setwantToRead] =  useState([]);


  useEffect(() => {
    const getBooks = async () => {
      const res = await BooksAPI.getAll();
      setcurrentlyReading(res.filter(book =>  book.shelf === "currentlyReading" ));
      setreadBefore(res.filter(book =>  book.shelf === "read" ));
      setwantToRead(res.filter(book =>  book.shelf === "wantToRead" ));
    };
    getBooks();
  }, []);

  const updateCurrentStatus = (event,book) => {

    setcurrentlyReading(currentlyReading.filter((e) =>  e.id != book.id));
    setreadBefore(readBefore.filter((e) =>  e.id != book.id));
    setwantToRead(wantToRead.filter((e) =>  e.id != book.id)); 

    if(event.target.value === "currentlyReading"){
      BooksAPI.update(book,"currentlyReading");
      setcurrentlyReading((currentlyReading) => [...currentlyReading, book]);
    }
    if (event.target.value === "wantToRead"){
        BooksAPI.update(book,"wantToRead");
        setwantToRead((wantToRead) => [...wantToRead, book ]);  
    }
    if (event.target.value === "read"){
        BooksAPI.update(book,"read");
        setreadBefore((read) => [...read, book ]);
    } 
    if (event.target.value === "none"){
      BooksAPI.update(book,"none");
    } 
  }
    const onSearchChange = (event) => {
    const Query = event.target.value;
    const getBooks = async () => {
          const res = await BooksAPI.search(Query,10);
          var filterd = !res.error ? res.map((book) => BooksAPI.get(book.id)) : [];
          setfilterdBooks(await Promise.all(filterd));
    };
    Query.length > 0 ? getBooks() :setfilterdBooks([]);
  }
  return (
    <div className="app">
      {showSearchPage ? (
        <div className="search-books">
          <div className="search-books-bar">
            <a
              className="close-search"
              onClick={() => setShowSearchpage(!showSearchPage)}>
              Close
            </a>
            <div className="search-books-input-wrapper">
              <input
                type="text"
                placeholder="Search by title, author, or ISBN"
                onChange={onSearchChange}
              />
            </div>
          </div>
          <div className="search-books-results">
            <ol className="books-grid">
              <BookShelf title="Add Book" books={filterdBooks}   onEventChange={updateCurrentStatus}  />
            </ol>
          </div>
        </div>
        
      ) 
      : 
      <ListBooks currentlyReading = {currentlyReading}  readBefore = {readBefore} wantToRead = {wantToRead} updateStatus={updateCurrentStatus}/>}
          <div className="open-search">
              <a onClick={() => setShowSearchpage(!showSearchPage)}>Add a book</a>
          </div>
    </div>
  );
}

export default App;
