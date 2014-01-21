$(document).ready(function () {
	$("#calculator").hide().fadeIn(1000);

	$("#calculator").draggable();

	$("#calculator").dblclick(function(){
        $(this).html("<h1>42</h1>").fadeOut( 1000 );

    });

    $(document).keydown(function(key) {
        switch(parseInt(key.which,10)) {
			case 65:
				$("#calculator").animate({left: "-=10px"}, 'fast');
				break;
			case 83:
				$("#calculator").animate({up: "-=10px"}, 'fast');
				break;
			case 87:
				$("#calculator").animate({up: "+=10px"}, 'fast');
				break;
			case 68:
				$("#calculator").animate({left: "+=10px"}, 'fast');
				break;
			default:
				break;
		}
	});
});