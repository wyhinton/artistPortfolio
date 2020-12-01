
export function galleryScroll(e){
  let rangeVal = e.target.value
  let rangePercent = rangeVal/100;
  let toMoveWidth = $('#sectionContainer').outerWidth() + 100;
  let toMove = toMoveWidth * rangePercent
  $(mainWrapperElem).scrollLeft(toMove)
}

export function pullUProjectGalleryDesktop(e, windowOffset) {
  newOffsetAmount = (((e.target.offsetTop * -1)-50) - windowOffset)
  let newOffsetString = 'translateY(' + newOffsetAmount + 'px)'
  document.querySelector('#projectTextNames').style.transform = newOffsetString
  $('#myGalleryRange').css('opacity', 1)
  $('#projectTextNames').animate({
  }, 2000, function() {
    $(projectSection).css('pointer-events', 'all')
    $(projectSection).css('opacity', 1)
  })
}
