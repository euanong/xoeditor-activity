function Editor(stage,xocol){
	this.radius = 22.5;
	this.scale = stage.canvas.width/1200;
	this.cxy = [stage.canvas.width/2,stage.canvas.height/2];
	this.xy = [stage.canvas.width/2+(120*this.scale),stage.canvas.height/2-(this.radius*this.scale)];
	this.dotsizeplus = this.radius*3*this.scale;
	this.dmin = 0;
	this.dmax = stage.canvas.height-(this.dotsizeplus/2.2);
	this.zones = [];
	this.dots = [];

	this.hexToRgb = function(hex) {
	    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	    return result ? {
	        r: parseInt(result[1], 16),
	        g: parseInt(result[2], 16),
	        b: parseInt(result[3], 16)
	    } : null;
	}

	this.contrast = function(rgb1, rgb2){
		var v1 = rgb1.r * 0.3 + rgb1.g * 0.6 + rgb1.b * 0.1;
		var v2 = rgb2.r * 0.3 + rgb2.g * 0.6 + rgb2.b * 0.1;
		return Math.abs(v2 - v1);
	}

	this.hue = function(rgb){
		var a = 0.5 * (2.0 * rgb.r - rgb.g - rgb.b);
		var b = 0.87 * (rgb.g - rgb.b);
		var h = Math.atan2(b, a);
		return h * 180 / Math.PI;
	}


	this.deltahue = function(rgb1, rgb2){
		h1 = this.hue(rgb1);
		h2 = this.hue(rgb2);
		return Math.abs(h2 - h1);
	}

	this.zone = function(dv, dh){
		var zone;
		if (dh < 75){
			zone = 0;
		}
		else if (dh > 150){
			zone = 1;
		} else{
			zone = 2;
		}
		if (dv > 48){
			zone += 1;
		}
		return zone;
	}

	this.calczones = function(self){
		for (var col in xocol.colors){
			rgb1 = this.hexToRgb(xocol.colors[col].stroke);
			rgb2 = this.hexToRgb(xocol.colors[col].fill);
			dv = this.contrast(rgb1, rgb2);
			dh = this.deltahue(rgb1, rgb2);
			this.zones.push(this.zone(dv, dh));
		}
	}

	this.nextdotposition = function(){
		var dx = this.xy[0]-this.cxy[0];
		var dy = this.xy[1]-this.cxy[1];
		var r = Math.sqrt(dx*dx+dy*dy);
		var c = 2*r*Math.PI;
		var a = Math.atan2(dy, dx);
		var da = (this.dotsizeplus/c)*2*Math.PI;
		a += da;
		r += this.dotsizeplus/(c/this.dotsizeplus);
		this.xy[0] = r*Math.cos(a)+this.cxy[0]
		this.xy[1] = r*Math.sin(a)+this.cxy[1]
		if (this.xy[1]<this.dmin||this.xy[1]>this.dmax){
			this.nextdotposition();
		}
	} 
	this.init = function(){
		this.calczones();
		for (var z = 0; z<4; z++){
			for (var i in xocol.colors){
				//console.log(this.zones[i]);
				if (this.zones[i]==z){
					//console.log(i);
					var c = new ColourCircle(xocol.colors[i].fill,xocol.colors[i].stroke,this.xy[0]+15,this.xy[1],stage);
					c.init();
					this.dots.push(c);
					this.nextdotposition();
				}
			}
		}
	}
}