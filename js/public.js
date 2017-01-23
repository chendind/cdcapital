// 把对象转换成字符串，并进行URI编码，用于url中的查询参数拼接
Vue.prototype.encodeObj = function (obj){
    return encodeURIComponent(JSON.stringify(obj));
}
Vue.prototype.getTime = function (stamp) {
	var date = new Date(stamp);
	y = date.getFullYear();
	m = date.getMonth() + 1;
	d = date.getDate();
	return y + "-" + (m>9?m:"0"+m) + "-"  + (d>9?d:"0"+d);
}
Vue.prototype.baseUrl = "";
Vue.prototype.getQueryData = function(){
    var searchUrl = window.location.search.split("?")[1];
    var URI = decodeURIComponent(searchUrl);
    var parseURI = URI;
    if(URI){
        try{
            parseURI = JSON.parse(URI);
        }
        catch(e){
            parseURI = "";
        }
    }
    return parseURI;
}

Vue.component("above",{
	template: '<div class="above" @click="hiddenAbove"></div>',
	methods: {
		hiddenAbove: function () {
			$("div.above").removeClass('show');
		}
	}
})

Vue.component("login",{
	template: '\
		<div class="login hidden">\
			<div class="needToKnow">\
				<div class="left">\
					<img class="logo" src="../images/logo1.png">\
					<p class="ch">创道资本</p>\
					<p class="en">CHUANGDAO CAPITAL</p>\
					<p class="bold">专属于您的财富管理伙伴</p>\
					<img class="bitmap" src="../images/Bitmap2.png">\
					<p>首批私募基金管理人牌照获得者</p>\
					<p>证券投资基金业协会会员</p>\
					<p>专业的合格风控团队</p>\
					<p>前沿的产业投资理念</p>\
					<p>人性化的客户服务</p>\
				</div>\
				<div class="right">\
					<div class="logo2">\
						<img src="../images/2013060712534270.png">\
						<span>合格投资者认定</span>\
					</div>\
					<div class="contentNeedToKnow">\
						根据《私募投资基金监督管理暂行办法》第四章第十四条规定：“私募基金管理人、私募基金销售机构不得向合格投资者之外的单位和个人募集资金、不得通过报刊、电台、电视、互联网等公众传播媒体或者讲座、报告会、分析会和布告、传单、手机短信、微信、微博和电子邮件等方式，向不特定对象宣传推介。”\
						<div>创道资本遵循《私募投资基金监督管理暂行办法》之规定，只向特定的合格投资者宣传推介相关私募投资基金产品。</div>\
						阁下如有意进行私募投资基金且满足《私募投资基金监督管理暂行方法》关于“合规投资者”标准之规定，即具备相应风险识别能力和风险承担能力，投资于单只私募基金的金额不低于100万元，且个人金融类资产不低于300万元或者最近三年个人年收入不低于50万元人民币。请阁下详细阅读本提示，并点击下方“登录或注册”按钮，注册成为创道资本特定的合格投资者，方可获得本网站投资基金产品宣传推介服务。\
					</div>\
					<button class="go" @click="doRegister">登录或注册</button>\
					<button class="no" @click="loginCancel">暂不注册</button>\
				</div>\
			</div>\
			<div class="img"></div>\
			<div class="login_register">\
				<div class="nav">\
					<div class="option current" @click="changeToLogin">用户登录</div>\
					<div class="line"></div>\
					<div class="option" @click="changeToRegister">新用户注册</div>\
				</div>\
				<form class="do_login">\
					<input class="name" type="text" name="login_name" v-model="login_name" placeholder="请输入用户名">\
					<input class="pwd" type="password" name="login_pwd" v-model="login_pwd" placeholder="请输入密码">\
					<input class="button" type="button" name="login_button" value="登录" @click="login">\
					<div>如需帮助，请拨打客服热线<span>400-0670-877</span></div>\
				</form>\
				<form class="do_register hidden">\
					<input class="name" type="text" name="register_name" v-model="register_name" placeholder="请输入用户名">\
					<input class="pwd" type="password" name="register_pwd" v-model="register_pwd" placeholder="请输入密码">\
					<input class="repwd" type="password" name="register_repwd" v-model="register_repwd" placeholder="请确认密码">\
					<input class="button" type="button" name="register_button" value="注册" @click="register">\
					<div>如需帮助，请拨打客服热线<span>400-0670-877</span></div>\
				</form>\
				<img src="../images/关闭 (1).png" @click="loginCancel">\
			</div>\
		</div>',
	data: function () {
		return {
			login_name: "",
			login_pwd: "",
			register_name: "",
			register_pwd: "",
			register_repwd: ""
		}
	},
	methods: {
		doRegister: function () {
			$(".needToKnow").addClass('hidden');
		},
		changeToLogin: function () {
			$(".do_login").removeClass('hidden');
			$(".do_register").addClass('hidden');
			$(".nav .option:eq(0)").addClass('current');
			$(".nav .option:eq(1)").removeClass('current');
		},
		changeToRegister: function () {
			$(".do_login").addClass('hidden');
			$(".do_register").removeClass('hidden');
			$(".nav .option:eq(1)").addClass('current');
			$(".nav .option:eq(0)").removeClass('current');
		},
		loginCancel: function () {
			$('.login').addClass('hidden');
			$(".needToKnow").removeClass('hidden');
		},
		register: function () {
			var self = this;
			if(self.register_name==="" || self.register_repwd === ""){
				alert("用户名或密码不能为空!");
			}
			else if(self.register_pwd !== self.register_repwd){
				alert("两次输入的密码不一致！");
			}
			else{
				$.when(register(self.register_name, self.register_pwd, self.register_repwd))
				.done(function (data) {
					if(data.state === 0){
						alert("注册成功");
						self.loginCancel();
						$.when(userLogin(self.register_name, self.register_pwd))
						.done(function (data) {
							if(data.state === 0){
								$("ul.top li.register div span").text(self.register_name);
							}
						})
					}
				});
			}
		},
		login: function () {
			var self = this;
			if(self.login_name==="" || self.login_pwd === ""){
				alert("用户名或密码不能为空!");
			}
			else{
				$.when(userLogin(self.login_name, self.login_pwd))
				.done(function (data) {
					if(data.state === 0){
						alert("登录成功");
						$("ul.top li.register div span").text(self.login_name);
						self.loginCancel();
					}
					else{
						alert("用户名或密码错误！");
					}
				});
			}
		}
	}
})

