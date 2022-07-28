import React, { useRef } from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import './TestimonialSlider.css'

export default function TestimonialSlider({ slideItems }) {
    const sliderRef = useRef(null);
    const [gridWidth, setGridWidth] = useState(0);
    const [itemCount, setItemCount] = useState(0);
    const [marginCount, setMarginCount] = useState(3);
    const [activeIndex, setActiveIndex] = useState(4)
    let initialPosition = 0;
    let isLastCloned = false, isFirstCloned = false;

    useEffect(() => {
        if (slideItems[0]) {
            let slides = document.querySelectorAll('.testimonial-slider-card')
            let sliderContainer = document.querySelector('.testimonial-slider-wrapper');
            setGridWidth(sliderRef.current.offsetWidth / 3)
            setItemCount(slides.length + 6)
            for (let i = slides.length - 1; i > slides.length - 4; i--) {
                if (!isLastCloned) {
                    sliderContainer.prepend(slides[i].cloneNode(true))
                }
            }
            isLastCloned = true;

            for (let i = 0; i < 3; i++) {
                if (!isFirstCloned) {
                    sliderContainer.append(slides[i].cloneNode(true))
                }
            }
            isFirstCloned = true;
        }
    }, [slideItems])

    useEffect(() => {
        if (slideItems[0]) {
            let slides = document.querySelectorAll('.testimonial-slider-card')
            let activeSlide = document.querySelector('.testimonial-slider-card--active')
            if (activeSlide) {
                activeSlide.classList.remove("testimonial-slider-card--active")
            }
            slides[activeIndex].classList.add("testimonial-slider-card--active");
        }
    }, [activeIndex,slideItems])

    const dragStart = (event) => {
        event = event || window.event;
        if (event.type === "touchstart") {
            initialPosition = event.touches[0].clientX;
        } else {
            event.preventDefault();
            initialPosition = event.clientX
            document.onmouseup = dragEnd;
        }
    }

    const dragEnd = (event) => {
        event = event || window.event;

        let finalPosition;
        if (event.type === "touchend") {
            finalPosition = event.changedTouches[0].clientX
        } else {
            finalPosition = event.clientX
        }

        if (initialPosition - finalPosition > 20) {
            shiftSlide(1);
        } else if (initialPosition - finalPosition < -20) {
            shiftSlide(-1);
        }
    }

    const shiftSlide = (direction) => {
        let sliderContainer = document.querySelector('.testimonial-slider-wrapper');
        console.log("abc");
        if (direction === 1) {
            setMarginCount(prev => {
                if (prev === itemCount - 4) {
                    setTimeout(() => {
                        sliderContainer.style.transition = 'none';
                        setMarginCount(3)
                        setActiveIndex(4)
                    }, 300)
                    setTimeout(() => {
                        sliderContainer.style.transition = 'all 0.3s ease';
                    }, 350)
                    return prev + 1
                } else {
                    setActiveIndex(prev => prev + 1)
                    return prev + 1;
                }
            })
        } else if (direction === -1) {
            setMarginCount(prev => {
                if (prev === 1) {
                    setTimeout(() => {
                        sliderContainer.style.transition = 'none';
                        setMarginCount(itemCount - 6)
                        setActiveIndex(itemCount - 5)
                    }, 300)
                    setTimeout(() => {
                        sliderContainer.style.transition = 'all 0.3s ease';
                    }, 350)
                    return prev - 1
                } else {
                    setActiveIndex(prev => prev - 1)
                    return prev - 1;
                }
            })
        }
    }

    return (
        <div className="testimonial-slider" ref={sliderRef}>
            <div
                className="testimonial-slider-wrapper"
                style={{
                    gridTemplateColumns: `repeat(${itemCount},${gridWidth}px)`,
                    marginLeft: `-${marginCount * gridWidth}px`
                }}
                onMouseDown={dragStart}
                onTouchStart={dragStart}
                onTouchEnd={dragEnd}
            >
                {
                    slideItems.map((item, index) => (
                        <div className="testimonial-slider-card">
                            <h2 className="testimonial-slider-description">
                                {item.content}
                            </h2>
                            <h3 className="testimonial-slider-person">{item.name}</h3>
                            <h4 className="testimonial-slider-designation">{item.role}</h4>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
