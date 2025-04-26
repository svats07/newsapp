import React, { Component } from "react";

export class Filter extends Component {
	componentDidMount() {
		const modal = new window.bootstrap.Modal(
			document.getElementById("exampleModal")
		);
		modal.show();
	}

	render() {
		const categories = [
			"business",
			"crime",
			"domestic",
			"education",
			"entertainment",
			"environment",
			"food",
			"health",
			"lifestyle",
			"other",
			"politics",
			"science",
			"sports",
			"technolog",
			"top",
			"tourism",
			"world",
		];
		
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
								<input
									className="form-control"
									list="datalistOptions"
									id="exampleDataList"
									placeholder="Type to search..."
								/>
								<datalist id="datalistOptions">
									<option value="San Francisco" />
									<option value="New York" />
									<option value="Seattle" />
									<option value="Los Angeles" />
									<option value="Chicago" />
								</datalist>
							</div>
							<div>
								<label htmlFor="exampleDataList" className="form-label">
									Category
								</label>
								<input
									className="form-control"
									list="datalistOptions"
									id="exampleDataList"
									placeholder="Type to search..."
								/>
								<datalist id="datalistOptions">
									<option value="San Francisco" />
									<option value="New York" />
									<option value="Seattle" />
									<option value="Los Angeles" />
									<option value="Chicago" />
								</datalist>
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
