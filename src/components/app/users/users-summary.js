import React, { Component } from "react"

export default class usersSummary extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userOrderItems: []
        }
    }

    componentDidMount() {
        this.fetchData()
    }

    componentDidUpdate(props) {
        if (this.props !== props) {
            this.fetchData()
        }
    }

    fetchData = async () => {
        // let { selectedItems } = this.state
        // const userOrderItems = require("../../../assets/data/order.json")["orders"]

        let uri = "http://localhost:3001/orders";
        const res = await fetch(uri);
        const userOrderItems = await res.json();

        this.setState({
            userOrderItems
        })
    }

    render() {
        return (
            <div>
                <h2>Users Summary</h2>
                <ul>
                    {this.state.userOrderItems.map(data => (
                        <li>
                            <h3>{data.name}</h3>
                            <p>{data["Hors d oeuvres"]}</p>
                            <p>{data.Soup}</p>
                            <p>{data.Fish}</p>
                            <p>{data.Vegetable}</p>
                            <p>{data["Main Course"]}</p>
                            <p>{data.Dessert}</p>
                        </li>
                    ))}
                </ul>
            </div>
        )
    }
}