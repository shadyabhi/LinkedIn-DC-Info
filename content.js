// Set variables
var setPosition;

$(document).ready(function() {

    setPosition = "right";

    chrome.extension.sendMessage({name: "getHeaders"}, function(response) {
        console.log(response);
        var banner = "PoP: " + response['x-li-pop'] + ", Fabric: " + response['x-li-fabric'] + ", CDN: " + response['x-cdn'];
        chrome.extension.sendMessage({name: "getOptions"}, function(response) {
            $("body").append('<div id="dc_info" class="dc_info_' + setPosition + '">' + banner + '</div>');
        });
    });

    $("#dc_info").live('mouseover', function() {
        if ($(this).hasClass('dc_info_right')) {
            $(this).removeClass("dc_info_right");
            $(this).addClass("dc_info_left");
        }
        else {
            $(this).removeClass("dc_info_left");
            $(this).addClass("dc_info_right");
        }
    });

    loadOptions(); //To set default value on pop-up button

});
