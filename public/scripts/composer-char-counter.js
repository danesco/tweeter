$(document).ready(function() {
  const text = document.querySelector('textarea');

  text.addEventListener('keyup', function(event){
    const counter = this.parentNode.children[2];
    let charCount = $(this).val().length;
    counter.innerText = 140 - charCount;
    if(charCount > 140){
      $(counter).addClass('invalidText');
    }else{
      $(counter).removeClass('invalidText');
    }
  });


});
