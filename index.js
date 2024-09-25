//as there is no backend, leaving as the name arrays here to be able to host it on github without backend required
var gifsNames = ["avocado-1113_512.gif", "bell-pepper-8079_256.gif", "butterfly-13309_512.gif","cartoon-11499_512.gif", "cartoon-562_256.gif",
    "cartoon-564_256.gif", "cartoon-571_256.gif","cartoon-574_256.gif", "cartoon-762_256.gif",
    "cat-13169_512.gif", "cat-133_512.gif","cat-13754_512.gif", "cat-14030_512.gif",
    "cat-6295_512.gif", "character-13952_256.gif","cow-59_256.gif", "dog-12565_512.gif",
    "dog-1879.gif","dog-3343_256.gif","dog-471_256.gif", 
    "emoji-1552.gif", "flower-11997_256.gif","flying-7288_256.gif", "hedgehog-1725_512.gif",
    "horse-11591_512.gif", "kiss-3365_512.gif","ladybug-5068_256.gif", 
    "penguin-10607_256.gif", "pinwheel-8829_256.gif","rabbit-14586_512.gif", "rabbit-6933.gif",
    "sheep-6470_256.gif", "star-19_256.gif","valentine-3652_256.gif", "wall-8423_256.gif",
    "whale-155_512.gif"];


var catchingClick = false;
var soundCought = false;
var gameIsOn = false;

var counter = 0; //to count rounds to show next gif each round
var n = Math.floor(Math.random() * gifsNames.length); //to start showing the gifs from different gif every time

var gifTimeout = "";
var catchingClickTimeout = "";
var startGameTimeout = "";
var playGameTimeout = "";
var externalSound = false;
var externalSoundTimeout = "";


var AudioNames =[ "1500.mp3", "200.mp3","300.mp3", "500.mp3","800.mp3","1000.mp3"]; 
var audiosToPlay = [];
var audiosUnlocked = false;
for (let i=0; i<AudioNames.length;i++){
    var audio = new  Audio("sounds/" + AudioNames[i]);

    audiosToPlay.push(audio);
    console.log(audio.nodeName);
}

let gifs = [];
function preload_image(gifsNames) {
    
    for (let i=0; i<gifsNames.length; i++){
        let img = new Image();
        img.src = "gifs/" + gifsNames[i];
        gifs.push(img);
    }
    
  }
  


function startStopGame(event){

    //once Start button is clicked do this: 
    if (event.key){console.log(event.key)} else {
        event.preventDefault();

        if (!gameIsOn) {
            gameIsOn = true; 
            speed = $(".amgspeed").val();
            $(".amgstartstop").text("Stop");
            $(".amgstartstop").removeClass("btn-primary");
            $(".amgstartstop").addClass("btn-outline-secondary");
            $(".amgwarning").addClass("d-none");
            $(".amgspeedoptions").addClass("d-none");
            $(".amghelp").addClass("d-none");
            $(".amgexternalsound").addClass("d-none");
            $(':focus').blur();

            if (!audiosUnlocked){
                for (let i=0; i<audiosToPlay.length; i++){
                    audiosToPlay[i].play();
                    audiosToPlay[i].pause();
                    audiosToPlay[i].currentTime = 0;
                }
                audiosUnlocked = true;
            }

            if (speed == 2) {
                howLongToShowGif = 5000;
                howLongToListen = 3000;
                howLongTillNextRoundDefault = 5000;
            } else {
                howLongToShowGif = 10000;
                howLongToListen = 6000;
                howLongTillNextRoundDefault = 10000;
            }
            
            if (!externalSound) {
                startGameTimeout =  setTimeout(function(){
                    playGame(); 
                    $(".amggif").css("background-color", "gray");
                    setTimeout(function(){
                        $(".amggif").css("background-color", "white");
                    },500)
                    
                },3000);
            }
    

        } else {
            //stopping game
            gameIsOn=false; 
            catchingClick = false;
            audio.pause();

            clearTimeout(catchingClickTimeout);
            clearTimeout(playGameTimeout);
            clearTimeout(gifTimeout);
            clearTimeout(startGameTimeout);

            $(".amgstartstop").text("Start");
            $(".amgstartstop").addClass("btn-primary");
            $(".amgstartstop").removeClass("btn-outline-secondary");
            $(".amgspeedoptions").removeClass("d-none");
            $(".amghelp").removeClass("d-none");
            $(".amgexternalsound").removeClass("d-none");
            $(".amggif").attr("src", "images/button-162066_640.png");

            $(':focus').blur();

        }
    } 
}


