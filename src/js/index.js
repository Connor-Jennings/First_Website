
//This page contains the JavaScript for the Home page 

function LastKnown(){
   $.getJSON('data/lastTransmission.json')                   //Try to collect JSON data
   .done(function(data){                        //Build image elements
      $('.emergencyStatus p.1').text(data.trip[1].status);
      $('.lastKnownLocation p.1').text(data.trip[1].lat+" "+data.trip[1].lng);
   }).fail(function(){
          alert("Bad connection to server... try reloading");
   });
}



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
  
      adaptiveHeight:true,
      autoWidth:false,
      vThumbWidth:50,
      vThumbHeight:50,
      thumbMargin:3,
      thumbItem:6,
      slideMargin:0,
      loop: true,
      pause: 3000,
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

   
});