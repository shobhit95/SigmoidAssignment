import React from "react";
import Chart1 from "./Chart1";
import Chart2 from "./Chart2";
import Chart3 from "./Chart3";

export default class Dashboard extends React.Component {
  state = {
    startDate: "",
    endDate: "",
    isDateChanged: false,
    changedStartDate: "",
    changedEndDate: "",
  };
  componentDidMount() {
    fetch("https://sigviewauth.sigmoid.io/api/v1/getDateRange", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": this.props.token,
      },
      body: JSON.stringify({ organization: "DemoTest", view: "Auction" }),
    })
      .then((result) => result.json())
      .then((response) => {
        let stDate = this.formatDate(response.result.startDate);
        let enDate = this.formatDate(response.result.endDate);
        this.setState({
          startDate: stDate,
          endDate: enDate,
        });
      })
      .catch((e) => console.log("date cannot be fetched. Retry."));
  }

  formatDate = (dateVal) => {
    let dateObj = new Date(parseInt(dateVal));
    return `${dateObj.getFullYear()}-0${dateObj.getMonth()}-0${dateObj.getDate()}`;
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleClick = () => {
    const { startDate, endDate } = this.state;
    if (startDate && endDate) {
      this.setState({
        isDateChanged: true,
        changedStartDate: startDate,
        changedEndDate: endDate,
      });
    }
  };

  render() {
    return (
      <div>
        <nav className="navbar navbar-dark bg-dark">
          <h3 style={{ color: "#FFF", padding: "0px 20px" }}>Dashboard</h3>
        </nav>
        <div className="container-fluid" style={{ paddingTop: "20px" }}>
          <div className="input-group mb-1 alignCenter">
            <label htmlFor="start">Start date:</label>
            <input
              className="inputDates"
              type="date"
              id="start"
              name="startDate"
              value={this.state.startDate}
              min={this.state.startDate}
              max={this.state.endDate}
              onChange={this.handleChange}
            />
            &nbsp;&nbsp;
            <label htmlFor="start">End date:</label>
            <input
              className="inputDates"
              type="date"
              id="start"
              name="endDate"
              value={this.state.endDate}
              min={this.state.startDate}
              max={this.state.endDate}
              onChange={this.handleChange}
            />
            <button
              disabled
              type="button"
              className="btn btn-outline-dark btn-sm"
              style={{ borderRadius: "5px" }}
              onClick={this.handleClick}
            >
              Search
            </button>
          </div>

          <div className="row">
            <div className="col-md-4 graph1Style">
              <Chart1 token={this.props.token} {...this.state} />
            </div>
            <div className="col-md-8">
              <Chart2 token={this.props.token}></Chart2>
              <hr />
              <Chart3 token={this.props.token}></Chart3>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
