import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Navbar from "./Components/Navbar";
import News from "./Components/News";
import LoadingBar from "react-top-loading-bar";
export default class App extends Component {
	state = {
		progress: 0
	};
	setProgress=(progress) => {
		this.setState({ progress: progress });
	}

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
								<News setProgress={this.setProgress} apiKey={process.env.REACT_APP_NEWS_API} key="general" country={"us"} category={"general"} />
							}
						/>
						<Route
							exact
							path="/business"
							element={
								<News setProgress={this.setProgress}  apiKey={process.env.REACT_APP_NEWS_API} key="business" country={"us"} category={"business"} />
							}
						/>
						<Route
							exact
							path="/entertainment"
							element={
								<News setProgress={this.setProgress}  apiKey={process.env.REACT_APP_NEWS_API}
									key="entertainment"
									country={"us"}
									category={"entertainment"}
								/>
							}
						/>
						<Route
							exact
							path="/health"
							element={<News setProgress={this.setProgress}  apiKey={process.env.REACT_APP_NEWS_API} key="health" country={"us"} category={"health"} />}
						/>
						<Route
							exact
							path="/science"
							element={
								<News setProgress={this.setProgress} apiKey={process.env.REACT_APP_NEWS_API}  key="science" country={"us"} category={"science"} />
							}
						/>
						<Route
							exact
							path="/sports"
							element={<News setProgress={this.setProgress} apiKey={process.env.REACT_APP_NEWS_API}  key="sports" country={"us"} category={"sports"} />}
						/>
						<Route
							exact
							path="/technology"
							element={
								<News setProgress={this.setProgress} apiKey={process.env.REACT_APP_NEWS_API}  key="technology" country={"us"} category={"technology"} />
							}
						/>
					</Routes>
				</Router>
			</div>
		);
	}
}
