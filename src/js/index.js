



//function to toggle between loading in photos and obama 
var counter = 0;
$('h2.gallery').on('click', function(){
   if((counter%2) == 0){
        $('div.photos').children('p').hide();
        counter +=1;
        if(counter === 1){
         $.getJSON('data/photos.json').done(function(){
           var newContent = '';
           for(var i=0; i<responseObject.events.lenght; i++){
              newcontent += '<img src="'+ responseObject.events[i].src +'" ';
              newcontent += 'alt ="' + responseObject.events[i].alt +'" ';
              newContent += 'width ="' + responseObject.events[i].width +'" ';
              newContent += 'height ="' + responseObject.events[i].height +'" />';
           }
           $('div#imgs').html(newContent);
         }).fail(function(){
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