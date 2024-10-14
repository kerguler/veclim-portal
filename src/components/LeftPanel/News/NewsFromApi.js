// import news from "assets/texts/news.json";
import { useEffect } from "react";
import "./News.css";
import { useFetchNewsDataQuery } from "store";
import Skeleton from "components/skeleton/Skeleton";
import RenderedNewsContent from "./RenderedNewsContent";
import RenderedLines from "./RenderedLines";
import { useDispatch, useSelector } from "react-redux";
import { setDisplayReady } from "store";
import { setDisplayedArticleId } from "store";
import { setNews } from "store";

const News = ({ width }) => {
	const dispatch = useDispatch();
	const { isFetching, data, Error } = useFetchNewsDataQuery();
	const displayedArticleId = useSelector(
		(state) => state.news.displayedArticleId
	);

	useEffect(() => {
		if (data) {
			dispatch(setNews(data));
			dispatch(setDisplayReady(true));
		}
	}, [data, dispatch]);

	useEffect(() => {
		if (data && displayedArticleId === -1) {
			dispatch(setDisplayedArticleId(data[0].id));
		}
	}, [data, dispatch, displayedArticleId]);
	let output = null;

	if (isFetching) {
		output = <Loader text="loading" />;
	} else if (Error) {
		output = <div>There was an error fetching news</div>;
	} else {
		output = (
			<div className="news-wrapper">
				<RenderedNewsContent />
				<div className="lines-container">
					<RenderedLines />
				</div>
			</div>
		);
	}
	return output;
};

export default News;

const Loader = ({ text }) => {
	return (
		<div className="news-wrapper">
			<div className="news-container">
				<Skeleton times={6} noBorder={true} />
				<h3>{text}</h3>{" "}
			</div>
			<div className="lines-container">
				{" "}
				<RenderedLines />{" "}
			</div>
		</div>
	);
};
