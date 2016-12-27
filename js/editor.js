function Editor(stage){
	this.init = function(){
		centerX = stage.canvas.width/2;
    	centerY = stage.canvas.height/2;
		var c = new ColourCircle("#FF2B34","#B20008",centerX,centerY,stage);
		c.init();
	}
}