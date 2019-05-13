chrome.runtime.onMessage.addListener(
    function(message, sender, sendResponse) {
        // send `message` to server;
        // ajax
        // something
		// TODO: add some sort of auth
		sendResponse(message);
		// sendResponse("OK");
    }
);