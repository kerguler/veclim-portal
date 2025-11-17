import { createSlice } from '@reduxjs/toolkit';
import { ALL_VECTORS } from 'vectors/registry';

const allIds = ALL_VECTORS.map((vec) => vec.id);
const vectorSelectorSlice = createSlice({
  name: 'vector',
  initialState: {
    vectorName: allIds[0],
    vectorNames: allIds,
    mapVector: allIds[0],
  },
  reducers: {
    setMapVector(state, action) {
      state.mapVector = action.payload;
    },
    setVectorName(state, action) {
      state.vectorName = action.payload;
    },
  },
});
export const { setVectorName, setMapVector } = vectorSelectorSlice.actions;
export const vectorSelectorReducer = vectorSelectorSlice.reducer;
