import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import './App.css';

import { getPictures } from './_redux/PicsSlice';
import Slider from './components/Slider/Slider';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPictures());
  }, [])

  return (
    <Slider/>
  );
}

export default App;
