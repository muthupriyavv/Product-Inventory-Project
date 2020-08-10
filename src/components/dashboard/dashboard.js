import React from 'react';
import './dashboard.css';
import axios from 'axios';

class Dashboard extends React.Component {

    constructor() {
        super();
        this.state = {
            categoryname: ''
        }
        this.setCategory = this.setCategory.bind(this)
        this.addCategory = this.addCategory.bind(this)
    }

    setCategory(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    addCategory() {
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
            <div>
                <br></br>
                <div className="dashboardContainer">
                    <div className="row">
                        <div className="col">
                            <input
                                type="text"
                                placeholder="ENTER CATEGORY"
                                name="categoryname"
                                className="inputCategory"
                                onChange={this.setCategory}
                            />
                        </div>
                        <div className="col">
                            <button type="button" className="addCategory" onClick={this.addCategory}>Add</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Dashboard;