import { Button, Modal } from "react-bootstrap"
import { useForm } from "react-hook-form"
import { useState } from "react"
import { Form } from "react-bootstrap";

function storageBookData(obj)
{
    let arrayValue = JSON.parse(sessionStorage.getItem("Book")) || [];
    arrayValue.push(obj);
    sessionStorage.setItem("Book", JSON.stringify(arrayValue))
}

function getId()
{
    const id = parseInt(sessionStorage.getItem("LastId")) || 0
    sessionStorage.setItem("LastId", (id + 1))
    return id + 1;
}

function onSubmit(data, onNewBook)
{
    if (("UrlImage" in data || "Text" in data) === false)
        return;
    const obj = { id: getId(), image: data?.UrlImage, text: data?.Text}
    onNewBook(obj);
    storageBookData(obj)
}

function FormImageText({closePopUp, onNewBook})
{
    const { register, handleSubmit } = useForm()

    return (
        <form onSubmit={handleSubmit((data) => onSubmit(data, onNewBook))}>
            <Modal.Body>
                <Form.Label>Image</Form.Label>
                <Form.Control type="text" name="UrlImage" {...register('UrlImage')}/>
            </Modal.Body>
            <Modal.Body>
                <Form.Label>Text</Form.Label>
                <Form.Control as="textarea" rows={3} type="text" name="Text" {...register('Text')} />
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={closePopUp}>Close</Button>
              <Button variant="primary" type="submit" value="Submit">Save changes</Button>
            </Modal.Footer>
        </form>
    )
}

function PopUp({seePopUp, closePopUp, onNewBook})
{
    if (seePopUp === false)
        return <></>

    return (
        <Modal show={seePopUp} onHide={closePopUp}>
            <Modal.Header closeButton>
            <Modal.Title>Create Pages</Modal.Title>
            </Modal.Header>
            <FormImageText closePopUp={closePopUp} onNewBook={onNewBook} />
        </Modal>
    )
}

function CreateBook({onNewBook})
{
    const [seePopUp, setSeePopUp] = useState(false)

    const closePopUp = () => setSeePopUp(false);

    return (
        <div>
            <Button onClick={() => setSeePopUp(!seePopUp)}>CREATE BOOK</Button>
            <PopUp seePopUp={seePopUp} closePopUp={closePopUp} onNewBook={onNewBook} />
        </div>
    )
}

export default CreateBook