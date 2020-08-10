import React from 'react';
import axios from 'axios';
import './editmodel.css'

class EditModel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
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
        this.handleChange = this.handleChange.bind(this)
        this.handleSave = this.handleSave.bind(this)
        this.getAllCategory = this.getAllCategory.bind(this)
        this.imageHandler = this.imageHandler.bind(this)

        this.getAllCategory()
    }


    UNSAFE_componentWillMount(){
        this.getProductById()

    }

    async getProductById(){
        await axios.get('http://localhost:3002/products?id=' + this.state.id).then((responseData) => {
             console.log(responseData.data[0].name)
             this.setState({
                name:   responseData.data[0].name,
                price:  responseData.data[0].price,
                quantity:  responseData.data[0].quantity,
                category:  responseData.data[0].category,
                image: responseData.data[0].image,
                brand:responseData.data[0].brand
             })
        })
    }

    async getAllCategory() {
        await axios.get("http://localhost:3002/category").then((responseData) => {
            this.setState({
                categoryList: responseData.data
            })
        })
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
        
        if(this.state.quantity !== undefined){
            var pattern = new RegExp(/^[0-9\b]+$/)
            if(!pattern.test(this.state.quantity)){
                quantityError="enter number"
            }
        }
        
        if(!this.state.price){
            priceError="Price is required"
        }
        if(this.state.price !== undefined){
            if(!pattern.test(this.state.price)){
                priceError="enter number"
            }
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


    async handleSave(event) {
        event.preventDefault()
        const isValid = this.validate()
        if(isValid){
        const updatedProduct = {
            name: this.state.name,
            price: this.state.price,
            quantity: this.state.quantity,
            category: this.state.category,
            brand:this.state.brand,
            image:this.state.image
        }
        await axios.put(`http://localhost:3002/products/${this.state.id}`,updatedProduct).then((responseData) => {
            console.log(responseData)
        })
        this.props.history.push('/products')
    }
    }

    imageHandler(e){
        const reader = new FileReader();
        reader.onload = () => {
            if(reader.readyState === 2)
            {
                this.setState({
                    image : reader.result
                })
            }
        }
        reader.readAsDataURL(e.target.files[0])
    }



    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }


    render() {
        const categoryOption = this.state.categoryList.map((category) => {
            return <option value={category.categoryname} key={category.id}>{category.categoryname}</option>
        })
        return (
            <div className="editproductContainer">
                <form className="editproductform">
                    <div className="row">
                        <div className="column-50">
                            <div className="img-holder">
                                <img src={this.state.image} className="img" alt="" />
                            </div>
                            <input type="file" name="image" accept="image/*" onChange={this.imageHandler} />
                            <p style={{ fontSize: "12", color: 'red' }}>{this.state.imageError}</p>
                        </div>
                        <div className="column-50">
                            <input
                                type="text"
                                name="name"
                                placeholder="ENTER NAME"
                                defaultValue={this.state.name}
                                onChange={this.handleChange}
                            />
                             <p style={{ fontSize: "12", color: 'red' }}>{this.state.nameError}</p>
                            <input
                                type="text"
                                name="price"
                                placeholder="ENTER PRICE"
                                onChange={this.handleChange}
                                defaultValue={this.state.price}
                            />
                             <p style={{ fontSize: "12", color: 'red' }}>{this.state.priceError}</p>
                            <input
                                type="text"
                                name="brand"
                                placeholder="ENTER BRAND"
                                onChange={this.handleChange}
                                defaultValue={this.state.brand}
                            />
                             <p style={{ fontSize: "12", color: 'red' }}>{this.state.brandError}</p>
                            <input
                                type="text"
                                name="quantity"
                                placeholder="ENTER QUANTITY"
                                onChange={this.handleChange}
                                defaultValue={this.state.quantity}
                            />
                             <p style={{ fontSize: "12", color: 'red' }}>{this.state.quantityError}</p>
                            <select name="category" value={this.state.category} onChange={this.handleChange}>
                                <option value="default">CHOOSE A CATEGORY</option>
                                {categoryOption}
                            </select>
                            <p style={{ fontSize: "12", color: 'red' }}>{this.state.categoryError}</p>
                        </div>
                    </div>
                    <br></br>
                    <div className="row">
                        <button type="submit" className="editproduct" onClick={this.handleSave}>SAVE</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default EditModel;