
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
               newContent += '<li data-thumb="'+ data.photoList[i].src + '">';
               newContent += '<img src="' + data.photoList[i].src +'" />';
               newContent += '</li>';
               /*
               newContent += '<img class="picture" src="'+ data.photoList[i].src +'" ';
               newContent += 'alt ="' + data.photoList[i].alt +'" ';
               newContent += 'width ="' + data.photoList[i].width +'" ';
               newContent += 'height ="' + data.photoList[i].height +'" />';
            */
            }
            $('ul#lightSlider').append(newContent);
            loadFailed = false;})                       //Insert images
         .fail(function(){
            alert("Loading images failed");
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
   
   $(document).ready(function() {
			$("#content-slider").lightSlider({
                loop:true,
                keyPress:true
            });
            $('#image-gallery').lightSlider({
                gallery:true,
                item:1,
                thumbItem:9,
                slideMargin: 0,
                speed:500,
                auto:true,
                loop:true,
                onSliderLoad: function() {
                    $('#image-gallery').removeClass('cS-hidden');
                }  
            });
		});
});
