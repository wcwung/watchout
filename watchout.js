// start slingin' some d3 here.

//draw the enemies in an svg element
var svgContainer = d3.select(".game-area").append("svg")
                                    .attr("width", 800)
                                    .attr("height", 800)
                                    .attr("class", "backgroundUpdate")
                                    .style("background-color", "#f1f1f1");

var highScore = d3.select(".scoreboard").append("div")
                                        .attr("class", "high-score")
                                        .text('High Score: ');

var currentScore = d3.select(".scoreboard").append("div")
                                        .attr("class", "current-score")
                                        .text('Current Score: ');

var collisions = d3.select(".scoreboard").append("div")
                                        .attr("class", "collisions")
                                        .text('Collision Count: ');

var scoreTracker = {
  highScore: 0,
  currentScore: 0,
  collisions: 0
};

var settings = {
  enemies: 40,
  x: 0,
  y: 0,
  random: function(){ return Math.random()*800; },
  r: 10,
  enemyCount: 0,
  collisionOccur: false
};

d3.select(".high-score").append("span").text(0)
                        .attr("class", "updateHighScore");

d3.select(".current-score").append("span").text(0)
                        .attr("class", "currentScore");

setInterval(function(){
  scoreTracker.currentScore++;
  d3.select("span.currentScore").text(scoreTracker.currentScore);
},100);

d3.select(".collisions").append("span").text(0)
                        .attr("class", "updateCollisions");

//make it so that the enemies move to a new random location every second using...
var makeEnemy = function(){
  svgContainer.append("circle")
              .attr("class", "enemy")
              .attr("cx", settings.random)
              .attr("cy", settings.random)
              .attr("r", 10);
};

for(var i = 0; i < settings.enemies; i++){
  makeEnemy();
}
//enemy counter
var enemyCounter = function(){
  settings.enemyCount++;
  console.log(settings.enemyCount)
  if(settings.enemyCount === settings.enemies+1){
    if(settings.collisionOccur){
      d3.select(".backgroundUpdate")
        .transition().duration(0)
        .style("background-color", "red");
      settings.collisionOccur = false;
    } else {
      console.log('hey')
      d3.select(".backgroundUpdate")
        .transition().duration(200)
        .style("background-color", "#f1f1f1")
  }
    settings.enemyCount = 0;
  }
};

//for each enemy apply a new location to move to every second
d3.selectAll("circle").each(function(){
  var that = this;

  setInterval(function(){
    d3.select(that)
      .transition()
      .duration(1000)
      .ease("bounce")
      .attr("cx", settings.random)
      .attr("cy", settings.random);
  },1000);
  ///////////////////////////
  setInterval(function(){
      //if you want to calc the distances
      //subtract circle cy and player cy to get y
      //subtract circle cx and player cx to get x
      //
      //if(Math.sqrt(y^2+x^2)) < 25px
        //console.log('hit')
    // console.log(d3.select(".player").attr("cy") - d3.select(".enemy").attr("cy"));
    var enemyDistanceY = d3.select(".player").attr("cy") - d3.select(that).attr("cy");
    var enemyDistanceX = d3.select(".player").attr("cx") - d3.select(that).attr("cx");

    if(Math.sqrt(Math.pow(enemyDistanceX, 2) + Math.pow(enemyDistanceY,2)) < 25) {
      settings.collisionOccur = true;
      scoreTracker.collisions++;
      d3.select("span.updateCollisions").text(scoreTracker.collisions);

      if(scoreTracker.currentScore > scoreTracker.highScore){
        scoreTracker.highScore = scoreTracker.currentScore;
        d3.select("span.updateHighScore").text(scoreTracker.highScore);
        scoreTracker.currentScore = 0;
      }
    }
    enemyCounter();
  },100);

//////////////////////////////
});

// var collision = function(){
//   var that = this;
//   var hits = false;

//   d3.selectAll("circle").each(function(){
//     var enemyDistanceY = d3.select(".player").attr("cy") - d3.select(that).attr("cy");
//     var enemyDistanceX = d3.select(".player").attr("cx") - d3.select(that).attr("cx");

//     if(Math.sqrt(Math.pow(enemyDistanceX, 2) + Math.pow(enemyDistanceY,2)) < 25) {
//       scoreTracker.collisions++;
//       d3.select("span.updateCollisions").text(scoreTracker.collisions);

//       if(scoreTracker.currentScore > scoreTracker.highScore){
//         scoreTracker.highScore = scoreTracker.currentScore;
//         d3.select("span.updateHighScore").text(scoreTracker.highScore);
//         scoreTracker.currentScore = 0;
//       }
//       d3.select(".backgroundUpdate").style("background-color", "red");
//       console.log("HIT!!!");
//       hits = true;
//     } else {
//       d3.select(".backgroundUpdate")
//         .transition().duration(0)
//         .style("background-color", "#f1f1f1");
//     }
//   });

// };

// d3.timer(collision);

// d3.selectAll("svg").each(function(){
//   d3.select(this)
//     .append("svg:image")
//     .attr("width", 200)
//     .attr("height", 200)
//     .attr("xlink:src", "asteroid.png");
// });


//make a differently colored dot to represent the player. Make it draggable.
var makePlayer = function(){
  svgContainer.append("circle")
              // .attr("d", "M28.186,8.223c-1.192-2.18-3.378-3.429-5.997-3.429c-2.412,0-4.718,1.085-6.188,2.819c-1.47-1.733-3.775-2.819-6.188-2.819c-2.618,0-4.805,1.25-5.999,3.429c-2.162,3.956,0.358,9.785,3.172,13.575c1.977,2.659,5.089,5.149,8.542,6.825L16,28.853l0.473-0.229c3.452-1.676,6.565-4.166,8.542-6.825C27.83,18.008,30.348,12.178,28.186,8.223")
              .style("fill", "green")
              .attr("class", "player")
              .attr("cx", 400)
              .attr("cy", 400)
              .attr("r", 10);
};

makePlayer();

// Player selection
var drag = d3.behavior.drag()
    .on("drag", function(){
      var x = d3.event.x;
      var y = d3.event.y;
      d3.select(".player")
        .attr("cx", x)
        .attr("cy", y);
});

d3.select(".player").call(drag);
//detect when an enemy touches you
//done on line 42

//keep track of the users's score and display it






