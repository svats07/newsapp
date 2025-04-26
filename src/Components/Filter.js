import React, { Component } from "react";
import Select from "react-dropdown-select";
import data from "./../Constants/Constant.json";

export class Filter extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedCountry: [],
			selectedCategory: [],
			selectedLanguage: [],
		};
	}

	componentDidMount() {
		const modal = new window.bootstrap.Modal(document.getElementById("exampleModal"));
		modal.show();
		this.modal = modal;
	}

	render() {
		const { selectedCountry, selectedCategory, selectedLanguage } = this.state;

		return (
			<div
				className="modal fade show"
				id="exampleModal"
				tabIndex="-1"
				aria-labelledby="exampleModalLabel"
				style={{ display: "block" }}
			>
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<h1 className="modal-title fs-5" id="exampleModalLabel">
								Choose Filters
							</h1>
							<button
								type="button"
								className="btn-close"
								data-bs-dismiss="modal"
								aria-label="Close"
								onClick={() => this.modal.hide()}
							></button>
						</div>
						<div className="modal-body">
							<div className="mb-3">
								<label className="form-label">Country</label>
								<Select
									options={data.countries}
									labelField="name"
									valueField="code"
									placeholder="Select Country"
									values={selectedCountry}
									onChange={(values) => this.setState({ selectedCountry: values })}
								/>
							</div>

							<div className="mb-3">
								<label className="form-label">Category</label>
								<Select
									options={data.categories}
									labelField="name"
									valueField="code"
									placeholder="Select Category"
									values={selectedCategory}
									onChange={(values) => this.setState({ selectedCategory: values })}
								/>
							</div>

							<div className="mb-3">
								<label className="form-label">Language</label>
								<Select
									options={data.languages}
									labelField="name"
									valueField="code"
									placeholder="Select Language"
									values={selectedLanguage}
									onChange={(values) => this.setState({ selectedLanguage: values })}
								/>
							</div>
						</div>
						<div className="modal-footer">
							<button
								type="button"
								className="btn btn-primary"
								onClick={() => {
									console.log("Selected Filters:", this.state);
									this.modal.hide();
								}}
							>
								Save changes
							</button>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Filter;
