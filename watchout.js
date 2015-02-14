// start slingin' some d3 here.

              // .append("svg:img")
              // .attr("xlink:href", "asteroid.png")
              //              .attr("width", 200)
                // .attr("height", 100)


//draw the enemies in an svg element
var svgContainer = d3.select(".game-area").append("svg")
                                    .attr("width", 800)
                                    .attr("height", 800)
                                    .style("background-color", "#f1f1f1");

//make it so that the enemies move to a new random location every second using...
var makeEnemy = function(){
  svgContainer.append("circle")
              .attr("class", "enemy")
              .attr("cx", Math.random()*800)
              .attr("cy", Math.random()*800)
              .attr("r", 10);
};

for(var i = 0; i < 15; i++){
  makeEnemy();
}

//for each enemy apply a new location to move to every second
d3.selectAll("circle").each(function(){
  var that = this;

  setInterval(function(){
    d3.select(that)
      .transition()
      .duration(1000)
      .ease("bounce")
      .attr("cx", Math.random()*800)
      .attr("cy", Math.random()*800);
      // console.log("OTHER CRICLE: ", d3.select("circle"));
  },1000);

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

    if(Math.sqrt(Math.pow(enemyDistanceX, 2) + Math.pow(enemyDistanceY,2)) < 20) {
      console.log("HIT!!!");
    }

  },100);
});

d3.selectAll("svg").each(function(){
  d3.select(this)
    .append("svg:image")
    .attr("width", 200)
    .attr("height", 200)
    .attr("xlink:src", "asteroid.png");
});


//make a differently colored dot to represent the player. Make it draggable.
var makePlayer = function(){
  svgContainer.append("circle")
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



//keep track of the users's score and display it
