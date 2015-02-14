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
              // .style("fill", "transparent")
              .attr("cx", Math.random()*800)
              .attr("cy", Math.random()*800)
              .attr("r", 10);
};

for(var i = 0; i < 4; i++){
  makeEnemy();
}

//for each enemy apply a new location to move to every second
d3.selectAll("circle").each(function(){
  var that = this;
  setInterval( function(){
    d3.select(that)
      .transition()
      .duration(1000)
      .ease("bounce")
      .attr("cx", Math.random()*800)
      .attr("cy", Math.random()*800);
  },1000 );
});

d3.selectAll("circle").each(function(){
  d3.select(this)
    .append("svg:img")
    .attr("width", 200)
    .attr("height", 200)
    .attr("xlink:src", "asteroid.png");
});


//make a differently colored dot to represent the player. Make it draggable.

var makePlayer = function(){
  svgContainer.append("circle")
              .style("fill", "green")
              .attr("class", "player")
              .attr("cx", 0)
              .attr("cy", 0)
              .attr("r", 10)
              .attr("transform", "translate(" + 400 + "," + 400 + ")");
};

makePlayer();

// Player selection
var drag = d3.behavior.drag()
    .on("drag", function(){
      var x = d3.event.x;
      var y = d3.event.y;
      d3.select(".player")
        .attr("transform", "translate(" + x + "," + y + ")");
console.log(d3.event.cy);
    });

d3.select(".player").call(drag);
//detect when an enemy touches you



//keep track of the users's score and display it
