function startupInject() {
	chrome.tabs.query({
		url: "*://www.rcgroups.com/aircraft-electric-multirotor-fs-w-733/"
		},
		function(tabs) {
			chrome.windows.getCurrent(function(window) {
				if(!tabs[0].active || !window.focused) {
					chrome.tabs.reload(tabs[0].id);
					chrome.tabs.executeScript(tabs[0].id, {file: "js/monitor.js"});
				}
			});
		}
	);
}

var url = "";
function alertUser(message) {
	var notifOptions = {
		type: "basic",
		title: message.itemTitle,
		message: message.itemPrice + " + " + message.itemShipping,
		iconUrl: message.picUrl
	};
	url = message.itemUrl;
	if(notifOptions.iconUrl.length === 3)
		notifOptions.iconUrl = "white.png";
	if(message.itemPrice == "" && message.itemShipping == "")
		notifOptions.message = "";
	if(message.wanted)
		notifOptions.message = "Wanted " + notifOptions.message;
	chrome.notifications.clear("userAlert", function(notifId){});
	chrome.notifications.create("userAlert", notifOptions, function(notifId){});
}

chrome.notifications.onClicked.addListener(function(notfid) {
	chrome.tabs.create({
		url: url,
		active: true
	});
});

chrome.runtime.onMessage.addListener(function(message, sender) {
	alertUser(message);
})

localStorage["firstobject"] = "";
var poll_interval = 10;
setInterval(function() {
	startupInject();
}, poll_interval * 1000);
