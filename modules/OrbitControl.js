function OrbitControl(space) {
	let lastPosition, lastScale, lastDistance, isDoubleTouch;

	input.listeners.touchDown.push((touches) => {
		//Cria um clone da posição antiga
		lastPosition = {...space.origin};

		input.touch[0].scale = space.scale;
		input.touch[1].scale = space.scale;

		console.log(input.touch[0].toString(lastPosition));

		isDoubleTouch = false;

		if (touches.length === 2) {
			isDoubleTouch = true;

			tempDistance = Math.sqrt(
				(input.touch[0].position.x - input.touch[1].position.x) ** 2 +
				(input.touch[0].position.y - input.touch[1].position.y) ** 2);
			lastScale = space.scale;
		}
	})
	input.listeners.touchDragged.push((touches) => {
		input.touch[0].scale = space.scale;
		input.touch[1].scale = space.scale;

		if (isDoubleTouch) {
			let distance = Math.sqrt((input.touch[0].position.x - input.touch[1].position.x) ** 2 + (input.touch[0].position.y - input.touch[1].position.y) ** 2);
			let zoomVelocity = lastScale/5e2;
			if (zoomVelocity < 8e2) zoomVelocity = 8e2;
			
			space.scale = lastScale + (tempDistance - distance) * zoomVelocity;
			if (space.scale < 1e2) space.scale = 1e2;
		} else {
			space.origin.x = lastPosition.x + (input.touch[0].position.x - input.touch[0].lastPosition.x) * space.scale;

			space.origin.y = lastPosition.y - (input.touch[0].position.y - input.touch[0].lastPosition.y) * space.scale;
		}
	});
}
