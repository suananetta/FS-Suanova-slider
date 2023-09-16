import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styles from './styles/styles.min.css';

import Button from '../../_shared/Button/Button';

function Slider() {

    const picsData = useSelector((state) => state.pictures);
    const settingsData = useSelector((state) => state.settings);

    let [currentSlide, setCurrentSlide] = useState(0);
    let [timer, setTimer] = useState(null);
    let [playAuto, setPlayAuto] = useState(false);

    let dots = document.querySelectorAll('.dot');

    let arrowBack = <span className="material-symbols-outlined">arrow_back_ios</span>;
    let arrowForward = <span className="material-symbols-outlined">arrow_forward_ios</span>;
    let autoPlay = <span className="material-symbols-outlined">autoplay</span>;
    let autoStop = <span className="material-symbols-outlined">autostop</span>;

    let slideForward = () => {
        let nextSlide = currentSlide + 1 >= picsData.pics.length? 0 : currentSlide + 1;  

        document.querySelector('div.slider-content.active').classList.remove('active');
        document.querySelector('div.slider-content.item'+nextSlide).classList.add('active');

        setCurrentSlide(nextSlide);

        for(let dot of dots) {
            dot.id === document.querySelector('div.slider-content.active').id? dot.classList.add('active') : dot.classList.remove('active');
        }  
    }

    let slideBack = () => {
        let nextSlide = currentSlide - 1 < 0 ? picsData.pics.length - 1 : currentSlide - 1;  

        document.querySelector(`div.slider-content.item${currentSlide}.active`).classList.remove('active');
        document.querySelector(`div.slider-content.item${nextSlide}`).classList.add('active');
        
        setCurrentSlide(nextSlide)

        for(let dot of dots) {
            dot.id === document.querySelector('div.slider-content.active').id? dot.classList.add('active') : dot.classList.remove('active');
        }  
    }

    let handleArrowClick = (e) => {
        if (e.currentTarget.className.includes('forward')) {
            slideForward()
        } 
        
        if (e.currentTarget.className.includes('back')) {
            slideBack()
        }      
    }

    let handleDotClick = (e) => {

        document.querySelector('div.slider-content.active').classList.remove('active');
        document.getElementById(e.target.id).classList.add('active');

        let currentDotSlide = +document.getElementById(e.target.id).getAttribute('index');
        setCurrentSlide(currentDotSlide);

        for(let dot of dots) {
            dot.id === document.querySelector('div.slider-content.active').id? dot.classList.add('active') : dot.classList.remove('active');
        }       
    }

    let turnOnInterval = (duration) => {
        let autoCurrentSlide = currentSlide;
        setTimer(setInterval(() => {
            let nextSlide = autoCurrentSlide + 1 >= picsData.pics.length? 0 : autoCurrentSlide + 1;  

            document.querySelector('div.slider-content.active').classList.remove('active');
            document.querySelector('div.slider-content.item'+nextSlide).classList.add('active');
            
            autoCurrentSlide = nextSlide;
            setCurrentSlide(nextSlide);

            for(let dot of dots) {
                dot.id === document.querySelector('div.slider-content.active').id? dot.classList.add('active') : dot.classList.remove('active');
            }  
        }, duration))
    }

    let turnOffInterval = () => {
        clearInterval(timer)
        setTimer(null);
    }

    useEffect(() => {
        if(settingsData.device === 'mobile') {
            document.querySelector('div.slider-content.active').addEventListener('touchend', () => {
                slideForward();
            })
        }
        if(settingsData.device !== 'mobile') {
            document.querySelector('div.slider-content').removeEventListener('touchend', () => {
                slideForward();
            })
        }
    }, [currentSlide])

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
                {   picsData.pics.map((img, index) => {
                            return (
                                <div key={img.id} className={`slider-content item${index} ${index === 0? 'active' : ''}`} id={img.id}>
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
                    picsData.pics.map((img, index) => {
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
                btnName={playAuto? autoStop : autoPlay}
                btnClass={playAuto? 'autoPlayBtn stop' : 'autoPlayBtn play'}
                onClick={(e) => {
                    setPlayAuto(!playAuto);
                    if(e.currentTarget.className.includes('play')) {
                        turnOnInterval(settingsData.autoDuration);
                    } 
                    if(e.currentTarget.className.includes('stop')) {
                        turnOffInterval();
                    } 
                }} 
            />
        </div>
    )
}

export default Slider;