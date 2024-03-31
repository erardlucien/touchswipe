'use strict'

const SLIDES = document.getElementsByClassName('slide')
const NUMBER_SLIDE = SLIDES.length
const SLIDER_CONTAINER = document.querySelector('.slider_container')
const SLIDER = document.querySelector('.slider')
const SLIDE1_COPY = SLIDES[0].cloneNode(true)
SLIDER.appendChild(SLIDE1_COPY)
const NUMBER_SLIDE_NEW = NUMBER_SLIDE + 1
SLIDER_CONTAINER.style.setProperty('--n', `${NUMBER_SLIDE_NEW}`)
const TRANSITION = 'var(--transition)'

let xStart= 0
let yStart = 0
let counter = 0
let isGoingAtEnd = false
let isGoingAtBegin = false

function slide() {
    SLIDER.style.transform = `translateX(-${( 100/NUMBER_SLIDE_NEW ) * counter}%)`
}

function resetTransitionSLider() {
    SLIDER.style.transition =  TRANSITION
}

function slidingLeft() {
    resetTransitionSLider()
    slide()

    if(isGoingAtBegin) {
        counter = 0
        SLIDER.style.transition = 'none'
        slide()
        setTimeout(
            () => {
                ++counter
                resetTransitionSLider()
                slide()
            },
        60 )
        isGoingAtBegin = false
    }
}

function slidingRight() {
    resetTransitionSLider()
    slide()

    if(isGoingAtEnd) {
        counter = NUMBER_SLIDE
        SLIDER.style.transition = 'none'
        slide()
        setTimeout(
            () => {
                --counter
                resetTransitionSLider()
                slide()
            },
        60 )
        isGoingAtEnd = false
    }
}

function goLeft() {
    ++counter
    if( counter === 0 || counter === NUMBER_SLIDE_NEW ) {
        isGoingAtBegin = true
    }
    slidingLeft()
}

function goRight() {
    --counter
    if( counter === -1 || counter === NUMBER_SLIDE_NEW ) {
        isGoingAtEnd = true
    }
    slidingRight()
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

    // prevent a slide, when you scroll vertically
    if( Math.abs(yMovement - yStart) > 10 ) {
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
