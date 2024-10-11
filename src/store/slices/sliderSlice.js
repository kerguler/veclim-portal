import { createSlice } from "@reduxjs/toolkit";
function calculateStyle(
	newBotPos,
	newTopPos,
	arrowColor,
	initialSize,
	backgroundColor,
	foregroundColor
) {
	let style = {
		background: `linear-gradient(
	to bottom, 
	${backgroundColor} ${(newTopPos / initialSize) * 100}%, 
	${arrowColor[1]} ${(newTopPos / initialSize) * 100}%, 
	${arrowColor[1]} ${((newTopPos + 10) / initialSize) * 100}%, 
	${arrowColor[2]} ${((newTopPos + 10) / initialSize) * 100}%, 
	${arrowColor[2]} ${((newBotPos - 10) / initialSize) * 100}%,
	${arrowColor[0]} ${((newBotPos - 10) / initialSize) * 100}%,
	${arrowColor[0]} ${(newBotPos / initialSize) * 100}%,
	${backgroundColor} ${(newBotPos / initialSize) * 100}%			
	)`,
		height: `${initialSize}px`,
	};
	return style;
}
const initialState = {
	foregroundColor: "#000000",
	backgroundColor: "#ffffff",
	initialSize: 0,
	isDragging: [false, false],
	padPositions: [0, 0, {}],
	range: [0, 0],
	limits: [0, 0],
	foregroundDrag: false,
	refPoint: 0,
	offsetValue: [0, 0],
	activeRange: [0, 0],
	arrowColors: [
		"var(--primary-color2)",
		"var(--primary-color2)",
		"var(--primary-color1)",
	],
};