Vue.component("banner",{
	template: '\
		<div class="banner">\
			<div class="logo">\
				<a href="cdcapital.html"><img src="../images/logo.png"></a>\
			</div>\
			<div class="ul_manu" @click="showleft">\
				<img src="../images/caidan.png">\
				<span class="flaticon-cancel33 hidden"></span>\
			</div>\
			<div class="log_reg">\
				<button class="log" @click="onlyshowlogin">登录</button>\
				<button class="reg" @click="onlyshowregister">注册</button>\
			</div>\
			<div class="top">\
				<ul class="top">\
					<slot></slot>\
					<li><a href="cdcapital.html">首页</a></li>\
					<li class="li_one">\
						<a href="company_profile.html" @click="showlinks($event)">关于创道</a>\
						<ul class="detail_pages">\
							<li>\
								<a href="company_profile.html">\
									<img class="show" src="../images/公司简介-01.png">\
									<img class="hidden" src="../images/公司简介-01的副本.png">\
									公司简介\
								</a>\
							</li>\
							<li>\
								<a href="development_history.html">\
									<img class="show" src="../images/发展历程.png">\
									<img class="hidden" src="../images/发展历程的副本.png">\
									发展历程\
								</a>\
							</li>\
							<li>\
								<a href="honor_qualification.html">\
									<img class="show" src="../images/资质荣誉.png">\
									<img class="hidden" src="../images/资质荣誉的副本.png">\
									荣誉资质\
								</a>\
							</li>\
							<li>\
								<a href="cooperative_partner.html">\
									<img class="show" src="../images/合作伙伴.png">\
									<img class="hidden" src="../images/合作伙伴的副本.png">\
									合作伙伴\
								</a>\
							</li>\
							<li>\
								<a href="management_team.html">\
									<img class="show" src="../images/团队.png">\
									<img class="hidden" src="../images/团队的副本.png">\
									管理团队\
								</a>\
							</li>\
							<li>\
								<a href="holding_company.html">\
									<img class="show" src="../images/资金股份.png">\
									<img class="hidden" src="../images/资金股份的副本.png">\
								    控股企业\
							    </a>\
							</li>\
							<li>\
								<a href="social_responsibility.html">\
									<img class="show" src="../images/社会责任.png">\
									<img class="hidden" src="../images/社会责任的副本.png">\
									社会责任\
								</a>\
							</li>\
							<li>\
								<a href="enterprise_journal.html">\
									<img class="show" src="../images/期刊1.png">\
									<img class="hidden" src="../images/期刊.png">\
									企业内刊\
								</a>\
							</li>\
						</ul>\
					</li>\
					<li class="li_two">\
						<a href="project_gallery.html" @click="showlinks($event)">产品与服务</a>\
						<ul class="detail_pages">\
							<li>\
								<a href="project_gallery.html">\
									<img class="show" src="../images/展示2.png">\
									<img class="hidden" src="../images/展示2的副本.png">\
									项目展示\
								</a>\
							</li>\
							<li>\
								<a href="project_dynamics.html">\
									<img class="show" src="../images/动态.png">\
									<img class="hidden" src="../images/动态的副本.png">\
									项目动态\
								</a>\
							</li>\
							<li>\
								<a href="service_experience.html">\
									<img class="show" src="../images/服务体验定义1.png">\
									<img class="hidden" src="../images/服务体验定义.png">\
									服务体验\
								</a>\
							</li>\
							<li>\
								<a href="compliance_risk_control.html">\
									<img class="show" src="../images/风控意见1.png">\
									<img class="hidden" src="../images/风控意见.png">\
									合规风控\
								</a>\
							</li>\
						</ul>\
					</li>\
					<li class="li_three">\
						<a href="research.html" @click="showlinks($event)">创道研究</a>\
						<ul class="detail_pages" style="height: 66px;">\
							<li>\
								<a href="research.html">\
									<img class="show" src="../images/研报.png">\
									<img class="hidden" src="../images/研报的副本.png">\
									创道研究\
								</a>\
							</li>\
							<li>\
								<a href="weekly_observation.html">\
									<img class="show" src="../images/观察评价.png">\
									<img class="hidden" src="../images/观察评价的副本.png">\
									每周观察\
								</a>\
							</li>\
						</ul>\
					</li>\
					<li class="li_four">\
						<a href="company_announce.html" @click="showlinks($event)">新闻中心</a>\
						<ul class="detail_pages" style="height: 99px;">\
							<li>\
								<a href="company_announce.html">\
									<img class="show" src="../images/公司公告.png">\
									<img class="hidden" src="../images/公司公告的副本.png">\
									公司公告\
								</a>\
							</li>\
							<li>\
								<a href="company_news.html">\
									<img class="show" src="../images/新闻.png">\
									<img class="hidden" src="../images/新闻的副本.png">\
									公司新闻\
								</a>\
							</li>\
							<li>\
								<a href="trade_news.html">\
									<img class="show" src="../images/行业新闻.png">\
									<img class="hidden" src="../images/行业新闻的副本.png">\
									行业新闻\
								</a>\
							</li>\
						</ul>\
					</li>\
					<li class="li_five"><a href="recruitment_center.html">招聘中心</a></li>\
					<li class="li_six"><a href="vip_club.html">VIP俱乐部</a></li>\
					<li class="noborder li_seven"><a href="contact_us.html">联系我们</a></li>\
					<li class="register noborder">\
						<div>\
							<img src="../images/小人.png">\
							<span class="reg" @click="showlogin">注册-登录</span>\
						</div>\
						<span class="tel">400-0670-877</span>\
					</li>\
				</ul>\
			</div>\
			<div class="manu" @click="showManu">\
				<img class="manu_show" src="../images/caidan.png">\
				<img class="manu_hidden" src="../images/上收箭头.png">\
				<div class="manu_show diamonds">\
					<div></div><div></div><div></div><div></div>\
				</div>\
			</div>\
		</div>',
	methods: {
		onlyshowlogin: function () {
			$('.login').removeClass('hidden');
			$(".nav .option:eq(0)").addClass('current');
			$(".nav .option:eq(0)").css('display', 'inline-block');
			$(".nav .option:eq(1)").css('display', 'none');
			$(".do_login").removeClass('hidden');
			$(".do_register").addClass('hidden');
		},
		onlyshowregister: function () {
			$('.login').removeClass('hidden');
			$(".nav .option:eq(1)").addClass('current');
			$(".nav .option:eq(1)").css('display', 'inline-block');
			$(".nav .option:eq(0)").css('display', 'none');
			$(".do_register").removeClass('hidden');
			$(".do_login").addClass('hidden');
		},
		showlogin: function () {
			$.when(isLogin())
			.done(function (data) {
				if(data.state==0){
					$(".needToKnow").addClass('hidden');
				}
				$('.login').removeClass('hidden');
			})
		},
		showManu: function () {
			$(".manu_details").toggleClass('hidden');
			$(".diamonds").toggleClass('hidden');
		},
		showleft: function () {
			$("div.top").toggleClass('navigation_show');
			$("div.log_reg").toggleClass('navigation_show');
			$(".ul_manu").children().toggleClass('hidden');
		},
		showlinks: function (event) {
			if( parseInt($("body").css("width")) < 769){
				$(event.target).parent("li").children("ul").css("display","block");
				$(event.target).parent("li").css("height","auto");
				$(event.target).parent("li").siblings().children("ul").css("display","none");
				event.preventDefault();
			}
		}
	},
	mounted: function () {
		$.when(isLogin())
		.done(function (data) {
			if(data.state === 0){
				$("ul.top li.register div span").text(data.name);
			}
		})
	}
})

