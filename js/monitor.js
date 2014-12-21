function extract() {
	page = document.getElementById("threadbits_forum_733").children[0];

	picUrl = page.getElementsByClassName("fsw-thumbnail")[0].getElementsByTagName("div")[0].style.background.split(" ")[0];
	picUrl = picUrl.substring(4, picUrl.length-1);
	itemId = page.children[1].id;
	itemIdNum = itemId.split("_")[2];
	itemUrl = "http://www.rcgroups.com/forums/showthread.php?t=" + itemIdNum;

	itemTitle = document.getElementById("thread_title_" + itemIdNum).text;

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
	var objectId = document.getElementById("threadbits_forum_733").children[0].children[1].id;
	if(localStorage["firstobject"] != objectId) {
		localStorage["firstobject"] = objectId;
		details = extract();
		alertEvent(details);
	}
}

function alertEvent(details) {
	chrome.runtime.sendMessage("", details);
}

poll();
