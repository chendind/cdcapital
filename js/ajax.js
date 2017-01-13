var baseurl = ""

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
		url: baseurl + "/searchArticle",
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
		url: baseurl + "/getManagerTeamList"
	});
	return ajax;
}

function getDevelopmentList() {
	var ajax = $.ajax({
		url: baseurl + "/getDevelopmentList"
	});
	return ajax;
}

function getHoldingCompanyList () {
	var ajax = $.ajax({
		url: baseurl + "/getHoldingCompanyList"
	});
	return ajax; 
}
function getHonorList (argument) {
	var ajax = $.ajax({
		url: baseurl + "/getHonorList"
	});
	return ajax; 
}

function getPartnerList (argument) {
	var ajax = $.ajax({
		url: baseurl + "/getPartnerList"
	});
	return ajax; 
}

function getArticleForPage (start,length,type) {
	var ajax = $.ajax({
		type: "POST",
		url: baseurl + "/getArticleForPage",
		data: {
			start: start,
			length: length,
			type: type
		}
	});
	return ajax;
}

function getReportList () {
	var ajax = $.ajax({
		url: baseurl + "/getReportList"
	});
	return ajax; 
}

function getRecruitmentList () {
	var ajax = $.ajax({
		url: baseurl + "/getRecruitmentList"
	});
	return ajax; 
}

function getContact() {
	var ajax = $.ajax({
		url: baseurl + "/getContact"
	});
	return ajax; 
}

function getFind () {
	var ajax = $.ajax({
		url: baseurl + "/getFind"
	});
	return ajax; 
}

function getResponsibility () {
	var ajax = $.ajax({
		url: baseurl + "/getResponsibility"
	});
	return ajax; 
}

function getGallery(id) {
	var ajax = $.ajax({
		type: "POST",
		url: baseurl + "/getGallery",
		data: {
			id:id
		}
	});
	return ajax; 
}

function submitQuestionnaire (str) {
	var ajax = $.ajax({
		type: "POST",
		url: baseurl + "/submitQuestionnaire",
		data: {
			questionnaire:str
		}
	});
	return ajax; 
}

function getMagazineList () {
	var ajax = $.ajax({
		url: baseurl + "/getMagazineList"
	});
	return ajax; 
}

function getHomeVideo () {
	var ajax = $.ajax({
		url: baseurl + "/getHomeVideo"
	});
	return ajax; 
}


function getHomeArticle () {
	var ajax = $.ajax({
		url: baseurl + "/getHomeArticle"
	});
	return ajax; 
}

function getHomeImg () {
	var ajax = $.ajax({
		url: baseurl + "/getHomeImg"
	});
	return ajax; 
}


function getArticleSquare () {
	var ajax = $.ajax({
		url: baseurl + "/getArticleSquare"
	});
	return ajax; 
}

function isLogin () {
	var ajax = $.ajax({
		url: baseurl + "/isLogin" 
	});
	return ajax;
}


function isSubmitted () {
	var ajax = $.ajax({
		url: baseurl + "/isSubmitted" 
	});
	return ajax;
}


function reserve (id) {
	var ajax = $.ajax({
		type: "POST",
		url: baseurl + "/reserve",
		data:{
			productId: id
		}
	});
	return ajax;
}














