$(document).ready(function(){
	//Canvas stuff
	var canvas = $("#canvas")[0];
	var ctx = canvas.getContext("2d");
	var w = $("#canvas").width();
	var h = $("#canvas").height();
	
	var cw = 10;
	var snake=[]; //array representing snake coordinates

	var fw = Math.floor((Math.random()*w/10)+1);
	var fh = Math.floor((Math.random()*h/10)+1);

	//Draw canvas
	ctx.fillStyle = "white";
	ctx.fillRect(0, 0, w, h);
	ctx.strokeStyle = "black";
	ctx.strokeRect(0, 0, w, h);

	function paint_cell(x,y)
	{
		ctx.fillStyle = "blue";
		//console.log(x,y);
		ctx.fillRect(x*cw, y*cw, cw, cw);
		ctx.strokeStyle = "white";
		ctx.strokeRect(x*cw, y*cw, cw, cw);
	}

	function make_snake()
	{
		var snake_length = 5; //starting length of snake
		for(var i=0;i<snake_length;i++)
		{
			//Create horizontal snake from top left
			snake.push({x: i,y: 0});
			paint_cell(snake[i].x,snake[i].y);
		}
	}

	function draw_snake()
	{
		//console.log(snake.length);
		//console.log(snake);
		for(var i = snake.length-1; i >= 0; i--)
		{
			console.log(snake[i]);
			paint_cell(snake[i].x,snake[i].y);
		}
	}

	function game_logic()
	{
		ctx.fillStyle = "white";
		ctx.fillRect(0, 0, w, h);
		ctx.strokeStyle = "black";
		ctx.strokeRect(0, 0, w, h);

		//console.log(snake[snake.length-1].x,snake[snake.length-1].y);
		snake.shift();
		//console.log("this ", snake[snake.length-1].x + 1, snake[snake.length-1].y)
		//paint_cell(snake[snake.length-1].x + 1, snake[snake.length-1].y)

		
		snake.push({x: snake[snake.length-1].x + 1, y: snake[snake.length-1].y});
		make_food();
		draw_snake();
	}


	function game()
	{
		make_snake();
		
		if (snake[snake.length-1].x >= w)
		{
			clearInterval();
			game();
		}
		var handle = setInterval(game_logic, 500);

	}
	game();
    
    function make_food(is_new)
    {
    	console.log(fw);
        fw = typeof is_new !== 'undefined' ? Math.floor((Math.random()*w/10)+1) : fw;
        console.log("here " + fw);
        fh = typeof is_new !== 'undefined' ? Math.floor((Math.random()*h/10)+1) : fh;
        //console.log(fw,fh);
        paint_cell(fw,fh);
    }

    //$(document).keydown(e)
	
})
