function playSound(file, speed=1, pitchShift=1, loop=false, autoplay=true) {
    /*
    Use the play() method to start the audio. if pitchShift is true
    use the stop() method to stop the audio and destroy the object.
    If pitchShift is false use the pause() method to pause and set
    the attribute currentTime to 0 to reset the time.
    */
    if(pitchShift) {
        /*
        After weeks of searching, I have finally found a way to pitch shift audio.
        Thank you Mozilla.
        2018/03/31:
            https://developer.mozilla.org/en-US/docs/Web/API/AudioBufferSourceNode/playbackRate
            https://github.com/mdn/webaudio-examples/tree/master/decode-audio-data
            https://www.w3schools.com/jsref/prop_audio_loop.asp
        Original comments:
            use XHR to load an audio track, and
            decodeAudioData to decode it and stick it in a buffer.
            Then we put the buffer into the source
        */
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        source = audioCtx.createBufferSource();
        request = new XMLHttpRequest();

        request.open('GET', file, true);

        request.responseType = 'arraybuffer';


        request.onload = function() {
            var audioData = request.response;

        audioCtx.decodeAudioData(audioData, function(buffer) {
            myBuffer = buffer;
            songLength = buffer.duration;
            source.buffer = myBuffer;
            source.playbackRate.value = speed;
            source.connect(audioCtx.destination);
            source.loop = loop;
        },

        function(e){"Error with decoding audio data" + e.error});

        }

        request.send();
        source.play=source.start
    } else {
        source=new Audio(file)
        source.playbackRate=speed
        source.loop=loop
    }
    if(autoplay) {
        source.play()
    }
    return source
}
var source
function play() {
    source=playSound('decode-audio-data/viper.ogg', pitch=2);
}

function stop() {
    source.stop(0);
    document.getElementById('play').href=''
    document.getElementById('play').innerHTML='Refresh to play again'
}
let audioCtx = new AudioContext();
function playPitch(htz,time,type){
    var volume = audioCtx.createGain();
    volume.connect(audioCtx.destination);
    volume.gain.value=0;
    var oscillator=audioCtx.createOscillator();
    oscillator.connect(volume);
    oscillator.type=type;
    oscillator.frequency.value=htz;
   // oscillator.connect(audioCtx.destination);
    oscillator.start();
    volume.gain.linearRampToValueAtTime(1,audioCtx.currentTime+0.01);
     setTimeout(function(){
        volume.gain.linearRampToValueAtTime(0.4,audioCtx.currentTime+0.05);
    },50);
    setTimeout(function(){
        volume.gain.linearRampToValueAtTime(0,audioCtx.currentTime+time/4*tempo/1000);
        oscillator.stop(audioCtx.currentTime+time/4*tempo/1000);
    },time*3/4*tempo
              );
}