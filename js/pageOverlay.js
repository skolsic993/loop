const pageOverlay = () => {
    const burger = document.getElementById('burger');
    const overlay = document.getElementById('page-overlay');
    const wrapper = document.querySelector('.wrapper');

    
    burger.addEventListener('click', () => {
        burger.classList.toggle('toggle');
        overlay.classList.toggle('active');
    });
}

pageOverlay();