import React, { Component } from "react";
import "../Components/comp.css"

export class NewsItem extends Component {
	static propTypes = {};


	render() {
		let { title, description, imgUrl,newsUrl,date,author} = this.props;
		return (
			<div className="my-3">
				<div className="card">
					<img src={imgUrl} className="news-img" alt="..." />
					<div className="card-body">
						<h5 className="card-title">{title}...</h5>
						<p className="card-text">{description}...</p>
						<p class="card-text"><small class="text-body-secondary">By {author} on {date}</small></p>
						<a href={newsUrl} target="_blank" className="btn btn-sn btn-dark" rel="noreferrer">
							Read More
						</a>
					</div>
				</div>
			</div>
		);
	}
}

export default NewsItem;
