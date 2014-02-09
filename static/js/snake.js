$(document).ready(function(){
	//Canvas stuff
	var canvas = $("#canvas")[0];
	var ctx = canvas.getContext("2d");
	var w = $("#canvas").width();
	var h = $("#canvas").height();
	
	var cw = 10;
	var dir;
	var score;
	var snake=[]; //array representing snake coordinates

	//Draw canvas
	ctx.fillStyle = "white";
	ctx.fillRect(0, 0, w, h);
	ctx.strokeStyle = "black";
	ctx.strokeRect(0, 0, w, h);


	function paint_cell(x,y)
	{
		ctx.fillStyle = "blue";
		console.log(x,y);
		ctx.fillRect(x*cw, y*cw, cw, cw);
		ctx.strokeStyle = "white";
		ctx.strokeRect(x*cw, y*cw, cw, cw);
	}

	function make_snake()
	{
		var snake_length = 5; //starting length of snake
		for(var i=0;i<5;i++)
		{
			//Create horizontal snake from top left
			snake.push({x: i,y: 0});
			paint_cell(snake[i].x,snake[i].y)
		}
	}

	console.log(snake);
	for(var i=0;i<snake.length;i++)
	{
		paint_cell(snake[i].x,snake[i].y)
	}

	function game()
	{
		setInterval(make_snake(), 60);
		make_food();
	}
	game();
    
    function make_food()
    {
        fw = Math.floor((Math.random()*w/10)+1);
        fh = Math.floor((Math.random()*h/10)+1);
        console.log(fw,fh);
        paint_cell(fw,fh);
    }
	
})
