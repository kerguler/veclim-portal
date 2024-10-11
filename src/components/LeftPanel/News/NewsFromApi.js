// import news from "assets/texts/news.json";
import { useEffect } from "react";
import { useState } from "react";
import "./News.css";
import { useRef } from "react";
import { useCallback } from "react";
import rightArrow from "assets/icons/arrow-teal-16px.png";
import { useFetchNewsDataQuery } from "store";

const News = ({ width }) => {
	const [readMore, setReadMore] = useState(false);
	const [displayedArticleId, setDisplayedArticleId] = useState(-1);
	const [rotateShow, setRotateShow] = useState(true);
	const timerRef = useRef(null);
	const handleReadMore = (id) => {
		setRotateShow(false);
		clearTimeout(timerRef.current);
		setReadMore((prevReadMore) => !prevReadMore);
	};
	const { isFetching, data, Error } = useFetchNewsDataQuery();

	const goToNexTSlide = useCallback(() => {
		data.forEach((news, index) => {
			if (news.id === displayedArticleId) {
				// console.log({ index });
				if (index < data.length - 1) {
					setDisplayedArticleId(data[index + 1].id);
				} else {
					setDisplayedArticleId(data[0].id);
				}
			}
		});
	}, [displayedArticleId, data]);
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
	let output = null;
	if (isFetching) {
		// console.log("news Loading");
		output = <div>Loading...</div>;
	} else if (Error) {
		// console.log("news Error");
		output = <div>Error</div>;
	} else {
		// console.log("news Data", data);
		if (data && displayedArticleId === -1) {
			setDisplayedArticleId(data[0].id);
		}
		output = (
			<div className="news-wrapper">
				<RenderedContent
					displayedArticleId={displayedArticleId}
					handleLineClick={handleLineClick}
					readMore={readMore}
					handleReadMore={handleReadMore}
					handleReadMoreLink={handleReadMoreLink}
					news={data}
				/>
				<div className="lines-container">
					<RenderedLines
						displayedArticleId={displayedArticleId}
						handleLineClick={handleLineClick}
						news={data}
					/>
				</div>
			</div>
		);
	}
	return output;
};

const RenderedContent = ({
	displayedArticleId,
	handleReadMore,
	handleReadMoreLink,
	news,
}) => {
	if (news === undefined) return <></>;
	// console.log("within rendered content", news);
	let currentNews = null;
	let foundNews = news.filter(
		(newsArticle) => newsArticle.id === displayedArticleId
	);
	// console.log("foundNews", foundNews);
	if (foundNews.length === 0) {
		currentNews = news[0];
	} else {
		currentNews = foundNews[0];
	}
	return (
		<div
			key={currentNews.id}
			className="news-container"
			onClick={() => {
				handleReadMore(currentNews.id);
			}}
		>
			<div
				className="news-container-img"
				style={{
					backgroundImage: `url(${currentNews.image})`,
				}}
			></div>
			<div className="news-title">
				<h1>{currentNews.title}</h1>
			</div>
			<div
				className="read-more-less"
				onClick={() => {
					handleReadMoreLink(currentNews.url);
				}}
			>
				Read more
				<img loading="lazy" alt="right-arrow" src={rightArrow}></img>
			</div>
		</div>
	);
};

const RenderedLines = ({ displayedArticleId, handleLineClick, news }) => {
	if (news === undefined) return <></>;
	// console.log("within rendered lines", news);
	return news.map((article) => {
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
};

export default News;
