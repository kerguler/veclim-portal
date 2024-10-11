import news from "assets/texts/news.json";
import { useEffect } from "react";
import { useState } from "react";
import "./News.css";
import { useRef } from "react";
import { useCallback } from "react";
import rightArrow from "assets/icons/arrow-teal-16px.png";
import { set } from "react-ga";

const News = ({ width }) => {
	const [readMore, setReadMore] = useState(false);
	const [displayedArticleId, setDisplayedArticleId] = useState(1);
	const [rotateShow, setRotateShow] = useState(true);
	const timerRef = useRef(null);
	const handleReadMore = (id) => {
		setRotateShow(false);
		clearTimeout(timerRef.current);
		setReadMore((prevReadMore) => !prevReadMore);
	};

	const handleReadMoreLink = (url) => {
		setRotateShow(false);
		clearTimeout(timerRef.current);
		setReadMore((prevReadMore) => !prevReadMore);
		window.open(url, "_blank", "noreferrer");
	};

	const handleLineClick = (id) => {
		setReadMore(false);
		setDisplayedArticleId(id);
		setRotateShow(!rotateShow);
		clearTimeout(timerRef.current);
		if (!rotateShow) clearTimeout(timerRef.current);
	};

	const goToNexTSlide = useCallback(() => {
		setDisplayedArticleId(
			displayedArticleId < news.length ? displayedArticleId + 1 : 1
		);
	}, [displayedArticleId]);

	useEffect(() => {
		const setTimerCallback = () => {
			goToNexTSlide();
			setReadMore(false);
		};
		const clearTimerCallback = () => {
			clearTimeout(timerRef.current); // Clear the timeout when the component unmounts
		};

		if (rotateShow) {
			timerRef.current = setTimeout(setTimerCallback, 3000);
		} else {
			clearTimerCallback();
		}
		return clearTimerCallback;
	}, [goToNexTSlide, rotateShow]);

	return (
		<div className="news-wrapper">
			<RenderedContent
				displayedArticleId={displayedArticleId}
				handleLineClick={handleLineClick}
				readMore={readMore}
				handleReadMore={handleReadMore}
				handleReadMoreLink={handleReadMoreLink}
			/>
			<div className="lines-container">
				<RenderedLines
					// news={news}
					displayedArticleId={displayedArticleId}
					handleLineClick={handleLineClick}
				/>
			</div>
		</div>
	);
};

const RenderedContent = ({
	displayedArticleId,
	handleLineClick,
	readMore,
	handleReadMore,
	handleReadMoreLink,
}) => {

	const temp = news.map((newsArticle) => {
		if (newsArticle.id !== displayedArticleId) {
			return null;
		}
		let images = require.context("assets/images/news", true);
		let image = images(newsArticle.Image);
		return (
			<div
				key={newsArticle.id}
				className="news-container"
				onClick={() => {
					handleReadMore(newsArticle.id);
				}}
			>
				<div
					className="news-container-img"
					style={{
						backgroundImage: `url(${image})`,
					}}
				></div>
				<div className="news-title">
					<h1>{newsArticle.Title}</h1>
				</div>
				<div
					className="read-more-less"
					onClick={() => {
						handleReadMoreLink(newsArticle.url);
					}}
				>
					Read more
					<img loading="lazy" alt="right-arrow" src={rightArrow}></img>
				</div>
			</div>
		);
	});
	return temp;
};

const RenderedLines = ({ displayedArticleId, handleLineClick }) => {

	let temp = news.map((article) => {
		const selected = article.id === displayedArticleId;
		return (
			<div
				onClick={() => handleLineClick(article.id)}
				key={article.id}
				className={selected ? "lines-selected" : "lines"}
			>
				{" "}
			</div>
		);
	});
	return temp;
};

export default News;
