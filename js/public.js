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
					<div>如需帮助，请拨打客服热线<span>4008-200-025</span></div>\
				</form>\
				<form class="do_register hidden">\
					<input class="name" type="text" name="register_name" v-model="register_name" placeholder="请输入用户名">\
					<input class="pwd" type="password" name="register_pwd" v-model="register_pwd" placeholder="请输入密码">\
					<input class="repwd" type="password" name="register_repwd" v-model="register_repwd" placeholder="请确认密码">\
					<input class="button" type="button" name="register_button" value="注册" @click="register">\
					<div>如需帮助，请拨打客服热线<span>4008-200-025</span></div>\
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
			if(self.register_pwd !== self.register_repwd)
				alert("两次输入的密码不一致！");
			else{
				$.when(register(self.register_name, self.register_pwd, self.register_repwd))
				.done(function (data) {
					if(data.state === 0){
						alert("注册成功");
						$("ul.top li.register div span").text(self.register_name);
						self.loginCancel();
					}
				});
			}
		},
		login: function () {
			var self = this;
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
})

Vue.component("banner",{
	template: '\
		<div class="banner">\
			<div class="logo">\
				<img src="../images/logo.png">\
			</div>\
			<div class="ul_manu" @click="showleft">\
				<img src="../images/caidan.png">\
				<span class="flaticon-cancel33 hidden"></span>\
			</div>\
			<div class="log_reg">\
				<button class="log" @click="onlyshowlogin">登录</button>\
				<button class="reg" @click="onlyshowregister">注册</button>\
			</div>\
			<ul class="top">\
				<slot></slot>\
				<li><a href="cdcapital.html">首页</a></li>\
				<li @click="showlinks($event)">关于创道\
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
					</ul>\
				</li>\
				<li @click="showlinks($event)">产品与服务\
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
				<li @click="showlinks($event)">创道研究\
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
				<li @click="showlinks($event)">新闻中心\
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
				<li><a href="recruitment_center.html">招聘中心</a></li>\
				<li><a href="vip_club.html">VIP俱乐部</a></li>\
				<li class="noborder"><a href="contact_us.html">联系我们</a></li>\
				<li class="register noborder">\
					<div>\
						<img src="../images/小人.png">\
						<span class="reg" @click="showlogin">注册-登录</span>\
					</div>\
					<span class="tel">400-0670-877</span>\
				</li>\
			</ul>\
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
			$('.login').removeClass('hidden');
		},
		showManu: function () {
			$(".manu_details").toggleClass('hidden');
			$(".diamonds").toggleClass('hidden');
		},
		showleft: function () {
			$("ul.top").toggleClass('navigation_show');
			$("div.log_reg").toggleClass('navigation_show');
			$(".ul_manu").children().toggleClass('hidden');
		},
		showlinks: function (event) {
			if( parseInt($("body").css("width")) < 769){
				$(event.target).children("ul").css("display","block");
				$(event.target).css("height","auto");
				$(event.target).siblings().children("ul").css("display","none");
			}
		}
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
					<li><a href="http://www.baidu.com">关于金融</a></li>\
					<li><a href="http://www.baidu.com">产品服务</a></li>\
					<li><a href="http://www.baidu.com">分支机构</a></li>\
					<li><a href="http://www.baidu.com">企业动态</a></li>\
					<li><a href="http://www.baidu.com">招贤纳士</a></li>\
					<li><a href="http://www.baidu.com">免责申明</a></li>\
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
					<div class="links">\
						<span> - 友情链接 - </span>\
						<ul>\
							<li class="hidden" v-for="link in links">\
							<a :href="link.value">{{link.description}}</a>\
							</li>\
						</ul>\
						<div class="show" @click="toggleLinks">\
							<img src="../images/箭头.png">\
						</div>\
					</div>\
					<div class="TDcode">\
						<div>\
							<p>全国服务热线</p>\
							<p class="mid">4008 980 618</p>\
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
		</div>'
})






