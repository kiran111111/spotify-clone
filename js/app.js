
// START

import {songsList} from './data/songs.js';
import Trackbar from './trackbar.js';

// cache the DOM
const playEl = document.querySelector(".fa-play");
const playlistEl = document.querySelector(".playlist");
const playerCountEl = document.querySelector(".player__count");
const playerTriggerEl = document.querySelector(".player__trigger");
const songs = songsList;


let currentPlayingIndex = 0;
let currentSong = new Audio(songs[currentPlayingIndex].url)


function changeAudioSrc(){
   currentSong.src = songs[currentPlayingIndex].url;
}

function togglePlayPause(){
 return currentSong.paused ? currentSong.play() : currentSong.pause();
}

// tracker
currentSong.addEventListener("timeupdate",function(){
   Trackbar.setState(currentSong);
  //  Trackbar.changePos(currentSong);
})


function playNext(){
 if(songs[currentPlayingIndex+1]){
  currentPlayingIndex++;
  currentSong.src = songs[currentPlayingIndex].url;
  renderSongs();
  listeners();
  togglePlayPause(); 
 }
 else{
  currentPlayingIndex = 0;
 }
}


function numberOfSongs(songs){
  let count = songs.length;
  setValue(playerCountEl,count)
} 

numberOfSongs(songs);


function mainPlay(clickedIndex){
  if(clickedIndex == currentPlayingIndex){
   console.log("same")
   togglePlayPause();
  }
  else{
   currentPlayingIndex = clickedIndex;
   changeAudioSrc();
   togglePlayPause();
  }
}


function listeners(){
  playlistEl.addEventListener("click",function(){
   if(event.target && event.target.matches('.fa')){
    const listElem = event.target.parentNode.parentNode;
    const listElemIndex = [...listElem.parentElement.children].indexOf(listElem);
    // this above gives us a html collection but .indexOf does not work for it so we convert it into a array by spreding it
    mainPlay(listElemIndex);
    renderSongs();
   };
});

  
currentSong.addEventListener("ended",function(){
   playNext();
  });
};




function renderSongs(){
 let markup = "";

 const toggleIcon = itemIndex =>{
  if(currentPlayingIndex == itemIndex ){
   return currentSong.paused ? 'fa-play' : 'fa-pause';
  }
  else{
   return 'fa-play';
  }
 }


songs.forEach(function makeList(item,index){
  markup += `
  <li class="playlist__song  ${index === currentPlayingIndex ? 'playlist__song--active' : ''}">
    <div class="play-pause">
      <i class="fa ${toggleIcon(index)} pp-icon"></i>
    </div>
    <div class="playlist__songs-details">
      <span class="playlist__song-name">${item.title}</span><br>
      <span class="playlist__song-artist">${item.artist}</span>
    </div>
    <div class="playlist__song-duration">
     ${item.time}
    </div>
  </li>
    `;
  }); 
 setValue(playlistEl,markup);
}



function setValue(elem,value){
    elem.innerHTML = value;
}


// the Play button

playerTriggerEl.addEventListener("click",function(){
    listeners();
    togglePlayPause();
    renderSongs();
})

listeners();
renderSongs();

// function designed to display the list of all songs in list








// function made to play the song when clicked to play
// function  playSong(){
//   playEl.addEventListener("click",function(){
//    console.log("Song can be played with A1.play()")
//   })
// }

// playSong();

