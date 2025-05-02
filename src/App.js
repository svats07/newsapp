import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar";
import News from "./Components/News";
import LoadingBar from "react-top-loading-bar";

export default class App extends Component {
  state = {
    progress: 0,
  };

  setProgress = (progress) => {
    this.setState({ progress: progress });
  };

  render() {
    return (
      <div>
        <Router>
          <Navbar />
          <LoadingBar color="#f11946" progress={this.state.progress} />
          <Routes>
            <Route
              exact
              path="/home"
              element={
                <News
                  setProgress={this.setProgress}
                  apiKey={process.env.REACT_APP_NEWS_API}
                  country={"in"} // default
                  category={"top"} // default
                />
              }
            />
          </Routes>
        </Router>
      </div>
    );
  }
}
