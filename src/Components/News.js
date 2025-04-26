import PropTypes from "prop-types";
import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import InfiniteScroll from "react-infinite-scroll-component";

import "../Components/comp.css";

export class News extends Component {
    static defaultProps = {
        country: "in",
        pageSize: 6,
        category: "business", // added a default category
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
            articles: [],
            loading: false,
            page: 1,
            totalResult: 0,
        };
    }

    async fetchNews() {
        try {
            this.props.setProgress(10);
            this.setState({ loading: true });

            let url = `https://newsdata.io/api/1/sources?apiKey=${this.props.apiKey}&country=${this.props.country}&category=${this.props.category}`;
            let data = await fetch(url);
            let parseDatas = await data.json();
            let parsedData = parseDatas.results;

            this.setState({
                articles: parsedData || [],
                loading: false,
                totalResult: parseDatas.totalResults || 0,
            });
            this.props.setProgress(100);
        } catch (error) {
            alert(error.message);
            console.error("Error fetching news:", error);
            this.setState({ loading: false });
        }
    }

    componentDidMount() {
        this.fetchNews();
    }

    fetchMoreData = async () => {
        try {
            this.setState({ page: this.state.page + 1, loading: true });

            let url = `https://newsdata.io/api/1/sources?apiKey=${this.props.apiKey}&country=${this.props.country}&category=${this.props.category}`;
            let data = await fetch(url);
            let parseDatas = await data.json();
            let parsedData = parseDatas.results;

            this.setState({
                articles: this.state.articles.concat(parsedData || []),
                loading: false,
                totalResult: parseDatas.totalResults || 0,
            });
        } catch (error) {
            alert(error.message);
            console.error("Error fetching more news:", error);
            this.setState({ loading: false });
        }
    };

    render() {
        const { articles } = this.state;
        const defaultImage = "/Images/Defaultimg.jpg"; // corrected default image path

        return (
            <div className="container my-3">
                <h1 className="containerHead" style={{ marginTop: '80px' }}>
                    NewsMonkey - Top Headlines
                </h1>

                <InfiniteScroll
                    className="infyCheck"
                    dataLength={articles.length}
                    next={this.fetchMoreData}
                    hasMore={articles.length < this.state.totalResult}
                    loader={<Spinner />}
                >
                    <div className="row mt-5">
                        {articles && articles.length > 0 ? (
                            articles.map((element, index) => (
                                <div className="col-md-4 mb-4" key={element.url || index}>
                                    <NewsItem
                                        title={element.title || "No Title Available"}
                                        description={element.description || "No Description Available"}
                                        imgUrl={element.icon || defaultImage}
                                        newsUrl={element.url || "#"}
                                        author={element.author || "Siddharth"}
                                        date={new Date(element.publishedAt || new Date()).toDateString()}
                                    />
                                </div>
                            ))
                        ) : (
                            !this.state.loading && (
                                <h5 className="text-center">No news articles found.</h5>
                            )
                        )}
                    </div>
                </InfiniteScroll>
            </div>
        );
    }
}

export default News;
