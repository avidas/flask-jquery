$(document).ready(function(){
	//Canvas stuff
	var canvas = $("#canvas")[0];
	var ctx = canvas.getContext("2d");
	var w = $("#canvas").width();
	var h = $("#canvas").height();
	
	var state = "running";
	var cw = 10;
	var snake=[]; //array representing snake coordinates
	var score;

	var fw = Math.floor((Math.random()*w/10)+1);
	var fh = Math.floor((Math.random()*h/10)+1);
	var handle = 0;

	var dir = "right";

	function paint_cell(x,y)
	{
		ctx.fillStyle = "blue";
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
		for(var i = snake.length-1; i >= 0; i--)
		{
			paint_cell(snake[i].x,snake[i].y);
		}
	}

	function if_collide_self(x,y){
		for(var i = 0; i<snake.length;i++){
			if (x===snake[i].x && y===snake[i].y){
				return true;
			}
		}
		return false;
	}

	function game_logic()
	{
		ctx.fillStyle = "white";
		ctx.fillRect(0, 0, w, h);
		ctx.strokeStyle = "black";
		ctx.strokeRect(0, 0, w, h);

		if (dir==="right") {
			new_pos_x = snake[snake.length-1].x +1;
			new_pos_y = snake[snake.length-1].y;
		}
		else if (dir==="left") {
			new_pos_x = snake[snake.length-1].x - 1;
			new_pos_y = snake[snake.length-1].y;
		}
		else if (dir==="up") {
			new_pos_x = snake[snake.length-1].x;
			new_pos_y = snake[snake.length-1].y-1;			
		}
		else if (dir==="down") {
			new_pos_x = snake[snake.length-1].x;
			new_pos_y = snake[snake.length-1].y+1;				
		}
		
		if (new_pos_x > w/cw || new_pos_y > h/cw || new_pos_x < 0 || new_pos_y < 0 || if_collide_self(new_pos_x,new_pos_y))
		{
			clearInterval(handle);
			game();
		}
		else if (new_pos_x===fw && new_pos_y===fh)
		{
			score++;
			make_food(true);
			snake.push({x: new_pos_x, y: new_pos_y});
			draw_snake();
		}
		else {
			make_food();
			snake.shift();
			snake.push({x: new_pos_x, y: new_pos_y});
			draw_snake();
		}
		var score_text = "Score: " + score;
		ctx.fillText(score_text, 5, h-5);

	}


	function game()
	{
		//Draw canvas
		score = 0;
		ctx.fillStyle = "white";
		ctx.fillRect(0, 0, w, h);
		ctx.strokeStyle = "black";
		ctx.strokeRect(0, 0, w, h);

		snake = [];
		dir = "right";
		make_snake();
		make_food(true);
		handle = setInterval(game_logic, 50);

	}
	game();
    
    function make_food(is_new)
    {
        fw = typeof is_new !== 'undefined' ? Math.floor((Math.random()*w/10)+1) : fw;
        fh = typeof is_new !== 'undefined' ? Math.floor((Math.random()*h/10)+1) : fh;
        paint_cell(fw,fh);
    }

    $(document).keydown(function(e){
    	if (e.keyCode===32) dir="paused";
    	if (e.keyCode===37 && dir!=="right") dir="left";
    	if (e.keyCode===38 && dir!=="down") dir="up";
    	if (e.keyCode===39 && dir!=="left") dir="right";
    	if (e.keyCode===40 && dir!=="up") dir="down";
    });
	
})
