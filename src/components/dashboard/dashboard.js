import React from 'react';
import './dashboard.css';
import axios from 'axios';
import { Chart } from "react-google-charts";

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
                <div style={{ display: 'flex' , marginLeft:"100px"}}>
                    <Chart
                        width={'500px'}
                        height={'300px'}
                        chartType="BarChart"
                        loader={<div>Loading Chart</div>}
                        data={[
                            ['Brands', 'Quantity'],
                            ['Samsung', 1000],
                            ['Vivo',2000],
                            ['Hp',6000],
                            ['Dell',3000],
                            ['Lenovo',1000],
                        ]}
                        options={{
                            title: 'Product Stock',
                            chartArea: { width: '50%' },
                            hAxis: {
                                title: 'Total Stock',
                                minValue: 0,
                            },
                            vAxis: {
                                title: 'Brand',
                            },
                        }}
                        // For tests
                        rootProps={{ 'data-testid': '1' }}
                    />
                </div>
            </div>
        )
    }
}

export default Dashboard;