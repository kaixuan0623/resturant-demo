import React, { Component } from "react"
import Order from "./order"
import Steps from "./steps"
import Users from "./users"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./app.scss"
import UsersSummary from "./users/users-summary";
import Navbar from './Navbar';

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      course: 0,
      summary: false,
      usersummary: false,
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
        <Router>
        <main className="app">
            <Navbar
                {...this.state}
                usersummaryToTrue={() => {
                    this.setState({ usersummary: true })
                }}
                usersummaryToFalse={() => {
                    this.setState({ usersummary: false })
                }}
            />
            <h1 className="title">
                {this.state.usersummary ? "" : (this.state.summary ? "Your order: " : "大家好，我是Bryan, Welcome to Bryan's Restaurant!")}
            </h1>

                <Route exact path="/">
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
                </Route>

                <Route path="/usersummary">
                    <UsersSummary />
                </Route>

        </main>
        </Router>
    )
  }
}
