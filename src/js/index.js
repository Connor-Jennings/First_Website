
//This page contains the JavaScript for the Home page 


$(function(){                                         //When the DOM is ready
   var counter = 0;                 //for toggling between photos and obama
   var loadFailed = false;          //for loading photos
   $.ajax({
      beforeSend: function(xhr){
         if(xhr.ovverideMimeType){                    //If supported
            xhr.ovverideMimeType("application/json"); // Set MIME to prevent errors
         }
      }
   });

   function LoadImages(){
      $.getJSON('data/photos.json')                   //Try to collect JSON data
         .done(function(data){                        //Build image elements
            var newContent = '';
            for(var i=0; i<data.photoList.length; i++){              
               newContent += '<img class="picture" src="'+ data.photoList[i].src +'" ';
               newContent += 'alt ="' + data.photoList[i].alt +'" ';
               newContent += 'width ="' + data.photoList[i].width +'" ';
               newContent += 'height ="' + data.photoList[i].height +'" />';
            }
            $('div#imgs').html(newContent);
            loadFailed = false;})                       //Insert images
         .fail(function(){
            $('div#imgs').html('<p>Load failed<p>');
            loadFailed = true;                          //asserts load will try again if user tries again
            });
   }

   $('h2.gallery').on('click', function(){         //event listener for photos
      if((counter%2) == 0){
         $('div.photos').children('p').hide();
         counter +=1;
         if(counter === 1 || loadFailed){          //only load in images once 
            LoadImages();
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
