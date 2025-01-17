const BookShelf = ({title ,books,onEventChange}) => {
        
 if  (books.length > 0){ return (
<div className="bookshelf">
<h2 className="bookshelf-title">{title}</h2>
<div className="bookshelf-books">
  <ol className="books-grid">
    {
  books.map((book) => (
      <li key={book.id}>
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage:
              `url(${( book.imageLinks !== undefined) ? book.imageLinks['smallThumbnail'] : "No THumbails"})`,
            }}
          ></div>
          <div className="book-shelf-changer">
            <select defaultValue={book.shelf} selected onChange={(event) => onEventChange(event,book)}>
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

    ) }
    else return  "No Result";
}
export default BookShelf;