import { useState, useEffect } from "react";
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
                  <div className="bookshelf">
                    <h2 className="bookshelf-title">Currently Reading</h2>
                    <div className="bookshelf-books">
                      <ol className="books-grid">
                        {
                      currentlyReading.map((book) => (
                        
                          <li key={book.id}>
                          <div className="book">
                            <div className="book-top">
                              <div
                                className="book-cover"
                                style={{
                                  width: 128,
                                  height: 193,
                                  backgroundImage:
                                  `url(${book.imageLinks['smallThumbnail']})`,
                                }}
                              ></div>
                              <div className="book-shelf-changer">
                                <select defaultValue={'DEFAULT'}  onChange={(event) => updateCurrentStatus(event,book)}>
                                  <option value="DEFAULT" disabled>
                                    Move to...
                                  </option>
                                  <option value="currentlyReading">
                                    Currently Reading
                                  </option>
                                  <option value="wantToRead">Want to Read</option>
                                  <option value="read">Read</option>
                                  <option value="none">None</option>
                                </select>
                              </div>
                            </div>
                            <div className="book-title">{ book.title}</div>
                            <div className="book-authors">{ book.authors}</div>
                          </div>
                        </li>
                      ))
                      }
                      </ol>
                    </div>
                  </div>
                  <div className="bookshelf">
                    <h2 className="bookshelf-title">Want to Read</h2>
                    <div className="bookshelf-books">
                      <ol className="books-grid">
                     { wantToRead.map((book )=> (
                        <li key={book.id}>
                          <div className="book">
                            <div className="book-top">
                              <div
                                className="book-cover"
                                style={{
                                  width: 128,
                                  height: 193,
                                  backgroundImage:
                                  `url(${book.imageLinks['smallThumbnail']})`,
                                   }}
                              ></div>
                              <div className="book-shelf-changer">
                                <select defaultValue={'DEFAULT'} onChange={(event) => updateCurrentStatus(event,book)}>
                                  <option  value="DEFAULT" disabled>
                                    Move to...
                                  </option>
                                  <option  value="currentlyReading">
                                    Currently Reading
                                  </option>
                                  <option  value="wantToRead">Want to Read</option>
                                  <option value="read">Read</option>
                                  <option value="none">None</option>
                                </select>
                              </div>
                            </div>
                            <div className="book-title">{book.title}</div>
                            <div className="book-authors">{book.authors}</div>
                          </div>
                        </li>
                      ))}
                      
                      </ol>
                    </div>
                  </div>
                  <div className="bookshelf">
                    <h2 className="bookshelf-title">Read</h2>
                    <div className="bookshelf-books">
                      <ol className="books-grid">{
                      readBefore.map((book )=> (
                      
                        <li key={book.id}>
                          <div className="book">
                            <div className="book-top">
                              <div
                                className="book-cover"
                                style={{
                                  width: 128,
                                  height: 174,
                                  backgroundImage:
                                  `url(${book.imageLinks['smallThumbnail']})`,
                                     }}
                              ></div>
                              <div className="book-shelf-changer">
                                <select defaultValue={'DEFAULT'} onChange={(event) => updateCurrentStatus(event,book)}>
                                  <option value="DEFAULT" disabled>
                                    Move to...
                                  </option>
                                  <option value="currentlyReading">
                                    Currently Reading
                                  </option>
                                  <option value="wantToRead">Want to Read</option>
                                  <option value="read">Read</option>
                                  <option value="none">None</option>
                                </select>
                              </div>
                            </div>
                            <div className="book-title">
                              { book.title}
                            </div>
                            <div className="book-authors">{book.authors}</div>
                          </div>
                        </li>
                 ))}
                      </ol>
                    </div>
                  </div>
                </div>
              </div>
              <div className="open-search">
                <a >Add a book</a>
              </div>
            </div>
          
    );

};

export default ListBooks;