Vue.component("manu-details",{
	template: '\
		<div class="manu_details hidden">\
			<div class="manu_items" @click="showAbove">\
				<div class="sina">\
					<img src="../images/新浪图标.png">\
					<img class="hidden" src="../images/新浪图标2.png">\
					<div class="triangle hidden"></div>\
					<div class="detail hidden">\
						<img src="../images/WechatIMG24.png">\
						<p>扫描二维码 关注创道</p>\
					</div>\
				</div>\
				<div class="wechat">\
					<img src="../images/微信图标2.png">\
					<img class="hidden" src="../images/微信图标.png">\
					<div class="triangle hidden"></div>\
					<div class="detail hidden">\
						<img src="../images/创道微信公众号.png">\
						<p>扫描二维码 关注创道</p>\
					</div>\
				</div>\
				<div class="service">\
					<a target="_blank" href="http://wpa.qq.com/msgrd?v=3&uin=364044816&site=qq&menu=yes">\
						<img src="../images/在线客服.png">\
						<img class="hidden" src="../images/在线客服2.png">\
					</a>\
				</div>\
			</div>\
		</div>',
	methods: {
		showAbove: function () {
			$("div.above").addClass('show');
		}
	}
})

Vue.component("five",{
	template: '\
		<div class="five">\
			<div class="five_one">\
				<ul class="about">\
					<li><a href="company_profile.html">关于创道</a></li>\
					<li><a href="project_gallery.html">产品与服务</a></li>\
					<li><a href="research.html">创道研究</a></li>\
					<li><a href="company_announce.html">新闻中心</a></li>\
					<li><a href="recruitment_center.html">招聘中心</a></li>\
					<li><a href="vip_club.html">VIP俱乐部</a></li>\
					<li><a href="contact_us.html">联系我们</a></li>\
				</ul>\
				<div class="others">\
					<div>\
						<img src="../images/收藏.png">\
						<span>设置创道<br>为首页吧</span>\
					</div>\
					<div>\
						<img src="../images/购物篮.png">\
						<span>在线购买<br>理财产品</span>\
					</div>\
					<div>\
						<img src="../images/时钟.png">\
						<span>24小时在线<br>预约理财师</span>\
					</div>\
				</div>\
			</div>\
			<div class="five_two">\
				<div>\
					<div class="links" @click="toggleLinks">\
						<span> - 友情链接 - </span>\
						<ul>\
							<li class="hidden" v-for="link in links">\
							<a :href="link.value" target="_blank">{{link.description}}</a>\
							</li>\
						</ul>\
						<div class="show">\
							<img src="../images/箭头.png">\
						</div>\
					</div>\
					<div class="TDcode">\
						<div>\
							<p>全国服务热线</p>\
							<p class="mid">400-0670-877</p>\
							<p>人工服务时间 工作日 9:00-18:00</p>\
						</div>\
						<img src="../images/创道微信公众号 副本.png">\
					</div>\
				</div>\
			</div>\
		</div>',
	data: function () {
		return {
			links: []
		}
	},
	methods:{
		toggleLinks: function () {
			$("div.five div.links li").toggleClass("hidden");
		}
	},
	mounted: function () {
		var self = this;
		$.when(getLinks())
		.done(function (data) {
			self.links = data.list;
		})
	}
})

Vue.component("six",{
	template: '\
		<div class="six">\
			<div>\
				<p>2014-2015 山东创道股权投资基金管理有限公司<span class="hidden"> All rights reserved.</span></p>\
				<p class="small"><span>济南市市中区经四路9号万达广场写字楼A座11F</span> <span>鲁1CP备14020449号-1 鲁公网安备 37010302000377号</span></p>\
			</div>\
		</div>',
	mounted: function(){
		var _hmt = _hmt || [];
		(function() {
		  var hm = document.createElement("script");
		  hm.src = "https://hm.baidu.com/hm.js?9a49842aaa9ba81190e56c9b7751dc55";
		  var s = document.getElementsByTagName("script")[0]; 
		  s.parentNode.insertBefore(hm, s);
		})();
	}
})

