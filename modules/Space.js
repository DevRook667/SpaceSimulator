function Space(args) {
	this.entitys = {};
	this.G = 6.67430e-11,
	this.scale = args.scale || 1e4;
	this.position = args.position || new Victor(0, 0);
	this.flow = args.flow || null;

	this.update = () => {
		Object.keys(this.entitys).forEach((name) => {
			let entity = this.entitys[name];

			Object.keys(this.entitys).forEach((_name) => {
				if (name === _name) return;
				let _entity = this.entitys[_name];

				let distance = entity.position.distance(_entity.position);

				let force = this.G * entity.mass * _entity.mass / (distance ** 2);

				let acceleration = force / entity.mass;

				let direction = entity.direction(_entity);

				entity.acceleration.x = acceleration * Math.cos(direction);
				entity.acceleration.y = acceleration * Math.sin(direction);

				entity.velocity.add(entity.acceleration);
				entity.position.add(entity.velocity);
			});

			entity.trail.vertices.push(entity.position.clone());
			
			if (entity.trail.vertices.length > 300) {
				entity.trail.vertices.shift();
			}
			
			if (entity.name === this.flow) {
				this.position.copy(entity.position);
				this.position.invert();
			}
		});
	}

	this.draw = (ctx) => {
		for (let name in this.entitys) {
			let entity = this.entitys[name];
			entity.scale = this.scale;
			entity.trail.scale = this.scale;
			entity.trail.draw(ctx, entity.color, this.position);
			entity.draw(ctx, this.position);
		}
	}

	this.addEntity = (entity) => {
		this.entitys[entity.name] = entity;
	}

	this.getEntityByName = (name) => {
		return this.entitys[name];
	}

	this.getEntitys = () => {
		return { ...this.entitys };
	}
}
