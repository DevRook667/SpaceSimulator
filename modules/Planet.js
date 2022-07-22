function Planet(args) {
	Entity.call(this, args);
	
	this.draw = (ctx, displacement) => {
		ctx.beginPath();
		ctx.shadowBlur = 0;
		ctx.fillStyle = this.color;
		ctx.arc((displacement.x + this.position.x) / this.scale, (displacement.y + this.position.y) / this.scale, this.radius / this.scale, 0, Math.PI * 2);
		ctx.closePath();
		ctx.fill();
	}
}
