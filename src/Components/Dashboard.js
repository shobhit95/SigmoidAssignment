import React from "react";
import Chart1 from "./Chart1";
import Chart2 from "./Chart2";
import Chart3 from "./Chart3";

export default class Dashboard extends React.Component {
  state = {
    calStartDate: "",
    calEndDate: "",
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
          calStartDate: stDate,
          calEndDate: enDate,
        });
      })
      .catch((e) => console.log("date cannot be fetched. Retry."));
  }

  formatDate = (dateVal) => {
    let dateObj = new Date(parseInt(dateVal)).toUTCString();
    let dateObj2 = new Date(dateObj);
    return `${dateObj2.getFullYear()}-0${
      dateObj2.getMonth() + 1
    }-0${dateObj2.getDate()}`;
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
          <div className="row">
            <div className="col-md-4 graph1Style">
              <Chart1 token={this.props.token} {...this.state} />
            </div>
            <div className="col-md-8">
              <Chart2 token={this.props.token} {...this.state}></Chart2>
              <hr />
              <Chart3 token={this.props.token}></Chart3>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
