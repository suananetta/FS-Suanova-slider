import { configureStore } from '@reduxjs/toolkit';
import picsSlice from './PicsSlice';
import settingsSlice from './SettingsSlice';


export default configureStore({
  reducer: {
    pictures: picsSlice,
    settings: settingsSlice
  },
});