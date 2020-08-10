import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import Login from './components/login/login';
import SignUp from './components/signup/signup';
import Home from './components/home/home';
import Dashboard from './components/dashboard/dashboard';
import Product from './components/products/product';
import AddProduct from './components/products/addproducts/addproducts';
import EditModel from './components/products/editmodel/editmodel';

class App extends React.Component {

  render() {
    return (
      <Router>
        <Route path="/" component={Home}></Route>
        <Route exact path="/dashboard" component={Dashboard}></Route>
        <Route exact path="/products" component={Product}></Route>
        <Route exact path="/products/addproduct" component={AddProduct}></Route>
        <Route exact path="/products/editproduct/:id" component={EditModel}></Route>
        <Route exact path="/login" component={Login}></Route>
        <Route exact path="/signup" component={SignUp}></Route>
      </Router>
    );
  }
}

export default App;
