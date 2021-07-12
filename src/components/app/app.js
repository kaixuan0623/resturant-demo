import React, { Component } from "react"
import Order from "./order"
import Steps from "./steps"
import Users from "./users"

import "./app.scss"

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      course: 0,
      summary: false,
      userorders: true,
    }
  }

  handleCourse = (course = 0) => {
    this.setState({ course })
  }

  handleSummary = () => {
    this.setState({ summary: !this.state.summary })
  }

  handleShowOrders = () => {
    this.setState({ userorders: !this.state.userorders })
  }

  render() {
    return (
      <main className="app">
        <h1 className="title">
          {this.state.summary ? "Your order: " : "大家好，我是Bryan, Welcome to Bryan's Restaurant!"}
        </h1>
        <h2 className="title">
        {this.state.summary ? "" : "Here is the Menu, enjoy!"}
        </h2>
        <Steps
          {...this.state}
          changeCourse={this.handleCourse}
          summaryHandler={this.handleSummary}
        />
        <Order
          {...this.state}
          changeCourse={this.handleCourse}
          summaryHandler={this.handleSummary}
        />
        <Users
        {...this.state}
        handleShowOrders={this.handleShowOrders}
        />
      </main>
    )
  }
}
