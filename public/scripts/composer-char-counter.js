$(document).ready(function() {
  const text = document.querySelector('textarea');

  text.addEventListener('keyup', function(event){
    const counter = this.parentNode.children[2];
    let counterNum = counter.innerText;
    let jText = $(this);
    let charCount = jText.val().length;
    console.log(counterNum, charCount);
    counter.innerText = 140 - charCount;
    console.log(counter);
    if(charCount > 140){
      $(counter).addClass('invalidText');
    }else{
      $(counter).removeClass('invalidText');
    }
  });


});
