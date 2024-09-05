
function startGame(event) {
    //let disappear options as the game is started
    speedOptions.classList.add("d-none");
    startStopButton.classList.remove("d-none");
    rules.classList.add("d-none");

    stopped = false;
    startStopButton.textContent = "Stop"; 

    speedLevel = document.querySelector(".amgamespeed").value;
    fullDelay = Math.floor(delay/speedLevel);

    playGame(n); 
   
}

function stopGame(event){
    location.reload();
}


function playRandomSound(){
    let n = Math.random();
    n = n*AudioNamesArray.length;
    n = Math.floor(n);
    var audio = new Audio("sounds/" + AudioNamesArray[n]);
    audio.play();

}

function catchPressedKey(event) {

    gameControlGif.src = "gifs/" + gifsNamesInitialArray[(n+round) % gifsNamesInitialArray.length];
    round++;
    document.removeEventListener("keydown", catchPressedKey);
    gameControlGif.removeEventListener("click", catchPressedKey); 
    setTimeout(function(){
        

    },fullDelay);
       
}


//playgame function controls that once the sound is played the keypresses or click check is activated and if the key is pressed within time, gif appears
function playGame(){
    
    gameControlGif.src = buttonImage;
    randomMiliSeconds = Math.random()*1000 + fullDelay;


    setTimeout(function(event) {          
        document.addEventListener("keydown", catchPressedKey);
        gameControlGif.addEventListener("click", catchPressedKey);
        if (stopped==false){playRandomSound();};
       //after x sec 
        setTimeout(function(){
            document.removeEventListener("keydown", catchPressedKey);
            gameControlGif.removeEventListener("click", catchPressedKey); 
            
            if (stopped==false){playGame(); };

        },randomMiliSeconds);
        
       
        }, 5000); 
    
    
}


//Initial setup of the game

//setup of the sounds and images
//should be replaced by getting the folder from server side, based on github hosting, leaving as it is
var gifsNamesInitialArray = [ "bell-pepper-8079_256.gif", "cartoon-571_256.gif", "character-13952_256.gif", "dog-3343_256.gif",
    "flower-11997_256.gif", "flying-7288_256.gif", "ladybug-5068_256.gif", "pinwheel-8829_256.gif",
    "star-19_256.gif", "valentine-3652_256.gif","wall-8423_256.gif" ]

var AudioNamesArray =["100.mp3", "1500.mp3", "200.mp3","300.mp3", "500.mp3","800.mp3","1000.mp3"]; 
var speedLevel = 1;
var delay = 20000; //number of ms to delay SetTimout
var fullDelay = delay;

var gameControlGif = document.querySelector(".amgamegif");
var startStopButton = document.querySelector(".amstartstopbutton");
var speedOptions = document.querySelector(".amgamespeedoptions");


var stopped = true;
var buttonImage ="images/button-162066_640.png";
var rules = document.querySelector(".pravidla");


//getting random number to start with the gifs in the array as start is randomly picked up and affer it one by one is shown
var n = Math.floor(Math.random() * gifsNamesInitialArray.length);
var round = 0;


//start/stop control 
startStopButton.addEventListener("click", function(event){ 
                                        if (stopped==true){startGame(event);} 
                                        else {stopGame(event);}
                                    });

                                    //start/stop control 
rules.addEventListener("click", function(){ 
    window.alert("Nastav si rychlost a spusť hru.  Jakmile zazní zvuk, klikni na vypínač nebo stiskni jakékoli tlačítko. Když uhodneš zvuk, objeví se obrázek. Jestli už nechceš hrát klikni na Stop. Pokud je jiný problém, aktualizuj celou stránku nebo zavři a otevři prohlížeč.");
});

