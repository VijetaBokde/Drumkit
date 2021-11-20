const keys = Array.from( document.querySelectorAll('.key') );
const sounds = Array.from( document.querySelectorAll('audio') );
const drumRoot = "https://raw.githubusercontent.com/run-time/JavaScript30/master/01%20-%20JavaScript%20Drum%20Kit/sounds/";
const drumSounds = {
  "65": "clap.wav",
  "83": "hihat.wav",
  "68": "kick.wav",
  "70": "openhat.wav",
  "71": "boom.wav",
  "72": "ride.wav",
  "74": "snare.wav",
  "75": "tom.wav",
  "76": "tink.wav"
};

function init() {
  // set the audio src attributes
  sounds.forEach( snd => snd.src = drumRoot + drumSounds[snd.getAttribute("data-key")] );
  
  // listen for keyboard events
  window.addEventListener('keydown', onKeyDown);
  
  // listen for clicks and transition end on keys
  keys.forEach(key => { 
    key.addEventListener('transitionend', onTransitionEnd);
    key.addEventListener('mousedown', onMouseDown);
  });
}

function onTransitionEnd(e) {
  if (e.propertyName === 'transform') {
    e.target.classList.remove('playing');
  }
}

function onMouseDown(e) {
  const key = e.target;
  const audio = document.querySelector('audio[data-key="' + e.target.getAttribute("data-key") + '"]');
  playSound(key, audio);
}

function onKeyDown(e) {
  const key = document.querySelector(`div[data-key="${e.keyCode}"]`);
  const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
  playSound(key, audio);
}

function playSound(key, audio) {
  if (key && audio) {
    key.classList.add('playing');
    audio.currentTime = 0;
    audio.play();
  }
}

init();
