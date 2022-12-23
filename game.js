var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;
var f = 0;
var k = 0;

$(document).keydown(function(){
    if (!started){
        // $("h1").text("Level "+level);
        nextSequence();
        started = true;
    }
});

$(".btn").click(function(){
    var x = $(this).attr("id");
    userClickedPattern.push(x);
    // var sound = new Audio("./sounds/"+x+".mp3");
    // sound.play();
    animatePress(x);
    if (gamePattern[k] !== userClickedPattern[k]){
        console.log("false");
        var g_o = new Audio("./sounds/wrong.mp3");
        g_o.play();
        $("body").addClass("game-over");
        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 200);
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }
    else{
        var sound = new Audio("./sounds/"+x+".mp3");
        sound.play();
        k++;
        console.log(k);
        console.log(level);
        if (k === level){
            console.log("*");
            checkAnswer();
        }
    }
});

function nextSequence(){
    level++;
    $("#level-title").text("Level "+level);
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber]
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeOut(100).fadeIn(100);
    // var audio = new Audio("sounds/"+randomChosenColour+".mp3");
    // audio.play();
}

function animatePress(cur_col){
    $("#"+cur_col).addClass("pressed");
    setTimeout(() => {
        $("#"+cur_col).removeClass("pressed");
    }, 200);
}

function checkAnswer(){
    // console.log(gamePattern);
    // console.log(userClickedPattern);
    // for (var i=0;i<userClickedPattern.length;i++){
    //     if (gamePattern[i] === userClickedPattern[i]) f = 1;
    //     else{ 
    //         f = 0;
    //         break;
    //     }
    // }
    // if (f === 1){
        console.log("true");
        userClickedPattern = [];
        k = 0;
        setTimeout(() => {
            nextSequence();
        }, 1000);
    // }
    // else{
    //     console.log("false");
    //     $("body").addClass("game-over");
    //     setTimeout(() => {
    //         $("body").removeClass("game-over");
    //     }, 200);
    //     $("h1").text("Game Over, Press Any Key to Restart");
    //     startOver();
    // }
}

function startOver(){
    gamePattern = [];
    started = false;
    k = 0;
    level = 0;
    userClickedPattern = [];
    $(document).keydown(function(){
        if (!started){
            nextSequence();
            started = true;
        }
    });
}