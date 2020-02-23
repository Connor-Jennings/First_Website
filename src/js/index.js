



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
               newContent += '<img src="'+ data.photoList[i].src +'" ';
               newContent += 'alt ="' + data.photoList[i].alt +'" ';
               newContent += 'width ="' + data.photoList[i].width +'" ';
               newContent += 'height ="' + data.photoList[i].height +'" />';
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