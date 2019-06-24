function check_login_ffcs(){
    var xhr = new XMLHttpRequest();
    var url = 'https://ffcs.ooo/account';
    xhr.open('GET', url, true);
    xhr.onload = function() {
    if (xhr.status === 200) {
        if(xhr.responseURL === "https://ffcs.ooo/account"){
            document.getElementById('ffcs-card').classList.remove('greyed');
            const jsonResponse = JSON.parse(xhr.responseText);
            console.log(jsonResponse);
            if(jsonResponse.vtopSignedIn){
                document.getElementById('vit-card').classList.remove('greyed');
                document.getElementById('sync-card').classList.remove('greyed');
            }
        }
    }
    };
    xhr.send();
}

window.onload = function() {
    check_login_ffcs();
}