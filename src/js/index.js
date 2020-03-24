
//This page contains the JavaScript for the Home page 

function LoadImages(){
    $.getJSON('data/photos.json')                   //Try to collect JSON data
       .done(function(data){                        //Build image elements
          var newContent = '';
          for(var i = 0; i < data.photoList.length; i++){
             newContent += '<li >';
             newContent += '<img src="' + data.photoList[i].src + '" />';
             newContent += '</li>  ';
          }
          $('#anchor-tag').append(newContent);
          loadFailed = false;})                       //Insert images
       .fail(function(){
          alert("Loading images failed");
          loadFailed = true;                          //asserts load will try again if user tries again
          });
   }


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

   
  
   $('h2.gallery').on('click', function(){         //event listener for photos
      if((counter%2) == 0){
         $('div.photos').children('p').hide();
         counter +=1;
         if(counter === 1 || loadFailed){          //only load in images once 
            LoadImages();
            $("#anchor-tag").lightSlider({
              gallery: true,    
              item: 0,
              loop: false,
              slideMargin: 10,
              thumbItem: 0,
              vThumbWidth:100,
              adaptiveHeight:false,
              autoWidth: true,
              mode: "slide",
              useCSS: true,
              cssEasing: 'ease', //'cubic-bezier(0.25, 0, 0.25, 1)',//
              easing: 'linear', //'for jquery animation',////
            
              speed: 400, //ms'
              auto: false,
              slideEndAnimation: true,
              pause: 2000,
            
              keyPress: true,
              controls: true,
              prevHtml: '',
              nextHtml: '',
            
              rtl:false,
          
              galleryMargin: 5,
              thumbMargin: 5,
              currentPagerPosition: 'middle',
            
              enableTouch:true,
              enableDrag:true,
              freeMove:true,
              swipeThreshold: 40,
            });
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