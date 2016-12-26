var baseurl = "http://chuangdao.moovi-tech.com/"

function getIntroduction(){
	var ajax = $.ajax({
		url: baseurl + "/getIntroduction"
	});
	return ajax;
}

function getManagerTeamList() {
	var ajax = $.ajax({
		url: baseurl + "/getManagerTeamList",
	});
	return ajax;
}

function getDevelopmentList() {
	var ajax = $.ajax({
		url: baseurl + "/getDevelopmentList",
	});
	return ajax;
}