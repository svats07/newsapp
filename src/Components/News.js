import PropTypes from "prop-types";
import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";

export class News extends Component {
	static defaultProps  = {
		country: 'in',
		pageSize: 8,
	};

	static propTypes = {
		country: PropTypes.string,
		pageSize: PropTypes.number,
	};
	constructor() {
		super();
		this.state = {
			articles: [],
			loading: false,
			page: 1,
		};
	}

	async componentDidMount() {
		try {
			if (this.state.loading) return;
			this.setState({
				loading: true,
			});
			let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=ed4eebc5f7bc4d04b037249a25e39f94&pageSize=${this.props.pageSize}`;
			let data = await fetch(url);
			let parsedData = await data.json();
			this.setState({
				articles: parsedData.articles,
				totalArticles: parsedData.totalResults,
				page: 1,
				loading: false,
			});
		} catch (error) {
			alert(error.message);
			console.error("Error fetching news:", error);
		}
	}

	handleNextClick = async () => {
		try {
			let maxPages = Math.ceil(this.state.totalArticles / this.props.pageSize);

			if (this.state.page >= maxPages) {
				return;
			}
			this.setState({
				loading: true,
			});
			let url = `https://newsapi.org/v2/top-headlines?country=${
				this.props.country
			}&category=${this.props.category}&apiKey=ed4eebc5f7bc4d04b037249a25e39f94&page=${
				this.state.page + 1
			}&pageSize=${this.props.pageSize}`;
			let data = await fetch(url);
			let parsedData = await data.json();
			if (data.ok) {
				
				this.setState({
					articles: parsedData.articles,
					page: this.state.page + 1,
					loading: false,
				});
			}
		} catch (error) {
			alert(error.message);
			console.error("Error fetching news HandleNextClick:", error);
		}
	};

	handlePrevClick = async () => {
		try {
			this.setState({
				loading: true,
			});
			let url = `https://newsapi.org/v2/top-headlines?country=${
				this.props.country
			}&category=${this.props.category}&apiKey=ed4eebc5f7bc4d04b037249a25e39f94&page=${
				this.state.page - 1
			}&pageSize=${this.props.pageSize}`;
			let data = await fetch(url);
			if (data.ok) {
				let parsedData = await data.json();
				this.setState({
					articles: parsedData.articles,
					page: this.state.page - 1,
					loading: false,
				});
			}
		} catch (error) {
			alert(error.message);
			console.error("Error fetching news HandlePrevClick:", error);
		}
	};

	render() {
		let defaultImage = "public/Images/Defaultimg.jpg";
		return (
			<div className="container my-3">
				<h1 className="text-center">NewsMonkey - Top Headlines</h1>
				{this.state.loading && <Spinner />}
				<div className="row mt-5">
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
						disabled={
							this.state.page >=
							Math.ceil(this.state.totalArticles / this.props.pageSize)
						}
					>
						Next &rarr;
					</button>
				</div>
			</div>
		);
	}
}

export default News;
