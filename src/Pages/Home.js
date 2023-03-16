import CreateBook from '../Components/CreateBook';
import { Card } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import './Home.css';


function DisplayCards({books})
{
    const navigate = useNavigate()

    return books.map((book, index) => {
        if (book.image) {
            return (
                <Card onClick={() => navigate(`/Received/${book.id}`)}
                    bg='light' className="mb-2 pointer" style={{ width: '18rem' }}>
                    <Card.Img src={book.image} />
                    <Card.Body key={index}>{book?.text}</Card.Body>
                </Card>
            )
        }
        return (
            <Card onClick={() => navigate(`/Received/${book.id}`)}
                bg='light'className="mb-2 pointer" style={{ width: '18rem' }}>
                    <Card.Body key={index}>{book?.text}</Card.Body>
            </Card>)
    })
}

function ShowBooks({books})
{
    if (books.length === 0)
        return <></>
    return <DisplayCards books={books}/>
}

function Home()
{
    const [books, setBooks] = useState([])

    useEffect(() => {
        setBooks(JSON.parse(sessionStorage.getItem("Book")) || [])
    }, [])

    const addNewBooks = (obj) => {
        setBooks((oldBooks) => [...oldBooks, obj])
    }

    return (
        <div className="Home">
            <CreateBook onNewBook={addNewBooks}/>
            <ShowBooks books={books}/>
        </div>
    )
}

export default Home