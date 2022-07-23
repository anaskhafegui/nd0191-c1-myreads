import { useState, useEffect } from "react";
import BookShelf from "./BookShelf";
import * as BooksAPI from "../utils/BooksAPI";


const ListBooks = ({books,currentlyReading,readBefore,wantToRead,updateStatus}) => {
  



    return (

    
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                <div>

                <BookShelf title="currently Reading" books={currentlyReading}  onEventChange={updateStatus}/>
                <BookShelf title ="Want To Read" books={readBefore} onEventChange={updateStatus}/>
                <BookShelf title = "Read" books={wantToRead} onEventChange={updateStatus}/>
              
       
                 
                
                </div>
              </div>
 
            </div>
          
    );

};

export default ListBooks;