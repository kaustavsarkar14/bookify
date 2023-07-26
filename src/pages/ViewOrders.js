import React, { useEffect, useState } from 'react'
import { useFirebase } from '../context/Firebase'
import MyCard from '../components/Card'

export default function ViewOrders() {
    const firebase = useFirebase()
    const[books, setBooks] = useState([])
    useEffect(()=>{
        if(firebase.isLoggedIn)
        firebase.fetchMyBooks(firebase.user.uid).then(books=>setBooks(books.docs))
    },[firebase])
    if(!firebase.isLoggedIn) return <h1>Please log in</h1>
    return (
        <div className='container'>
        {
            books.map(book=><MyCard link={`/books/orders/${book.id}`}key={book.id} id={book.id} {...book.data()} />)
        }
    </div>

  )
}
