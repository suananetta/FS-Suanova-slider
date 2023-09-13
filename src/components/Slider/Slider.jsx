// import uniqid from 'uniqid';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styles from './styles/styles.min.css';

import Button from '../../_shared/Button/Button';
import { getPictures } from '../../_redux/PicsSlice';

function Slider() {
    const dispatch = useDispatch();

    const picsData = useSelector((state) => state.pictures);

    let [currentSlide, setCurrentSlide] = useState(0)

    let interval;
    let dots = document.querySelectorAll('.dot');

    // useEffect(() => {
    //     interval = setInterval(() => {
    //         let nextSlide = currentSlide + 1 >= picsData.pics.length? 0 : currentSlide + 1;  

    //         document.querySelector('.active').classList.remove('active');
    //         document.querySelector('.item' + nextSlide).classList.add('active');

    //         setCurrentSlide(nextSlide);

    //         for(let dot of dots) {
    //             dot.classList.remove('active');
    //             if(+dot.getAttribute('index') === currentSlide) dot.classList.add('active');
    //         }
    //     }, 3000)
    // })

    let handleArrowClick = (e) => {
        clearInterval(interval);
        if (e.currentTarget.className.includes('forward')) {
            let nextSlide = currentSlide + 1 >= picsData.pics.length? 0 : currentSlide + 1;  

            document.querySelector('.active').classList.remove('active');
            document.querySelector('.item' + nextSlide).classList.add('active');

            setCurrentSlide(nextSlide)
        } 
        
        if (e.currentTarget.className.includes('back')){
            let nextSlide = currentSlide - 1 < 0 ? picsData.pics.length - 1 : currentSlide - 1;  

            document.querySelector('.active').classList.remove('active');
            document.querySelector('.item' + nextSlide).classList.add('active');
            
            setCurrentSlide(nextSlide)
        }

        for(let dot of dots) {
            dot.classList.remove('active');
            if(+dot.getAttribute('index') === currentSlide) dot.classList.add('active');
        }
    }

    let handleDotClick = (e) => {
        clearInterval(interval);

        document.querySelector('.active').classList.remove('active');
        document.getElementById(e.target.id).classList.add('active');

        for(let dot of dots) {
            dot.classList.remove('active');
            if(dot.id === e.target.id) e.target.classList.add('active');
        }
    }

    return (
        <div className='slider-block'> 
            <div className='slider-body'>
                <Button 
                    btnClass='arrow back' 
                    btnName={<span className="material-symbols-outlined">arrow_back_ios</span>} 
                    onClick={(e)=>{handleArrowClick(e)}}
                />
                    {picsData.pics.map((img, index) => {
                        return (
                            <div key={img.id} className={`slider-content item${index} ${index === 0? 'active' : ''}`} id={img.id}>
                                <div className='slider-img' style={{backgroundImage: `url(${img.urls.full})`}}></div>
                                <span>{img.alt_description}</span>
                            </div>
                        )
                    })}
                <Button 
                    btnClass='arrow forward' 
                    btnName={<span className="material-symbols-outlined">arrow_forward_ios</span>} 
                    onClick={(e)=>{handleArrowClick(e)}}
                />
            </div>
            <div className='slider-dots'>
                    {picsData.pics.map((img, index) => {
                        return (
                            <Button 
                                key={img.id}
                                btnID={img.id}
                                index={index}
                                btnClass='dot'
                                onClick={(e)=>{handleDotClick(e)}}
                            />
                        )
                    })}
            </div>
        </div>
    )
}

export default Slider;