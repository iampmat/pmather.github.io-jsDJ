"use strict";
function byId(e){return document.getElementById(e);}

window.addEventListener('load', onDocLoaded, false);

function onDocLoaded()
{
    byId('mFileInput1').addEventListener('change', onChosenFileChange, false);
	byId('mFileInput2').addEventListener('change', onChosenFileChange2, false);
}


function isPlaying(audelem) { return !audelem.paused; }

function onChosenFileChange(evt)
{
    var fileType = this.files[0].type;

    if (fileType.indexOf('audio') != -1){
        loadFileObject(this.files[0], onSoundLoaded);
		//loadFileObject(this.files[1], onSoundLoaded);
		console.log(this.files[0]);
		//console.log(this.files[1]);
	}
    else if (fileType.indexOf('image') != -1)
        loadFileObject(this.files[0], onImageLoaded);

    else if (fileType.indexOf('video') != -1)
        loadFileObject(this.files[0], onVideoLoaded);
		
		
}



function onChosenFileChange2(evt)
{
    var fileType = this.files[0].type;

    if (fileType.indexOf('audio') != -1){
        loadFileObject(this.files[0], onSoundLoaded2);
		//loadFileObject(this.files[1], onSoundLoaded);

		console.log(this.files[0]);
		//console.log(this.files[1]);
	}
    else if (fileType.indexOf('image') != -1)
        loadFileObject(this.files[0], onImageLoaded);

    else if (fileType.indexOf('video') != -1)
        loadFileObject(this.files[0], onVideoLoaded);
		
		
}

function loadFileObject(fileObj, loadedCallback)
{
    var reader = new FileReader();
    var wave_reader = new FileReader();
    reader.onload = loadedCallback;
    wave_reader.onload = loadedCallback;
    reader.readAsDataURL( fileObj );

    wavesurfer.load(wave_reader.readAsDataURL( fileObj ));
}

function onSoundLoaded(evt)
{
    byId('sound1').src = evt.target.result;
    //byId('sound').play();
}
function playSong1() { 
    byId('sound1').play(); 
	
	//while(isPlaying(byId('sound1'))){
	
		//var volume = +document.getElementById("volumeBoth").value;
		//byId('sound1').volume = volume/100;
	//}
} 



function pauseSong1() { 
    byId('sound1').pause(); 
} 

function onImageLoaded1(evt)
{
    byId('image1').src = evt.target.result;
}

function onVideoLoaded1(evt)
{
    byId('video1').src = evt.target.result;
    byId('video1').play();
}






function onSoundLoaded2(evt)
{
    byId('sound2').src = evt.target.result;
    //byId('sound').play();
}
function playSong2() { 
    byId('sound2').play(); 
} 

function pauseSong2() { 
    byId('sound2').pause(); 
} 

function onImageLoaded2(evt)
{
    byId('image2').src = evt.target.result;
}

function onVideoLoaded2(evt)
{
    byId('video2').src = evt.target.result;
    byId('video2').play();
}



function adjustVol(){
//while(isPlaying(byId('sound1'))){
	var volume = byId('volumeBoth').value /100;
	var volumeBefore = byId('volumeBoth').value;
	//byId('sound1').volume = byId('volumeBoth').value /100;
	
	if(volumeBefore > 49){
		byId('sound2').volume = 1.0;
		byId('sound1').volume = (100 - ((volumeBefore-50)*2)) /100;
	}
	else{
		byId('sound1').volume = 1.0;
		//byId('sound1').voume = (100 - (volumeBefore*2)) /100;
		//console.log((100 - (volumeBefore*2)) /100);
		byId('sound2').volume = ((volumeBefore*2)) /100;
		//console.log(byId('sound1').volume);
	}
}

function adjustVol1(){
		var volumeBefore = byId('volume1').value;
		byId('sound1').volume = volumeBefore /100;
}


function adjustVol2(){
		var volumeBefore = byId('volume2').value;
		byId('sound2').volume = volumeBefore /100;
}


