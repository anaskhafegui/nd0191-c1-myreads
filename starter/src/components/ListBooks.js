import BookShelf from "./BookShelf";


const ListBooks = ({currentlyReading,readBefore,wantToRead,updateStatus}) => {

    return (
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                <div>
                <BookShelf title="currently Reading" books={currentlyReading}  onEventChange={updateStatus}/>
                <BookShelf title ="Want To Read" books={wantToRead} onEventChange={updateStatus}/>
                <BookShelf title ="Read" books={readBefore} onEventChange={updateStatus}/>
                </div>
              </div>
            </div>
    );

};

export default ListBooks;