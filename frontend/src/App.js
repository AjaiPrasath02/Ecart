
import './App.css';
import Home from './components/Home';
import Footer from './components/layouts/Footer';
import Header from './components/layouts/Header';
import { Route, BrowserRouter as Router, Routes} from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProductDetail from './components/product/ProductDetail';
import ProductSearch from './components/product/ProductSearch';
import Login from './components/user/login';
import Register from './components/user/Register';
import ForgotPassword from './components/user/ForgotPassword';
import ResetPassword from './components/user/ResetPassword';
import Cart from './components/cart/Cart';
import Shipping from './components/cart/shipping';
import ConfirmOrder from './components/cart/ConfirmOrder';
import Payment from './components/cart/Payment';
import { useEffect, useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import OrderSuccess from './components/cart/OrderSuccess';


function App() {
  const [stripeApiKey,setStripeApiKey]=useState("")
  useEffect(()=>{
   // store.dispatch(loadUser)
    async function getStripeApiKey(){
      const {data} = await axios.get('/api/v1/stripeapi')
      setStripeApiKey(data.stripeApiKey)
    }
    getStripeApiKey()
  },[])
  return (
    <Router>
      <div className="App">
      <HelmetProvider>
      <Header/>
      <div className='container container-fluid'>
      <ToastContainer theme='dark'/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/search/:keyword' element={<ProductSearch/>}/>
        <Route path='/product/:id' element={<ProductDetail/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/password/forgot' element={<ForgotPassword/>}/>
        <Route path='/password/reset/:token' element={<ResetPassword/>}/>      
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/shipping' element={<Shipping/>}/>
        <Route path='/order/confirm' element={<ConfirmOrder/>}/>
        <Route path='/order/success' element={<OrderSuccess/>}/>

        { stripeApiKey  &&  <Route path='/payment' element={<Elements stripe={loadStripe(stripeApiKey)}><Payment/></Elements>}/>}
      </Routes>
      </div>
      
    
      <Footer/>
      </HelmetProvider>
      </div>
    </Router>
    
  );
}

export default App;
