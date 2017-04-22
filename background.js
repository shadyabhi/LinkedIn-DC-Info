current_headers = {}

chrome.webRequest.onHeadersReceived.addListener(
    function(info) {
        if (info.url.startsWith("https://www.linkedin.com/")) {
            for (var header of info.responseHeaders) {
                if (header.name.toLowerCase() == "x-li-pop") {
                    current_headers[header.name.toLowerCase()] = header.value
                }
                if (header.name.toLowerCase() == "x-li-fabric") {
                    current_headers[header.name.toLowerCase()] = header.value
                }
            }
        }
        if (info.url.startsWith("https://static.licdn.com/")) {
            for (var header of info.responseHeaders) {
                if (header.name.toLowerCase() == "x-cdn") {
                    current_headers[header.name.toLowerCase()] = header.value
                }
            }
        }
    },
    {
        urls: ["https://*.linkedin.com/*", "https://*.licdn.com/*"]
    },
    ["responseHeaders"]);

// Listeners
chrome.extension.onMessage.addListener(
    function(request, sender, sendResponse)
    {
        switch (request.name) {
            case "getHeaders":
               sendResponse(current_headers);
            break;
        }
    }
);
