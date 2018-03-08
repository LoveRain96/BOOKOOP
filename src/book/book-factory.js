const Book      = require('./book');
const Publisher = require('../publisher/publisher');
const PublisherProvider = require('../publisher/publisher-provider');
const connection    = require('../../database/connection');

let publisherProvider = new PublisherProvider(connection);

class BookFactory{

    /**
     *
     * @param {Object} bookRaw
     * @return {Book}
     */
    makeFromDB(bookRaw) {
        //let book = this.makeFromRequest(bookRaw);
        let book  = new Book(bookRaw.title, bookRaw.author);
        book.setId(bookRaw.id);
        book.setPrice(bookRaw.price);
        let publisher = publisherProvider.make(bookRaw);
        book.setPublisher(publisher);
        return book;
    }

    makeFromRequest(bookRaw) {
        let book = new Book(bookRaw.title, bookRaw.author);
        book.setId(bookRaw.id);
        book.setPrice(bookRaw.price);
            return publisherProvider.search(bookRaw.publisher_id).then(result => {
            book.setPublisher(result);
            return book;
           })
       }
}

module.exports = BookFactory;

