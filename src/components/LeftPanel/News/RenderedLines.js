import { useDispatch } from "react-redux";
import { setRotateShow } from "store";
import { setDisplayedArticleId } from "store";
import { setReadMore } from "store";
import { useSelector } from "react-redux";
import { setTimer } from "store";
import { clearTimer } from "store";
const RenderedLines = () => {
	const dispatch = useDispatch();
	const timer = useSelector((state) => state.news.timer);
	const news = useSelector((state) => state.news.news);
	const displayedArticleId = useSelector(
		(state) => state.news.displayedArticleId
	);
	const rotateShow = useSelector((state) => state.news.rotateShow);
	const handleLineClick = (id) => {
		dispatch(setReadMore(false));
		dispatch(setDisplayedArticleId(id));
		dispatch(setRotateShow(!rotateShow));
		if (timer) {
			dispatch(clearTimer());
		}
	};
	if (news === undefined) return <></>;

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

export default RenderedLines;
