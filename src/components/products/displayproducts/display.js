import React from 'react';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './display.css';
import axios from 'axios';
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux';
import removeProduct from '../../../actions/deleteProduct';
import ReactPaginate from 'react-paginate';



class DisplayProduct extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            edit: false,
            name: '',
            quantity: '',
            price: '',
            category: '',
            id: '',
            productArray: [],
            offset: 0,
            perPage: 5,
            currentPage: 0
        }
        this.deleteProduct = this.deleteProduct.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.onSort = this.onSort.bind(this)
        this.handlePageClick = this.handlePageClick.bind(this)

    }

    handlePageClick = (e) => {
        const selectedPage = e.selected;
        const offset = selectedPage * this.state.perPage;
  
        this.setState({
            currentPage: selectedPage,
            offset: offset
        }, () => {
        
        });
  
    };
  

    UNSAFE_componentWillReceiveProps(nextProps){
        this.setState({
            productArray : nextProps.productList
        })
    }


    deleteProduct(id) {
        axios.delete(`http://localhost:3002/products/${id}`).then((responseData) => {
            console.log(responseData)
            this.props.deleteProduct(id)
            this.props.getAllProduct()
        })
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    onSort(type) {
       const sortType = type
       let sortedItems = this.state.productArray;
       const sorted = sortedItems.sort((a,b) => {
              const isReversed = (sortType === "asc") ? 1 : -1;
              return isReversed * a.name.localeCompare(b.name)
       });
       console.log("sorted",sorted)
       this.setState({
           productArray : sorted
       })
       console.log("sortproduct",this.state.productArray)
    }

    render() {
        const data = this.state.productArray;
        const slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)
        const productDetails = slice.map((product,index) => {
            return (
                <div className="card" key={index}>
                    <div className="imageholder">
                        <img src={product.image} alt="" className="image" />
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
                <div className="sortContainer">
                    <button type="button" onClick={() => this.onSort("asc")}>SORT BY ASC</button>
                    <button type="button" onClick={() => this.onSort("desc")}>SORT BY DESC</button>
                </div>
                <div>
                {productDetails}
                </div>
                <div className="page">
                <ReactPaginate
                  previousLabel={"prev"}
                  nextLabel={"next"}
                  breakLabel={"..."}
                  breakClassName={"break-me"}
                  pageCount={this.state.pageCount}
                  marginPagesDisplayed={2}
                  pageRangeDisplayed={5}
                  onPageChange={this.handlePageClick}
                  containerClassName={"pagination"}
                  subContainerClassName={"pages pagination"}
                  activeClassName={"active"}/>
                </div>
            </div>
        )
    }
}


function mapPropsToStore(dispatch){
    return bindActionCreators({
        deleteProduct : removeProduct
    },dispatch)
}

export default connect(null,mapPropsToStore)(withRouter(DisplayProduct));