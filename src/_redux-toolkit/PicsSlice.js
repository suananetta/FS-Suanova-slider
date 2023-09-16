import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getPicsRequest } from '../_axios/requests';

const initialState = {
    loading: false,
    pics: []
}

export const getPictures = createAsyncThunk(
    'pics/picsRequest',
    async () => {
        const response = await getPicsRequest();
        return response.data;
    }
)

export const picturesSlice = createSlice({
    name: 'picturesSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getPictures.pending, (state) => {state.loading = true;})
            .addCase(getPictures.fulfilled, (state, action) => {
                state.loading = false;
                state.pics = action.payload;
            })
            .addCase(getPictures.rejected, (state, action) => {
                state.loading = false;
                console.log('error');
            })
    }
})

export const {} = picturesSlice.actions;
export default picturesSlice.reducer;