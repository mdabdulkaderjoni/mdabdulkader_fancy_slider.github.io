if (performance.navigation.type == performance.navigation.TYPE_RELOAD) {
  document.getElementById('main').style.display='none'
} 

const imagesArea = document.querySelector('.images');
const gallery = document.querySelector('.gallery');
const galleryHeader = document.querySelector('.gallery-header');
const searchBtn = document.getElementById('search-btn');
const sliderBtn = document.getElementById('create-slider');
const sliderContainer = document.getElementById('sliders');
const input=document.getElementById('search');
const inputValue=input.value;

// selected image 
let sliders = [];


// If this key doesn't work
// Find the name in the url and go to their website
// to create your own api key '15674931-a9d714b6e9d654524df198e00&q'
const KEY =  '15674931-a9d714b6e9d654524df198e00&q';

// show images 
const showImages = (images) => {
  imagesArea.style.display = 'block';
  gallery.innerHTML = '';
  // show gallery title
  galleryHeader.style.display = 'flex';
  images.forEach(image => {
    let div = document.createElement('div');
    div.className = 'col-lg-3 col-md-4 col-xs-6 img-item mb-2';
    div.innerHTML = ` <img class="img-fluid img-thumbnail blackBorder" onclick=selectItem(event,"${image.webformatURL}") src="${image.webformatURL}" alt="${image.tags}">`;
    gallery.appendChild(div)
  })

}


const getImages = (query) => {
  fetch(`https://pixabay.com/api/?key=${KEY}=${query}&image_type=photo`)
    .then(response => response.json())
    // .then(data => showImages(data.hitS))
    .then(data => showImages(data.hits))
    .catch(err => console.log(err))
}


let slideIndex = 0;

const selectItem = (event, img) => {
  let element = event.target;
  element.classList.add('added');
 
  let item = sliders.indexOf(img);
  if (item === -1) {
    sliders.push(img);
  } else {
    // alert('Hey, Already added !')
    
    
    if(element.style.border=='none'){
      element.style.border='2px solid #1e1743'
      sliders.push(img);

    }else{
      sliders.pop(img);
      element.style.border='none'
    }

    
  }
}
var timer
const createSlider = () => {
  document.getElementById('buttonsDiv').style.display='block'
  // check slider image length
  if (sliders.length < 2) {
    alert('Select at least 2 image.')
    document.getElementById('buttonsDiv').style.display='none'
    return;
  }
  // crate slider previous next area
  sliderContainer.innerHTML = '';
  const prevNext = document.createElement('div');
  prevNext.className = "prev-next d-flex w-100 justify-content-between align-items-center";
  prevNext.innerHTML = ` 
  <span class="prev" onclick="changeItem(-1)"><i class="fas fa-chevron-left"></i></span>
  <span class="next" onclick="changeItem(1)"><i class="fas fa-chevron-right"></i></span>

 
  `;

  sliderContainer.appendChild(prevNext)
  document.querySelector('.main').style.display = 'block';
  // hide image aria
  imagesArea.style.display = 'none';
  const duration = document.getElementById('doration').value || 1000;
  sliders.forEach(slide => {
    let item = document.createElement('div')
    item.className = "slider-item";
    item.innerHTML = `
        <img class="w-100" src="${slide}" alt="">
    `;
    sliderContainer.appendChild(item)

  })


  changeSlide(0)
  timer = setInterval(function () {
    slideIndex++;
    changeSlide(slideIndex);
  }, duration);
 
}

// change slider index 
const changeItem = index => {
  changeSlide(slideIndex += index);
}


// change slide item
const changeSlide = (index) => {

  const items = document.querySelectorAll('.slider-item');
  if (index < 0) {
    slideIndex = items.length - 1
    index = slideIndex;
  };

  if (index >= items.length) {
    index = 0;
    slideIndex = 0;
  }

  items.forEach(item => {
    item.style.display = "none"
  })

  items[index].style.display = "block"

}

const slideShow=()=>{
  document.querySelector('.main').style.display = 'none';
  clearInterval(timer);
  const search = document.getElementById('search');
  if(search.value!==''){
    getImages(search.value)

  }
  
  sliders.length = 0;
}

//set value display block
const setValueBlock=()=>{
  document.getElementById('main').style.display='block' 
}

 searchBtn.addEventListener('click', function () {
  document.getElementById('buttomHeader').style.display='none'
  document.getElementById('buttonsDiv').style.display='none'
     
     if(search.value!==''){
      setValueBlock()
      slideShow()
  
    }
    else{
      document.getElementById('main').style.display='none'
      alert('Input field is empty. Please type something')
    }

 });

input.addEventListener("keyup", function(event) {
  document.getElementById('buttomHeader').style.display='none'
  if (event.keyCode === 13) {
   event.preventDefault();
   document.getElementById('buttonsDiv').style.display='none'
   if(search.value!==''){
    setValueBlock()
    slideShow()

  }
  else{
    document.getElementById('main').style.display='none'
  }
  }
});

//create slider event
let counter=0;
sliderBtn.addEventListener('click', function () {
  if(document.getElementById('doration').value<0){
    alert('duration time cannot be negative')
  }else{
  setValueBlock()
  createSlider()
  counter++;
  }
})

//pause button event
document.getElementById('pause').addEventListener('click',()=>{
  clearTimeout(timer)
  
})

//resume button event
document.getElementById('resume').addEventListener('click',()=>{
  clearTimeout(timer)
  let timeValue=document.getElementById('doration').value || 1000;
  timer = setInterval(function () {   
    slideIndex++;
    changeSlide(slideIndex);
  }, timeValue);
  timeValue=document.getElementById('doration').value || 1000;
})

//back-button event
document.getElementById('back').addEventListener('click',()=>{
  document.getElementById('buttonsDiv').style.display='none'
  document.getElementById('sliderShow').style.display='none'
  setValueBlock()
  slideShow()
  clearTimeout(timer)
  
})


//preview event

document.getElementById('history').addEventListener('click',()=>{
  if(counter==0){
    alert('Create slider to see previous');
  }else{
  clearTimeout(timer)
  imagesArea.style.display = 'none';
  document.getElementById('buttonsDiv').style.display='none'
  document.getElementById('buttomHeader').style.display='block'
  document.getElementById('sliderShow').style.display='block'

  resetTimer()
  
  }
})

const resetTimer=()=>{

  clearTimeout(timer)
let timeValue=document.getElementById('doration').value || 1000;
timer = setInterval(function () {   
  slideIndex++;
  changeSlide(slideIndex);
}, timeValue);
timeValue=document.getElementById('doration').value || 1000;
}


