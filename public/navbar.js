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
  }
})
