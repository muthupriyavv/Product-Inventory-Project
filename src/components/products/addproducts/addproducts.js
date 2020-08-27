import React from 'react';
import './addproducts.css';
import axios from 'axios';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import addProduct from '../../../actions/addproductaction';

class AddProduct extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            nameError:'',
            quantity: '',
            quantityError:'',
            price: '',
            priceError:'',
            category: '',
            categoryError:'',
            brand: '',
            brandError:'',
            image: '',
            imageError:'',
            categoryList: []
        }

        this.setName = this.setName.bind(this)
        this.setQuantity = this.setQuantity.bind(this)
        this.setPrice = this.setPrice.bind(this)
        this.setCategory = this.setCategory.bind(this)
        this.setBrand = this.setBrand.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.getAllCategory = this.getAllCategory.bind(this)
        this.imageHandler = this.imageHandler.bind(this)
        this.getAllCategory()
    }

    async getAllCategory() {
        await axios.get("http://localhost:3002/category").then((responseData) => {
            this.setState({
                categoryList: responseData.data
            })
        })
    }

    imageHandler(e) {
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                this.setState({
                    image: reader.result
                })
            }
        }
        reader.readAsDataURL(e.target.files[0])
    }

    validate(){
        let nameError='';
        let quantityError='';
        let priceError='';
        let brandError='';
        let imageError='';
        let categoryError='';

        if(!this.state.name){
            nameError="Name is required"
        }
        if(!this.state.quantity){
            quantityError="Quantity is required"
        }
        
        if(!this.state.price){
            priceError="Price is required"
        }
        if(!this.state.brand){
            brandError="Brand is required"
        }
        if(!this.state.category){
            categoryError="Category is required"
        }
        
        if(!this.state.image){
            imageError="Image is required"
        }

        if (nameError || imageError || quantityError || priceError || brandError || categoryError) {
            this.setState({ nameError, imageError ,quantityError,priceError,categoryError,brandError })
            return false;
        }

        return true;
    }

    setName(e){
        let nameError=""
        this.setState({
            name : e.target.value
        }, () => {
            if(this.state.name === ""){
                nameError="Name is required"
            }
            if(nameError){
                this.setState({
                    nameError
                })
            }
        })
        this.setState({nameError:""})
    }

    setPrice(e){
        let priceError=""
        this.setState({
            price : e.target.value
        }, () => {
            if(this.state.price === ""){
                priceError="Price is required"
            }
            if(this.state.price !== ""){
                var pattern = new RegExp(/^[0-9\b]+$/)
                if(!pattern.test(this.state.price)){
                    priceError="Price should be a number"
                }
            }
            if(priceError){
                this.setState({
                    priceError
                })
            }
        })
        this.setState({priceError:""})
    }

    
    setQuantity(e){
        let quantityError=""
        this.setState({
            quantity : e.target.value
        }, () => {
            if(this.state.quantity === ""){
                quantityError="Quantity is required"
            }
            if(this.state.quantity !== ""){
                var pattern = new RegExp(/^[0-9\b]+$/)
                if(!pattern.test(this.state.quantity)){
                    quantityError="Quantity should be a number"
                }
            }
            if(quantityError){
                this.setState({
                    quantityError
                })
            }
        })
        this.setState({quantityError:""})
    }

    setCategory(e){
        let categoryError=""
        this.setState({
            category : e.target.value
        },() => {
            if(this.state.category === ""){
                categoryError="Category is required"
            }
            if(this.state.category === "default"){
                categoryError="Choose a category"
            }
            if(categoryError){
                this.setState({
                    categoryError
                })
            }
        })
        this.setState({categoryError:""})
    }

    setBrand(e){
        let brandError=""
        this.setState({
            brand : e.target.value
        }, () => {
            if(this.state.brand === ""){
                brandError="Name is required"
            }
            if(brandError){
                this.setState({
                    brandError
                })
            }
        })
        this.setState({brandError:""})
    }

    async handleSubmit(event) {
        event.preventDefault();

        const isValid = this.validate()

        if(isValid){
        const products = {
            name: this.state.name,
            quantity: this.state.quantity,
            price: this.state.price,
            category: this.state.category,
            brand: this.state.brand,
            image: this.state.image
        }

        await axios.post("http://localhost:3002/products/", products).then((responseData) => {
            console.log("add",responseData.data)
            this.props.history.push('/products')
            this.props.addProduct(responseData.data)
        })
        }

    }


    render() {
        const categoryOption = this.state.categoryList.map((category) => {
            return <option key={category.id}>{category.categoryname}</option>
        })
        return (
            <div className="addproductContainer">
                <form className="addproductform">
                    <div className="row">
                        <div className="col-50">
                            <div className="img-holder">
                                <img src={this.state.image} className="img" alt="" />
                            </div>
                            <input
                                type="file"
                                name="image"
                                alt=""
                                accept="image/*"
                                onChange={this.imageHandler}
                            />
                            <p style={{ fontSize: "12", color: 'red' }}>{this.state.imageError}</p>
                        </div>
                        <div className="col-50">
                            <input
                                type="text"
                                name="name"
                                placeholder="ENTER NAME"
                                onChange={this.setName}
                            />
                             <p style={{ fontSize: "12", color: 'red' }}>{this.state.nameError}</p>
                            <input
                                type="text"
                                name="price"
                                placeholder="ENTER PRICE"
                                onChange={this.setPrice}
                            />
                             <p style={{ fontSize: "12", color: 'red' }}>{this.state.priceError}</p>
                            <input
                                type="text"
                                name="brand"
                                placeholder="ENTER BRAND"
                                onChange={this.setBrand}
                            />
                             <p style={{ fontSize: "12", color: 'red' }}>{this.state.brandError}</p>
                            <input
                                type="text"
                                name="quantity"
                                placeholder="ENTER QUANTITY"
                                onChange={this.setQuantity}
                            />
                             <p style={{ fontSize: "12", color: 'red' }}>{this.state.quantityError}</p>
                            <select name="category" onChange={this.setCategory}>
                                <option value="default">CHOOSE A CATEGORY</option>
                                {categoryOption}
                            </select>
                            <p style={{ fontSize: "12", color: 'red' }}>{this.state.categoryError}</p>
                        </div>
                    </div>
                    <br></br>
                    <div className="row">
                        <button type="submit" data-testid="submit" className="addproduct" onClick={this.handleSubmit}>ADD</button>
                    </div>
                </form>
            </div>
        )
    }
}

function mapPropsToStore(dispatch){
    return bindActionCreators({
        addProduct : addProduct
    },dispatch)
}

export default connect(null,mapPropsToStore)(AddProduct)
