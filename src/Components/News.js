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
		};
	}

	async componentDidMount(){
		let url= 'https://newsapi.org/v2/top-headlines?country=us&apiKey=ed4eebc5f7bc4d04b037249a25e39f94'
		let data = await fetch(url);
		let parsedData = await data.json()
		this.setState({articles: parsedData.articles})
	}

	render() {
		return (
			<div className="container my-3">
				<h1>NewsMonkey - Top Headlines</h1>
				<div className="row">
					{this.state.articles.map((element) => {
						return (
							<div className="col-md-4" key={element?.url}>
								<NewsItem
									
									title={element.title == null ? "Today's top Headline" : element.title}
									description={element.description === null ? "Please Click on Read More ..." : element.description}
									imgUrl={element.urlToImage }
									newsUrl={element?.url}
								/>
							</div>
						);
					})}
				</div>
			</div>
		);
	}
}

export default News;
