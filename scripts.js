var mobileMenuBtn = document.getElementById('mobileMenuBtn');
var mobileMenu = document.getElementById('mobileMenuContainer');
var targetMMDisplay = mobileMenu.style.display;
var mobileMenuIcon = document.getElementById('mobileMenuIcon');


mobileMenuBtn.addEventListener('click', openMobileMenu);

function openMobileMenu() {
    if (mobileMenu.style.opacity === '0') {
        //mobileMenu.style.display = 'flex';
        mobileMenu.style.opacity = '1';
        mobileMenuIcon.src = 'images/mobileCloseIcon.svg';
        mobileMenu.style.transition = "200ms";
        mobileMenu.style.transform = "translateY(8px)";

    } else if (mobileMenu.style.opacity === '1')
    {
        //mobileMenu.style.display = 'none';
        mobileMenu.style.opacity = '0';
        mobileMenu.style.transition = '80ms';
        mobileMenu.style.transform = 'translateY(-8px)'
        mobileMenuIcon.src = 'images/mobileMenuIcon.svg';
    }
}