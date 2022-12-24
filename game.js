// alert("hello");
var  gamePattern = []
var buttonColours = ["red", "blue", "green", "yellow"];

var userClickedPattern = []

var started = true;
// to keep at what level current game is.
var level = 0

startOver = function(){
    level = 0;
    gamePattern = [];
    started = true;   
}





doset = function(game){
    setTimeout(function(){
        console.log("ss",game)
        $("#" + game).fadeOut();
        $("#" + game).fadeIn(); 
        var aud = new Audio("./sounds/"+game+".mp3")
        aud.play();
    },1000)
}
 


nextSequence = function(){
    console.log("nextSequence")
    var randomNumber = Math.floor(Math.random()*4)
    console.log("randomNumber",randomNumber)
    // console.log($("h1").innerText,$("h1"))
    $("h1").text("level " + String(level));
    console.log("innerText",$("h1").text(),String(level))
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour)
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    userClickedPattern = []
    
    //3. Use Google/Stackoverflow to figure out how you can use Javascript to play the sound for the button colour selected in step 1. 
    playSound(randomChosenColour);
    level+=1;
    started = false;
}


$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");
    console.log("userChosenColour",userChosenColour,$(this));
    userClickedPattern.push(userChosenColour)
    // console.log(userClickedPattern)
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length -1);
})  


playSound = function(name){
    
    //3. Use Google/Stackoverflow to figure out how you can use Javascript to play the sound for the button colour selected in step 1.
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();  

    
}

//  to toggle color of button to grey.
animatePress = function(currentColour){
    $(".btn").click(function(){
        $(this).addClass("pressed");
        setTimeout(() => {
            $(this).removeClass("pressed");
        }, 100);
    })


}


$("body").keypress(function(){
    if(started = true){
        nextSequence()
    }
})





checkAnswer = function(currentLevel){
    if(userClickedPattern[currentLevel] == gamePattern[currentLevel]){
        console.log("success",gamePattern.length,currentLevel);

        if(currentLevel == gamePattern.length-1){
            setTimeout(function(){
                nextSequence()
            },1000)
        }
    }
    else{
        console.log("failure");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");

        },200)
        $("h1").text("Game Over, Press Any Key to Restart");
        
        startOver();
    }


}



