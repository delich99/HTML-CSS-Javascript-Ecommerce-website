const readMoreBtn = document.querySelector('.readmore-button');
const text = document.querySelector('.text');

readMoreBtn.addEventListener('click',(e)=>{
    text.classList.toggle('show-more');
    if(readMoreBtn.innerText === 'Read more'){
        readMoreBtn.innerText = 'Read less';
    }else{
        readMoreBtn.innerText = 'Read more';
    }

})
