// import news from "assets/texts/news.json";
import { useEffect } from 'react';
import './News.css';
import { useFetchNewsDataQuery } from 'store';
import Skeleton from 'components/skeleton/Skeleton';
import RenderedNewsContent from './RenderedNewsContent';
import RenderedLines from './RenderedLines';
import { useDispatch, useSelector } from 'react-redux';
import { setDisplayReady } from 'store';
import { setDisplayedArticleId } from 'store';
import { setNews } from 'store';

const News = ({ width }) => {
  const dispatch = useDispatch();
  const { isFetching, data, error, refetch } = useFetchNewsDataQuery();
  const displayedArticleId = useSelector(
    (state) => state.news.displayedArticleId
  );
  const displayReady = useSelector((state) => state.news.displayReady);

  useEffect(() => {
    if (data) {
      dispatch(setNews(data));
      if (data.length > 0 && data[0]?.image) {
        let firstReady = false;
        data.forEach((article, idx) => {
          if (!article.image) return;
          const img = new Image();
          const markFirstReady = () => {
            if (idx === 0 && !firstReady) {
              firstReady = true;
              dispatch(setDisplayReady(true));
            }
          };
          img.onload = markFirstReady;
          img.onerror = markFirstReady;
          img.src = article.image;
        });
      } else {
        dispatch(setDisplayReady(true));
      }
    }
  }, [data, dispatch]);

  useEffect(() => {
    if (data && data.length > 0 && displayedArticleId === -1) {
      dispatch(setDisplayedArticleId(data[0].id));
    }
  }, [data, dispatch, displayedArticleId]);
  let output = null;

  if (isFetching) {
    output = <Loader />;
  } else if (error) {
    output = (
      <div className="news-wrapper">
        <div className="news-container news-error">
          <p>Couldn't load the latest news.</p>
          <button type="button" className="news-retry" onClick={refetch}>
            Retry
          </button>
        </div>
      </div>
    );
  } else {
    output = (
      <div className="news-wrapper">
        <RenderedNewsContent />
        {displayReady && (
          <div className="lines-container">
            <RenderedLines />
          </div>
        )}
      </div>
    );
  }
  return output;
};

export default News;

const Loader = () => {
  return (
    <div className="news-wrapper">
      <div className="news-container">
        <Skeleton className="news-skeleton-img" times={1} noBorder={true} />
      </div>
    </div>
  );
};
