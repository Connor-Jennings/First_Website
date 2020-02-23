


$(function(){
   var counter = 0;
   $.ajax({
      beforeSend: function(xhr){
         if(xhr.ovverideMimeType){
            xhr.ovverideMimeType("application/json");
         }
      }
   });

   function loadImages(){
      $.getJSON('data/photos.json')
         .done(function(data){
            var newContent = '';
            for(var i=0; i<data.photoList.length; i++){
               newContent += '<img class="picture" src="'+ data.photoList[i].src +'" ';
               newContent += 'alt ="' + data.photoList[i].alt +'" ';
               newContent += 'width ="' + data.photoList[i].width +'" ';
               newContent += 'height ="' + data.photoList[i].height +'" />';
            }
            $('div#imgs').html(newContent);})
         .fail(function(){
            $('div#imgs').html('<p>Load failed<p>');
            });
   }

   $('h2.gallery').on('click', function(){
      if((counter%2) == 0){
         $('div.photos').children('p').hide();
         counter +=1;
         if(counter === 1){
            loadImages();
         }
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

});
