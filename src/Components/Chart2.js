import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { data2 } from "../data";
import Loading from "./Loading";

export default class Chart2 extends React.Component {
  state = {
    chart1Categories: [],
    chart1Response: [],
    startDate: "",
    endDate: "",
    dataToFetch: data2,
  };
  componentDidMount() {
    // this.setState({
    //   startDate: this.props.calStartDate,
    //   endDate: this.props.calEndDate,
    // });
    this.getData();
  }

  getData = () => {
    let arr1 = [];
    let arr2 = [];
    fetch("https://sigviewauth.sigmoid.io/api/v1/getData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": this.props.token,
      },
      body: JSON.stringify(this.state.dataToFetch),
    })
      .then((result) => result.json())
      .then((response) => {
        response.result.data.forEach((res) => {
          arr1.push(res.appSiteId);
          arr2.push(parseInt(res.impressions_offered));
        });
        return [arr1, arr2];
      })
      .then((data) =>
        this.setState({
          chart1Categories: data[0],
          chart1Response: data[1],
          startDate: this.props.calStartDate,
          endDate: this.props.calEndDate,
        })
      )
      .catch((e) => console.log("fetching chart2 getting error!please check"));
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleClick = () => {
    const { startDate, endDate } = this.state;

    if (startDate && endDate) {
      data2.chartObject.requestParam.dateRange.startDate = new Date(
        new Date(startDate).toGMTString()
      )
        .getTime()
        .toString();
      data2.chartObject.requestParam.dateRange.endDate = new Date(
        new Date(endDate).toGMTString()
      )
        .getTime()
        .toString();
      this.setState({ dataToFetch: data2 }, () => this.getData());
    }
  };

  render() {
    var chartOptions = {
      chart: {
        type: "line",
      },
      title: {
        text: "Chart 2",
      },
      xAxis: {
        categories: this.state.chart1Categories,
        title: {
          text: null,
        },
      },
      series: [
        {
          name: "Impressions Offered",
          data: this.state.chart1Response,
        },
      ],
    };

    const renderGraph =
      this.state.chart1Categories.length > 0 ? (
        <HighchartsReact highcharts={Highcharts} options={chartOptions} />
      ) : (
        <Loading />
      );
    return (
      <>
        <div className="input-group mb-1 alignCenter">
          <label htmlFor="start">Start date:</label>
          <input
            className="inputDates"
            type="date"
            id="start"
            name="startDate"
            value={this.state.startDate}
            min={this.props.calStartDate}
            max={this.props.calEndDate}
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
            min={this.props.calStartDate}
            max={this.props.calEndDate}
            onChange={this.handleChange}
          />
          <button
            type="button"
            className="btn btn-outline-dark btn-sm"
            style={{ borderRadius: "5px" }}
            onClick={this.handleClick}
          >
            Search
          </button>
        </div>
        {renderGraph}
      </>
    );
  }
}
