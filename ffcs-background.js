var assetsRegex = /assets/;
var imgRegex = /https:\/\/vtop.vit.ac.in\/vtop\/users\/image\//;

function logURL(requestDetails) {
	if(assetsRegex.test(requestDetails.url)) return;

	console.log(`Loading: (${requestDetails.method}) - ${requestDetails.url}`);

}

async function logURLComplete(requestDetails) {
	if (assetsRegex.test(requestDetails.url)) return;

	console.log(`Completed Loading: (${requestDetails.method}) - ${requestDetails.url}`);

	if(imgRegex.test(requestDetails.url)) {
		console.log("Completed loading page.");
		doRequest();

	}
	console.log(await getAllCookies());
	// doRequest();
}

async function getAllCookies() {
	return new Promise((resolve, reject) => {
		chrome.cookies.getAll( { domain: 'vit.ac.in' },
			function async (cookies) {
				if(cookies) return resolve(cookies);
				else return reject("Can't find cookies");
			}
		);
	});
}

function doRequest() {
	var xhr = new XMLHttpRequest();

	xhr.withCredentials = true;
	xhr.open('POST', 'https://vtop.vit.ac.in/vtop/examinations/doSearchExamScheduleForStudent', true);
	
	xhr.setRequestHeader('Content-Type', 'multipart/form-data; boundary=---------------------------21210565204249812061532823942');
	xhr.setRequestHeader('Content-Length', 315);

	xhr.onreadystatechange = function () { // Call a function when the state changes.
		if (this.readyState === XMLHttpRequest.DONE) {
			// Request finished. Do processing here.
			console.log('finished');
			console.log(this.status);
			console.log(xhr.responseText);
		}
	}
	// xhr.send("foo=bar&lorem=ipsum");
	xhr.send();
}

function doCurriculum() {
	
}


browser.webRequest.onBeforeRequest.addListener(
	logURL,
	{ urls: ["https://vtop.vit.ac.in/*"] }
);

browser.webRequest.onCompleted.addListener(
	logURLComplete, 
	{ urls: ["https://vtop.vit.ac.in/*"] }
)