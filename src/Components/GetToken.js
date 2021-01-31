import React from "react";

class GetToken extends React.Component {
  generateToken = () => {
    const data = {
      email: "candidate@sigmoid.com",
      password: "Sigmoid@123",
      rememberMe: true,
    };
    fetch("https://sigviewauth.sigmoid.io/signIn", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        this.props.setToken(data.token);
      })
      .catch((e) => console.log("something wnet wrong while getting token"));
  };

  render() {
    return (
      <div
        className="container-fluid"
        id="landingPage"
        style={{ background: "#515e7b" }}
      >
        <div className="row">
          <h1 style={{ textAlign: "center", color: "white" }}>
            Welcome to the Dashboard!
          </h1>
          <div className="alignCenter">
            <button
              type="button"
              className="btn btn-primary btn-lg btn-block"
              onClick={this.generateToken}
              style={{ width: "50%" }}
            >
              Get Started&nbsp;&nbsp;
              <i className="fa fa-arrow-right"></i>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default GetToken;
