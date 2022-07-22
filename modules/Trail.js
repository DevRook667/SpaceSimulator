function Trail(vertices, scale) {
	this.vertices = vertices;
	this.scale = scale || 1e6;

	this.draw = (ctx, color, displacement) => {
		ctx.shadowBlur = 0;
		
		ctx.strokeStyle = color;
		ctx.lineWidth = 1;

		this.vertices.forEach((vector, i) => {
			if (i === 0) return;
			ctx.beginPath();
			ctx.globalAlpha = i / this.vertices.length;

			ctx.moveTo((displacement.x + this.vertices[i - 1].x) / this.scale, (displacement.y + this.vertices[i - 1].y) / this.scale);

			ctx.lineTo((displacement.x + this.vertices[i].x) / this.scale, (displacement.y + this.vertices[i].y) / this.scale);
			ctx.stroke();
			ctx.closePath();
		});
	}
}
