import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useFirebase } from '../context/Firebase';
import { useNavigate } from 'react-router-dom';

function MyCard(props) {
    const navigate = useNavigate()
    const firebase = useFirebase()
    const [url, setURL] = useState(null)
    useEffect(() => {
        firebase.getImgURL(props.imageUrl).then(url => setURL(url))
    }, [])
    const handleImgURL = () => {
        return url ? (
            url.includes("undefined") ? "https://static.vecteezy.com/system/resources/previews/002/219/582/original/illustration-of-book-icon-free-vector.jpg" : url
        )
            : "https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif?20151024034921"
    }
    return (
        <Card  border="danger"  style={{ width: '18rem'}}>
            <Card.Img variant="top" src={handleImgURL()} />
            <Card.Body>
                <Card.Title>name - {props.name}</Card.Title>
                <Card.Text>
                    This book is sold by {props.displayName}
                </Card.Text>
                <Button variant="primary" onClick={e=>navigate(props.link)}>View</Button>
            </Card.Body>
        </Card>
    );
}

export default MyCard;