import { createSlice } from '@reduxjs/toolkit';

const newsSlice = createSlice({
	name: 'news',
	initialState: {
		news: [],
		preloadedImages: [],
		displayedArticleId: -1,
		readMore: false,
		rotateShow: true,
		displayReady: false,
		timer: null,
	},
	reducers: {
		setTimer(state, action) {
			// Clear the current timer if it exists
			if (state.timer) {
				clearTimeout(state.timer);
			}
			state.timer = action.payload; // Set the new timer
		},
		clearTimer(state) {
			if (state.timer) {
				clearTimeout(state.timer);
				state.timer = null; // Set timer to null after clearing
			}
		},
		setNews(state, action) {
			state.news = action.payload;
		},
		setPreloadedImages(state, action) {
			state.preloadedImages = action.payload;
		},
		setDisplayedArticleId(state, action) {
			state.displayedArticleId = action.payload;
		},
		setReadMore(state, action) {
			state.readMore = action.payload;
		},
		setRotateShow(state, action) {
			state.rotateShow = action.payload;
		},
		setDisplayReady(state, action) {
			state.displayReady = action.payload;
		},
	},
});

export const {
	setNews,
	setTimer,
	setPreloadedImages,
	setDisplayedArticleId,
	setReadMore,
	setRotateShow,
	setDisplayReady,
	clearTimer,
} = newsSlice.actions;
export const newsReducer = newsSlice.reducer;
