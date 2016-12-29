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
	var e;

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
	    window.addEventListener('resize', resizeCanvas, false);
	    function resizeCanvas() {
	        canvas.width = window.innerWidth;
	        canvas.height = window.innerHeight-55;
	        stage.update();
	        location.reload();
	    }
	    e = new Editor(stage,xocolor,doc,colors,act);
	    setTimeout(function(){ e.init(); }, 500);
	    //e.init();
	    var saveButton = doc.getElementById("save-button");
        saveButton.addEventListener('click', function (a) {
        	console.log("save");
            e.saveColours();
        });
        var resetButton = doc.getElementById("reset-button");
        resetButton.addEventListener('click', function (a) {
        	console.log("reset");
        	localStorage.removeItem("xoeditor_dots");
            location.reload();
        });
        window.addEventListener('activityStop', stopAct);
	    function stopAct(eve) {
	        eve.preventDefault();
	        e.stop();
	        console.log("close");
	        act.close();
	        
	    }
	}
    init();
}