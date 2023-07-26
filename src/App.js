import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import MyNavbar from './components/Navbar';
import List from './pages/List';
import Home from './pages/Home';
import Detail from './pages/Detail';
import ViewOrders from './pages/ViewOrders';
import ViewOrderDetail from './pages/ViewOrderDetail';

function App() {
  return (
    <div>
      <MyNavbar/>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/register" element={<Register/>} />
      <Route path="/book/list" element={<List/>} />
      <Route path="/book/view/:id" element={<Detail/>} />
      <Route path="/books/orders" element={<ViewOrders/>} />
      <Route path="/books/orders/:id" element={<ViewOrderDetail/>} />
    </Routes>
    </div>
  );
}

export default App;
