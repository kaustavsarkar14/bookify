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
        <Card  style={{ width: '18rem',margin:"auto",marginBottom:"1rem"}}>
            <Card.Img variant="top" src={handleImgURL()} style={{height:"22rem",objectFit:"cover"}}/>
            <Card.Body>
                <Card.Title>{props.name.slice(0,30)}{props.name.length>32?"...":""}{props.name.length>20?<><h6 style={{display:"inline",color:"green",fontWeight:"700"}} >{" Rs."+props.price}</h6></>:<h6 style={{color:"green",fontWeight:"700"}} >{"Rs."+props.price}</h6>}</Card.Title>
                <Card.Text>
                    This book is sold by {props.displayName}
                </Card.Text>
                <Button variant="primary" onClick={e=>navigate(props.link)}>View</Button>
            </Card.Body>
        </Card>
    );
}

export default MyCard;