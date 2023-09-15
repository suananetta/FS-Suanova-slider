// import uniqid from 'uniqid';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styles from './styles/styles.min.css';

import Button from '../../_shared/Button/Button';
import Loader from '../../_shared/Loader/Loader';
import { switchArrows } from '../../_redux-toolkit/SettingsSlice';
// import { getPictures } from '../../_redux-toolkit/PicsSlice';

function Slider() {
    const dispatch = useDispatch();

    const picsData = useSelector((state) => state.pictures);
    const settingsData = useSelector((state) => state.settings);
    // console.log(settingsData);
    let [currentSlide, setCurrentSlide] = useState(0);
    let [playAuto, setPlayAuto] = useState(false);
    console.log(playAuto);
    let interval;
    let dots = document.querySelectorAll('.dot');

    let arrowBack = <span className="material-symbols-outlined">arrow_back_ios</span>;
    let arrowForward = <span className="material-symbols-outlined">arrow_forward_ios</span>;
    let autoPlay = <span className="material-symbols-outlined">autoplay</span>;

    let pictures = JSON.parse(localStorage.getItem('pictures'));

    useEffect(() => {
        if(!picsData.loading || picsData.pics.length > 0) {
            document.querySelector('.active').addEventListener('touchend', () => {
                slideForward();
            })
        }
    }, [currentSlide])

    useEffect(() => {
           interval = setInterval(() => {
                slideForward();
            }, 3000);
            // clearInterval(interval);
    }, [[], currentSlide])
    
    let slideForward = () => {
        let nextSlide = currentSlide + 1 >= picsData.pics.length? 0 : currentSlide + 1;  

        document.querySelector('.active').classList.remove('active');
        document.querySelector('.item' + nextSlide).classList.add('active');

        setCurrentSlide(nextSlide)

        for(let dot of dots) {
            dot.id === document.querySelector('.active').id? dot.classList.add('active') : dot.classList.remove('active');
        }  
    }

    let slideBack = () => {
        let nextSlide = currentSlide - 1 < 0 ? picsData.pics.length - 1 : currentSlide - 1;  

        document.querySelector('.active').classList.remove('active');
        document.querySelector('.item' + nextSlide).classList.add('active');
        
        setCurrentSlide(nextSlide)

        for(let dot of dots) {
            dot.id === document.querySelector('.active').id? dot.classList.add('active') : dot.classList.remove('active');
        }  
    }

    let handleArrowClick = (e) => {
        // setPlayAuto(false);
        // clearInterval(interval);

        if (e.currentTarget.className.includes('forward')) {
            slideForward()
        } 
        
        if (e.currentTarget.className.includes('back')) {
            slideBack()
        }      
    }

    let handleDotClick = (e) => {
        // setPlayAuto(false);
        // clearInterval(interval);

        document.querySelector('.active').classList.remove('active');
        document.getElementById(e.target.id).classList.add('active');

        let currentDotSlide = +document.getElementById(e.target.id).getAttribute('index');
        setCurrentSlide(currentDotSlide);

        for(let dot of dots) {
            dot.id === document.querySelector('.active').id? dot.classList.add('active') : dot.classList.remove('active');
        }       
    }

    return (
        <div className='slider-block'> 
            <div className='slider-body'>
                {settingsData.arrows?
                    <Button 
                        btnClass='arrow back' 
                        btnName={arrowBack} 
                        onClick={(e)=>{handleArrowClick(e)}}
                    />
                    :
                    <></>
                }
                {
                    picsData.loading || picsData.pics.length === 0? 
                        <Loader/>
                        :
                        pictures.map((img, index) => {
                            return (
                                <div key={img.id} className={`slider-content item${index} ${index === 0? 'active' : ''}`} id={img.id} index={index}>
                                    <div className='slider-img' style={{backgroundImage: `url(${img.urls.full})`}}></div>
                                    <span>{img.alt_description}</span>
                                </div>
                            )
                        })
                }
                {settingsData.arrows?
                    <Button 
                        btnClass='arrow forward' 
                        btnName={arrowForward} 
                        onClick={(e)=>{handleArrowClick(e)}}
                    />
                    :
                    <></>
                }
            </div>
            <div className='slider-dots'>
                {settingsData.dots? 
                    pictures.map((img, index) => {
                        return (
                            <Button 
                                key={img.id}
                                btnID={img.id}
                                index={index}
                                btnClass={`dot ${index === 0? 'active' : ''}`}
                                onClick={(e)=>{handleDotClick(e)}}
                            />
                        )
                    })
                    :
                    <></>
                }
            </div>
            <Button 
                btnName={autoPlay}
                btnClass='autoPlayBtn forward'
                onClick={()=>{
                    setPlayAuto(!playAuto);
                    // clearInterval(interval);
                }}
            />
        </div>
    )
}

export default Slider;