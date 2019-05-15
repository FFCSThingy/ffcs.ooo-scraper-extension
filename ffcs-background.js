chrome.runtime.onMessage.addListener(
    async function(message, sender, sendResponse) {
		$.post('http://localhost:3001/ext/processExtensionData', message, function(data) {
			// sendResponse(message.url);
			// var resp = await data;	
			// sendResponse("OK");
		});

        // send `message` to server;
        // ajax
        // something
		// TODO: add some sort of auth
		// sendResponse(data);
		sendResponse("OK");
    }
);