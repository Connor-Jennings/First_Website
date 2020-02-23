



//function to toggle between loading in photos and obama 
var counter = 0;
$('h2.gallery').on('click', function(){
   if((counter%2) == 0){
        $('div.photos').children('p').hide();
        counter +=1;
        
        var xhr = new XMLHttpRequest();
        
        xhr.onload = function(){
         if(xhr.status !== 200){
            responseObject = JSON.parse(xhr.responseText);
            
            var newContent = '<div class="imgs">';
            for(var i=0; i<responseObject.events.lenght; i++){
               newcontent += '<img src="'+ responseObject.events[i].src +'" ';
               newcontent += 'alt ="' + responseObject.events[i].alt +'" ';
               newContent += 'width ="' + responseObject.events[i].width +'" ';
               newContent += 'height ="' + responseObject.events[i].height +'" />';
            }
            newContent += '</div>';
            $('div.photos').append(newContent);
         }
       };
       xhr.open('GET', 'data/photos.json', true);
       xhr.send();
   }
   else{
        $('div.imgs').hide();
        $('div.photos').children('p').show();
        counter+=1;
   }
});