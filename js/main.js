'use strict'

const SLIDES = document.getElementsByClassName('slide')
const NUMBER_SLIDE = SLIDES.length
const SLIDER_CONTAINER = document.querySelector('.slider_container')
const SLIDER = document.querySelector('.slider')

let xStart= 0
let yStart = 0
let counter = 0

function goLeft() {
    if(counter == NUMBER_SLIDE - 1) {
        return
    } else {
        ++counter
        SLIDER.style.transform = `translateX(-${( 100/NUMBER_SLIDE ) * counter}%)`
    }
}

function goRight() {
    if(counter == 0) {
        return
    } else {
        --counter
        SLIDER.style.transform = `translateX(-${( 100/NUMBER_SLIDE ) * counter}%)`
    }
}

SLIDER_CONTAINER.addEventListener('touchstart', (event) => {
    event.preventDefault()
    xStart = event.changedTouches[0].screenX
    yStart = event.changedTouches[0].screenY
})

SLIDER_CONTAINER.addEventListener('touchend', (event) => {
    event.preventDefault()
    let xMovement = event.changedTouches[0].screenX
    let yMovement = event.changedTouches[0].screenY

    if( yMovement - yStart > 0) {
        return
    }

    if(xStart - xMovement < 0) {
        goRight()
        return
    }

    if(xStart - xMovement > 0) {
        goLeft()
        return
    }

})
