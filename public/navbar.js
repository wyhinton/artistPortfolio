// var navButton = document.getElementById('navButton');
// navButton.addEventListener('mouseup', showHamburgerNavSection)

var mobileWidth = 768
var hamburgerVisible = false;
function showHamburgerNavSection() {
  console.log('hamburger clicked');

  if (w < mobileWidth && hamburgerVisible == false) {
    $('#navBarListContainer').animate({'right': '0%'}, 500, 'easeOutCirc')
    $('#innerNavButtonCircle').animate({height: 13, width: 13}, 500, 'easeOutQuad')
  }

  if (w < mobileWidth && hamburgerVisible == true) {
    $('#navBarListContainer').animate({'right': '-100%'})
    $('#innerNavButtonCircle').animate({height: 9, width: 9}, 500, 'easeOutSine')
  }
  hamburgerVisible = !hamburgerVisible
}
