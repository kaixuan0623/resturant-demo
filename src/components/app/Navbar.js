import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Navbar extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    // componentDidMount() {
    //     this.fetchData()
    // }
    //
    // componentDidUpdate(props) {
    //     if (this.props !== props) {
    //         this.fetchData()
    //     }
    // }
    //
    // fetchData = () => {
    //     // let { selectedItems } = this.state
    //     // const userOrderItems = require("../../../assets/data/users.json")
    //
    //     // this.setState({
    //     //     userOrderItems
    //     // })
    // }

    // the following line 39, use Link to prevent re-render, also can set the usersummary variable probably.
    render() {
        return (
            <nav className="navbar">
                <h1>Bryan's Restaurant!</h1>
                <div className="links">
                    {/*<Link to="/" onClick={this.props.setState({ usersummary : true })}>Home</Link>*/}
                    <Link to="/" onClick={this.props.usersummaryToFalse}>Home</Link>
                    {/*<a href='/usersummary' className="" onClick={this.props.summaryHandler}>*/}
                    {/*    User Summary*/}
                    {/*</a>*/}
                    <Link to='/usersummary' onClick={this.props.usersummaryToTrue}>
                        User Summary
                    </Link>
                </div>
            </nav>
        )
    }
}