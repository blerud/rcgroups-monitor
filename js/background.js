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

function alertUser(message) {
	var notifOptions = {
		type: "basic",
		title: message.itemTitle,
		message: message.itemPrice + " + " + message.itemShipping,
		iconUrl: message.picUrl
	};
	if(notifOptions.iconUrl.length === 3)
		notifOptions.iconUrl = "white.png";
	if(message.itemPrice == "" && message.itemShipping == "")
		notifOptions.message = "";
	chrome.notifications.onClicked.addListener(function(notfid) {
		chrome.tabs.create({
			url: message.itemUrl,
			active: true
		});
	})
	chrome.notifications.clear("userAlert", function(notifId){});
	chrome.notifications.create("userAlert", notifOptions, function(notifId){});
}

chrome.runtime.onMessage.addListener(function(message, sender) {
	alertUser(message);
})

localStorage["firstobject"] = "";
var poll_interval = 30;
setInterval(function() {
	startupInject();
}, poll_interval * 1000);
