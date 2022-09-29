 // 2. This code loads the IFrame Player API code asynchronously.
 var tag = document.createElement('script');

 tag.src = "https://www.youtube.com/iframe_api";
 var firstScriptTag = document.getElementById('script_1');
 firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

 // 3. This function creates an <iframe> (and YouTube player)
 //    after the API code downloads.
 var playerOne;
 var playerThree;

 function onYouTubeIframeAPIReady() {
   playerOne = new YT.Player('player1', {
     height: '390',
     width: '640',
     videoId: 'Ldlz1mL7UKQ',
     playerVars: {
       'playsinline': 1
     },
     events: {
       //'onReady': onPlayerReady,
       'onStateChange': onPlayerStateChange
     }
   });

   playerTwo = new YT.Player('player2', {
 height: '390',
 width: '640',
 videoId: 'b-iuIRgefxc',
 playerVars: {
   'playsinline': 1
 },
 events: {
   //'onReady': onPlayerReady,
   'onStateChange': onPlayerStateChange
 }
});

// stolen music video
playerThree = new YT.Player('player3', {
     height: '390',
     width: '640',
     videoId: 'P6My5ug-EOg',
     playerVars: {
       'playsinline': 1,
      

     },
     events: {
       //'onReady': onPlayerReady,
       // 'onStateChange': onPlayer3StateChange
     }
   });

 }




 function playYT1(event) {
   playerOne.playVideo()

 }

 function playYT2() {
   playerTwo.playVideo()

}

function playYT3() {
    playerThree.playVideo()
}

function playYT3AtKazoo() {
    playerThree.loadVideoById({'videoId': 'P6My5ug-EOg', 'startSeconds': 103})
    playerThree.playVideo()

 
 }

//   // 4. The API will call this function when the video player is ready.
//   function onPlayerReady(event) {
//     event.target.playVideo();
//   }

 // 5. The API calls this function when the player's state changes.
 //    The function indicates that when playing a video (state=1),
 //    the player should play for six seconds and then stop.
 var done = false;
 function onPlayerStateChange(event) {
   console.log("state has changed")
   if (event.data == YT.PlayerState.PLAYING) {
     setTimeout(timeVideo1, 1000);
   }
   else if (event.data == YT.PlayerState.PAUSED && !done)
   {
       console.log("stopped")
       setTimeout(revealVideo2, 1000)

   }
  

}
 function timeVideo1() {
   time = playerOne.getCurrentTime();
   console.log(time)
   if (time > 114) {
       revealVideo2()




   }
   else {

   setTimeout(timeVideo1, 1000);

   }
 }

 function revealVideo2() {
   document.getElementById("player2container").style.display = "block"
       document.exitFullscreen()
       document.getElementById('player2').scrollIntoView();
       setTimeout(playYT2, 500);
       setTimeout(stopVideo1, 900);
       done = true;
 }

 function stopVideo1() {
   
   playerOne.stopVideo();
 }

//       var done = false;
//   function onPlayerStateChange(event) {
//     if (event.data == YT.PlayerState.PLAYING && !done) {
//       setTimeout(stopVideo2, 6000);
//       done = true;
//     }
//   }
function stopVideo2() {
playerTwo.stopVideo();
}