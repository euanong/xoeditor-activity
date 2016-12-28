define(["sugar-web/activity/activity",'easeljs','tweenjs','activity/editor','activity/colourcircle','activity/xoman'], function (act) {

	// Manipulate the DOM only when it is ready.
	require(['domReady!'], function (doc) {

		// Initialize the activity.
		require(['sugar-web/graphics/xocolor'], function(xocol) {
			act.setup();
			act.getXOColor(function (error, colors) {
				runactivity(act,xocol,doc,colors);
			});
		});
	});

});

function runactivity(act,xocolor,doc,colors){
	var canvas;
	var stage;
	var g;

	function init(){
		//console.log(doc);
		//console.log(act);
		//console.log(xocolor);
		console.log(colors);
		canvas = document.getElementById('actualcanvas');
    	canvas.width = window.innerWidth; 
    	canvas.height = window.innerHeight-55;
    	stage = new createjs.Stage(canvas);
    	stage.update();
    	stage.mouseEventsEnabled = true;
    	createjs.Ticker.setFPS(30);
    	createjs.Ticker.addEventListener("tick", handleTick);
		function handleTick() {
		    stage.update();
		}
	    var stopButton = doc.getElementById("stop-button");
        stopButton.addEventListener('click', function (e) {
        	console.log("close");
            act.close();
        });
	    window.addEventListener('resize', resizeCanvas, false);
	    function resizeCanvas() {
	        canvas.width = window.innerWidth;
	        canvas.height = window.innerHeight-55;
	        stage.update();
	    }
	    var e = new Editor(stage,xocolor,doc,colors);
	    setTimeout(function(){ e.init(); }, 500);
	    //e.init();
	}
    init();
}