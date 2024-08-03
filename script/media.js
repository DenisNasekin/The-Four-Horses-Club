const mediaQuery = window.matchMedia('(min-width: 767px) and (max-width: 2000px)');

function handleMediaQuery(mediaQuery) {
    if (mediaQuery.matches) {
      const titleTop = document.querySelector('.section__about-game__title-top');
      const titleElements = titleTop.querySelectorAll('h2');
      const imgElement = titleTop.querySelector('img');
  
      // Объединяем содержимое двух <h2> в один элемент
      let mergedTitle = document.createElement('h2');
      mergedTitle.innerHTML = titleElements[0].innerHTML + ' ' + titleElements[1].innerHTML;
      mergedTitle.classList.add('section__about-game__title');
  
      // Перемещаем <img> в конец
      titleTop.appendChild(mergedTitle);
      titleTop.appendChild(imgElement);
  
      // Удаляем исходные <h2>
      titleElements[0].remove();
      titleElements[1].remove();
    }
}

handleMediaQuery(mediaQuery);
mediaQuery.addListener(handleMediaQuery);



//Слайдер история
const mediaQuerytwo = window.matchMedia('(min-width: 760px) and (max-width: 2000px)');
let elementsCreated = false;
let elementsP = false;

function createMovedElements(mediaQuerytwo) {
  const pElementsToMove = document.querySelectorAll('.section__history__slide-text');
  const divElementsToMove = document.querySelectorAll('.section__history__slide-content');

  if (mediaQuerytwo.matches && !elementsP) {
    divElementsToMove[6].appendChild(pElementsToMove[6]); 
    divElementsToMove[5].appendChild(pElementsToMove[5]); 
    divElementsToMove[4].appendChild(pElementsToMove[4]); 
    divElementsToMove[3].appendChild(pElementsToMove[3]); 
    divElementsToMove[2].appendChild(pElementsToMove[2]); 
    divElementsToMove[1].appendChild(pElementsToMove[1]); 
    divElementsToMove[0].appendChild(pElementsToMove[0]);
    elementsP = true;
}
    
}

function createElement(mediaQuerytwo) {
const container = document.querySelector('.section__history__slider');

if (mediaQuerytwo.matches &&  !elementsCreated) {  
  const newDiv1 = document.createElement('div');
  const newDiv2 = document.createElement('div');

  newDiv1.classList.add('section__history__slide');
  const newDivContent1 = document.createElement('div');
  newDivContent1.classList.add('section__history__slide-content');
  newDiv1.appendChild(newDivContent1);
  container.appendChild(newDiv1);

  newDiv2.classList.add('section__history__slide');
  const newDivContent2 = document.createElement('div');
  newDivContent2.classList.add('section__history__slide-content');
  newDiv2.appendChild(newDivContent2);
  container.appendChild(newDiv2);

  elementsCreated = true;
  }
}

function handleResize() {
  if (mediaQuerytwo.matches) {
      createElement(mediaQuerytwo);
      createMovedElements(mediaQuerytwo);
  }
}

window.addEventListener('resize', handleResize);
handleResize();