Vue.component("back-button",{
	template: '\
		<transition name="back">\
			<div class="back-button" v-if="top > 500" @click="back">\
				<img src="../images/top@2X.png">\
			</div>\
		</transition>',
	data: function () {
		return {
			top: 0
		}
	},
	methods: {
		back: function () {
			$("html").animate({scrollTop: 0}, 400);
			$("body").animate({scrollTop: 0}, 400);
		}
	},
	mounted: function (){
		var self = this;
		this.top = $("body").scrollTop() || $("htmp").scrollTop() || 0;
		$(window).scroll(function(event){
			self.top = $("body").scrollTop() || $("htmp").scrollTop() || 0;
	    });
	}
})

Vue.component("ques-person",{
	template: '\
		<div>\
			<h1>私募基金投资者风险调查问卷（个人）</h1>\
			<div class="ques_top">\
				<p>风险提示：私募基金投资需承担各类风险，本金可能遭受损失。同时，私募基金投资还要考虑市场风险、信用风险、流动性风险、操作风险等各类投资风险。您在基金认购过程中应当注意核对自己的风险识别和风险承受能力，选择与自己风险识别能力和风险承受能力相匹配的私募基金。</p>\
				<p>以下一系列问题可在您选择合适的私募基金前，协助评估您的风险承受能力、理财方式及投资目标。</p>\
			</div>\
			<div class="condition">\
				<p>请确认您符合以下何种合格投资者财务条件： </p>\
				<input type="checkbox" name="condition" checked>\
				<label>符合金融资产不低于300万元（金融资产包括银行存款、股票、债券、基金份额、资产管理计划、银行理财产品、信托计划、保险产品、期货权益等）</label><br>\
				<input type="checkbox" name="condition" checked>\
				<label>符合最近三年个人年均收入不低于50万元</label>\
			</div>\
			<div class="question">\
				<div>\
					<p>一、基本信息</p>\
					<ol>\
						<li class="text">\
							<label for="name">您的姓名</label>\
							<input type="text" name="text" id="name">\
							<label for="contact_information">联系方式</label>\
							<input type="text" name="text" id="contact_information"><br>\
							<label for="certificate_type">证件类型</label>\
							<input type="text" name="text" id="certificate_type">\
							<label for="certificate_number">证件号码</label>\
							<input type="text" name="text" id="certificate_number">\
						</li>\
						<li>\
							<label>您的年龄介于</label><br>\
							<input type="radio" name="age" id="age1" value="A"><label for="age1">18-30岁</label><br>\
							<input type="radio" name="age" id="age2" value="B"><label for="age2">31-50岁</label><br>\
							<input type="radio" name="age" id="age3" value="C"><label for="age3">51-65岁</label><br>\
							<input type="radio" name="age" id="age4" value="D"><label for="age4">高于65岁</label>\
						</li>\
						<li>\
							<label>您的学历</label><br>\
							<input type="radio" name="education" id="education1" value="A"><label for="education1">高中及以下</label><br>\
							<input type="radio" name="education" id="education2" value="B"><label for="education2">中专或大专</label><br>\
							<input type="radio" name="education" id="education3" value="C"><label for="education3">本科</label><br>\
							<input type="radio" name="education" id="education4" value="D"><label for="education4">硕士及以上</label>\
						</li>\
						<li>\
							<label>您的职业</label><br>\
							<input type="radio" name="profession" id="profession1" value="A"><label for="profession1">无固定职业</label><br>\
							<input type="radio" name="profession" id="profession2" value="B"><label for="profession2">专业技术人员</label><br>\
							<input type="radio" name="profession" id="profession3" value="C"><label for="profession3">一般企事业单位员工</label><br>\
							<input type="radio" name="profession" id="profession4" value="D"><label for="profession4">金融行业一般从业人员</label>\
						</li>\
					</ol>\
					<p>二、财务状况</p>\
					<ol>\
						<li>\
							<label>您的家庭可支配年收入为（折合人民币）</label><br>\
							<input type="radio" name="income" id="income1" value="A"><label for="income1">50万元以下（2分）</label><br>\
							<input type="radio" name="income" id="income2" value="B"><label for="income2">50-100万元（4分）</label><br>\
							<input type="radio" name="income" id="income3" value="C"><label for="income3">100-500万元（6分）</label><br>\
							<input type="radio" name="income" id="income4" value="D"><label for="income4">500-1000万元（8分）</label><br>\
							<input type="radio" name="income" id="income5" value="E"><label for="income5">1000万元以上（10分）</label>\
						</li>\
						<li>\
							<label>在您的每年的家庭可支配收入中，可用于金融投资（储蓄存款除外）的比例为</label><br>\
							<input type="radio" name="availincome" id="availincome1" value="A"><label for="availincome1">小于10%（2分）</label><br>\
							<input type="radio" name="availincome" id="availincome2" value="B"><label for="availincome2">10%至25%（4分）</label><br>\
							<input type="radio" name="availincome" id="availincome3" value="C"><label for="availincome3">25%至50%（6分）</label><br>\
							<input type="radio" name="availincome" id="availincome4" value="D"><label for="availincome4">50%至75%（8分）</label><br>\
							<input type="radio" name="availincome" id="availincome5" value="E"><label for="availincome5">大于75%（10分）</label>\
						</li>\
					</ol>\
					<p>三、投资知识</p>\
					<ol>\
						<li>\
							<label>您的投资描述知识可描述为</label><br>\
							<input type="radio" name="knowledge" id="knowledge1" value="A">\
							<label for="knowledge1">有限：除银行活期账户和定期存款外，我基本没有其他投资经验（2分）</label><br>\
							<input type="radio" name="knowledge" id="knowledge2" value="B">\
							<label for="knowledge2">一般：除银行活期账户和定期存款外，我购买过基金、保险等理财产品，但还需要进一步的指导（4分）</label><br>\
							<input type="radio" name="knowledge" id="knowledge3" value="C">\
							<label for="knowledge3">丰富：我是一位有经验的基金投资者，参与过股票、基金等产品的交易，并倾向于自己做出投资决策（6分）</label><br>\
							<input type="radio" name="knowledge" id="knowledge4" value="D">\
							<label for="knowledge4">参与过多年的证券交易，投资知识丰富，具有一定的专业水平（8分）</label><br>\
							<input type="radio" name="knowledge" id="knowledge5" value="E">\
							<label for="knowledge5">非常丰富：我是一位非常有经验的基金投资者，参与过权证、期货或创业板等高风险产品的交易（10分）</label>\
						</li>\
						<li>\
							<label>您的投资经验可描述为</label><br>\
							<input type="radio" name="experience" id="experience1" value="A">\
							<label for="experience1">除银行储蓄外，基本没有其他投资经验（2分）</label><br>\
							<input type="radio" name="experience" id="experience2" value="B">\
							<label for="experience2">购买过债券、保险等理财产品（4分）</label><br>\
							<input type="radio" name="experience" id="experience3" value="C">\
							<label for="experience3">参与过基金等产品的交易（6分）</label><br>\
							<input type="radio" name="experience" id="experience4" value="D">\
							<label for="experience4">参与过股票等产品的交易（8分）</label><br>\
							<input type="radio" name="experience" id="experience5" value="E">\
							<label for="experience5">参与过权证、期货、期权等产品的交易（10分）</label>\
						</li>\
						<li>\
							<label>您有多少年投资基金、股票、信托、私募证券或金融衍生产品等风险投资品的经验</label><br>\
							<input type="radio" name="year" id="year1" value="A"><label for="year1">没有经验（2分）</label><br>\
							<input type="radio" name="year" id="year2" value="B"><label for="year2">少于2年（4分）</label><br>\
							<input type="radio" name="year" id="year3" value="C"><label for="year3">2至5年（6分）</label><br>\
							<input type="radio" name="year" id="year4" value="D"><label for="year4">5至10年（8分）</label><br>\
							<input type="radio" name="year" id="year5" value="E"><label for="year5">10年以上（10分）</label>\
						</li>\
					</ol>\
					<p>四、投资目标</p>\
					<ol>\
						<li>\
							<label>您计划的投资期限是多久</label><br>\
							<input type="radio" name="deadline" id="deadline1" value="A"><label for="deadline1">1年以下（2分）</label><br>\
							<input type="radio" name="deadline" id="deadline2" value="B"><label for="deadline2">1至3年（4分）</label><br>\
							<input type="radio" name="deadline" id="deadline3" value="C"><label for="deadline3">3至5年（6分）</label><br>\
							<input type="radio" name="deadline" id="deadline4" value="D"><label for="deadline4">5至10年（8分）</label><br>\
							<input type="radio" name="deadline" id="deadline5" value="E"><label for="deadline5">10年以上（10分）</label>\
						</li>\
						<li>\
							<label>您的投资目的是</label><br>\
							<input type="radio" name="goal" id="goal1" value="A"><label for="goal1">平时生活保障，赚点补贴家用（2分）</label><br>\
							<input type="radio" name="goal" id="goal2" value="B"><label for="goal2">养老（4分）</label><br>\
							<input type="radio" name="goal" id="goal3" value="C"><label for="goal3">子女教育（6分）</label><br>\
							<input type="radio" name="goal" id="goal4" value="D"><label for="goal4">资产增值（8分）</label><br>\
							<input type="radio" name="goal" id="goal5" value="E"><label for="goal5">家庭富裕（10分）</label>\
						</li>\
					</ol>\
					<p>五、风险偏好</p>\
					<ol>\
						<li>\
							<label>以下哪项描述最符合您的投资态度</label><br>\
							<input type="radio" name="attitude" id="attitude1" value="A">\
							<label for="attitude1">无法承受风险（2分）</label><br>\
							<input type="radio" name="attitude" id="attitude2" value="B">\
							<label for="attitude2">虽然厌恶风险但愿意承担一些风险（4分）</label><br>\
							<input type="radio" name="attitude" id="attitude3" value="C">\
							<label for="attitude3">在深思熟虑后愿意承担一定的风险（6分）</label><br>\
							<input type="radio" name="attitude" id="attitude4" value="D">\
							<label for="attitude4">敢冒风险，比较激进（8分）</label><br>\
							<input type="radio" name="attitude" id="attitude5" value="E">\
							<label for="attitude5">爱好风险，相当激进（10分）</label>\
						</li>\
						<li>\
							<label>假设有两种投资：投资A预期获得10%的收益，可能承担的损失非常小；投资B预期获得30%的收益，但可能承担较大亏损。您会怎么支配您的投资：</label><br>\
							<input type="radio" name="assumption" id="assumption1" value="A">\
							<label for="assumption1">全部投资于收益较小且风险较小的A（2分）</label><br>\
							<input type="radio" name="assumption" id="assumption2" value="B">\
							<label for="assumption2">同时投资于A和B，但大部分资金投资于收益较小且风险较小的A（4分）</label><br>\
							<input type="radio" name="assumption" id="assumption3" value="C">\
							<label for="assumption3">同时投资于A和B，两者投资金额相等（6分）</label><br>\
							<input type="radio" name="assumption" id="assumption4" value="D">\
							<label for="assumption4">同时投资于A和B，但大部分资金投资于收益较大且风险较大的B（8分）</label><br>\
							<input type="radio" name="assumption" id="assumption5" value="E">\
							<label for="assumption5">全部投资于收益较大且风险较大的B（10分）</label>\
						</li>\
						<li>\
							<label>您认为自己能承受的最大投资损失是多少</label><br>\
							<input type="radio" name="loss" id="loss1" value="A">\
							<label for="loss1">10%以内（2分）</label><br>\
							<input type="radio" name="loss" id="loss2" value="B">\
							<label for="loss2">10%-30%（4分）</label><br>\
							<input type="radio" name="loss" id="loss3" value="C">\
							<label for="loss3">30%-50%（6分）</label><br>\
							<input type="radio" name="loss" id="loss4" value="D">\
							<label for="loss4">50%-70%（8分）</label><br>\
							<input type="radio" name="loss" id="loss5" value="E">\
							<label for="loss5">超过70%（10分）</label>\
						</li>\
					</ol>\
				</div>\
			</div>\
			<button @click="submitques">立即投资</button>\
		</div>',
	methods: {
		submitques: function () {
			var result = {"type": "person", score: 0};
			if(
				$("#name").val() === "" ||
				$("#certificate_type").val() === "" ||
				$("#certificate_number").val() === "" ||
				$("#certificate_number").val() === "" ||
				$("input[name=\"age\"]:checked").length === 0 ||
				$("input[name=\"education\"]:checked").length === 0 ||
				$("input[name=\"profession\"]:checked").length === 0 ||
				$("input[name=\"income\"]:checked").length === 0 ||
				$("input[name=\"availincome\"]:checked").length === 0 ||
				$("input[name=\"knowledge\"]:checked").length === 0 ||
				$("input[name=\"experience\"]:checked").length === 0 ||
				$("input[name=\"year\"]:checked").length === 0 ||
				$("input[name=\"deadline\"]:checked").length === 0 ||
				$("input[name=\"goal\"]:checked").length === 0 ||
				$("input[name=\"attitude\"]:checked").length === 0 ||
				$("input[name=\"assumption\"]:checked").length === 0 ||
				$("input[name=\"loss\"]:checked").length === 0
				){
				alert("问卷未填写完整！");
				return;
			}
			result["person_name"] = $("#name").val();
			result["person_contact_information"] = $("#contact_information").val();
			result["person_certificate_type"] = $("#certificate_type").val();
			result["person_certificate_number"] = $("#certificate_number").val();

			result["person_age"] = $("input[name=\"age\"]:checked").val();
			result["person_education"] = $("input[name=\"education\"]:checked").val();
			result["person_profession"] = $("input[name=\"profession\"]:checked").val();

			result["person_income"] = $("input[name=\"income\"]:checked").val();
			result.score += (result["person_income"].charCodeAt(0) - 65)*2 + 2;
			result["person_availincome"] = $("input[name=\"availincome\"]:checked").val();
			result.score += (result["person_availincome"].charCodeAt(0) - 65)*2 + 2;

			result["person_knowledge"] = $("input[name=\"knowledge\"]:checked").val();
			result.score += (result["person_knowledge"].charCodeAt(0) - 65)*2 + 2;
			result["person_experience"] = $("input[name=\"experience\"]:checked").val();
			result.score += (result["person_experience"].charCodeAt(0) - 65)*2 + 2;
			result["person_year"] = $("input[name=\"year\"]:checked").val();
			result.score += (result["person_year"].charCodeAt(0) - 65)*2 + 2;

			result["person_deadline"] = $("input[name=\"deadline\"]:checked").val();
			result.score += (result["person_deadline"].charCodeAt(0) - 65)*2 + 2;
			result["person_goal"] = $("input[name=\"goal\"]:checked").val();
			result.score += (result["person_goal"].charCodeAt(0) - 65)*2 + 2;

			result["person_attitude"] = $("input[name=\"attitude\"]:checked").val();
			result.score += (result["person_attitude"].charCodeAt(0) - 65)*2 + 2;
			result["person_assumption"] = $("input[name=\"assumption\"]:checked").val();
			result.score += (result["person_assumption"].charCodeAt(0) - 65)*2 + 2;
			result["person_loss"] = $("input[name=\"loss\"]:checked").val();
			result.score += (result["person_loss"].charCodeAt(0) - 65)*2 + 2;

			var json = JSON.stringify(result);
			var self = this;
			$.when(isLogin())
			.done(function (data){
				if(data.state === 0){
					$.when(submitQuestionnaire(json))
					.done(function (data) {
						if(data.state == "0"){
							// alert("问卷提交成功！");
							self.$emit("submitques");
						}
						else{
							alert(data.detail);
						}
					})
				}
				else{
					$('.login').removeClass('hidden');
					$("ul.top li.register div span").text("注册-登录");
				}
			})
		}
	}
})

