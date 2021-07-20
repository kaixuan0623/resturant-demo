import React, { Component } from "react"
import getCourseItems from "../../../utils/courseItem"
import getItemIndex from "../../../utils/itemIndex"
import OrderView from "./order-view"
import OrderSummary from "./order-summary"
import Grid from "@material-ui/core/Grid"
import { useHistory } from "react-router-dom";

export default class OrderContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      courseItems: [],
      selectedItems: {},
      username: ""
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
    let { selectedItems } = this.state
    const jsonData = require("../../../assets/data/fe-tech-data.json")
    const courseItems = getCourseItems(jsonData, this.props.course)

    if (Object.entries(selectedItems).length === 0) {
      jsonData.map(res => {
        /* Add empty arrays for each course to add items later */
        return (selectedItems[res.courseType[0]] = [])
      })
    }
    this.setState({
      courseItems,
      selectedItems
    })
  }

  handleItems = (id, itemTitle) => {
    let { selectedItems } = this.state
    const { course } = this.props
    const item = { id: id, title: itemTitle }

    if (selectedItems[course].length !== 0) {
      let index = selectedItems[course].findIndex(item => item.id === id)
      let index2 = getItemIndex(selectedItems[course], id)
      console.log(index+" "+index2)
      /* If index is not negative delete the item */
      if (index >= 0) {
        selectedItems[course].splice(index, 1)
        this.setState({
          selectedItems
        })
        return
      }
    }

    selectedItems[course].push(item)

    this.setState({
      selectedItems
    })
  }

  handleNextCourse = () => {
    const { selectedItems } = this.state
    const { course } = this.props
    if (Object.keys(selectedItems).length - 1 !== course) {
      /* Check if at least one item is selected in main couse */
      if (course === 4) {
        if (selectedItems[course].length === 0) {
          alert("Select at least one item from this course.")
          return
        }
      }
      this.props.changeCourse(course + 1)
    } else {
      this.props.summaryHandler()
    }
  }

  handleChangeOrder = () => {
    this.props.changeCourse()
    this.props.summaryHandler()
  }

  handleSubmit = async (e) => {
    // TODO: figure out a better way to redirect to /usersummary once POST request succeed
    e.preventDefault();  // remove this after adding a POST request
    const titles = ["Hors d oeuvres", "Soup", "Fish", "Vegetable", "Main Course", "Dessert"];
    let doc = {
      name: this.state.username,
    }

    for (let i = 0; i < titles.length; i++) {
      if (this.state.selectedItems[i].length > 0) {
        doc[titles[i]] = this.state.selectedItems[i][0]["title"];
      } else {
        doc[titles[i]] = "";
      }
    }

    // make a POST request to an endpoint from say JSON server
    await fetch("http://localhost:3001/orders", {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(doc)
    })
    // window.location.replace("http://localhost:3000/usersummary");
    window.location.replace(window.location.protocol + '//' + window.location.host + "/usersummary");
  }

  render() {
    if (this.props.summary) {
      return (
        <div className="summary-container">
          <OrderSummary selectedItems={this.state.selectedItems} />
          <button className="button default" onClick={this.handleChangeOrder}>
            Change order
          </button>
          <form onSubmit={this.handleSubmit}>
            <label for="fname">Your name:</label><br/>
            <input type="text" id="username" name="username"
                   onChange={(e) => this.setState({ username: e.target.value })}
            />
            <br/>
            {/*The following two are both vaild submit button*/}
            {/*<input className="button default" type="submit" value="Submit your order!"/>*/}
            <button className="button default">Submit your order!</button>
          </form>
        </div>
      )
    } else {
      return (
        <div className="order-container">
          <Grid container spacing={3}>
            <OrderView
              {...this.state}
              course={this.props.course}
              itemHandler={this.handleItems}
            />
          </Grid>
          <button className="button default" onClick={this.handleNextCourse}>
            {Object.keys(this.state.selectedItems).length - 1 !==
            this.props.course
              ? "Next course"
              : "Show complete order"}
          </button>
        </div>
      )
    }
  }
}
