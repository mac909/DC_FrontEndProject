const dropdowns = document.querySelectorAll('.dropdown');

dropdowns.forEach(dropdown => {
    const select = dropdown.querySelector('.select');
    const caret = dropdown.querySelector('.arrow');
    const menu = dropdown.querySelector('.menu');
    const options = dropdown.querySelectorAll('.menu li');
    const selected = dropdown.querySelector('.selected');
    

    select.addEventListener('click', () => {
        select.classList.toggle('select-clicked');
        caret.classList.toggle('arrow-rotate');
        menu.classList.toggle('menu-open');

    });

    options.forEach(option => {
        option.addEventListener('click', () => {
            selected.innerText = option.innerText;
            select.classList.remove('select-clicked');
            caret.classList.remove('arrow-rotate');
            menu.classList.remove('menu-open');
            option.forEach(option => {
                option.classList.remove('active');
            });
            option.classList.add('active');
        });
    });
});



const icons = document.querySelectorAll('.home');

icons.forEach(home => {
    const menu = home.querySelector('.menu');
    const options = home.querySelectorAll('.menu li');
    
    select.addEventListener('click', () => {
        menu.classList.toggle('menu-open');

    });

    options.forEach(option => {
        option.addEventListener('click', () => {
            selected.innerText = option.innerText;
            menu.classList.remove('menu-open');
            option.forEach(option => {
                option.classList.remove('active');
            });
            option.classList.add('active');
        });
    });
});