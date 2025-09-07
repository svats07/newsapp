import PropTypes from "prop-types";
import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import InfiniteScroll from "react-infinite-scroll-component";
import Filter from "./Filter";
import filterIcon from "./../filter.svg";
import { Link } from "react-router-dom";
import "../Components/comp.css";

export class News extends Component {
	static defaultProps = {
		country: "in",
		pageSize: 6,
		category: "business",
	};

	static propTypes = {
		country: PropTypes.string,
		pageSize: PropTypes.number,
		category: PropTypes.string,
		apiKey: PropTypes.string.isRequired,
		setProgress: PropTypes.func.isRequired,
	};

	constructor(props) {
		super(props);
		this.state = {
			allArticles: [],
			visibleArticles: [],
			loading: false,
			openFilter: false,
			appliedCountry: props.country,
			appliedCategory: props.category,
			appliedLanguage: "",
			currentIndex: 0,
			chunkSize: props.pageSize || 6,
		};
	}

	componentDidMount() {
		this.fetchNews();
		window.addEventListener("resetFilters", this.resetFiltersHandler);
	}

	componentWillUnmount() {
		window.removeEventListener("resetFilters", this.resetFiltersHandler);
	}

	resetFiltersHandler = () => {
		this.setState(
			{
				appliedCountry: this.props.country,
				appliedCategory: this.props.category,
				appliedLanguage: "",
				currentIndex: 0,
				visibleArticles: [],
			},
			() => this.fetchNews(true)
		);
	};

	toggleFilter = () => {
		this.setState((prevState) => ({ openFilter: !prevState.openFilter }));
	};

	fetchNews = async (reset = true) => {
		const { apiKey, setProgress } = this.props;
		const { appliedCountry, appliedCategory, appliedLanguage } = this.state;

		try {
			setProgress(10);
			this.setState({ loading: true });

			let url = `https://newsdata.io/api/1/news?apikey=${apiKey}&country=${appliedCountry}&category=${appliedCategory}`;
			if (appliedLanguage) url += `&language=${appliedLanguage}`;

			let response = await fetch(url);
			let data = await response.json();
			let results = data.results || [];

			this.setState({
				allArticles: results,
				visibleArticles: results.slice(0, this.state.chunkSize),
				currentIndex: this.state.chunkSize,
				loading: false,
			});

			setProgress(100);
		} catch (error) {
			console.error("Error fetching news:", error);
			alert("Failed to load news.");
			this.setState({ loading: false });
		}
	};

	fetchMoreData = () => {
		const { allArticles, visibleArticles, currentIndex, chunkSize } =
			this.state;

		if (allArticles.length === 0) return;

		let nextIndex = currentIndex + chunkSize;
		let moreArticles = [];

		if (nextIndex >= allArticles.length) {
			// Loop back to start
			moreArticles = allArticles.slice(0, chunkSize);
			this.setState({
				visibleArticles: visibleArticles.concat(moreArticles),
				currentIndex: chunkSize,
			});
		} else {
			moreArticles = allArticles.slice(currentIndex, nextIndex);
			this.setState({
				visibleArticles: visibleArticles.concat(moreArticles),
				currentIndex: nextIndex,
			});
		}
	};

	handleApplyFilters = ({ country, category, language }) => {
		this.setState(
			{
				appliedCountry: country,
				appliedCategory: category,
				appliedLanguage: language,
				openFilter: false,
				currentIndex: 0,
				visibleArticles: [],
			},
			() => this.fetchNews(true)
		);
	};

	render() {
		const { visibleArticles, openFilter, loading } = this.state;
		const defaultImage = "/Images/Defaultimg.jpg";

		return (
			<div className="container my-3">
					<h1
						className="containerHead position-sticky"
						style={{ marginTop: "80px", cursor: "pointer" }}
						onClick={() => {
							window.dispatchEvent(new Event("resetFilters"));
						}}
					>
						<Link
							to="/home"
							style={{ textDecoration: "none", color: "inherit" }}
						>
							NewsMonkey - Top Headlines
						</Link>
					</h1>

					<div className="d-flex align-items-center justify-content-end position-sticky">
						<img src={filterIcon} alt="Filter" width={24} height={24} />
						<button className="filterBtn" onClick={this.toggleFilter}>
							FILTER
						</button>
					</div>
						
				<InfiniteScroll
					className="infyCheck"
					dataLength={visibleArticles.length}
					next={this.fetchMoreData}
					hasMore={true}
					loader={<Spinner />}
				>
					<div className="row mt-5">
						{visibleArticles.length > 0 ? (
							visibleArticles.map((element, index) => (
								<div className="col-md-4 mb-4" key={element.url || index}>
									<NewsItem
										title={element.title || "No Title"}
										description={element.description || "No Description"}
										imgUrl={element.image_url || element.icon || defaultImage}
										newsUrl={element.link || "#"}
										author={element.creator || "Unknown"}
										date={new Date(
											element.pubDate || new Date()
										).toDateString()}
									/>
								</div>
							))
						) : !loading ? (
							<h5 className="text-center">
								No news found for selected filters.
							</h5>
						) : null}
					</div>
				</InfiniteScroll>

				{openFilter && (
					<div className="container mt-5 pt-5">
						<Filter onApplyFilters={this.handleApplyFilters} />
					</div>
				)}
			</div>
		);
	}
}

export default News;
