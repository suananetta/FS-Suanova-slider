import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './App.css';

import { getPictures } from './_redux-toolkit/PicsSlice';
import { identifyDevice, switchArrows } from './_redux-toolkit/SettingsSlice';
import { useResize } from './_hooks/useResize';
import Loader from './_shared/Loader/Loader';
import Slider from './components/Slider/Slider';

function App() {
  const dispatch = useDispatch();
  const picsData = useSelector((state) => state.pictures);
  
  useEffect(() => {
    dispatch(getPictures());
  }, [])

  let screenW = useResize();

  useEffect(() => {
    if(screenW < 600 && screenW >= 360) {
      dispatch(identifyDevice('mobile'));
      dispatch(switchArrows(false));
    } else if(screenW < 1024 && screenW >= 600) {
      dispatch(identifyDevice('tablet'));
      dispatch(switchArrows(true));
    } else if(screenW >= 1024) {
      dispatch(identifyDevice('desktop'));
      dispatch(switchArrows(true));
    } 
  }, [screenW])

  return (
    <main>
      {
        picsData.loading || picsData.pics.length === 0? 
          <Loader/>
          :
          <Slider/>
      }
    </main>
  );
}

export default App;
