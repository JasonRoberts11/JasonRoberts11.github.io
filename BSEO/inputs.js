// JavaScript source code


//InputShowbuttons
document.getElementById("openSettings").onclick = function(){
document.getElementById("settings").style.display = "inline-block";
document.getElementById("openSettings").style.display = "none";
};
document.getElementById("closeSettings").onclick = function(){
document.getElementById("settings").style.display = "none";
document.getElementById("openSettings").style.display = "inline-block";
};


//Tasdfjo
let SETTINGS = ["songName","songSubName","songAuthorName","levelAuthorName"]
let BPMInput = document.getElementById("BPMInput");

let edivide = 4;

let beatSong;
let sliderInput = document.getElementById("timeSlider");
sliderInput.oninput = function(){

	let want = this.value/10000*beatSong.duration();
	let rat = 60 / BPM / edivide;
	beatSong.seek(Math.floor(want/rat)*rat);
	upSeek(beatSong.seek());
}
document.getElementById("seekback").onclick = function(){sknx(-1)};
document.getElementById("seeknext").onclick = function(){sknx(1)};
sliderInput.addEventListener("keydown",function(e){
e.preventDefault();
if(e.code=="ArrowRight"){
sknx(1);
}
if(e.code=="ArrowLeft"){
sknx(-1);
}
});
function sknx(amte){
	let want = beatSong.seek()+0.01;
	let rat = 60 / BPM / edivide;
	beatSong.seek(Math.floor(amte+want/rat)*rat);
	upSeek(beatSong.seek());
}



function GenSettings(){
	let h = "";
	for(i=0;i<SETTINGS.length;i++){
		h+='<tr>';
		h+='<td>';
		h+=SETTINGS[i];
		h+=':</td>'
		h+='<td>'
		h+='<input type="text" id="'+SETTINGS[i]+'">';
		h+='</td>';
		h+='</tr>';
	}
	document.getElementById("setTable").innerHTML=h;
}

function UpdateBeatMap(){
	for(i=0;i<SETTINGS.length;i++){
		upin(SETTINGS[i],infoObj["_"+SETTINGS[i]]);
	}
	BPMInput.value = infoObj._beatsPerMinute;
}
function upin(inpid,val){
	document.getElementById(inpid).value=val;
}


function UpdateImage(){
	document.getElementById("cover").src=coverUrl;

}
function UpdateSong(){
	beatSong = new Howl({
		src: [songUrl],
		format: ['ogg'],
		html5: true,
		volume:0.1
	});
	beatSong.on("end",function(){
		playbutton.innerHTML="Play";
	},songId);
}
console.log(JSZip.support.blob);


let fileInput = document.getElementById("zipimport");
fileInput.onchange = LoadFile;
let mfile = null;

document.getElementById("loadTest").onclick = function(){
	getFileObject('testfile.zip', function (fileObject) {
     fileInput.files[0]=fileObject;
	 mfile = fileObject;
	 
	 LoadFile();
}); 
}

var getFileBlob = function (url, cb) {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", url);
        xhr.responseType = "blob";
        xhr.addEventListener('load', function() {
            cb(xhr.response);
        });
        xhr.send();
};

var blobToFile = function (blob, name) {
        blob.lastModifiedDate = new Date();
        blob.name = name;
        return blob;
};

var getFileObject = function(filePathOrUrl, cb) {
       getFileBlob(filePathOrUrl, function (blob) {
          cb(blobToFile(blob, 'testfile.zip'));
       });
};


let imgInput = document.getElementById("imgImport");
imgInput.onchange = LoadImage;

let songInput = document.getElementById("songImport");
songInput.onchange = LoadSong;

function LoadImage(){
	let file;
	file = imgInput.files[0];
	coverUrl = URL.createObjectURL(file);
	UpdateImage();
}
function LoadSong(){
	let file;
	file = songInput.files[0];
	coverUrl = URL.createObjectURL(file);
	UpdateSong();
}
