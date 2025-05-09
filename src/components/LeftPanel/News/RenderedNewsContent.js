import rightArrow from 'assets/icons/arrow-teal-16px.png';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import {
	setDisplayedArticleId,
	setRotateShow,
	setTimer,
	clearTimer,
	setReadMore,
} from 'store';

const RenderedNewsContent = () => {
	const news = useSelector((state) => state.news.news);
	const displayedArticleId = useSelector(
		(state) => state.news.displayedArticleId,
	);
	const rotateShow = useSelector((state) => state.news.rotateShow);
	const displayReady = useSelector((state) => state.news.displayReady);
	const dispatch = useDispatch();

	// Create the array of pre-rendered JSX elements
	const newsArray =
		news &&
		news.map((article) => {
			return (
				<div key={article.id} className='news-container'>
					<div
						className='news-container-img'
						style={{ backgroundImage: `url(${article.image})` }}
					></div>
					<div className='news-title'>
						<h1>{article.title}</h1>
					</div>
					<div
						className='read-more-less'
						onClick={() => handleReadMoreLink(article.url)}
					>
						Read more
						<img
							loading='lazy'
							alt='right-arrow'
							src={rightArrow}
						/>
					</div>
				</div>
			);
		});

	useEffect(() => {
		if (rotateShow && displayReady) {
			const goToNextSlide = () => {
				const currentIndex = news.findIndex(
					(item) => item.id === displayedArticleId,
				);
				const nextIndex =
					currentIndex < news.length - 1 ? currentIndex + 1 : 0;
				dispatch(setDisplayedArticleId(news[nextIndex].id));
			};

			const timerId = setTimeout(goToNextSlide, 3500);
			dispatch(setTimer(timerId));

			return () => {
				dispatch(clearTimer());
			};
		}
	}, [rotateShow, displayReady, news, displayedArticleId, dispatch]);

	const handleReadMoreLink = (url) => {
		dispatch(setRotateShow(false));
		dispatch(clearTimer());
		dispatch(setReadMore(true));
		window.open(url, '_blank', 'noreferrer');
	};

	if (!displayReady) {
		return <div>Loading images, please wait...</div>; // Show loading message or spinner while preloading
	}

	const currentIndex = news.findIndex(
		(article) => article.id === displayedArticleId,
	);

	// Render the current JSX element from `newsArray`
	return newsArray[currentIndex];
};

export default RenderedNewsContent;
