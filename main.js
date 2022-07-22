const space = new Space({
	scale: 2e6,
	position: new Victor(0, 0),
	flow: 'earth'
});

let sun = new Star({
	mass: 1.989e30,
	radius: 6.9634e5,
	name: 'sun',
	color: '#FF8233',
	lightColor: '#ff8233'
});


let earth = new Planet({
	mass: 5.972e24,
	radius: 6.371e3,
	position: new Victor(1.47098074e8, 0),
	name: 'earth',
	color: '#38AAFF'
});

let venus = new Planet({
	mass: 4.8685e24,
	radius: 6.0518e3,
	position: new Victor(1.082e8, 0),
	name: 'venus',
	color: '#fff'
});

let mecury = new Planet({
	mass: 3.30104e23,
	radius: 2.4397e3,
	position: new Victor(6.98169e7, 0),
	name: 'mecury',
	color: '#fff'
});

let mart = new Planet({
	mass: 3.30104e23,
	radius: 2.4397e3,
	position: new Victor(6.98169e7, 0),
	name: 'mart',
	color: '#f3a'
})

earth.velocity = new Victor(0, 6e5);
venus.velocity = new Victor(0, 7e5);
mecury.velocity = new Victor(0, 9e5);
sun.velocity = new Victor(0, 1e5);

space.addEntity(sun);
space.addEntity(earth);
space.addEntity(venus);
space.addEntity(mecury);

let orbitControl = new OrbitControl(space);

let time = 0;

function update() {
	space.update();
	//_v * ∆t + (1/2)*a*(∆t)²
}

function render() {
	ctx.clearRect(-screen.width / 2, -screen.height / 2, screen.width, screen.height);
	space.draw(ctx);
}
