import { configureStore } from '@reduxjs/toolkit';
import picsSlice from './PicsSlice';


export default configureStore({
  reducer: {
    pictures: picsSlice
  },
});