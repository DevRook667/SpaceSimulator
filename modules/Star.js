function Star(args) {
	Entity.call(this, args);
	this.lightColor = args.lightColor || '#fff'

	this.draw = (ctx, displacement) => {
		ctx.beginPath();
		ctx.shadowColor = this.lightColor;
		ctx.shadowBlur = 15;
		ctx.fillStyle = this.color;
		ctx.arc((displacement.x + this.position.x) / this.scale, (displacement.y + this.position.y) / this.scale, this.radius / this.scale, 0, Math.PI * 2);
		ctx.fill();
		ctx.closePath();
	}
}
