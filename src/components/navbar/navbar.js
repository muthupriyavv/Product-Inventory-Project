import React from 'react';
import {Link} from 'react-router-dom';
import './navbar.css'

class Navbar extends React.Component {

    render(){
        return(
            <div className="navbarReact">
                <Link  to="/dashboard"  className="link">Dashboard</Link>
                <Link  to="/products"   className="link">Products</Link>
                <Link  to="/login"      className="rightlink">Logout</Link>
            </div>
        )
    }
}

export default Navbar;