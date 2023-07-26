import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useFirebase } from '../context/Firebase'
import { Table } from 'react-bootstrap'

export default function ViewOrderDetail() {
    const params = useParams()
    const firebase = useFirebase()
    const [orders, setOrders] = useState([])
    useEffect(() => {
        firebase.getOrders(params.id).then(order => setOrders(order.docs))
    }, [])
    // console.log(orders[0].data())

    if(orders.length===0) return <h2 className='container mt-3' >There is no order for this book</h2>
    return (
        <div>
            <h1>Orders</h1>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#Order no.</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Quantity</th>
                    </tr>
                </thead>
                {
                    orders.map((order,i) => {
                        const data = order.data()
                        return <thead>
                        <tr>
                            <th>{i+1}</th>
                            <th>{data.displayName}</th>
                            <th>{data.userEmail}</th>
                            <th>{data.qty}</th>
                        </tr>
                    </thead>
                    })
                }
            </Table>
        </div>

    )
}
