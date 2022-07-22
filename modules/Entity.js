function Entity(args) {
	this.name = args.name || 'entity';
	this.position = args.position || new Victor(0, 0);
	this.mass = args.mass || 0;
	this.color = args.color || '';
	this.scale = args.scale || 1e4;
	this.radius = args.radius || 0;
	this.velocity = new Victor(0, 0);
	this.acceleration = new Victor();
	this.trail = new Trail([this.position.clone()]);
	
	this.direction = (entity) => {
		return Math.atan2(entity.position.y - this.position.y, entity.position.x - this.position.x);
	}
}
