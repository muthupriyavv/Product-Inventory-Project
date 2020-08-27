import React from 'react';
import DisplayProduct from './displayproducts/display';
import './products.css';
import {connect} from 'react-redux'
import axios from 'axios';
import { bindActionCreators } from 'redux';
import initialList from '../../actions/initialList'



class Product extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            clicked: false,
            sort:false,
            productList: [],
            sortedList:[],
            filterList:[],
            searchText: '',
        }
        this.getAllProducts = this.getAllProducts.bind(this)
        this.onAddClicked = this.onAddClicked.bind(this)
        this.handleSearch = this.handleSearch.bind(this)
        this.getAllProducts()
    }

    async getAllProducts() {
        await axios.get("http://localhost:3002/products").then((responseData) => {
            console.log("res",responseData.data)
            this.props.setProductList(responseData.data)
        })
        this.setState({
            productList:this.props.productList,
            filterList:this.props.productList,
            sortedList:this.props.productList
        })
    }


    onAddClicked() {
        this.props.history.push('/products/addproduct')
    }

    handleSearch(e) {
        console.log(e.target.value)
        if (e.target.value === "") {
            this.setState({
                productList: this.state.filterList,
            })
        }
        else {
            this.setState({
                searchText: e.target.value,
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
            return 0;
        })
        this.setState({
            productList: filteredProducts
        })
    }


    render() {
        console.log("render",this.state.productList)
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
            <DisplayProduct productList={this.state.productList} getAllProduct={this.getAllProducts}/>
            </div>
        )
    }

}

function mapStoreToProps(store){
    console.log("storeproducts",store)
    return {
        productList : store.productList
    }
}

function mapPropsToStore(dispatch){
    return bindActionCreators({
        setProductList: initialList
    },dispatch)
}

export default connect(mapStoreToProps,mapPropsToStore)(Product);
