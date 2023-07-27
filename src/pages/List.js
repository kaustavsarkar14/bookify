import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useFirebase } from '../context/Firebase';
import { Modal, Spinner } from 'react-bootstrap';

export default function List() {
    const firebase = useFirebase()
    const [name, setName] = useState('')
    const [isbn, setIsbn] = useState('')
    const [price, setPrice] = useState('')
    const [coverPhoto, setCoverPhoto] = useState('')
    const [show, setShow] = useState(false);
    const [clicked, setClicked] = useState(false)
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleSubmit = async (e) => {
        setClicked(true)
        e.preventDefault()
        await firebase.handleCreateNewListing(name, isbn, price, coverPhoto)
        handleShow()
        setClicked(false)
    }
    if (!firebase.isLoggedIn) return <h1 className='container' >Please login to list your books</h1>
    return (
        <div className='container'>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Listed</Modal.Title>
                </Modal.Header>
                <Modal.Body>Your book is listed successfully 🎉</Modal.Body>
            </Modal>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Enter book name</Form.Label>
                    <Form.Control value={name} onChange={e => setName(e.target.value)} type="text" placeholder="Book name" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Enter ISBN name</Form.Label>
                    <Form.Control value={isbn} onChange={e => setIsbn(e.target.value)} type="text" placeholder="ISBN number" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Enter the price</Form.Label>
                    <Form.Control value={price} onChange={e => setPrice(e.target.value)} type="number" placeholder="Price" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Upload cover photo</Form.Label>
                    <Form.Control onChange={e => setCoverPhoto(e.target.files[0])} type="file" />
                </Form.Group>

                <Button variant="success" onClick={handleSubmit}>
                    {!clicked ?

                        <>Create</>
                        : <><Spinner
                            as="span"
                            animation="grow"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                        />
                            Loading...</>}
                </Button>

            </Form>
        </div>
    )
}
