function ScreenTouch(vector, scale, notation = {type: 'scientific', locate: 'en-US'}) {
	this.position = vector.clone();
	this.lastPosition = vector.clone();
	this.notation = new Intl.NumberFormat(notation.locate, {
		notation: notation.type
	});
	
	this.toString = (displacement) => {
		let position = this.position.clone();
		position.multiply(new Victor(scale, scale));
		position.subtract(displacement);
		
		return `Touch (x: ${this.notation.format(position.x)}, y: ${this.notation.format(position.y)})`;
	}
	
	this.setLastTouch = (position) => {
		this.lastPosition.copy(position);
		this.position.copy(position);
	}
	
	this.setTouch = (position) => {
		this.position.copy(position);
	}
}
