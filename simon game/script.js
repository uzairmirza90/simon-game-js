var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;


$(document).on("keypress", function(){
    if(!started){
        $("h1").text("level " + level);
        nextSequence();
        started = true;
    }
   
});


$("button").on("click", function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});




function nextSequence(){
    userClickedPattern = [];
    level++;
    $("h1").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
    
    
}


function playSound(name){
    var audio = new Audio(name + ".mp3");
    audio.play();
}

function animatePress(currenColor){
    $("#" + currenColor).addClass("pressed");
    setTimeout(function(){
        $("#" + currenColor).removeClass("pressed");
    }, 100);
}


function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log("success");

        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence();
            }, 1000);
        }
    }else {
        playSound("wrong");
        $("body").css("background-color", "red");
        $("h1").text("Game Over, Press any key");

        setTimeout(function(){
            $("body").css("background-color", "#011F3F");
        }, 200);

        startOver();
    }
}


function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}

// var level = 1;

// $(document).on("keypress", function(event){
//     $("h1").text("Level " + level++);
// })

// $("#green").on("click", function(){
//     var green = new Audio("green.mp3");
//     green.play();
// })

// $("#red").on("click", function(){
//     var red = new Audio("red.mp3");
//     red.play();
// })

// $("#yellow").on("click", function(){
//     var yellow = new Audio("yellow.mp3");
//     yellow.play();
// })

// $("#blue").on("click", function(){
//     var blue = new Audio("blue.mp3");
//     blue.play();
// })




