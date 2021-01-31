import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { data3 } from "../data";
import Loading from "./Loading";

export default class Chart3 extends React.Component {
  state = {
    chart1Response: [],
    hoverData: null,
  };
  componentDidMount() {
    let arr = [];
    fetch("https://sigviewauth.sigmoid.io/api/v1/getData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": this.props.token,
      },
      body: JSON.stringify(data3),
    })
      .then((result) => result.json())
      .then((response) => {
        response.result.data.map((res) =>
          arr.push({ name: res.advertiserId, y: parseInt(res.CM001_percent) })
        );
        return arr;
      })
      .then((data) => this.setState({ chart1Response: data }))
      .catch((e) => console.log("fetching chart3 getting error!please check"));
  }

  render() {
    var chartOptions = {
      chart: {
        type: "pie",
      },
      title: {
        text: "Chart 3",
      },
      series: [
        {
          name: "CM001_percent",
          data: this.state.chart1Response,
        },
      ],
    };
    const renderGraph =
      this.state.chart1Response.length > 0 ? (
        <HighchartsReact highcharts={Highcharts} options={chartOptions} />
      ) : (
        <Loading />
      );
    return <>{renderGraph}</>;
  }
}