$('document').ready(function(){
	var loopthis;
	$('#volumeBoth').mousedown(function(){
		loopthis = setInterval(adjustVol, 100);
		//console.log("hello");
	}).mouseup(function(){
		clearInterval(loopthis);
	});
	
	$('#volume1').mousedown(function(){
		loopthis = setInterval(adjustVol1, 100);
		//console.log("hello");
	}).mouseup(function(){
		clearInterval(loopthis);
	});
	
	$('#volume2').mousedown(function(){
		loopthis = setInterval(adjustVol2, 100);
		//console.log("hello");
	}).mouseup(function(){
		clearInterval(loopthis);
	});
	
	// add your element
  // dont give any of them ids
  //$("#wave").append('<div class="row needsWave"></div>');

  // call the function we will define in a second
  // pass in the path to your file
   //addWaveSurfer("Lykke Buddha - Faded [Conversion].mp3");
	
	

});

// Create an instance
var wavesurfer = Object.create(WaveSurfer);

// Init & load audio file
document.addEventListener('DOMContentLoaded', function () {
    var options = {
        container     : document.querySelector('#wave'),
        waveColor     : 'violet',
        progressColor : 'purple',
        cursorColor   : 'navy'
    };

    if (location.search.match('scroll')) {
        options.minPxPerSec = 100;
        options.scrollParent = true;
    }

    // Init
    wavesurfer.init(options);
    // Load audio from URL
    //wavesurfer.load('test_music/LykkeBuddhaFaded.mp3');

    // Regions
    if (wavesurfer.enableDragSelection) {
        wavesurfer.enableDragSelection({
            color: 'rgba(0, 255, 0, 0.1)'
        });
    }
});

// Play at once when ready
// Won't work on iOS until you touch the page
wavesurfer.on('ready', function () {
    //wavesurfer.play();
});

// Report errors
wavesurfer.on('error', function (err) {
    console.error(err);
});

// Do something when the clip is over
wavesurfer.on('finish', function () {
    console.log('Finished playing');
});


/* Progress bar */
document.addEventListener('DOMContentLoaded', function () {
    var progressDiv = document.querySelector('#progress-bar');
    var progressBar = progressDiv.querySelector('.progress-bar');

    var showProgress = function (percent) {
        progressDiv.style.display = 'block';
        progressBar.style.width = percent + '%';
    };

    var hideProgress = function () {
        progressDiv.style.display = 'none';
    };

    wavesurfer.on('loading', showProgress);
    wavesurfer.on('ready', hideProgress);
    wavesurfer.on('destroy', hideProgress);
    wavesurfer.on('error', hideProgress);
});


// function addWaveSurfer(path){
//     // create instance of WaveSurfer
//     var tempWavesurferObject = Object.create(WaveSurfer);
//         // initialize the object 
//         // ".needsWave:last" gets the last element with the class "needsWave"
//         // which will be the element we just added
//     tempWavesurferObject.init({
//             container: $( ".needsWave:last" )[0],// "[0]" gets the DOM element from the jQuery object
//             waveColor: 'violet',
//             progressColor: 'purple'
//           });
//         tempWavesurferObject.on('ready', function () {
//             tempWavesurferObject.play();
//         });
//         tempWavesurferObject.load(path); // load the file we passed in
//     // add the WaveSurfer to the global array so we can keep up with it
//     WaveSurfers.push(tempWavesurferObject);

//     // below shows how to access the WaveSurfers later by stoping the playback after a few seconds
//      setTimeout(function(){
//           var last = WaveSurfers.length-1; // get index of last WaveSurfer element
//           WaveSurfers[last].stop();
//      }, 10000);

// }
/*
var wavesurfer = WaveSurfer.create({
    container: $('#wave'),
    waveColor: 'violet',
    progressColor: 'purple'
});

wavesurfer.on('ready', function () {
    wavesurfer.play();
});

wavesurfer.load(byId('sound1'));
*/






/*
function repeatingfunction() {
    var volume = byId('volumeBoth').value /100;
	byId('sound1').volume = byId('volumeBoth').value /100;
	console.log(volume);
}
*/
