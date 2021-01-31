import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { data2 } from "../data";
import Loading from "./Loading";

export default class Chart2 extends React.Component {
  state = {
    chart1Categories: [],
    chart1Response: [],
  };
  componentDidMount() {
    let arr1 = [];
    let arr2 = [];
    fetch("https://sigviewauth.sigmoid.io/api/v1/getData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": this.props.token,
      },
      body: JSON.stringify(data2),
    })
      .then((result) => result.json())
      .then((response) => {
        response.result.data.map((res) => {
          arr1.push(res.appSiteId);
          arr2.push(parseInt(res.impressions_offered));
        });
        return [arr1, arr2];
      })
      .then((data) =>
        this.setState({
          chart1Categories: data[0],
          chart1Response: data[1],
        })
      )
      .catch((e) => console.log("fetching chart2 getting error!please check"));
  }

  render() {
    var chartOptions = {
      chart: {
        type: "bar",
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
    return <>{renderGraph}</>;
  }
}
