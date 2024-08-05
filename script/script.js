//Обработка якоря на кнопках
document.querySelectorAll('.anchor').forEach(anchor=> {
    anchor.addEventListener('click', function() {
        const targetId = this.getAttribute('data-target');
        const targetLink = document.getElementById(targetId);
        targetLink.scrollIntoView({behavior: 'smooth' });
    });
})

//Слайдер история турнира
const slider = document.querySelectorAll('.section__history__slide');
const indicator = document.querySelectorAll('.slider__circle');
let currentSlide = 0;

function showSlide(index) {
    slider.forEach(slide=> slide.classList.remove('active'));
    slider[index].classList.add('active');

    indicator.forEach((indicator, i) => {
        if(i === index) {
            indicator.style.backgroundColor = '#313131';
        } else {
            indicator.style.backgroundColor = 'rgba(49, 49, 49, 0.2)';
        }
    });

    if (currentSlide === 0) {
        document.getElementById('prev').style.backgroundColor = 'rgba(49, 49, 49, 0.2)';
      } else {
        document.getElementById('prev').style.backgroundColor = '';
    }

    if (currentSlide === slider.length - 1) {
        document.getElementById('next').style.backgroundColor = 'rgba(49, 49, 49, 0.2)';
      } else {
        document.getElementById('next').style.backgroundColor = '';
    }
}

document.getElementById('prev').addEventListener('click', function() {
    if (currentSlide > 0) {
        currentSlide = (currentSlide - 1) % slider.length;
        showSlide(currentSlide);
      }
    });

document.getElementById('next').addEventListener('click', function() {
    if (currentSlide < slider.length - 1) {
        currentSlide = (currentSlide + 1) % slider.length;
        showSlide(currentSlide);
      }
});

indicator.forEach((indicator, i) => {
    indicator.addEventListener('click', function() {
        showSlide(i);
        currentSlide = i
    })
})

showSlide(currentSlide);

//слайдер с участниками 
const slides = document.querySelectorAll('.section__players__slide')
const buttonNext = document.querySelector('.next');
const buttonPrev = document.querySelector('.prev');
const currentNumber = document.querySelector('.current-slide');
let currentIndex = 0;
let totalNumber = 6;

