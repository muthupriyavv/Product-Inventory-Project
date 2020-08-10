import React from 'react';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './display.css';
import axios from 'axios';


class DisplayProduct extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            edit: false,
            name: '',
            quantity: '',
            price: '',
            category: '',
            id: ''
        }
        this.deleteProduct = this.deleteProduct.bind(this)
        this.handleChange = this.handleChange.bind(this)

    }

    deleteProduct(id) {
        axios.delete(`http://localhost:3002/products/${id}`).then((responseData) => {
            console.log(responseData)
            alert('Product deleted Successfully')
            this.props.getAllProducts()
        })
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render() {
        const productDetails = this.props.productList.map((product) => {
            return (
                    <div className="card" key={product.id}>
                        <div className="imageholder">
                          <img src={product.image} alt="" className="image"/>
                          </div>
                        <div className="textContainer">
                            <h4><b>{product.name}</b></h4>
                            <span>
                                <p><b>Price:</b>{product.price}</p>
                                <p><b>Quantity:</b>{product.quantity}</p>
                            </span>
                            <span>
                                <Link to={{
                                    pathname: `/products/editproduct/${product.id}`
                                }}>
                                    <button className="button editbutton">EDIT</button>
                                </Link>
                                <button className="button deletebutton" onClick={() => this.deleteProduct(product.id)}>DELETE</button>
                            </span>
                        </div>
                    </div>

            )
        })
        return (
            <div className="displayContainer">
                {productDetails}
            </div>
        )
    }
}

export default withRouter(DisplayProduct)