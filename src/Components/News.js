import PropTypes from "prop-types";
import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import InfiniteScroll from "react-infinite-scroll-component";

import "../Components/comp.css"

export class News extends Component {
	static defaultProps = {
		country: "in",
		pageSize: 6,
	};

	static propTypes = {
		country: PropTypes.string,
		pageSize: PropTypes.number,
	};

	constructor(props) {
		super();
		this.state = {
			articles: [],
			loading: false,
			page: 1,
			totalResult: 0,
		};
		// If you want to change the title
		// document.title= `${this.props.category} - NewsMonkey`
	}

	async fetchNews() {

		try {
			this.props.setProgress(10);
			this.setState({ loading: true });
			let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=1&pageSize=${this.props.pageSize}`;
			let data = await fetch(url);
			let parsedData = await data.json();
			this.setState({
				articles: parsedData.articles || [],
				loading: false,
				page: 1,
				totalResult: parsedData.totalResults,
			});
			this.props.setProgress(100);
		} catch (error) {
			alert(error.message);
			console.error("Error fetching news:", error);
		}
	}

	componentDidMount() {
		this.fetchNews();
	}

	fetchMoreData = async () => {
		this.setState({ page: this.state.page + 1 });
		try {
			this.setState({ loading: true });
			let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}`;
			let data = await fetch(url);
			let parsedData = await data.json();
			this.setState({
				articles: this.state.articles.concat(parsedData.articles),
				loading: false,
				page: 1,
				totalResult: parsedData.totalResults,
			});
		} catch (error) {
			alert(error.message);
			console.error("Error fetching news:", error);
		}
	};

	render() {
		let defaultImage = "public/Images/Defaultimg.jpg";
		const { articles } = this.state;

		return (
			<div className="container my-3">
				<h1 className="text-center">NewsMonkey - Top Headlines</h1>
				<InfiniteScroll
				className="infyCheck"
					dataLength={this.state.articles.length}
					next={this.fetchMoreData}
					hasMore={this.state.articles.length != this.state.totalResult}
					loader={<Spinner />}
				>
					<div className="row mt-5">
						{articles.map((element, index) => (
							<div className="col-md-4 mb-4" key={element.url || `news-${index}`}>
								<NewsItem
									title={element.title || "No Title Available"}
									description={
										element.description || "No Description Available"
									}
									imgUrl={element.urlToImage || defaultImage}
									newsUrl={element?.url || "#"}
									author={element.author === "" ? "Siddharth" : element.author}
									date={new Date(
										element.publishedAt || new Date()
									).toDateString()}
								/>
							</div>
						))}
					</div>
				</InfiniteScroll>
			</div>
		);
	}
}

export default News;
