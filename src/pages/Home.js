import React, { useEffect, useState } from 'react'
import { useFirebase } from '../context/Firebase'
import MyCard from '../components/Card'
import { CardGroup, Row } from 'react-bootstrap'

export default function Home() {
  const firebase = useFirebase()
  const [books, setBooks] = useState([])
  useEffect(() => {
    firebase.listAllBooks().then((book) => setBooks(book.docs))
  }, [])
  return (
    <div className='container mt-5' >
       <Row xs={2} md={1} className="g-5" >
      {/* <CardGroup className="g-4"> */}
        {
          books.map((book, i) => <MyCard link={`/book/view/${book.id}`} key={book.id} id={book.id} {...book.data()} />)
        }
      {/* </CardGroup> */}
      </Row>
    </div>
  )
}
