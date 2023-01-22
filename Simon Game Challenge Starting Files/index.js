var level=0;
var userClickedPattern = [];
var started = false;
var gamePattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];


$(document).keydown(function(){

    if(!started){
        $("#level-title").text("Level "+level);
        nextSequence();
        started = true;
    }
   
});

$(".btn").click(function(){

    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);

    checkAnswer(userClickedPattern.length-1);

});

function checkAnswer(currentlevel){

    if(userClickedPattern[currentlevel] === gamePattern[currentlevel]){

        if(userClickedPattern.length === gamePattern.length){

            setTimeout(function(){
                nextSequence();             //for the next color generation
            },1000);
        }
    }else{

        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game over , press any key to restart");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);

        startOver();

    }


}

function playSound(chosenColor){

    switch(chosenColor){

        case "red":
            var audio = new Audio("/sounds/red.mp3");
            audio.play();
            break;

        case "blue":
            var audio = new Audio("/sounds/blue.mp3");
            audio.play();
            break;

        case "green":
            var audio = new Audio("/sounds/green.mp3");
            audio.play();
            break;
            
        case "yellow":
            var audio = new Audio("/sounds/yellow.mp3");
            audio.play();
            break;

        default:
            var audio = new Audio("/sounds/wrong.mp3");
            audio.play();
            break;
    }
}
function nextSequence(){

    userClickedPattern =[];
    level++;
    $("#level-title").text("level "+level);
    var randomChosenNumber =  Math.floor(Math.random()*4);
    var randomChosenColor = buttonColors[randomChosenNumber];
    gamePattern.push(randomChosenColor);    

    $("#"+ randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColor);

    
}

function animatePress(currentColor){

    $("#"+currentColor).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");
    }, 100);
    
}

function startOver(){

    //reset everything
    level = 0;
    gamePattern = [];
    started = false;
}



