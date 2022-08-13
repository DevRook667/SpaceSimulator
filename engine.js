const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.onload = function() {
	ctx.translate(canvas.width / 2, canvas.height / 2);
	ctx.scale(1, 1);

	window.requestAnimationFrame(loop);

	function loop() {
		update();
		render();
		window.requestAnimationFrame(loop);
	};
}

let input = {
	touch: [
		new ScreenTouch(new Victor(0, 0), 1e6, {type: 'scientific', locate: 'en-US'}), 
		new ScreenTouch(new Victor(0, 0), 1e6, {type: 'scientific', locate: 'en-US'})
	],
	isTouched: false,
	justTouched: false,
	fps: 0,
	delta: 0,
	listeners: {
		touchDown: [],
		touchDragged: [],
		touchUp: []
	}
}

canvas.addEventListener('touchstart', (e) => {
	let touch = e.touches[0];
	let position = new Victor(touch.clientX - canvas.width / 2, -(touch.clientY - canvas.height / 2));
	
	input.touch[0].setLastTouch(position);

	if (touch.length === 2) {
		touch = e.touches[1];
		position = new Victor(touch.clientX - canvas.width / 2, -(touch.clientY - canvas.height / 2));
		
		input.touch[1].setLastTouch(position);
	}

	input.isTouched = true;
	input.justTouched = true;

	input.listeners.touchDown.forEach((func) => {
		func(e.touches);
	})
});

canvas.addEventListener('touchmove', (e) => {
	let touch = e.touches[0];
	let position = new Victor(touch.clientX - canvas.width / 2, -(touch.clientY - canvas.height / 2));
	
	input.touch[0].setTouch(position);

	if (touch.length === 2) {
		touch = e.touches[1];
		position = new Victor(touch.clientX - canvas.width / 2, -(touch.clientY - canvas.height / 2));
		
		input.touch[0].setTouch(position);
	}

	input.listeners.touchDragged.forEach((func) => {
		func(e.touches);
	});
});

canvas.addEventListener('touchend', (e) => {
	input.isTouched = false;
	input.listeners.touchUp.forEach((func) => {
		func(e.touches);
	})
});
