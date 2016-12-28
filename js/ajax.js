var baseurl = "http://chuangdao.moovi-tech.com/"

function register(name, password, type) {
	var ajax = $.ajax({
		type: "POST",
		url: baseurl + "/register",
		data: {
			name: name,
			password: password,
			type: 1
		}
	});
	return ajax;
}

function userLogin(name, password) {
	var ajax = $.ajax({
		type: "POST",
		url: baseurl + "/userLogin",
		data: {
			name: name,
			password: password
		}
	});
	return ajax;
}

function getArticle (keyWord) {
	var ajax = $.ajax({
		type: "POST",
		url: baseurl + "/getArticle",
		data: {
			keyWord: keyWord
		}
	});
	return ajax;
}

function getCarouselList() {
	var ajax = $.ajax({
		url: baseurl + "/getCarouselList"
	});
	return ajax;
}

function getLinks() {
	var ajax = $.ajax({
		url: baseurl + "/getLinks"
	});
	return ajax;
}


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

function getHoldingCompanyList () {
	var ajax = $.ajax({
		url: baseurl + "/getHoldingCompanyList",
	});
	return ajax; 
}
function getHonorList (argument) {
	var ajax = $.ajax({
		url: baseurl + "/getHonorList",
	});
	return ajax; 
}

function getPartnerList (argument) {
	var ajax = $.ajax({
		url: baseurl + "/getPartnerList",
	});
	return ajax; 
}
















