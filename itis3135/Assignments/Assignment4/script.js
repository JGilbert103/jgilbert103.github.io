'use strict';

const leftBtn = document.querySelector('.left');
const rightBtn = document.querySelector('.right');
const navBtn = document.querySelector('.carousel-nav')

const carouselItems = Array.from(document.querySelectorAll('.carousel-item'));
const navItems = Array.from(document.querySelectorAll('.nav-item'));
const CAROUSEL_SIZE = carouselItems.length;

leftBtn.addEventListener('click', swipe);
rightBtn.addEventListener('click', swipe);
navBtn.addEventListener('click', select);

function swipe(e)
{
    const currentCarouselItem = document.querySelector('.carousel-item.active');
    const currentIndex = carouselItems.indexOf(currentCarouselItem);

    let nextIndex;

    if(e.currentTarget.classList.contains('left')){
        if(currentIndex === 0)
            {
                nextIndex = CAROUSEL_SIZE - 1;
            }
            else
            {
                nextIndex = currentIndex - 1;
            }
    }
    else{
        if(currentIndex === CAROUSEL_SIZE-1)
            {
                    nextIndex = 0;
            }
            else
            {
                nextIndex = currentIndex + 1;
            }
    }
    updateCarousel(nextIndex)
}

function select(e) {
    if (e.target.classList.contains('nav-item')) 
    {
        const newIndex = navItems.indexOf(e.target);
        updateCarousel(newIndex);
    }
}

function updateCarousel(index) {
    const currentCarouselItem = document.querySelector('.carousel-item.active');
    const currentNavItem = document.querySelector('.nav-item.active');

    currentCarouselItem.classList.remove('active');
    currentNavItem.classList.remove('active');

    carouselItems[index].classList.add('active');
    navItems[index].classList.add('active');
}
    