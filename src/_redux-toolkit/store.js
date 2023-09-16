import { configureStore } from '@reduxjs/toolkit';
import picturesSlice from './PicsSlice';
import settingsSlice from './SettingsSlice';


export default configureStore({
  reducer: {
    pictures: picturesSlice,
    settings: settingsSlice
  },
});