var url = "http://www.rcgroups.com/aircraft-electric-multirotor-fs-w-733/";

function extract() {
	page = document.getElementById("threadbits_forum_733").children[0];

	picUrl = page.getElementsByClassName("fsw-thumbnail")[0].getElementsByTagName("div")[0].style.background.split(" ")[0];
	picUrl = picUrl.substring(4, picUrl.length-1);
	itemUrl = page.getElementsByClassName("fsw-thumbnail")[0].getElementsByTagName("div")[0].children[0].href;

	itemTitle = page.getElementsByClassName("forumtitle")[0].text;
	if(itemTitle == "" || itemTitle == 0 || itemTitle == null)
		itemTitle = page.getElementsByClassName("fsw-title")[0].text;

	itemPrice = "";
	itemShipping = "";
	if(page.getElementsByClassName("fsw-price")[0].children.length == 3) {
		itemPrice = page.getElementsByClassName("fsw-price")[0].children[1].innerHTML.trim();
		itemShipping = page.getElementsByClassName("fsw-price")[0].children[2].innerHTML.trim();
	}

	return {
		picUrl: picUrl,
		itemUrl: itemUrl,
		itemTitle: itemTitle,
		itemPrice: itemPrice,
		itemShipping: itemShipping
	};
}

function poll() {
	var objectUrl = document.getElementById("threadbits_forum_733").children[0]
		.getElementsByClassName("fsw-thumbnail")[0].getElementsByTagName("div")[0].children[0].href;;
	if(localStorage["firstobject"] != objectUrl) {
		localStorage["firstobject"] = objectUrl
		details = extract();
		alertEvent(details);
	}
}

function alertEvent(details) {
	chrome.runtime.sendMessage("", details);
}

poll();