const sliderSlice = createSlice({
	name: "sliderSlice",
	initialState,
	reducers: {
		stopAllDrag(state, action) {
			state.isDragging = [false, false];
			state.foregroundDrag = false;
			state.arrowColors = [
				"var(--primary-color2)",
				"var(--primary-color2)",
				"var(--primary-color1)",
			];
			state.padPositions = [
				state.padPositions[0],
				state.padPositions[1],
				calculateStyle(
					state.padPositions[0],
					state.padPositions[1],
					state.arrowColors,
					state.initialSize,
					state.backgroundColor,
					state.foregroundColor
				),
			];
		},
		foreGroundMove(state, action) {
			let arrowColors = [
				"var(--primary-color2)",
				"var(--primary-color2)",
				"var(--risk-item-1)",
			];
			state.arrowColors = arrowColors;
			let newY = action.payload;
			let newBotPos, newTopPos, dtop, dbot;

			let offsetValue = state.offsetValue;
			let padPositions = state.padPositions;
			let displacement = newY - offsetValue[0];

			dtop = offsetValue[0] - padPositions[1];
			dbot = padPositions[0] - offsetValue[0];

			let padDiff = padPositions[0] - padPositions[1];
			state.offsetValue = [newY, padDiff];
			newBotPos = padPositions[0] + displacement;
			newTopPos = padPositions[1] + displacement;
			newTopPos = newY - dtop;
			newBotPos = newY + dbot;

			if (newTopPos < 0) {
				newTopPos = 0;
				newBotPos = newTopPos + padDiff;
			}
			if (newBotPos > state.initialSize) {
				newBotPos = state.initialSize;
				newTopPos = newBotPos - padDiff;
			}

			newBotPos = Math.min(newBotPos, state.initialSize);
			newTopPos = Math.max(newTopPos, 0);
			const rangeIncrement =
				(state.limits[1] - state.limits[0]) / state.initialSize;

			if (newBotPos - newTopPos === padDiff) {
				let style = calculateStyle(
					newBotPos,
					newTopPos,
					arrowColors,
					state.initialSize,
					state.backgroundColor,
					state.foregroundColor
				);
			
				let range = state.range;
				state.range = [
					range[0] - (-state.padPositions[0] + newBotPos) * rangeIncrement,
					range[1] + (state.padPositions[1] - newTopPos) * rangeIncrement,
				];
				state.padPositions = [newBotPos, newTopPos, style];
			} else if (displacement > 0) {
				newBotPos = state.initialSize;
				newTopPos = state.initialSize - padDiff;
				let style = calculateStyle(
					newBotPos,
					newTopPos,
					arrowColors,
					state.initialSize,
					state.backgroundColor,
					state.foregroundColor
				);
				state.range = [newBotPos * rangeIncrement, newTopPos * rangeIncrement];
				state.padPositions = [newBotPos, newTopPos, style];
			} else if (displacement < 0) {
				newTopPos = 0;
				newBotPos = padDiff;
				let style = calculateStyle(
					newBotPos,
					newTopPos,
					arrowColors,
					state.initialSize,
					state.backgroundColor,
					state.foregroundColor
				);

				state.range = [newBotPos * rangeIncrement, newTopPos * rangeIncrement];
				state.padPositions = [newBotPos, newTopPos, style];
				
			}
		},
		bottomPadMove(state, action) {
			const rangeIncrement =
				(state.limits[1] - state.limits[0]) / state.initialSize;
			let newY = action.payload;
			let padPositions = state.padPositions;
			newY = Math.max(newY, padPositions[1] + 10); // Prevent collapse
			newY = Math.min(newY, state.initialSize); // Prevent moving beyond the bottom limit
			state.range = [state.limits[1] - newY * rangeIncrement, state.range[1]];
			state.arrowColors = [
				"var(--risk-item-1)",
				"var(--primary-color2)",
				state.foregroundColor,
			];
			let style = calculateStyle(
				newY,
				padPositions[1],

				state.arrowColors,
				state.initialSize,
				state.backgroundColor,
				state.foregroundColor
			);

			state.padPositions = [newY, padPositions[1], style];
		},
		topPadMove(state, action) {
			const rangeIncrement =
				(state.limits[1] - state.limits[0]) / state.initialSize;
			state.arrowColors = [
				"var(--primary-color2)",
				"var(--risk-item-1)",
				state.foregroundColor,
			];
			let newY = action.payload;
			let padPositions = state.padPositions;

			newY = Math.min(newY, padPositions[0] - 10); // Prevent collapse
			newY = Math.max(newY, 0); // Prevent moving beyond the top limit
			state.range = [state.range[0], state.limits[1] - newY * rangeIncrement];

			let style = calculateStyle(
				padPositions[0],
				newY,
				state.arrowColors,
				state.initialSize,
				state.backgroundColor,
				state.foregroundColor
			);

			state.padPositions = [padPositions[0], newY, style];
		},

		setActiveRange(state, action) {
			const rangeIncrement =
				(state.limits[1] - state.limits[0]) / state.initialSize;
			let newBotPos = state.initialSize - action.payload[0] / rangeIncrement;
			let newTopPos = state.initialSize - action.payload[1] / rangeIncrement;
			let arrowColors = state.arrowColors;
			let style = calculateStyle(
				newBotPos,
				newTopPos,
				arrowColors,
				state.initialSize,
				state.backgroundColor,
				state.foregroundColor
			);
			state.activeRange = action.payload;
			state.padPositions = [newBotPos, newTopPos, style];
			state.range = action.payload;
		},
		setArrowColors(state, action) {
			state.arrowColors = action.payload;
		},
		setOffsetValue(state, action) {
			state.offsetValue = action.payload;
		},
		setRefPoint(state, action) {
			state.refPoint = action.payload;
		},
		setForeGroundDrag(state, action) {
			state.foregroundDrag = action.payload;
		},
		setForegroundColor(state, action) {
			state.foregroundColor = action.payload;
		},
		setBackgroundColor(state, action) {
			state.backgroundColor = action.payload;
		},
		setLimits(state, action) {
			state.limits = action.payload;
		},
		setInitialSize(state, action) {
			state.initialSize = action.payload;
		},
		setIsDragging(state, action) {
			state.isDragging = action.payload;
		},
		setPadPositions(state, action) {
			state.padPositions = action.payload;
		},
		setRange(state, action) {
			state.range = action.payload;
		},
	},
});

export const {
	setRefPoint,
	setForeGroundDrag,
	setInitialSize,
	setIsDragging,
	setPadPositions,
	setLimits,
	setRange,
	setForegroundColor,
	setBackgroundColor,
	setOffsetValue,
	setActiveRange,
	setArrowColors,
	foreGroundMove,
	bottomPadMove,
	topPadMove,
	stopAllDrag,
} = sliderSlice.actions;
export const sliderReducer = sliderSlice.reducer;
