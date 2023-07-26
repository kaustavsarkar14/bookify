import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useFirebase } from '../context/Firebase';
import { useNavigate } from 'react-router-dom';

export default function Register() {
    const firebase = useFirebase();
    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');
    const navigate = useNavigate()
    // redirect to homepage if logged in
    useEffect(()=>{
        if(firebase.isLoggedIn)
        navigate('/')   
       },[firebase, navigate])
    // sign up user when submit button is clicked
    const handleClick =async(e)=>{
        e.preventDefault()
        await firebase.signupUserWithEmailAndPassword(email, password).catch(err=>alert(err.message))
        setEmail('')
        setPassword('')
    }
    return (
        <div className='container mt-5'  >
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e)=>setEmail(e.target.value)} />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} />
                </Form.Group>
                
                <Button disabled={email==='' && password===''} variant="primary" type="submit" onClick={e=>handleClick(e)} >
                    Submit
                </Button>
            </Form>
        </div>
    )
}
