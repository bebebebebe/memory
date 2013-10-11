$( document ).ready(function() {
  var num = 8; // number of card types
  play(num);
  $('#reset').on('click', function(){reset(num)})
  $('#btn').on('click', function(){
    num = $('#pickNumber').val();
    reset(num);
  })
});