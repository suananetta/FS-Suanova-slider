import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    dots: true,
    arrows: true,
    autoPlay: true,
    device: 'mobile'
}

export const settingsSlice = createSlice({
    name: 'settingsSlice',
    initialState,
    reducers: {
        identifyDevice(state, action) {
            state.device = action.payload;
        },
        switchArrows(state, action) {
            state.arrows = action.payload;
        },
    }
})

export const { identifyDevice, switchArrows } = settingsSlice.actions;
export default settingsSlice.reducer;