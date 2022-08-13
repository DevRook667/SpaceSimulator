class Space {

	constructor() {
		this.objects = new Map();
		this.scale = 1e4;
		this.origin = { x: 0, y: 0 };
		this.flow;
	}

	get G() {
		return 6.67430e-11;
	}

	add(object) {
		this.objects.set(object.name, object);
	}

	update() {
		this.objects.forEach((object1) => {
			let force;

			this.objects.forEach((object2) => {
				if (object1 === object2) return;
				
				object2.pointAt(object1.position.x, object1.position.y);
				object2.force(this.G * object1.mass * object2.mass / (object2.distance(object1) ** 2));
				
				object2.collide(object1);
				object2.update();
				
				if (object2.debug) {
					if (!object2.distances.get(object1.name)) object2.distances.set(object1.name, []);
					object2.distances.get(object1.name).push(object2.distance(object1));
				}
			});
		});
		
		if (this.flow) {
			this.origin.x = -this.flow.position.x;
			this.origin.y = -this.flow.position.y;
		}
	}

	draw(ctx) {
		ctx.beginPath();
		ctx.fillStyle = '#0af';
		ctx.strokeStyle = 'white';
		ctx.arc(this.origin.x/this.scale, this.origin.y/this.scale, 5, 0, Math.PI*2);
		ctx.fill();
		ctx.stroke();
		ctx.closePath();
		
		this.objects.forEach((object) => {
			object.scale = this.scale;
			object.origin.x = this.origin.x;
			object.origin.y = this.origin.y;
			object.draw(ctx);
		});
	}
}

class SpaceObject {
	constructor(name = 'object') {
		this.position = { x: 0, y: 0 };
		this.direction = 0;
		this.velocity = { x: 0, y: 0 };
		this.acceleration = { x: 0, y: 0 };
		this.mass = 10;
		this.color = '#fff';
		this.name = name;
		this.radius = 10;
		this.scale = 1e4;
		this.trail = [];
		this.origin = { x: 0, y: 0 };
		this.debug = false;
		this.distances = new Map();
		this.parent = { x: 0, y: 0 };
	}
	
	setObjectParent(object) {
		this.parent = {...object.position};
	}
	
	collide(object) {
		if (this.distance(object) <= this.radius + object.radius) {
			let temp = object.radius > this.radius ? this : object;
			temp.position.x += (this.distance(object) - (this.radius + object.radius))*Math.cos(temp.direction);
			
		}
	}
	
	pointAt(x, y) {
		this.direction = Math.atan2(y - this.position.y, x - this.position.x);
	}

	force(force) {
		this.acceleration.x = force / this.mass * Math.cos(this.direction);
		this.acceleration.y = force / this.mass * Math.sin(this.direction);
	}

	distance(object) {
		return Math.sqrt((this.position.x - object.position.x) ** 2 + (this.position.y - object.position.y) ** 2);
	}

	update() {
		this.velocity.x += this.acceleration.x;
		this.velocity.y += this.acceleration.y;

		this.position.x += this.velocity.x ;
		this.position.y += this.velocity.y;

		this.trail.push({
			x: this.position.x,
			y: this.position.y
		});
		if (this.trail.length > 100) {
			this.trail.shift();
		}
	}

	draw(ctx) {
		//ctx.beginPath();
		for (let i = 1; i < this.trail.length; i += 1) {
			const position = this.trail[i];
			const lastPosistion = this.trail[i - 1];
			let radius = this.radius/this.scale * 2;
			if (radius < 2) radius = 2;

			ctx.beginPath();

			ctx.moveTo((lastPosistion.x + this.origin.x) / this.scale, (lastPosistion.y + this.origin.y) / this.scale);
			ctx.lineTo((position.x + this.origin.x) / this.scale, (position.y + this.origin.y) / this.scale);

			ctx.strokeStyle = this.color;
			ctx.lineWidth = radius * (i / this.trail.length);
			ctx.globalAlpha = i / 1.3 / this.trail.length;
			ctx.stroke();
			ctx.closePath();
		}
		//ctx.closePath();

		ctx.beginPath();
		ctx.fillStyle = this.color;
		ctx.globalAlpha = 1;
		ctx.arc((this.position.x + this.origin.x) / this.scale, (this.position.y + this.origin.y) / this.scale, this.radius / this.scale, 0, Math.PI * 2);
		ctx.fill();
		ctx.closePath();

		if (this.debug) {
			let dir = Math.atan2(this.velocity.y, this.velocity.x);
			let axisSize = this.radius/this.scale;
			if (axisSize < 15) axisSize = 15;
			
			
			let x = (this.position.x + this.origin.x) / this.scale;
			let y = (this.position.y + this.origin.y) / this.scale;

			ctx.beginPath();
			ctx.moveTo(x, y);
			ctx.lineTo(x + axisSize * Math.cos(dir), y);

			ctx.strokeStyle = '#f00';
			ctx.lineWidth = 2;
			ctx.stroke();
			ctx.closePath();

			ctx.beginPath();
			ctx.moveTo(x, y);
			ctx.lineTo(x, y + axisSize * Math.sin(dir));

			ctx.strokeStyle = '#0f0';
			ctx.lineWidth = 2;
			ctx.stroke();
			ctx.closePath();

			ctx.beginPath();
			ctx.moveTo(x, y);
			ctx.lineTo(x + axisSize * Math.cos(dir), y + axisSize * Math.sin(dir));

			ctx.strokeStyle = '#00f';
			ctx.lineWidth = 2;
			ctx.stroke();
			ctx.closePath();
			
			ctx.beginPath();
			ctx.font = '14px arial';
			ctx.fillStyle = 'white';
			ctx.fillText(this.name, x, y - (this.radius/this.scale+5));
			ctx.closePath();
		}
	}
}
