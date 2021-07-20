import React, { Component } from "react"

export default class usersContainer extends Component {
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

  fetchData = () => {
    // let { selectedItems } = this.state
    const userOrderItems = require("../../../assets/data/users.json")

    this.setState({
      userOrderItems
    })
    console.log('Input JSON');
    console.log(userOrderItems);
  }
  render() {
    return (
        <div>

        </div>
    )
  }

  // render() {
  //   return (
  //     <div>
  //     <button className={`button default ${this.props.userorders ? "" : "-hide"}`} onClick={this.props.handleShowOrders}>
  //       Hide all orders
  //     </button>
  //     <button className={`button default ${this.props.userorders ? "-hide" : ""}`} onClick={this.props.handleShowOrders}>
  //       Show all orders
  //     </button>
  //       <ul className={`${this.props.userorders ? "" : "-hide"}`}>
  //         {this.state.userOrderItems.map(data => (
  //           <li>
  //             {
  //             data.name + ": " + data["Hors d oeuvres"] +  ", " +
  //             data["Soup"] +  ", " + data["Fish"] +  ", " +
  //             data["Vegetable"] +  ", " + data["Main Course"] + ", " + data.Dessert
  //             }
  //           </li>
  //         ))}
  //       </ul>
  //     </div>
  //   )
  // }
}
