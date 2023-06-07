import { useEffect, useState } from 'react'

let audioElement,audioContext, isPlaying, stereoNode, track;

export default function Home() {

  const [volume, setVolume] = useState(100);

  const inputChangeHandler = (e) =>{
    let val = Number(e?.target?.value ?? 0)
      audioElement.volume = (val / 100)
    setVolume(val)
  }

  const audioUrl = 'magic-tree.mp3';
  
  useEffect(() => {
    const AudioContext = window.AudioContext || window.webkitAudioContext;

    audioContext = new AudioContext();

    audioElement = new Audio(audioUrl);

    track = audioContext.createMediaElementSource(audioElement);

    stereoNode = new StereoPannerNode(audioContext, { pan: 0 });

    track.connect(stereoNode).connect(audioContext.destination);
  }, [])

  function setRight() {
    audioElement.volume = 0.5
    stereoNode.pan.value = 1; // right
  }

  function setLeft() {
    console.log({audioElement,audioContext, track});
    stereoNode.pan.value = -1; // left
  }

  function playPause() {
    // check if context is in suspended state (autoplay policy)
    if (audioContext.state === 'suspended') {
      audioContext.resume();
    }


    isPlaying = !isPlaying;
    if (isPlaying) {
      audioElement.play();
    } else {
      audioElement.pause();
    }
  }

  return (
    <main>
     <button className='px-16 py-2 bg-black text-white' onClick={playPause} >PLAY</button>
     <br/>
     <br/>
     <button className='px-4 mr-5 py-2 bg-black text-white' onClick={setLeft} >LEFT</button>
     <button className='px-4 py-2 bg-black text-white' onClick={setRight} >RIGHT</button>
     <br />
     <input type='range' defaultValue={100} min={0} max={100} onChange={inputChangeHandler}/>
     {volume}
    </main>
  )
}
