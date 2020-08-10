import React from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';

class Chart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categoryselected: '',
            categoryList: [],
            chartData: {

            }
        }

        this.setCategory = this.setCategory.bind(this)
        this.getAllCategory = this.getAllCategory.bind(this)
        this.getAllCategory();
    }

    setCategory(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    getAllCategory() {
        axios.get("http://localhost:3002/category").then((responseData) => {
            this.setState({
                categoryList: responseData.data
            })
        })
    }

    componentDidUpdate() {
        let name = [];
        let stock = [];
        axios.get("http://localhost:3002/products?category=" + this.state.categoryselected).then((responseData) => {
            for (const productObj of responseData.data) {
                name.push(productObj.name)
                stock.push(productObj.quantity)
            }
            this.setState({
                chartData: {
                    labels: name,
                    datasets: [{
                        label: 'Stock Availability',
                        data: stock,
                        backgroundColor: ['steelblue', '#000A0', '#2B60DE', 'steelblue', '#000A0', '#2B60DE']
                    }]
                }
            })
        })

    }

    render() {
        const categoryOption = this.state.categoryList.map((category) => {
            return <option key={category.id}>{category.categoryname}</option>
        })
        return (
            <div className="mainChartContainer">
                <select name="categoryselected" onChange={this.setCategory}>
                    {categoryOption}
                </select>
                <Bar
                    data={this.state.chartData}
                    width={300}
                    height={200}
                />
            </div>
        );
    }
}

export default Chart;