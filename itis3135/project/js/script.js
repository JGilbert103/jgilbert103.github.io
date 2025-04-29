'use strict';

// Carousel Code

const leftBtn = document.querySelector('.left');
const rightBtn = document.querySelector('.right');
const navBtn = document.querySelector('.carousel-nav')

const carouselItems = Array.from(document.querySelectorAll('.carousel-item'));
const navItems = Array.from(document.querySelectorAll('.nav-item'));
const CAROUSEL_SIZE = carouselItems.length;
try{
    leftBtn.addEventListener('click', swipe);
    rightBtn.addEventListener('click', swipe);
    navBtn.addEventListener('click', select);
}
catch(e)
{
}


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
    

// Modal Code

var modal = document.getElementById("checkout");
var modalBtn = document.getElementById("modalBtn");
var span = document.getElementsByClassName("close")[0];

try{
    modalBtn.addEventListener('click', AddDisplay);
    span.addEventListener('click', RemoveDisplay);
}
catch(e)
{

}
function AddDisplay()
{
    modal.style.display = "block";
}
function RemoveDisplay()
{
    modal.style.display = "none";
}


//Accordian Code

const root = document.documentElement;
const buttons = document.querySelectorAll('button');

buttons.forEach(button =>
{
   button.addEventListener('click', buttonClick); 
})


function buttonClick(e)
{
    var btn = e.target;
    btn.classList.toggle('open');
    root.style.setProperty('--content-height', btn.nextElementSibling.scrollHeight + 'px');
    var sibling = btn.nextElementSibling;
    sibling.classList.toggle('open');

    buttons.forEach(button =>
    {
        if (!(button.isEqualNode(btn)) && button.classList.contains('open')) 
        {
            button.classList.remove('open');
            var otherContent = button.nextElementSibling;
            if (otherContent) {
                otherContent.classList.remove('open');
            }
        }
    })
}


//API CALL FOR TRANQUIL QUOTE
const api_url = "https://type.fit/api/quotes";

async function getapi(url) {
    try{
        var response = await fetch(url);
        var data = await response.json();
        
        var randomIndex = Math.floor(Math.random() * data.length);
        var quoteText = data[randomIndex].text;
        var quoteAuthor = data[randomIndex].author;
        var quoteElement = document.getElementById("tranquil-quote");
        
        quoteElement.innerHTML = "Your Tranquil Quote: \"" + quoteText + "\"";
    }
    catch
    {
        var quoteElement = document.getElementById("tranquil-quote");
        
        quoteElement.innerHTML = "Your Tranquil Quote: \"" + "We achieve tranquility by accepting the things we cannot change and focusing our energy where we can make a difference" + "\"";
    }
    
}
getapi(api_url);