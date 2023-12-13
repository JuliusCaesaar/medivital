const menuNav = document.getElementById('menu-mobile')
const btnAnimar = document.getElementById('btn-menu')

menuNav.addEventListener('click', animarMenu)

function animarMenu() {
    menuNav.classList.toggle('abrir')
    btnAnimar.classList.toggle('ativo')
}