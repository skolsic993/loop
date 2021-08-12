const links = document.querySelectorAll('#crew ul li a');
links.forEach(function (element) {
    element.addEventListener('click', function (e) {
        e.preventDefault();
        links.forEach(function (element) {
            element.classList.remove('active');
        });
        this.classList.add('active');
    });
});