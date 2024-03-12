 
const Trackbar = (_ =>{

 
const state = {
   currentTrackTime :0,
   fullTrackTime :0,
   fullWidth:0
    }

    // cache the DOM
const trackbarEl = document.querySelector(".track-bar");
const trackbarFillEl = document.querySelector(".track-bar__fill");
const slider = document.getElementById("myRange");
  

const init = _ =>{
     render();
   }

const render = _ =>{
    trackbarFillEl.style.width = state.nowWidth +"%";
    if(slider.value){
    slider.value = state.nowWidth;
    }else{
    slider.oninput = function() {
     state.nowWidth - this.value;
     slider.value = this.value;
      }
     }
  }


const getPercentage =(num1,num2) =>{
 return (num1/num2)*100
}

const setState = obj =>{
    state.currentTrackTime = obj.currentTime;
    state.fullTrackTime = obj.duration;
    state.nowWidth =  getPercentage(state.currentTrackTime,state.fullTrackTime);
    render();
}


  return {
    init : init,
    setState : setState
   }
})();


export default Trackbar;

