var require = function(src) {

	// Define a queue of methods which we'll run when we get things loaded.
	var methodQueue = [];

	// Load the script.
	var script = document.createElement("script");
	script.src = src;
	document.head.appendChild(script);

	// When the script loads, run everything in the method queue.
	script.onload = script.onerror = function() {
		var exported = logger;  // TODO: doesn't work for other libraries!
		methodQueue.forEach(function(method) {
			exported[method.id].apply(exported, method.args);
		});
	};

	// Return a dummy object which will throw methods into the queue.
	return {
		__noSuchMethod__: function(id, args) {
			methodQueue.push({
				id: id,
				args: args
			});
		}
	};

}
