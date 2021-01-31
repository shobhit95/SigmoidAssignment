import React from "react";
import "./App.css";
import Dashboard from "./Components/Dashboard";
import GetToken from "./Components/GetToken";
import ErrorComponent from "./Components/ErrorComponent";

class App extends React.Component {
  state = {
    token: "",
  };
  // token:
  // "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIyLUNLbUlmd3RCemo2UFl2cVIyM3BRUVg0UlVNZFZSRFhaTzNHU1lnY055c2Ewcm9mQUFsOWwwTWtDK0dDS1lBaEl3RWM5N1NqTUFwNUdQSE1JY21mZ0xyVnltVHo4OStVZ0lWUk0rUFBlV3l1RnRBPT0iLCJpc3MiOiJyYWh1bGt1bWFyIiwiZXhwIjoxNjEyMTA2MTY1LCJpYXQiOjE2MTIwMTk3NjUsImp0aSI6IjU3ZTg5YmNiYjJjYWI5OTA3N2M4YWVhMTY2YmM2NDI1OTUwNTgzYjkxNzFjZGFlMDQwNzE5NGIzYmRhODYwMjA3NTU0YzAxZGQ4MDg0NjUyYWY5NTU1MTc5ZmYzMjNlMjAyNTRjOTZmZDAxNjRiZDdkNWE3ZDM3MzFlZDdkNGNmNWQwODE1Y2E5NTAyZjVkMzRlODI5Y2M2MWYwZjQ2MTEzYzJhNDBhYTUzMDkxODNjYjgxYTFjYTQwMzA5NTNkYTJkOGNjOTljMGE5NWVkYzdiMjg1NzJhYTcyZThiNDkxYjNmMTI4OTQ1ZGU4MDg3MzM0YTUwODI1YmQxNmNhZjYifQ.0uW83-Bc4lzwcdcibE57-NL94fHIlBAcAp5huKg-Zzs",

  setToken = (tokenRxd) => {
    this.setState({ token: tokenRxd });
  };

  render() {
    return (
      <div className="App">
        <ErrorComponent>
          {this.state.token ? (
            <Dashboard token={this.state.token} />
          ) : (
            <GetToken setToken={this.setToken} />
          )}
        </ErrorComponent>
      </div>
    );
  }
}

export default App;
