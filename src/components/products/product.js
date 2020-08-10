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
            filterList: [],
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
                productList: responseData.data,
                filterList: responseData.data
            })
        })
    }

    onAddClicked() {
        this.props.history.push('/products/addproduct')
    }

    handleSearch(e) {
        if (e.target.value === "") {
            this.setState({
                productList: this.state.filterList
            })
        }
        else {
            this.setState({
                searchText: e.target.value
            }, () => {
                this.filterProducts(this.state.searchText)
            })
        }
    }
    filterProducts(searchText) {
        let filteredProducts = this.state.productList
        filteredProducts = filteredProducts.filter((products) => {
            let productName = products.name.toLowerCase()
            if (productName.includes(searchText.toLowerCase()))
                return products
        })
        this.setState({
            productList: filteredProducts
        })
    }


    render() {
        return (
            <div className="productContainer">
                <div className="addsearchContainer">
                    <input
                        type="text"
                        placeholder="Search by Name"
                        name="search"
                        autoComplete="off"
                        onChange={this.handleSearch}
                    />
                    <button type="button" onClick={this.onAddClicked}>ADD PRODUCT</button>
                </div>
                <DisplayProduct
                    productList={this.state.productList}
                    getAllProducts={this.getAllProducts}
                />
            </div>
        )
    }

}

export default Product;
