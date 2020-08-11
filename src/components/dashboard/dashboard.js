import React from 'react';
import './dashboard.css';
import axios from 'axios';
import Chart from './chart/chart'

class Dashboard extends React.Component {

    constructor() {
        super();
        this.state = {
            categoryname: '',
            categoryList: []
        }
        this.setCategory = this.setCategory.bind(this)
        this.addCategory = this.addCategory.bind(this)
    }

    setCategory(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    


    addCategory(e) {
        e.preventDefault();
        const category = {
            categoryname: this.state.categoryname
        }
        axios.post("http://localhost:3002/category", category).then((responseData) => {
            console.log(responseData);
            alert('category added')
        })
        
    }

    render() {
        return (
            <div className="dashboardContainer">
                <div className="addCategoryContainer">
                <input
                    type="text"
                    placeholder="ENTER CATEGORY"
                    name="categoryname"
                    onChange={this.setCategory}
                />
                <button type="button" className="addCategory" onClick={this.addCategory}>Add</button>
                </div>
                <div className="chartContainer">
                <Chart />
                </div>
            </div>
        )
    }
}

export default Dashboard;