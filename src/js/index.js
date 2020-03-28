
//This page contains the JavaScript for the Home page 

function LastKnown(){
   $.getJSON('data/lastTransmission.json')                   //Try to collect JSON data
   .done(function(data){                        //Build image elements
      $('.emergencyStatus p.1').text(data.last.status);
      $('.lastKnownLocation p.1').text(data.last.lat+" "+data.last.lng);
   }).fail(function(){
          alert("Bad connection to server... try reloading");
   });
}

/*
function FormatImages(){
   for(var i=0; i<10; ++i){
      $('img').css('width:500px','height:500px');
   }
}

*/

$(function(){                                         //When the DOM is ready
   $.ajax({
      beforeSend: function(xhr){
         if(xhr.ovverideMimeType){                    //If supported
            xhr.ovverideMimeType("application/json"); // Set MIME to prevent errors
         }
      }
   });

   LastKnown();
   
   
   $("#anchor-tag").lightSlider({      //settings for photo slider
      gallery:true,
      item:1,
   width:500,
   height:400,
   verticalHeight:295,
  
      adaptiveHeight:false,
      autoWidth:false,
      vThumbWidth:50,
      vThumbHeight:50,
      thumbMargin:3,
      thumbItem:6,
      slideMargin:0,
      loop: true,
      pause: 5000,
      pauseOnHover: true,
      
      auto:true,
   
      keyPress: true,
      controls: true,
      pager:true,
      currentPagerPosition: 'middle',
    
      enableTouch:true,
      enableDrag:true,
      freeMove:true,
      swipeThreshold: 40
   });
   $('#0').css('height:500;');
   
});