Vue.component("ques-organization",{
	template: '\
		<div>\
			<h1>私募基金投资者风险调查问卷（机构）</h1>\
			<div class="ques_top">\
				<p>风险提示：私募基金投资需承担各类风险，本金可能遭受损失。同时，私募基金投资还要考虑市场风险、信用风险、流动性风险、操作风险等各类投资风险。您在基金认购过程中应当注意核对自己的风险识别和风险承受能力，选择与自己风险识别能力和风险承受能力相匹配的私募基金。</p>\
				<p>以下一系列问题可在您选择合适的私募基金前，协助评估您的风险承受能力、理财方式及投资目标。</p>\
			</div>\
			<div class="condition">\
				<label>首先，请基金投资者确定是否为合格基金投资者：</label>\
				<input type="radio" name="qualified" id="yes" value="yes"><label for="yes">是</label>\
				<input type="radio" name="qualified" id="no" value="no"><label for="no">否</label>\
				<p>如选择是，请您确认符合以下哪种条件： </p>\
				<input type="checkbox" name="condition" id="condition1" value="A">\
				<label for="condition1">净资产不低于1000万元的单位</label><br>\
				<input type="checkbox" name="condition" id="condition2" value="B">\
				<label for="condition2">社会保障基金、企业年金等养老基金，慈善基金等社会公益基金</label><br>\
				<input type="checkbox" name="condition" id="condition3" value="C">\
				<label for="condition3">依法设立并在基金业协会备案的投资计划</label><br>\
				<input type="checkbox" name="condition" id="condition4" value="D">\
				<label for="condition4">投资于所管理私募基金的私募基金管理人</label>\
			</div>\
			<div class="question">\
				<div>\
					<p>测试题目</p>\
					<ol>\
						<li>\
							<label>贵机构的联系方式为：</label>\
							<input type="text" name="tel" id="tel">\
						</li>\
						<li>\
							<label>贵机构的净资产为：</label><br>\
							<input type="radio" name="property" id="property1" value="A">\
							<label for="property1">5000万元以下（2分）</label><br>\
							<input type="radio" name="property" id="property2" value="B">\
							<label for="property2">5000万元（含）至1亿元（4分）</label><br>\
							<input type="radio" name="property" id="property3" value="C">\
							<label for="property3">1亿元（含）至10亿元（6分）</label><br>\
							<input type="radio" name="property" id="property4" value="D">\
							<label for="property4">10亿元（含）至50亿元（8分）</label><br>\
							<input type="radio" name="property" id="property5" value="E">\
							<label for="property5">50亿元（含）以上（10分）</label>\
						</li>\
						<li>\
							<label>贵机构面临的现金流压力如何？</label><br>\
							<input type="radio" name="pressure" id="pressure1" value="A">\
							<label for="pressure1">现金流短期压力很大，有可能需要随时将投资变现弥补现金流（2分）</label><br>\
							<input type="radio" name="pressure" id="pressure2" value="B">\
							<label for="pressure2">现金流短期有一定压力，需要流动性较高的投资（4分）</label><br>\
							<input type="radio" name="pressure" id="pressure3" value="C">\
							<label for="pressure3">现金流长期有一定压力，需要一定的投资收益弥补现金流（6分）</label><br>\
							<input type="radio" name="pressure" id="pressure4" value="D">\
							<label for="pressure4">现金流长期较充裕，短期内不会有压力，长期压力较小8分）</label><br>\
							<input type="radio" name="pressure" id="pressure5" value="E">\
							<label for="pressure5">现金流长期充裕，几乎没有压力（10分）</label>\
						</li>\
						<li>\
							<label>贵机构资产负债率情况：</label><br>\
							<input type="radio" name="debt" id="debt1" value="A">\
							<label for="debt1">资产负债率90%以上（2分）</label><br>\
							<input type="radio" name="debt" id="debt2" value="B">\
							<label for="debt2">资产负债率60%—90%（4分）</label><br>\
							<input type="radio" name="debt" id="debt3" value="C">\
							<label for="debt3">资产负债率30%—60%（6分）</label><br>\
							<input type="radio" name="debt" id="debt4" value="D">\
							<label for="debt4">资产负债率10%—30%（8分）</label><br>\
							<input type="radio" name="debt" id="debt5" value="E">\
							<label for="debt5">资产负债率0—10%（10分）</label>\
						</li>\
						<li>\
							<label>贵机构在过去的投资中，投资期限一般多长：</label><br>\
							<input type="radio" name="time" id="time1" value="A"><label for="time1">少于1年（2分）</label><br>\
							<input type="radio" name="time" id="time2" value="B"><label for="time2">1-2年（4分）</label><br>\
							<input type="radio" name="time" id="time3" value="C"><label for="time3">2-3年（6分）</label><br>\
							<input type="radio" name="time" id="time4" value="D"><label for="time4">3-5年（8分）</label><br>\
							<input type="radio" name="time" id="time5" value="E"><label for="time5">5年以上（10分）</label>\
						</li>\
						<li>\
							<label>在过去两年中，贵机构投资金额占比较高的产品类型是：</label><br>\
							<input type="radio" name="product_type" id="product_type1" value="A">\
							<label for="product_type1">风险较低、流动性较好的现金管理产品（2分）</label><br>\
							<input type="radio" name="product_type" id="product_type2" value="B">\
							<label for="product_type2">风险中低的债券类产品（4分）</label><br>\
							<input type="radio" name="product_type" id="product_type3" value="C">\
							<label for="product_type3">风险中低的类固定收益类产品（如信托等（6分）</label><br>\
							<input type="radio" name="product_type" id="product_type4" value="D">\
							<label for="product_type4">风险中高的由专业基金管理人管理的产品（如证券投资基金等（8分）</label><br>\
							<input type="radio" name="product_type" id="product_type5" value="E">\
							<label for="product_type5">风险较高的投资产品（如私募股权投资基金等）（10分）</label>\
						</li>\
						<li>\
							<label>下面哪一种表述最符合贵机构对今后三年投资表现的态度：</label><br>\
							<input type="radio" name="attitude" id="attitude1" value="A">\
							<label for="attitude1">期望获得较大收益（2分）</label><br>\
							<input type="radio" name="attitude" id="attitude2" value="B">\
							<label for="attitude2">期望至少能略有回报（4分）</label><br>\
							<input type="radio" name="attitude" id="attitude3" value="C">\
							<label for="attitude3">难以容忍任何亏损（6分）</label><br>\
							<input type="radio" name="attitude" id="attitude4" value="D">\
							<label for="attitude4">能承受适度亏损（8分）</label><br>\
							<input type="radio" name="attitude" id="attitude5" value="E">\
							<label for="attitude5">不介意亏损（10分）</label>\
						</li>\
						<li>\
							<label>贵机构目前的投资规模是：</label><br>\
							<input type="radio" name="scale" id="scale1" value="A">\
							<label for="scale1">500万元以下（2分）</label><br>\
							<input type="radio" name="scale" id="scale2" value="B">\
							<label for="scale2">500万元到1000万元（4分）</label><br>\
							<input type="radio" name="scale" id="scale3" value="C">\
							<label for="scale3">1000万元到5000万元（6分）</label><br>\
							<input type="radio" name="scale" id="scale4" value="D">\
							<label for="scale4">5000万元到1亿元（8分）</label><br>\
							<input type="radio" name="scale" id="scale5" value="E">\
							<label for="scale5">1亿元以上（10分）</label>\
						</li>\
						<li>\
							<label>在未来五年内，贵司预期主营业务收入会有何变化：</label><br>\
							<input type="radio" name="change" id="change1" value="A"><label for="change1">显著下降（2分）</label><br>\
							<input type="radio" name="change" id="change2" value="B"><label for="change2">可能会有所下降（4分）</label><br>\
							<input type="radio" name="change" id="change3" value="C"><label for="change3">保持不变（6分）</label><br>\
							<input type="radio" name="change" id="change4" value="D"><label for="change4">有一定增长（8分）</label><br>\
							<input type="radio" name="change" id="change5" value="E"><label for="change5">显著增长（10分）</label>\
						</li>\
						<li>\
							<label>如果贵机构的一笔投资在6至9个月内市值下降了20%，贵机构处置方式为：</label><br>\
							<input type="radio" name="dispose" id="dispose1" value="A"><label for="dispose1">全部卖掉该类资产（2分）</label><br>\
							<input type="radio" name="dispose" id="dispose2" value="B"><label for="dispose2">卖掉大部分该类资产（4分）</label><br>\
							<input type="radio" name="dispose" id="dispose3" value="C"><label for="dispose3">卖掉少量该类资产（6分）</label><br>\
							<input type="radio" name="dispose" id="dispose4" value="D"><label for="dispose4">保留现有资产不动（8分）</label><br>\
							<input type="radio" name="dispose" id="dispose5" value="E"><label for="dispose5">购买更多的同类资产（10分）</label>\
						</li>\
						<li>\
							<label>贵机构进行私募基金投资的目的是：</label><br>\
							<input type="radio" name="goal" id="goal1" value="A">\
							<label for="goal1">保证公司长期资金的保值增值（2分）</label><br>\
							<input type="radio" name="goal" id="goal2" value="B">\
							<label for="goal2">现金管理的需要（4分）</label><br>\
							<input type="radio" name="goal" id="goal3" value="C">\
							<label for="goal3">提高暂时闲置资金的使用效率（6分）</label><br>\
							<input type="radio" name="goal" id="goal4" value="D">\
							<label for="goal4">多元化战略的需要（8分）</label><br>\
							<input type="radio" name="goal" id="goal5" value="E">\
							<label for="goal5">开拓主营业务以外的盈利来源（10分）</label>\
						</li>\
					</ol>\
				</div>\
			</div>\
			<button @click="submitques">立即投资</button>\
		</div>',
	methods: {
		submitques: function () {
			var result = {"type": "organization", score: 0};
			if(
				$("#tel").val() === "" ||
				$("input[name=\"qualified\"]:checked").length === 0 ||
				$("input[name=\"condition\"]:checked").length === 0 ||
				$("input[name=\"property\"]:checked").length === 0 ||
				$("input[name=\"pressure\"]:checked").length === 0 ||
				$("input[name=\"debt\"]:checked").length === 0 ||
				$("input[name=\"time\"]:checked").length === 0 ||
				$("input[name=\"product_type\"]:checked").length === 0 ||
				$("input[name=\"attitude\"]:checked").length === 0 ||
				$("input[name=\"scale\"]:checked").length === 0 ||
				$("input[name=\"change\"]:checked").length === 0 ||
				$("input[name=\"dispose\"]:checked").length === 0 ||
				$("input[name=\"goal\"]:checked").length === 0
				){
				alert("问卷未填写完整！");
				return;
			}
			result["tel"] = $("#tel").val();

			result["qualified"] = $("input[name=\"qualified\"]:checked").val();

			var condition = $("input[name=\"condition\"]:checked");
			result["condition"] = [];
			for(var i = 0, length1 = condition.length; i < length1; i++){
				result["condition"].push($(condition[i]).val());
			}

			result["property"] = $("input[name=\"property\"]:checked").val();
			result.score += (result["property"].charCodeAt(0) - 65)*2 + 2;

			result["pressure"] = $("input[name=\"pressure\"]:checked").val();
			result.score += (result["pressure"].charCodeAt(0) - 65)*2 + 2;

			result["debt"] = $("input[name=\"debt\"]:checked").val();
			result.score += (result["debt"].charCodeAt(0) - 65)*2 + 2;

			result["time"] = $("input[name=\"time\"]:checked").val();
			result.score += (result["time"].charCodeAt(0) - 65)*2 + 2;

			result["product_type"] = $("input[name=\"product_type\"]:checked").val();
			result.score += (result["product_type"].charCodeAt(0) - 65)*2 + 2;

			result["attitude"] = $("input[name=\"attitude\"]:checked").val();
			result.score += (result["attitude"].charCodeAt(0) - 65)*2 + 2;

			result["scale"] = $("input[name=\"scale\"]:checked").val();
			result.score += (result["scale"].charCodeAt(0) - 65)*2 + 2;

			result["change"] = $("input[name=\"change\"]:checked").val();
			result.score += (result["change"].charCodeAt(0) - 65)*2 + 2;

			result["dispose"] = $("input[name=\"dispose\"]:checked").val();
			result.score += (result["dispose"].charCodeAt(0) - 65)*2 + 2;

			result["goal"] = $("input[name=\"goal\"]:checked").val();
			result.score += (result["goal"].charCodeAt(0) - 65)*2 + 2;

			var json = JSON.stringify(result);

			var self = this;
			$.when(isLogin())
			.done(function (data){
				if(data.state === 0){
					$.when(submitQuestionnaire(json))
					.done(function (data) {
						if(data.state == "0"){
							// alert("问卷提交成功！");
							self.$emit("submitques");
						}
						else{
							alert(data.detail);
						}
					})
				}
				else{
					$('.login').removeClass('hidden');
					$("ul.top li.register div span").text("注册-登录");
				}
			})
		}
	}
})



