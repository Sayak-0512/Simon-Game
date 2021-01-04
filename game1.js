var buttonColors=["red","blue","green","yellow"];
var gamePattern=[];
var userClickedPattern=[];
var level=0;
var starter=false;
function nextSequence(){
  starter=true;
  var randomNumber=Math.floor(Math.random()*4);
  var randomChosenColor=buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  setTimeout(function(){
    $("#"+randomChosenColor).animate({opacity: 0.2}).animate({opacity: 1});
    playSound(randomChosenColor);
  },200);

  if(userClickedPattern.length===0)
  {level++;$("h1").text("Level "+level);}
}
  $(".btn").click(function(event){
  var userChosenColor=event.target.id;//this.getAttribute("id");
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
checkAnswer(userClickedPattern.length);

});




function playSound(colorWord){
  var audio=new Audio("sounds/"+colorWord+".mp3");
  audio.play();
}

function animatePress(currentColor){
  $("#"+currentColor).addClass("pressed");
  setTimeout(function () {
    $("#"+currentColor).removeClass("pressed");
  }, 100);

}

function checkAnswer(currentLevel)
{


    var flag=0;
    for (var i = 0; i < currentLevel; i++) {
      if(gamePattern[i]===userClickedPattern[i])
      continue;
      else
      {
        flag=1;
        break;
      }
    }
    if(flag===0)
    {
      if(gamePattern.length===currentLevel)
      {
        userClickedPattern=[];
        setTimeout(function(){
          nextSequence();
        },1000);
      }


    }
    else
    {
      playSound("wrong");
      $("body").addClass("game-over");
      setTimeout(function(){
        $("body").removeClass("game-over");
      },200);
      $("h1").text("Game Over, Press Any Key to Restart");
      startOver();
    }




}


function startOver()
{
  starter=false;
  gamePattern=[];
  userClickedPattern=[];
  level=0;
}

  $(document).keypress(function () {
    if(starter===false)
    {
      level=0;
        nextSequence();
    }

  });
