import { createSlice } from "@reduxjs/toolkit";
import { useFetchCoordinateDataQuery } from "../apis/coordinatesApi";
const user =createSlice({
    name : "users",
    initialState: {
        lon: 0,
        lat: 0,
        dataDate:"2020-02-28",
        photoPeriod:11.32,
        temperature:  14,
        albopictus: [{
            dataset: "",
            citation: "",
            locations: ""
        }]
    },
  
})