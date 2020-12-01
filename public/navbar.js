// var navButton = document.getElementById('navButton');
// navButton.addEventListener('mouseup', showHamburgerNavSection)
window.app = {};

const mobileWidth = 768
var hamburgerVisible = false;
var cvLinkElem = document.getElementById('cvLink');

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

function setCVLink(aboutProjectObjArray) {
  let firstObj = aboutProjectObjArray[0]
  let link = firstObj.CV_Link
  cvLink.href = link;
}

function pageLinkSetup(){
  $('.pageLink').each(function(){
    console.log(this.id);
    if (this.id !== 'activePageSection') {
      $(this).hover(
         function() {
           $( this ).css('text-decoration', 'underline');
         }, function() {
           $( this ).css('text-decoration', 'none')
         }
       );
    } else {
         $( this ).css('-webkit-text-fill-color', 'black');
    }
  })
}