function checkCoughtSound(event){
    //if there is a click or key press, check if it was in catchingClick time window and no previous sound has been caught
    //if the condition is met show gif

    if (!externalSound) {
        if (gameIsOn && catchingClick && (!soundCought)){ 
            soundCought = true;
            counter++;

            //pick and show next gif
            gif = gifs[(n+counter) % gifsNames.length];
            $(".amggif").attr("src", gif.src);

            //switch to the button image after some time
            gifTimeout = setTimeout(function(){
                $(".amggif").attr("src", "images/button-162066_640.png");
            },howLongToShowGif);
        }
    } else { 
        if (catchingClick) {
            counter++;
            catchingClick = false;
            //pick and show next gif
            gif = gifs[(n+counter) % gifsNames.length];
            $(".amggif").attr("src", gif.src);

            //switch to the button image after some time
            externalSoundTimeout = setTimeout(function(){
                $(".amggif").attr("src", "images/button-162066_640.png");
                catchingClick = true;
            },4000);
        }
    }
}

function playGame(){

    soundCought = false;
    playRandomSound();
    catchingClick = true;    
    catchingClickTimeout = setTimeout(function(){
        catchingClick = false;
        
        $(".amgstartstop").text("Stop");
    }, howLongToListen);
    
    let randomWaiting = Math.floor(Math.random()*3000);

    if (soundCought) {
        howLongTillNextRound = howLongTillNextRoundDefault + howLongToShowGif + howLongToListen+ randomWaiting;
    } else {
        howLongTillNextRound = howLongTillNextRoundDefault + howLongToListen + randomWaiting;
    }

    playGameTimeout = setTimeout(function(){
        if (gameIsOn){
            playGame();
        };
    }, howLongTillNextRound);
}

function playRandomSound(){
    let i = Math.floor(Math.random() * AudioNames.length);
    audio = audiosToPlay[i];

    audio.play();
    //$(".amgstartstop").text(AudioNames[i]);

}

function soundSourceSwitch() {
    if (externalSound) {
        externalSound = false; 
        catchingClick = false;
        $(".amggif").attr("src", "images/button-162066_640.png");
        clearTimeout(externalSoundTimeout);

        $(".amgexternalsound").text("♫");
        $(".amgstartstop").removeClass("d-none");
        $(".amgwarning").removeClass("d-none");
        $(".amgspeedoptions").removeClass("d-none");
        $(".amghelp").removeClass("d-none");

    } else {
    externalSound = true; 
    catchingClick = true;
    speed = 2;
    $(".amgstartstop").addClass("d-none");
    $(".amgwarning").addClass("d-none");
    $(".amgspeedoptions").addClass("d-none");
    $(".amghelp").addClass("d-none");
    $(".amgexternalsound").text("Hotovo");
}
}


$(document).ready(function(){

    preload_image(gifsNames);

    //LISTENERS
    //to evaluate if the click cought the sound
    $(".amggif").on("click", checkCoughtSound);
    $(".amggif").on("touchstart", checkCoughtSound);
    $(document ).on("keypress", checkCoughtSound);
    //to start the game
    $(".amgstartstop").on("click", startStopGame);
    $(".amgexternalsound").on("click", soundSourceSwitch);
});
