import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { Card } from "react-bootstrap";


function InfoBook({ book })
{
    return (
        <Card bg='light' className="mb-3" style={{ width: '25rem'}}>
            <Card.Img variant="top" src={book.image} />
            <Card.Body>{book?.text}</Card.Body>
        </Card>
    )
}

function Received()
{
    const { bookId } = useParams();
    const [book, setBooks] = useState({id: undefined, image: undefined, text : undefined})

    useEffect(() => {
        let arrayValue = JSON.parse(sessionStorage.getItem("Book")) || [];
        for (const elem_book of arrayValue) {
            if (elem_book?.id === parseInt(bookId)) {
                setBooks(elem_book)
                return;
            }
        }
    }, [bookId])

    if (book.id === undefined)
        return <div>UNKNOW ID BOOK { bookId }</div>

    return <div>
        <InfoBook book={book}/>
    </div>
}

export default Received