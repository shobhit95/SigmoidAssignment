import React from "react";
import { data1 } from "../data";
import Loading from "./Loading";

export default class Chart1 extends React.Component {
  state = { chart1Response: [], startDate: "", endDate: "" };
  componentDidMount() {
    this.getData();
    this.setState({
      startDate: this.props.startDate,
      endDate: this.props.endDate,
    });
  }

  getData = () => {
    fetch("https://sigviewauth.sigmoid.io/api/v1/getData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": this.props.token,
      },
      body: JSON.stringify(data1),
    })
      .then((result) => result.json())
      .then((response) =>
        this.setState({ chart1Response: response.result.data })
      )
      .catch((e) => console.log("fetching chart1 getting error!please check"));
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    const { chart1Response } = this.state;
    return (
      <>
        {chart1Response.length > 0 ? (
          <>
            <h4 style={{ textAlign: "center" }}>Chart1</h4>
            <table className="table table-hover ">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Publisher Id</th>
                  <th scope="col">Impressions Offered</th>
                </tr>
              </thead>
              <tbody>
                {chart1Response.map((i, index) => (
                  <tr key={Math.random()}>
                    <th scope="row">{index + 1}</th>
                    <td>{i.publisherId}</td>
                    <td>{i.impressions_offered}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        ) : (
          <Loading />
        )}
      </>
    );
  }
}
