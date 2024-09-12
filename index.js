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

var AudioNames =[ "1500.mp3", "200.mp3","300.mp3", "500.mp3","800.mp3","1000.mp3"]; 

var listening = false;
var soundCatched = false;
var gameIsOn = false;
var counter = 0; //to count rounds to show next gif each round
var n = Math.floor(Math.random() * gifsNames.length); //to start showing the gifs from different gif every time
var gifTimeout = "";
var listeningTimeout = "";
var startGameTimeout = "";
var playGameTimeout = "";
var audio = new  Audio("sounds/" + AudioNames[0]);


function detectBrowser() {
    var userAgent = navigator.userAgent;
   if ( (userAgent.indexOf("Firefox") > -1) || (userAgent.indexOf("Chrome") > -1 )) {
    console.log("browser ok" + userAgent.indexOf("Firefox") + " in FF and in Chrome" + userAgent.indexOf("Chrome"));

        
    } else {
        $(".amgwarning").removeClass("d-none");
        $(".amgwarning").text("Otevři mě prosím v Chromu nebo Firefoxu, jinak nemusím správně fungovat. Děkuji!");
    }
    
}


function startStopGame(event){
    if (event.key){console.log("neco")} else {
    event.preventDefault();
    console.log(event.preventDefault());
    console.log(event);
    if (!gameIsOn) {
        gameIsOn = true; 
        speed = $(".amgspeed").val();

        $(".amgstartstop").text("Stop");
        $(".amgstartstop").removeClass("btn-primary");
        $(".amgstartstop").addClass("btn-outline-secondary");
        $(".amgwarning").addClass("d-none");
        $(".amgspeedoptions").addClass("d-none");
        $(".amghelp").addClass("d-none");

        $(':focus').blur();
        

        console.log("elemnet blur");
        event.preventDefault();
        console.log(event);

        if (speed == 2) {
             howLongToShowGif = 5000;
             howLongToListen = 3000;
             howLongTillNextRoundDefault = 5000;
        } else {
            howLongToShowGif = 10000;
            howLongToListen = 6000;
            howLongTillNextRoundDefault = 10000;
        }
        
        
        startGameTimeout =  setTimeout(function(){
            playGame(); 
        },3000);
 

    } else {
        
        gameIsOn=false; 
        listening = false;
        audio.pause();

        clearTimeout(listeningTimeout);
        clearTimeout(playGameTimeout);
        clearTimeout(gifTimeout);
        clearTimeout(startGameTimeout);

        $(".amgstartstop").text("Start");
        $(".amgstartstop").addClass("btn-primary");
        $(".amgstartstop").removeClass("btn-outline-secondary");
        $(".amgspeedoptions").removeClass("d-none");
        $(".amghelp").removeClass("d-none");
        $(".amggif").attr("src", "images/button-162066_640.png");
        
        audio.pause();

        $(':focus').blur();

    }
} 
}


function checkCatchedSound(event){
    console.log(event.key);
  
    if (gameIsOn && listening && (!soundCatched)){ 
        soundCatched = true;
        counter++;

        //pick and show next gif
        gif = "gifs/" + gifsNames[(n+counter) % gifsNames.length];
        $(".amggif").attr("src", gif);

        //switch to the button image after some time
        gifTimeout = setTimeout(function(){
            $(".amggif").attr("src", "images/button-162066_640.png");
        },howLongToShowGif);
    }
}

function playGame(){

    soundCatched = false;
    playRandomSound();

    listening = true;
    
    listeningTimeout = setTimeout(function(){
        listening = false;
    }, howLongToListen);
    console.log(listeningTimeout);

    let randomWaiting = Math.floor(Math.random()*3000);

    if (soundCatched) {
    howLongTillNextRound = howLongTillNextRoundDefault + howLongToShowGif + howLongToListen+ randomWaiting;
    }
    else {
    howLongTillNextRound = howLongTillNextRoundDefault + howLongToListen + randomWaiting;
    }

    playGameTimeout = setTimeout(function(){
        if (gameIsOn){
        playGame();
    };
    }, howLongTillNextRound);
    console.log(playGameTimeout);
}

function playRandomSound(){
    let i = Math.floor(Math.random() * AudioNames.length);
    audio = new Audio("sounds/" + AudioNames[i]);
    audio.play();
    //setTimeout(function(){audio.pause();},2700); //the audio is 3 sec long, can be adjusted, later maybe included in speed options
    

}

detectBrowser();
//LISTENERS


//to evaluate if the click catched the sound
$(".amggif").on("click", checkCatchedSound);
$(".amggif").on("touchstart", checkCatchedSound);
$(document ).on("keypress", checkCatchedSound);
//to start the game
$(".amgstartstop").on("click", startStopGame);

$(".amghelp").on("click", function(){ 
    window.alert("Nastav si rychlost a spusť hru. V pomalém módu zazní přibližně 3 zvuky za minutu, v rychlém 6. Jakmile zazní zvuk, klikni na vypínač nebo stiskni jakékoli tlačítko. Když uhodneš zvuk, objeví se obrázek. Jestli už nechceš hrát klikni na Stop. Pokud je jiný problém, aktualizuj celou stránku nebo zavři a otevři prohlížeč. Pokud neslyšíš zvuk, zkontroluj, zda ostatní programy zvuk vydávají, případně připoj sluchátka.");
});
