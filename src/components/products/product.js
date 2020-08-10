import React from 'react';
import DisplayProduct from './displayproducts/display';
import './products.css';
import axios from 'axios';


class Product extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            clicked: false,
            productList: [],
            searchText: ''
        }
        this.getAllProducts = this.getAllProducts.bind(this)
        this.onAddClicked = this.onAddClicked.bind(this)
        this.handleSearch = this.handleSearch.bind(this)
        this.getAllProducts()
    }

    async getAllProducts() {
        await axios.get("http://localhost:3002/products").then((responseData) => {
            this.setState({
                productList: responseData.data
            })
        })
    }

    onAddClicked() {
        this.props.history.push('/products/addproduct')
    }

    handleSearch(e) {
        this.setState({
            searchText: e.target.value
        })
        this.filterProducts(this.state.searchText)
    }

    filterProducts(searchText) {
        let filteredProducts = this.state.productList
        filteredProducts = filteredProducts.filter((products) => {
            let productName = products.name.toLowerCase()
            console.log(productName)
            return productName.includes(
                searchText.toLowerCase())
        })
        this.setState({
            productList: filteredProducts
        })
    }


    render() {
        return (
            <div>
                <div className="addsearchContainer">
                    <div className="row">
                        <div className="col-50">
                            <input
                                type="text"
                                placeholder="Search"
                                name="search"
                                className="searchBox"
                                autoComplete="off"
                                onChange={this.handleSearch}
                            />
                        </div>
                        <div className="col-50">
                            <button className="productAdd" onClick={this.onAddClicked}>ADD PRODUCT</button>
                        </div>
                    </div>
                </div>
                <br></br>
                <DisplayProduct
                    productList={this.state.productList}
                    getAllProducts={this.getAllProducts}
                />
            </div>
        )
    }

}

export default Product;
