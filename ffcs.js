document.body.style.border = "5px solid red";


var s = document.createElement('script');
s.src = chrome.extension.getURL('injected.js');
console.log(s.src);
document.documentElement.appendChild(s);

function loadAndSend(urlPattern) {

	var winImage = $("#winImage").val();
	var authorizedID = $("#authorizedIDX").val();

	$.ajax({
		type: "POST",
		url: urlPattern,
		data: "verifyMenu=true&winImage=" + winImage + "&authorizedID=" + authorizedID + "&nocache=@(new Date().getTime())",
		success: function (data, textStatus, request) {
			var status = request.status;
			var resp = { "url": urlPattern, "data": data };
			chrome.runtime.sendMessage(
				resp,
				function (response) {
					console.log(response);
				}
			);

		},
		error: function (request, textStatus, errorThrown) {
			console.log(urlPattern);
			console.log(errorThrown);
			console.log(textStatus);
			console.log("Error");
		}
	});
}


window.addEventListener("message", function (event) {
	if (event.data.type && (event.data.type == "start_data_sync")) {
		console.log('Doing load and send');
		loadAndSend('examinations/examGradeView/StudentGradeHistory');
		loadAndSend('academics/common/Curriculum');
		// loadAndSend('academics/common/StudentTimeTable');
	}
}, false);




