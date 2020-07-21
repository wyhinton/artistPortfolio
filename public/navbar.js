// $('.pageLink').each(function(){
//   console.log(this.id);
//   if (this.id !== 'activePageSection') {
//     $(this).hover(
//        function() {
//          $( this ).css('text-decoration', 'underline');
//        }, function() {
//          $( this ).css('text-decoration', 'none')
//        }
//      );
//   }
// })
var mobileWidth = 768
var hamburgerVisible = false;
function showHamburgerNavSection() {
  console.log('hamburger clicked');

  if (window.innerWidth < mobileWidth && hamburgerVisible == false) {
    $('#navBarListContainer').animate({'right': '0%'})
  }


  if (window.innerWidth < mobileWidth && hamburgerVisible == true) {
    $('#navBarListContainer').animate({'right': '-100%'})
  }
  hamburgerVisible = !hamburgerVisible

}
