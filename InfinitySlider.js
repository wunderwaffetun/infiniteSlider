const left_button = document.querySelector('.left_generation_button')
const right_button = document.querySelector('.right_generation_button')
const images = document.querySelectorAll('.generation_slider_img')
const mainWrapperSlider = document.querySelector('.generation_slider_wrapper')
const presentSlide = document.querySelector('.generation_slider_img_wrapper')
const len = images.length
const mainSliderWidth = Number(getComputedStyle(mainWrapperSlider).width.substring(0, getComputedStyle(mainWrapperSlider).width.length-2))

let currentSlide = 0
let previousSlide;
let firstFlagSlid = true; 
let sliderFlag = true;  

function CreateImg(side){
    if(side == 'right'){
        const img = document.createElement('img')
        img.src = images[currentSlide].src
        img.classList.add('generation_slider_img')
        img.classList.add('animation')
        img.style.left = '100%'
        presentSlide.append(img)
    }
    else{
        const img = document.createElement('img')
        img.src = images[currentSlide].src
        img.classList.add('generation_slider_img')
        img.classList.add('animation')
        img.style.right = '100%'
        presentSlide.append(img)
    }
}

function createStartSlide(){
    document.querySelectorAll('.generation_slider_img').forEach((elem)=>{
        document.querySelector('.generation_slider_img_wrapper').removeChild(elem)
    })
    const img = document.createElement('img')
    img.src = images[currentSlide].src
    img.classList.add('generation_slider_img')
    img.style.left = '0'
    presentSlide.append(img)
}

function defineNumSlide(button){
    if(button == 'left'){
        if (currentSlide == 0){
            currentSlide = len - 1
        }
        else{
            currentSlide -= 1 
        }
    }
    else if(button == 'right'){
        if (currentSlide == len - 1){
            currentSlide = 0
        }
        else{
            currentSlide += 1 
        }
    }
}

function showSlide(button){
    CreateImg(button)
    newImages = document.querySelectorAll('.generation_slider_img')
    if (newImages.length > 2){
        document.querySelector('.generation_slider_img_wrapper').removeChild(newImages[0])
    }
    newImages.forEach(elem =>{
        if(elem.classList.contains('animation')){
            let m = 0
            let timer = setInterval(()=>{
                m += 10
                if(button == 'right'){
                    elem.style.left = `calc(100% - ${m}px)`
                }else{
                    elem.style.right = `calc(100% - ${m}px)`
                }
                if (m>=mainSliderWidth){
                    clearInterval(timer)
                }
            }, 1)
            elem.classList.remove('animation')
        }
        else{
            let m = 0
            if (button != 'right'){
                elem.style.left = null
            }
            let timer = setInterval(()=>{
                m += 10
                if(button == 'right'){
                    elem.style.left = `calc(-${m}px)`
                }else{
                    
                    elem.style.right = `calc(-${m}px)`
                }
                if (m>=mainSliderWidth){
                    clearInterval(timer)
                }
            }, 1)
        }
    })
}
function changeWrapper(button){
        setTimeout(()=>{
            start()
        }, 300)
        showSlide(button)
}
function mainFunction(){
    if (event.target == left_button){
        previousSlide = currentSlide
        defineNumSlide('left')
        changeWrapper('left')
    }
    else if(event.target == right_button){
        previousSlide = currentSlide
        defineNumSlide('right')
        changeWrapper('right')
    }
}
function start(){
    if (len > 1){
        document.querySelector('.generation_slider_buttons').addEventListener('click', mainFunction, {
            once: true
        })
    }
}
createStartSlide()
start()