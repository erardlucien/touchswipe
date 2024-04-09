'use strict'

const SLIDES = document.getElementsByClassName('slide')
const NUMBER_SLIDE = SLIDES.length
const SLIDER_CONTAINER = document.querySelector('.slider_container')
const SLIDER = document.querySelector('.slider')
const ARROW_LEFT = document.querySelector('.arrow-left')
const ARROW_RIGHT = document.querySelector('.arrow-right')
const SLIDE1_COPY = SLIDES[0].cloneNode(true)
SLIDER.appendChild(SLIDE1_COPY)
const NUMBER_SLIDE_NEW = NUMBER_SLIDE + 1
SLIDER_CONTAINER.style.setProperty('--n', `${NUMBER_SLIDE_NEW}`)
const TRANSITION = 'var(--transition)'
const INDICATORS = document.querySelectorAll('.indicator')
const FULL_INDICATOR_CLASS = 'indicator-full'

let xStart= 0
let counter = 0
let isGoingAtEnd = false
let isGoingAtBegin = false
let timeInterval = null
let timeout = null

function removeFullIndicatorClassOnPreviousIndicator() {
    for(let i = 0; i < NUMBER_SLIDE; ++i) {
        if(INDICATORS[i].classList.contains(FULL_INDICATOR_CLASS)) {
            INDICATORS[i].classList.remove(FULL_INDICATOR_CLASS)
        }
    }
}

function slide() {
    removeFullIndicatorClassOnPreviousIndicator()
    SLIDER.style.transform = `translateX(-${( 100/NUMBER_SLIDE_NEW ) * counter}%)`
    if(counter > -1 && counter < NUMBER_SLIDE_NEW) {
        INDICATORS[counter%NUMBER_SLIDE].classList.add(FULL_INDICATOR_CLASS);
    }
}

function resetTransitionSLider() {
    SLIDER.style.transition =  TRANSITION
}

function slidingLeft() {

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
        return
    }

    resetTransitionSLider()
    slide()
}

function slidingRight() {

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
        return
    }

    resetTransitionSLider()
    slide()
}

function resetAtBegin() {
    ++counter

    resetTransitionSLider()
    slide()

    setTimeout(
        () => {
            counter = 0
            SLIDER.style.transition = 'none'
            slide()
        },
    210 )
    
}

function goLeft() {
    ++counter

    if( counter === NUMBER_SLIDE_NEW ) {
        isGoingAtBegin = true
    }

    slidingLeft()
}

function goRight() {
    --counter

    if( counter === -1 ) {
        isGoingAtEnd = true
    }

    slidingRight()
}

function loop () {
    goLeft()
}

SLIDER_CONTAINER.addEventListener('touchstart', (event) => {
    clearInterval(timeInterval)
    clearTimeout(timeout)
    xStart = event.changedTouches[0].screenX
})

SLIDER_CONTAINER.addEventListener('touchend', (event) => {
    let xMovement = event.changedTouches[0].screenX

    // prevent the swipe, as long
    // | xMovement - xStart | < 100
    if( Math.abs(xMovement - xStart) < 100 ) {
        timeout = setTimeout(activeLoop, 100)
        return
    }

    if(xStart - xMovement < 0) {
        goRight()
    } else if(xStart - xMovement > 0) {
        goLeft()
    }

    timeout = setTimeout(activeLoop, 100)
})

for(let i = 0; i < NUMBER_SLIDE; ++i) {
    INDICATORS[i].addEventListener('click', () => {
        clearInterval(timeInterval)
        clearTimeout(timeout)
        if( counter === NUMBER_SLIDE - 1 && i === 0 ) {
            resetAtBegin()
        } else if( counter === 0 && i === NUMBER_SLIDE - 1 ) {
           goRight()
        } else {
            counter = i
            resetTransitionSLider()
            slide()
        }

        timeout = setTimeout(activeLoop, 700)
    })
}

ARROW_LEFT.addEventListener('click', () => {
    clearInterval(timeInterval)
    clearTimeout(timeout)
    goRight()
    timeout = setTimeout(activeLoop, 700)
})

ARROW_RIGHT.addEventListener('click', () => {
    clearInterval(timeInterval)
    clearTimeout(timeout)
    goLeft()
    timeout = setTimeout(activeLoop, 700)
})

function activeLoop() {
    timeInterval = setInterval(() => {
        loop()
    }, 10000)
}

activeLoop()
