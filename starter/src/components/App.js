
import { useState, useEffect } from "react";
import "../css/App.css";
import ListBooks from "./ListBooks";
import BookShelf from "./BookShelf";
import * as BooksAPI from "../utils/BooksAPI";


function App() {

  const [showSearchPage, setShowSearchpage] = useState(false);
  const [filterdBooks, setfilterdBooks] = useState([]);

  const [books, setBooks] = useState([]);
  const [currentlyReading , setcurrentlyReading] = useState([]); 
  const [readBefore , setreadBefore] =  useState([]);
  const [wantToRead , setwantToRead] =  useState([]);

  useEffect(() => {
    const getBooks = async () => {
      const res = await BooksAPI.getAll();
      setBooks(res);

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

      setcurrentlyReading(  (currentlyReading) => [...currentlyReading, book ] );

    }
    if (event.target.value === "wantToRead"){

      BooksAPI.update(book,"read");

      setreadBefore(  (readBefore) => [...readBefore, book ] );

    }
     if (event.target.value === "read"){

      BooksAPI.update(book,"wantToRead");

      setwantToRead(  (wantToRead) => [...wantToRead, book ] );
    }
    
  }




  const onSearchChange = (event) => {
   
    const Query = event.target.value;
 
    const getBooks = async () => {
      const res = await BooksAPI.search(Query,10);  
      console.log(res);
 
     setfilterdBooks(res);
     
    };
    Query != "" ? getBooks() :setfilterdBooks([]);

    
  }



  
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
