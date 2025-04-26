import React, { Component } from "react";
import Select from "react-dropdown-select";

export class Filter extends Component {
	componentDidMount() {
		const modal = new window.bootstrap.Modal(
			document.getElementById("exampleModal")
		);
		modal.show();
	}

	render() {
		return (
			<div
				className="modal fade"
				id="exampleModal"
				tabIndex="-1"
				aria-labelledby="exampleModalLabel"
				aria-hidden="true"
			>
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<h1 className="modal-title fs-5" id="exampleModalLabel">
								Choose Country and Category For the News
							</h1>
							<button
								type="button"
								className="btn-close"
								data-bs-dismiss="modal"
								aria-label="Close"
							></button>
						</div>
						<div className="modal-body">
							<div>
								<label htmlFor="exampleDataList" className="form-label">
									Country
								</label>
								<Select
									// options={data.countries}
									labelField="name"
									valueField="code"
									placeholder="Select Country"
									// values={selectedCountry}
									// onChange={setSelectedCountry}
									style={{ minWidth: "200px" }}
								/>
							</div>
							<div>
								<label htmlFor="exampleDataList" className="form-label">
									Category
								</label>
								<Select
									// options={data.countries}
									labelField="name"
									valueField="code"
									placeholder="Select Country"
									// values={selectedCountry}
									// onChange={setSelectedCountry}
									style={{ minWidth: "200px" }}
								/>
							</div>
							<div>
								<label htmlFor="exampleDataList" className="form-label">
									Languages
								</label>
								<Select
									// options={data.countries}
									labelField="name"
									valueField="code"
									placeholder="Select Country"
									// values={selectedCountry}
									// onChange={setSelectedCountry}
									style={{ minWidth: "200px" }}
								/>
							</div>
						</div>
						<div className="modal-footer">
							<button type="button" className="btn btn-primary">
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
