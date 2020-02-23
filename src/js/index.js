



//function to toggle between loading in photos and obama 
var counter = 0;
$('h2.gallery').on('click', function(){
   if((counter%2) == 0){
      $('div.photos').children('p').hide();
      counter +=1;
      if(counter === 1){
         var newContent = '';
         $.getJSON('data/photos.json')
         .done(function(data){
            for(var i=0; i<data.photoList.length; i++){
               newcontent += '<img src="'+ data.events[i].src +'" ';
               newcontent += 'alt ="' + data.events[i].alt +'" ';
               newContent += 'width ="' + data.events[i].width +'" ';
               newContent += 'height ="' + data.events[i].height +'" />';
            }
            $('div#imgs').html(newContent);})
         .fail(function(){
            $('div#imgs').html('<p>Load failed<p');
            });}
      else{
         $('div#imgs').show();
      }
   }
   else{
        $('div#imgs').hide();
        $('div.photos').children('p').show();
        counter+=1;
   }
});