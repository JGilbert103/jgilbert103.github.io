
'use strict';
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