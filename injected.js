var originalXHR = XMLHttpRequest;
XMLHttpRequest = function()
{
    var ret = new originalXHR();
    ret.addEventListener('load', function(e)
    {
        if(e.srcElement.responseURL == "https://vtop.vit.ac.in/vtop/vtop/mandatory/data/off"){
            setTimeout(function(){
                window.postMessage({ type: "start_data_sync" }, "*");
            },100);
        }
    });
    return ret;
};