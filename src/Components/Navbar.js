import React, { Component } from "react";
import { Link } from "react-router-dom";
import Filter from "./Filter";

export class Navbar extends Component {
	
	constructor(props) {
		super(props);
		this.state = {
		  openFilter: false
		};
		this.toggleFilter = this.toggleFilter.bind(this);
	  }
	
	  toggleFilter() {
		this.setState((prevState) => ({
		  openFilter: !prevState.openFilter
		}));
	  }
	  
	render() {
		return (
			<div>
				<nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
					<div className="container-fluid">
						<Link className="navbar-brand" to="/home">
							NewsMonkey
						</Link>
						<button
							className="navbar-toggler"
							type="button"
							data-bs-toggle="collapse"
							data-bs-target="#navbarSupportedContent"
							aria-controls="navbarSupportedContent"
							aria-expanded="false"
							aria-label="Toggle navigation"
						>
							<span className="navbar-toggler-icon"></span>
						</button>
						<div
							className="collapse navbar-collapse"
							id="navbarSupportedContent"
						>
							<ul className="navbar-nav me-auto mb-2 mb-lg-0">
								<li className="nav-item">
									<Link className="nav-link" to="/business">
										Business
									</Link>
								</li>
								<li className="nav-item">
									<Link className="nav-link" to="/entertainment">
										Entertainment
									</Link>
								</li>
								<li className="nav-item">
									<Link className="nav-link" to="/health">
										Health
									</Link>
								</li>
								<li className="nav-item">
									<Link className="nav-link" to="/science">
										Science
									</Link>
								</li>
								<li className="nav-item">
									<Link className="nav-link" to="/sports">
										Sports
									</Link>
								</li>
								<li className="nav-item">
									<Link className="nav-link" to="/technology">
										Technology
									</Link>
								</li>
								<li className="nav-item">
									<button
										className="nav-link btn btn-link text-decoration-none"
										onClick={this.toggleFilter}
									>
										Filter
									</button>
								</li>
							</ul>
						</div>
					</div>
				</nav>
				<div className="container mt-5 pt-5">
					{this.state.openFilter && <Filter />}
				</div>
			</div>
		);
	}
}

export default Navbar;
