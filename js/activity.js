define(["sugar-web/activity/activity",'easeljs','tweenjs','activity/editor','activity/colourcircle'], function (act) {

	// Manipulate the DOM only when it is ready.
	require(['domReady!'], function (doc) {

		// Initialize the activity.
		runactivity(act,doc);

	});

});

function runactivity(act,doc){
	var canvas;
	var stage;
	var g;

	function init(){
		//console.log(doc);
		console.log(act);
		canvas = document.getElementById('actualcanvas');
    	canvas.width = window.innerWidth; 
    	canvas.height = window.innerHeight-55;
    	stage = new createjs.Stage(canvas);
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
	    var e = new Editor(stage);
	    e.init();
	}
    init();
}