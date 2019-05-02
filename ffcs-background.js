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

	}
	console.log(await getAllCookies());
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