function checkScreenWidth() {
    if (window.innerWidth < 770) {
        slides[1].classList.remove('active')
        slides[2].classList.remove('active')
        slides[3].classList.remove('active')
        slides[4].classList.remove('active')
        slides[5].classList.remove('active')
        currentNumber.textContent = 1;
        let number = 1;
        const changeClassMob = changeSlide(slides, currentIndex);

        function changeSlide(slides, currentIndex) {
            
            return function(direction) {
                slides[currentIndex].classList.remove('active');
                if(direction === 'forward') {
                    currentIndex = (currentIndex + 1) % slides.length;
                } else if (direction === 'backward') {
                    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
                }
                slides[currentIndex].classList.add('active');
                return currentIndex
            }
        }
        
        function transformColor() {
            const colorTotal = document.querySelector('.total-slides');    
            const divider = document.querySelector('.divider');
            if(number === totalNumber) {
                colorTotal.style.opacity = '100%';
                divider.style.opacity = '100%';
            } else {
                colorTotal.style.opacity = '60%';
                divider.style.opacity = '60%';
            }
        }
        buttonNext.addEventListener('click', ()=>{
            number = (number % totalNumber) + 1;
            currentNumber.textContent = number;
            transformColor();
            currentIndex = changeClassMob('forward')
        })
        buttonPrev.addEventListener('click', ()=>{
            number = (number - 2 + totalNumber) % totalNumber + 1;
            currentNumber.textContent = number;
            transformColor();
            currentIndex = changeClassMob('backward')
        })
        setInterval(()=>{number = (number % totalNumber) + 1;
            currentNumber.textContent = number;
            transformColor();
            currentIndex = changeClassMob('forward')},4000)

    } else if (window.innerWidth >= 770 & window.innerWidth <= 1300) {
        slides[1].classList.add('active')
        slides[2].classList.remove('active')
        slides[3].classList.remove('active')
        slides[4].classList.remove('active')
        slides[5].classList.remove('active')
        currentNumber.textContent = 2;
        let number = 2;
        let nextIndex = 1;
        const changeClassPlan = changeSlide(slides, currentIndex, nextIndex);

        function changeSlide(slides, currentIndex, nextIndex) {
            return function(direction) {
                slides[currentIndex].classList.remove('active');
                slides[nextIndex].classList.remove('active');
                if(direction === 'forward') {
                    currentIndex = (currentIndex + 1) % slides.length;
                    nextIndex = (nextIndex + 1) % slides.length;
                } else if (direction === 'backward') {
                    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
                    nextIndex = (nextIndex - 1 + slides.length) % slides.length;
                }
                slides[currentIndex].classList.add('active');
                slides[nextIndex].classList.add('active');
                
                return [currentIndex, nextIndex];
            
            }
        }
        function transformColor() {
            const colorTotal = document.querySelector('.total-slides');    
            const divider = document.querySelector('.divider');
            if(number === totalNumber) {
                colorTotal.style.opacity = '100%';
                divider.style.opacity = '100%';
            } else {
                colorTotal.style.opacity = '60%';
                divider.style.opacity = '60%';
            }
        }
    
        buttonNext.addEventListener('click', ()=>{
            number = (number % totalNumber) + 2;
            currentNumber.textContent = number;
            transformColor();
            [currentIndex, nextIndex] = changeClassPlan('forward');
        })
    
        buttonPrev.addEventListener('click', ()=>{
            number = (number - 3 + totalNumber) % totalNumber + 1;
            currentNumber.textContent = number;
            transformColor();
            [currentIndex, nextIndex] = changeClassPlan('backward');
        })
        setInterval(()=>{number = (number % totalNumber) + 2;
            currentNumber.textContent = number;
            transformColor();
            [currentIndex, nextIndex] = changeClassPlan('forward');},4000)
    } else {
        slides[1].classList.add('active')
        slides[2].classList.add('active')
        slides[3].classList.remove('active')
        slides[4].classList.remove('active')
        slides[5].classList.remove('active')
        currentNumber.textContent = 3;
        let number = 3;
        let nextIndex = 1;
        let prevIndex = slides.length - 1;;
        const changeClassDesk = changeSlide(slides, currentIndex, nextIndex, prevIndex);
    
        function changeSlide(slides, currentIndex, nextIndex, prevIndex) {
            return function(direction) {
                slides[currentIndex].classList.remove('active');
                slides[nextIndex].classList.remove('active');
                slides[prevIndex].classList.remove('active');
                
                if (direction === 'forward') {
                  prevIndex = currentIndex;
                  currentIndex = nextIndex;
                  nextIndex = (nextIndex + 1) % slides.length;
                } else if (direction === 'backward') {
                  nextIndex = currentIndex;
                  currentIndex = prevIndex;
                  prevIndex = (prevIndex - 1 + slides.length) % slides.length;
                }
                
                slides[currentIndex].classList.add('active');
                slides[nextIndex].classList.add('active');
                slides[prevIndex].classList.add('active');
                
                return [currentIndex, nextIndex, prevIndex];
              };
        }

        function transformColor() {
            const colorTotal = document.querySelector('.total-slides');    
            const divider = document.querySelector('.divider');
            if(number === totalNumber) {
                colorTotal.style.opacity = '100%';
                divider.style.opacity = '100%';
            } else {
                colorTotal.style.opacity = '60%';
                divider.style.opacity = '60%';
            }
        }
    
        buttonNext.addEventListener('click', ()=>{
            number = (number % totalNumber) + 3;
            currentNumber.textContent = number;
            transformColor();
            [currentIndex, nextIndex, prevIndex] = changeClassDesk('forward');
        })
    
        buttonPrev.addEventListener('click', ()=>{
            number = (number - 4 + totalNumber) % totalNumber + 1;
            currentNumber.textContent = number;
            transformColor();
            [currentIndex, nextIndex, prevIndex] = changeClassDesk('backward');
        })
        setInterval(()=>{number = (number % totalNumber) + 3;
            currentNumber.textContent = number;
            transformColor();
            [currentIndex, nextIndex, prevIndex] = changeClassDesk('forward');},4000)
    }       
}

window.addEventListener('load', checkScreenWidth); 
window.addEventListener('resize', checkScreenWidth);
