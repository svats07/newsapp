import PropTypes from "prop-types";
import React, { Component } from "react";
import NewsItem from "./NewsItem";

export class News extends Component {
	static propTypes = {};
	constructor() {
		super();
		this.state = {
			articles: [],
			loading: false,
			page: 1,
		};
	}

	async componentDidMount() {
		let url =
			"https://newsapi.org/v2/top-headlines?country=us&apiKey=ed4eebc5f7bc4d04b037249a25e39f94";
		let data = await fetch(url);
		let parsedData = await data.json();
		this.setState({ articles: parsedData.articles });
	}

	handleNextClick = async () => {
		console.log("Next");

		let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=ed4eebc5f7bc4d04b037249a25e39f94&page=${
			this.state.page + 1
		}`;
		let data = await fetch(url);
		let parsedData = await data.json();
		this.setState({ articles: parsedData.articles });
		this.setState({
			page: this.state.page + 1,
		});
	};

	handlePrevClick = () => {
		console.log("Prev");
	};

	render() {
		let defaultImage = "public/Images/Defaultimg.jpg";
		return (
			<div className="container my-3">
				<h1>NewsMonkey - Top Headlines</h1>
				<div className="row">
					{this.state.articles.map((element) => {
						return (
							<div className="col-md-4" key={element?.url}>
								<NewsItem
									title={
										element.title == null
											? "Today's top Headline"
											: element.title
									}
									description={
										element.description === null
											? "Please Click on Read More ..."
											: element.description
									}
									imgUrl={
										element.urlToImage == null
											? defaultImage
											: element.urlToImage
									}
									newsUrl={element?.url}
								/>
							</div>
						);
					})}
				</div>
				<div className="container d-flex justify-content-between">
					<button
						disabled={this.state.page <= 1}
						type="button"
						className="btn btn-dark"
						onClick={this.handlePrevClick}
					>
						&larr; Previous
					</button>
					<button
						type="button"
						className="btn btn-dark"
						onClick={this.handleNextClick}
					>
						Next &rarr;
					</button>
				</div>
			</div>
		);
	}
}

export default News;
