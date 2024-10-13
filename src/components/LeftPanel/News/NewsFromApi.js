// import news from "assets/texts/news.json";
import { useEffect } from "react";
import { useState } from "react";
import "./News.css";
import { useRef } from "react";
import { useCallback } from "react";
import rightArrow from "assets/icons/arrow-teal-16px.png";
import { useFetchNewsDataQuery } from "store";
import { CircularProgress } from "material-ui";
import Skeleton from "components/skeleton/Skeleton";

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
	const [preloadedImages, setPreloadedImages] = useState([]);

	const goToNexTSlide = useCallback(() => {
		data &&
			preloadedImages.length > 0 &&
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
	}, [displayedArticleId, data, preloadedImages]);
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

	useEffect(() => {
		if (data) {
			const preloadImages = async () => {
				const images = [];
				let icount = 0;
				data.map(async (news, index) => {
					const img = new Image();
					img.src = news.image; // Preload the image

					await img.decode(); // Wait for the image to load
					images.push({ img: img, index: index, id: news.id }); // Store preloaded image in state
				});

				setPreloadedImages(images);
			};
			preloadImages();
		}
	}, [data]);

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
	console.log("RERENDER NEWS COMPONENT");
	useEffect(() => {
		if (data && displayedArticleId === -1) {
			setDisplayedArticleId(data[0].id);
		}
	}, [data, displayedArticleId, preloadedImages]);
	let output = null;
	if (isFetching) {
		// console.log("news Loading");
		output = (
			<div className="news-wrapper">
				<div className="news-container">
					<Skeleton times={6} noBorder={true} />
					<h3>Loading</h3>{" "}
				</div>
			</div>
		);
	} else if (Error) {
		// console.log("news Error");
		output = <div>Error</div>;
	} else {
		// console.log("news Data", data);

		output =
			preloadedImages.length > 0 ? (
				<div className="news-wrapper">
					<RenderedContent
						displayedArticleId={displayedArticleId}
						handleLineClick={handleLineClick}
						readMore={readMore}
						handleReadMore={handleReadMore}
						handleReadMoreLink={handleReadMoreLink}
						news={data}
						images={preloadedImages}
					/>
					<div className="lines-container">
						<RenderedLines
							displayedArticleId={displayedArticleId}
							handleLineClick={handleLineClick}
							news={data}
						/>
					</div>
				</div>
			) : (
				<div className="news-wrapper">
					<div className="news-container">
						<Skeleton times={6} noBorder={true} />
						<h3>Rendering</h3>{" "}
					</div>
					<div className="lines-container">
						{" "}
						<RenderedLines
							displayedArticleId={displayedArticleId}
							handleLineClick={handleLineClick}
							news={data}
						/>{" "}
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
	preloadedImages,
}) => {
	if (news === undefined) return <></>;
	if (preloadedImages && preloadedImages.length === 0) return <></>;
	let imageNow = null;
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
		imageNow =
			preloadedImages &&
			preloadedImages.filter((im) => im.id === currentNews.id)[0].img;
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
					backgroundImage: imageNow
						? `url(${imageNow})`
						: `url(${currentNews.image})`,
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
