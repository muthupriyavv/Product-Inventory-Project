import React from 'react';
import axios from 'axios';
import './editmodel.css'

class EditModel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            name: '',
            price: '' ,
            category: '',
            quantity: '',
            brand:'',
            image: '' ,
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


    async handleSave(event) {
        event.preventDefault()
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
            <div className="editContainer">
                <form className="editproductform">
                    <div className="row">
                        <div className="col-50">
                            <div className="img-holder">
                                <img src={this.state.image} className="img" alt="" />
                            </div>
                            <input type="file" name="image" accept="image/*" onChange={this.imageHandler} />
                        </div>
                        <div className="col-50">
                            <input
                                type="text"
                                name="name"
                                placeholder="ENTER NAME"
                                defaultValue={this.state.name}
                                onChange={this.handleChange}
                            />
                            <input
                                type="text"
                                name="price"
                                placeholder="ENTER PRICE"
                                onChange={this.handleChange}
                                defaultValue={this.state.price}
                            />
                            <input
                                type="text"
                                name="brand"
                                placeholder="ENTER BRAND"
                                onChange={this.handleChange}
                                defaultValue={this.state.brand}
                            />
                            <input
                                type="text"
                                name="quantity"
                                placeholder="ENTER QUANTITY"
                                onChange={this.handleChange}
                                defaultValue={this.state.quantity}
                            />
                            <select name="category" value={this.state.category} onChange={this.handleChange}>
                                <option value="default">CHOOSE A CATEGORY</option>
                                {categoryOption}
                            </select>
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