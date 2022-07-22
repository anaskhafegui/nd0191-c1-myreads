import { useState, useEffect } from "react";
import BookShelf from "./BookShelf";
import * as BooksAPI from "../utils/BooksAPI";


const ListBooks = () => {
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
    if (event.target.value === "read"){

      BooksAPI.update(book,"read");

      setreadBefore(  (readBefore) => [...readBefore, book ] );

    }
     if (event.target.value === "wantToRead"){
      BooksAPI.update(book,"wantToRead");

      setwantToRead(  (wantToRead) => [...wantToRead, book ] );
    }
    
  }


    return (

    
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                <div>

                <BookShelf title="currently Reading" books={currentlyReading}  onEventChange={updateCurrentStatus}/>
                <BookShelf title ="Want To Read" books={readBefore} onEventChange={updateCurrentStatus}/>
                <BookShelf title = "Read" books={wantToRead} onEventChange={updateCurrentStatus}/>
                 
                
                </div>
              </div>
              <div className="open-search">
                <a >Add a book</a>
              </div>
            </div>
          
    );

};

export default ListBooks;