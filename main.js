const space = new Space();

space.scale = 9e6;

const saturn = new SpaceObject('saturn');
saturn.position.x = 1.348e9;
saturn.mass = 5.69e26;
saturn.radius = 1.20536e5/2;
saturn.debug = true;
saturn.color = 'red';
saturn.velocity.y = 1e5;

const jupiter = new SpaceObject('jupiter');
jupiter.position.x = 7.409e8;
jupiter.mass = 1.90e27;
jupiter.radius =1.42984e5/2;
jupiter.debug = true;
jupiter.color = '#EECB8B';
jupiter.velocity.y = 2e5;

const mars = new SpaceObject("mars");
mars.radius = 6.794e3 / 2;
mars.position.x = 2.067e8;
mars.mass = 6.42e23;
mars.color = '#c1440e';
mars.debug = true;
mars.velocity.y = 4.1895e5

const earth = new SpaceObject("earth");
earth.radius = 6.378e3;
earth.mass = 5.972e24;
earth.color = '#0af';
earth.position.x = 1.471e8
earth.velocity.y = 4.2819e5;
earth.debug = true;

const venus = new SpaceObject("venus");
venus.radius = 6.052e3;
venus.mass = 4.8685e24;
venus.color = '#EECB8B';
venus.position.x = 1.075e8;
venus.velocity.y = 4.953e5;
venus.debug = true;

const mercury = new SpaceObject("mercury");
mercury.radius = 2.439e3;
mercury.mass = 3.30104e23;
mercury.color = '#aaa';
mercury.position.x = 4.60e7;
mercury.velocity.y = 8.3269e5;
mercury.debug = true;

const sun = new SpaceObject("sun");
sun.radius = 6.9634e5;
sun.mass = 1.989e30;
sun.color = '#fa0';
sun.debug = true;

space.add(sun);
space.add(earth);
space.add(venus);
space.add(mercury);
space.add(mars);
space.add(jupiter);
space.add(saturn);


let multiplier = 10;
let minute = 0,
	second = 0,
	hours = 0,
	days = 0,
	years = 0;
let date = document.getElementById('date');

let o = new OrbitControl(space);

const sc = Intl.NumberFormat('en-US', () => {
	notation: 'scientific'
})

function update() {
	for (var i = 0; i < multiplier; i++) {
		space.update();
		hours += 12;

		if (second >= 60) {
			minute += second / 60
			second = 0;
		}
		if (minute >= 60) {
			hours += minute / 60;
			minute = 0;
		}

		if (hours >= 24) {
			days += hours / 24;
			hours = 0;
		}

		if (days >= 256) {
			years += days / 256;
			days = 0;
		}

		//date.innerText = `${Math.floor(years)} years ${days} days ${hours} hours ${minute} minutes and ${second} seconds`
		date.innerText = `mercury maximum distance of sun: ${Math.max(...venus.distances.get('sun')).toExponential(3)}`;
		//console.log(earth.distances.get('sun'));
		//render();
	}
}

function render() {
	ctx.clearRect(-screen.width / 2, -screen.height / 2, screen.width, screen.height);
	space.draw(ctx);
}
