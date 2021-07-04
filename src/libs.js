export var timer;

export function startTimer(fn, event) {
	timer = setTimeout(function(){
		fn(event);
	}, 2000);
}

export function clearTimer() {
	clearTimeout(timer);
}
