import fetch from './fetch';
import util from '../utils/utils.js'

let token = '';

function getToken() {
	if (util.getCookie('token')) {
		token = util.getCookie('token');
		// token = JSON.parse(unescape(util.getCookie('token')));
	} else {
		token = '';
	}
}
// 
// function getToken() {
// 	if (sessionStorage.getItem("token")) {
// 		token = sessionStorage.getItem("token");
// 		// token = JSON.parse(unescape(util.getCookie('token')));
// 	} else {
// 		token = '';
// 	}
// }
// 

export default {
	//首页
	firstindex() {
		getToken();
		return fetch.post("/index/index", {
			token
		});
	},
	/*
	 * 登录
	 */
	// 登录
	checkLogin({
		username,
		pwd
	}) {
		getToken();
		return fetch.post("/Login/checkLogin", {
			username,
			pwd
		});
	},

	/*
	 * 会员管理
	 */
	// 会员账户类型
	zhanghufenlei() {
		getToken('token');
		return fetch.post("/member/accountType", {
			token
		});
	},
	//城市信息
	cityxinxi({page,chengshi,huoquedu,shiming}) {
		getToken('token');
		return fetch.post("/art/city", {
			token,
			page,
			chengshi,
			huoquedu,
			shiming
		});
	},
	//城市用户信息
	cityMemeber({city}) {
		getToken('token');
		return fetch.post("/art/cityMemeber", {
			token,
			city
		});
	},
	// 会员账户管理提交
	xinxiedit({
		phone,
		user_money,
		type,
	}) {
		getToken('token');
		return fetch.post("/member/accountAmount", {
			token,
			phone,
			user_money,
			type
		});
	},
	// 会员账户列表信息
	zhanghu({}) {
		getToken('token');
		return fetch.post("/member/account", {
			token,
		});
	},
	// 会员账户管理搜索和账户列表
	yonghuzhanghu({
		user_id,
		phone,
		realname,
		mingxi,
		num,
		page
	}) {
		getToken('token');
		return fetch.post("/member/index", {
			token,
			user_id,
			phone,
			realname,
			mingxi,
			num,
			page
		});
	},
	//会员等级列表
	grade() {
		getToken('token');
		return fetch.post("/member/grade", {
			token,
		});
	},
	//执行修改会员等级信息
	updateGrade({
		id,
		amount,
		discount
	}) {
		getToken('token');
		return fetch.post("/member/updateGrade", {
			token,
			id,
			amount,
			discount
		});
	},
	// 会员等级类型
	dengji() {
		getToken('token');
		return fetch.post("/member/dengji", {
			token,
		});
	},
	// 会员列表信息
	memeberList({
		phone,
		user_id,
		name,
		level,
		page,
		daren
	}) {
		getToken('token');
		return fetch.post("/member/huiyuan", {
			token,
			phone,
			user_id,
			name,
			level,
			page,
			daren
		});
	},
	// 添加修改会员
	addMember({
		user_id,
		phone,
		paypwd,
		password,
		is_lock,
		name,
		idcard,
		level,
		mobile,
		is_jiebang,
		jiebangcishu,
		is_shiming
	}) {
		getToken('token');
		return fetch.post("/member/updatehuiyuan", {
			token,
			user_id,
			phone,
			paypwd,
			password,
			is_lock,
			name,
			idcard,
			level,
			mobile,
			is_jiebang,
			jiebangcishu,
			is_shiming
		});
	},
	// 查找用户可添加的生肖列表
	selectGoods({}) {
		getToken('token');
		return fetch.post("/Goods/selectGoods", {
			token
		});
	},
	// 用户添加生肖信息提交

	getUserAddGoods({
		member_id,
		goods_id,
	}) {
		getToken('token');
		return fetch.post("/Goods/getUserAddGoods", {
			token,
			member_id,
			goods_id,
		});
	},
	// 问题反馈列表
	getUserComplaints({
		page,
		type
	}) {
		getToken('token');
		return fetch.post("/fankui/index", {
			token,
			page,
			type
		});
	},
	//查看订单
	chakanOrder({
		order_id
	}) {
		getToken('token');
		return fetch.post("/fankui/chakanOrder", {
			token,
			order_id
		});
	},
	// 退回生肖
	outOrder({
		id,
		complaint_id
	}) {
		getToken('token');
		return fetch.post("/Order/outOrder", {
			token,
			id,
			complaint_id
		});
	},
	// 清除凭证
	clearImgInfo({
		id
	}) {
		getToken('token');
		return fetch.post("/fankui/delFankui", {
			token,
			id
		});
	},
	//查看凭证
	vouchers({
		id
	}) {
		getToken('token');
		return fetch.post("/fankui/voucher", {
			token,
			id
		});
	},
	
	
	updateComplaint({
		complaint_id
	}) {
		getToken('token');
		return fetch.post("/Order/updateComplaint", {
			token,
			complaint_id
		});
	},
	

	// 实名认证列表
	getUserAuthList({
		page,
		mobile,
	}) {
		getToken('token');
		return fetch.post("/member/authentication ", {
			token,
			page,
			mobile
		});
	},
	// 修改实名认证状态
	setAuthStatus({
		status,
		id,
	}) {
		getToken('token');
		return fetch.post("/Member/setAuthStatus", {
			token,
			status,
			id,
		});
	},
	//达人列表
	daren() {
		getToken('token');
		return fetch.post("/manage/daren", {
			token
		});
	},
	//修改达人信息
	updateDaren({
		name,
		zhitui,
		huoyue,
		id,
		xiaoqu
	}) {
		getToken('token');
		return fetch.post("/manage/updateDaren", {
			token,
			name,
			zhitui,
			huoyue,
			id,
			xiaoqu
		});
	},
	//是否为合伙人
	partnerZengsong({
		id
	}) {
		getToken('token');
		return fetch.post("/Member/partnerZengsong", {
			token,
			id
		});
	},
	// 是否冻结
	jiedong({
		user_id,
		is_lock
	}) {
		getToken('token');
		return fetch.post("/member/jiedong", {
			token,
			user_id,
			is_lock
		});
	},
	//是否解绑
	jiebang({
		user_id,
		is_bangding
	}) {
		getToken('token');
		return fetch.post("/member/jiebang", {
			token,
			user_id,
			is_bangding
		});
	},
	//实名认证
	shimingrenzheng({
		user_id,
		idcard,
		realname,
		zhifubao,
		bank_card,
		bank_name
	}) {
		getToken('token');
		return fetch.post("/member/shiming", {
			token,
			user_id,
			idcard,
			realname,
			zhifubao,
			bank_card,
			bank_name
		});
	},
	//城市列表的列表
	cityXinxilist({
		city_name
	}) {
		getToken('token');
		return fetch.post("/manage/cityXinxi", {
			token,
			city_name
		});
	},
	//城市列表的列表的修改
	updateCity({
		id,
		idcard
	}) {
		getToken('token');
		return fetch.post("manage/updateCity", {
			token,
			id,
			idcard
		});
	},
	//获取城市列表
	hehuorenlist({
		name,
		user_id
	}) {
		getToken('token');
		return fetch.post("/member/hehuoren", {
			token,
			name,
			user_id
		});
	},
	//功能开关列表
	gongneng() {
		getToken('token');
		return fetch.post("/bank/gongneng", {
			token
		});
	},
	//功能开关修改
	updateGongneng({
		name,
		value
	}) {
		getToken('token');
		return fetch.post("bank/updateGongneng", {
			token,
			name,
			value
		});
	},
	//会员卷轴详情
	huiyuanJuanzhou({
		user_id
	}) {
		getToken('token');
		return fetch.post("member/huiyuanJuanzhou", {
			token,
			user_id
		});
	},
	//升级合伙人
	partnershengji({
		user_id,
		chengshi_id,
	}) {
		getToken('token');
		return fetch.post("/member/partner", {
			token,
			user_id,
			chengshi_id
		});
	},
	//合伙人弹窗
	tanchuang({
		user_id,
		chengshi_id
	}) {
		getToken('token');
		return fetch.post("/member/tanchuang", {
			token,
			user_id,
			chengshi_id
		});
	},
	//反馈类型
	fankuiType() {
		getToken('token');
		return fetch.post("/fankui/fankuiType", {
			token
		});
	},
	//删除问题反馈类型
	delFankuitype({
		id
	}) {
		getToken('token');
		return fetch.post("/fankui/delFankuitype", {
			token,
			id
		});
	},
	//添加修改反馈类型
	updateFankui({
		id,
		name
	}) {
		getToken('token');
		return fetch.post("/fankui/updateFankui", {
			token,
			id,
			name
		});
	},
	//回馈反复
	huifuFankui({
		id,
		huifu
	}) {
		getToken('token');
		return fetch.post("/fankui/huifuFankui", {
			token,
			id,
			huifu
		});
	},
	//删除问题反馈
	delFankui({
		id
	}) {
		getToken('token');
		return fetch.post("/fankui/delFankui", {
			token,
			id
		});
	},
	/*   会员管理结束 */

	/*
	 * 团队管理
	 */
	//推广系铺
	teamtuijian({
		phone
	}) {
		getToken('token');
		return fetch.post("/member/team", {
			token,
			phone
		});
	},
	//达人等级
	darenDengji() {
		getToken('token');
		return fetch.post("member/darenDengji", {
			token
		});
	},
	/*   团队管理结束 */

	/*
	 * 生肖管理
	 */
	// 生肖列表
	getZodiac({}) {
		getToken('token');
		return fetch.post("/Goods/getZodiac", {
			token
		});
	},
	// 添加修改生肖
	addAndUpdateZodiac({
		id = '',
		name,
		money_min,
		money_max,
		begin_time,
		end_time,
		pic,
		yuyue_account_type,
		yuyue_money,
		jiqiang_account_type,
		jiqiang_money,
		day,
		bili,
		sort,
		probability,
		tangguo,
		sell_dianzi
	}) {
		getToken('token');
		return fetch.post("/Goods/addAndUpdateZodiac", {
			token,
			id,
			name,
			money_min,
			money_max,
			begin_time,
			end_time,
			pic,
			yuyue_account_type,
			yuyue_money,
			jiqiang_account_type,
			jiqiang_money,
			day,
			bili,
			sort,
			probability,
			tangguo,
			sell_dianzi
		});
	},

	// 生肖匹配成功列表
	getMatchingList({
		page,
		buy_phone = '',
		sell_phone = '',
		goods_id = '',
		status = '',
		order_no = ''
	}) {
		getToken('token');
		return fetch.post("/Order/getMatchingList", {
			token,
			page,
			buy_phone,
			sell_phone,
			goods_id,
			status,
			order_no
		});
	},
	// 删除生肖匹配成功列表
	delMatchingInfo({
		id
	}) {
		getToken('token');
		return fetch.post("/Order/delMatchingInfo ", {
			token,
			id
		});
	},
	// 确认收款
	matchingConfirm({
		id
	}) {
		getToken('token');
		return fetch.post("/Order/matchingConfirm", {
			token,
			id
		});
	},
	// 确认付款
	querenfukuanConfirm({
		id
	}) {
		getToken('token');
		return fetch.post("/Order/yes", {
			token,
			id
		});
	},
	// 用户生肖列表
	getUserGoodsList({
		page,
		phone = '',
		status = '',
		goods_id = '',

	}) {
		getToken('token');
		return fetch.post("/Goods/getUserGoodsList", {
			token,
			page,
			phone,
			status,
			goods_id,
		});
	},
	// 删除用户的生肖
	delUserGoods({
		id
	}) {
		getToken('token');
		return fetch.post("/Goods/delUserGoods ", {
			token,
			id
		});
	},
	//娱乐任务
	//删除会员卷轴任务列表
	delMembertasklist({
		user_id,
		juanzhou_id
	}) {
		getToken('token');
		return fetch.post("/member/delMembertasklist", {
			token,
			user_id,
			juanzhou_id
		});
	},
	//任务发布
	release({
		title,
		content,
		num,
		reward,
		tasktype,
		renwu_url,
		is_zhiding,
		pic
	}) {
		getToken('token');
		return fetch.post("/activity/release", {
			token,
			title,
			content,
			num,
			reward,
			tasktype,
			renwu_url,
			is_zhiding,
			pic
		});
	},
	//任务取消
	quxiao({
		id
	}) {
		getToken('token');
		return fetch.post("/activity/quxiao", {
			token,
			id
		});
	},
	//同意任务发布
	agree({
		id
	}) {
		getToken('token');
		return fetch.post("/activity/agree", {
			token,
			id
		});
	},
	//不同意任务发布
	disagree({
		id
	}) {
		getToken('token');
		return fetch.post("/activity/disagree", {
			token,
			id
		});
	},
	//俱乐部列表
	club({
		page,
		name
	}) {
		getToken('token');
		return fetch.post("/activity/club", {
			token,
			page,
			name
		});
	},
	//删除俱乐部
	deClub({
		id
	}) {
		getToken('token');
		return fetch.post("/activity/deClub", {
			token,
			id
		});
	},
	//修改俱乐部
	updateClub({
		id,
		name,
		address,
		content,
		pic,
		renshu,
		huoyuedu
	}) {
		getToken('token');
		return fetch.post("/activity/updateClub", {
			token,
			id,
			name,
			address,
			content,
			pic,
			renshu,
			huoyuedu
		});
	},
	//查看成员信息
	clubMmeberList({
		club_id
	}) {
		getToken('token');
		return fetch.post("/activity/clubMmeberList", {
			token,
			club_id
		});
	},
	//任务卷轴列表
	taskList({
		page
	}) {
		getToken('token');
		return fetch.post("/activity/taskList", {
			token,
			page
		});
	},
	//任务等级
	allTaskLevel() {
		getToken('token');
		return fetch.post("/activity/allTaskLevel", {
			token,
		});
	},
	//执行修改卷轴任务等级信息
	updateTaskLevel({
		id,
		name,
		num
	}) {
		getToken('token');
		return fetch.post("/activity/updateTaskLevel", {
			token,
			id,
			name,
			num
		});
	},
	//会员卷轴任务列表
	memberTaskList({
		id,
	}) {
		getToken('token');
		return fetch.post("/member/memberTaskList", {
			token,
			id,
		});
	},
	//执行修改卷轴任务
	updateTask({
		id,
		level_id,
		duihuan,
		jiangli,
		suochang,
		huoyue,
		is_zengsong,
		is_hehuoren_zengsong
	}) {
		getToken('token');
		return fetch.post("/activity/updateTask", {
			token,
			id,
			level_id,
			duihuan,
			jiangli,
			suochang,
			huoyue,
			is_zengsong,
			is_hehuoren_zengsong
		});
	},
	//转换列表
	transformation({
		type,
		page,
		status
	}) {
		getToken('token');
		return fetch.post("/bank/transformation", {
			token,
			type,
			page,
			status
		});
	},
	//已转换列表
	pipeList({
		page,
		status,
		order_number,
		give_user_id,
		get_user_id
	}) {
		getToken('token');
		return fetch.post("/bank/pipeList", {
			token,
			status,
			page,
			order_number,
			give_user_id,
			get_user_id
		});
	},
	//撤销
	cexiao({
		matching_id
	}) {
		getToken('token');
		return fetch.post("/bank/cexiao", {
			token,
			matching_id
		});
	},
	//查看用户信息
	getSellAndBugMember({
		matching_id
	}) {
		getToken('token');
		return fetch.post("/bank/getSellAndBugMember", {
			token,
			matching_id
		});
	},
	//转换详情
	conversionDetails({
		order_id
	}) {
		getToken('token');
		return fetch.post("/bank/conversionDetails", {
			token,
			order_id
		});
	},
	//转换任务查看凭证
	voucher({
		order_id
	}) {
		getToken('token');
		return fetch.post("/bank/voucher", {
			token,
			order_id
		});
	},
	//转换中心筛选条件列表
	screen() {
		getToken('token');
		return fetch.post("/bank/screen", {
			token,
		});
	},
	//添加/修改转换中心筛选条件
	updateScreen({
		id,
		xiao,
		da
	}) {
		getToken('token');
		return fetch.post("/bank/updateScreen", {
			token,
			id,
			xiao,
			da
		});
	},
	//删除转换中心筛选条件
	delScreen({
		id
	}) {
		getToken('token');
		return fetch.post("/bank/delScreen", {
			token,
			id
		});
	},
	//任务列表
	renwu({
		type,
		user_name,
		money,
		page
	}) {
		getToken('token');
		return fetch.post("/activity/renwu", {
			token,
			type,
			user_name,
			money,
			page
		});
	},
	//任务类型
	renwuType() {
		getToken('token');
		return fetch.post("/activity/renwuType", {
			token
		});
	},
	//任务列表图片
	renwuPic({
		id
	}) {
		getToken('token');
		return fetch.post("/activity/renwuPic", {
			token,
			id
		});
	},
	//用户完成任务列表
	userRenwu({
		user_name,
		title,
		page
	}) {
		getToken('token');
		return fetch.post("/activity/userRenwu", {
			token,
			user_name,
			title,
			page
		});
	},
	//用户上传图片
	userRenwuPic({
		id,
		user_id
	}) {
		getToken('token');
		return fetch.post("/activity/userRenwuPic", {
			token,
			id,
			user_id
		});
	},
	//娱乐任务结束


	/*   生肖管理结束 */

	/*
	 * 财务管理
	 */
	// 财务日志类型
	financetype() {
		getToken('token');
		return fetch.post("/finance/financeType", {
			token
		});
	},
	// 财务日志列表
	financeList({
		phone,
		user_id,
		type,
		page,
	}) {
		getToken('token');
		return fetch.post("/finance/index", {
			token,
			phone,
			user_id,
			type,
			page,
		});
	},
	//办理会员套餐列表
	setMeal() {
		getToken('token');
		return fetch.post("/member/setMeal", {
			token
		});
	},
	//执行修改办理会员套餐
	updateSetmeal({
		id,
		money,
		time
	}) {
		getToken('token');
		return fetch.post("/member/updateSetmeal", {
			token,
			id,
			money,
			time
		});
	},
	//提现记录列表
	tixian({
		name,
		page
	}) {
		getToken('token');
		return fetch.post("/bank/tixian", {
			token,
			name,
			page
		});
	},
	//删除体现记录
	delTixian({
		id
	}) {
		getToken('token');
		return fetch.post("/bank/delTixian", {
			token,
			id
		});
	},
	//支付方式列表
	skzh({
		bank_name,
		user_name,
		page
	}) {
		getToken('token');
		return fetch.post("/Bank/skzh", {
			token,
			bank_name,
			user_name,
			page
		});
	},
	//修改支付方式
	updatezhifu({
		user_id,
		zhifubao,
		bank_card,
		weixin,
		bank_name
	}) {
		getToken('token');
		return fetch.post("/bank/updatezhifu", {
			token,
			user_id,
			zhifubao,
			bank_card,
			weixin,
			bank_name
		});
	},
	//银行列表
	bankAll() {
		getToken('token');
		return fetch.post("/bank/bankAll", {
			token
		});
	},
	//提现审核成功
	tixianSuccess({
		id,
		type
	}) {
		getToken('token');
		return fetch.post("/bank/auditSuccess", {
			token,
			id,
			type
		});
	},
	//银行列表
	banklist({
		name,
		page
	}) {
		getToken('token');
		return fetch.post("/Bank/index", {
			token,
			name,
			page
		});
	},
	//添加银行
	addBank({
		name,
		logo,
		id
	}) {
		getToken('token');
		return fetch.post("/Bank/addBank", {
			token,
			name,
			logo,
			id
		});
	},
	//图片上传
	uploadPic({
		pic
	}) {
		getToken('token');
		return fetch.post("/bank/uploadPic", {
			token,
			pic
		});
	},
	//删除银行
	delBank({
		id
	}) {
		getToken('token');
		return fetch.post("/Bank/delBank", {
			token,
			id
		});
	},
	//删除财务日志
	// delFinance({
	// 	finance_id
	// }) {
	// 	getToken('token');
	// 	return fetch.post("/finance/delFinance", {
	// 		token,
	// 		finance_id
	// 	});
	// },

	/*   财务管理结束 */

	/*
	 * 系统管理
	 */

	//执行修改关于我们信息
	updateAbout({
		content
	}) {
		getToken('token');
		return fetch.post("/bank/updateAbout", {
			token,
			content
		});
	},
	// 等级列表
	huiyuandengjiLIst({}) {
		getToken('token');
		return fetch.post("/Huiyuandengji/index", {
			token,
		});
	},
	//分享
	fenxianglist() {
		getToken('token');
		return fetch.post("/art/fenxiang", {
			token,
		});
	},
	//修改分享
	updateFenxiang({
		id,
		type,
		title,
		pic,
		content
	}) {
		getToken('token');
		return fetch.post("/art/updateFenxiang", {
			token,
			id,
			type,
			title,
			pic,
			content
		});
	},
	//添加系统消息
	add_news({
		phone,
		message,
		type,
		data
	}) {
		getToken('token');
		return fetch.post("/bank/news", {
			token,
			phone,
			message,
			type,
			data
		});
	},
	//注册协议许可
	zhucexuke() {
		getToken('token');
		return fetch.post("/bank/zhucexuke", {
			token
		});
	},
	//修改注册协议许可
	updatezhuce({value}) {
		getToken('token');
		return fetch.post("/bank/updatezhuce", {
			token,
			value
		});
	},
	// 修改等级
	updateedit({
		id,
		name,
		condition_tui_1,
		condition_tui_2,
		condition_money,
		daishu,
		tuan_bili,
		tui_1,
		tui_2,
		tui_3,
		status
	}) {
		getToken('token');
		return fetch.post("/Huiyuandengji/updateedit", {
			token,
			id,
			name,
			condition_tui_1,
			condition_tui_2,
			condition_money,
			daishu,
			tuan_bili,
			tui_1,
			tui_2,
			tui_3,
			status
		});
	},

	// 币种管理列表
	binzhongList({}) {
		getToken('token');
		return fetch.post("/Systems/qita", {
			token,
		});
	},
	// 修改币种
	bizhongSave({
		name,
		transfer,
		tixian,
		conversion,
		limit_type,
		limit_transfer_money,
		transfer_fee_bili,
		limit_withdrawals_money,
		withdrawals_fee_bili,
		id,
	}) {
		getToken('token');
		return fetch.post("/Systems/bizhongSave", {
			token,
			name,
			transfer,
			tixian,
			conversion,
			limit_type,
			limit_transfer_money,
			transfer_fee_bili,
			limit_withdrawals_money,
			withdrawals_fee_bili,
			id,
		});
	},
	// 参数配置
	sysConfig({}) {
		getToken('token');
		return fetch.post("/Systems/config", {
			token,
		});
	},
	// 修改参数配置
	updateconfig({
		key,
		value,
	}) {
		getToken('token');
		return fetch.post("/Systems/updateconfig", {
			token,
			key,
			value,
		});
	},
	// 抽奖配置
	getLuckList({}) {
		getToken('token');
		return fetch.post("/Systems/getLuckList", {
			token,
		});
	},
	// 修改抽奖配置
	luckInfoUpdate({
		id,
		probability
	}) {
		getToken('token');
		return fetch.post("/Systems/luckInfoUpdate", {
			token,
			id,
			probability,
		});
	},
	// 系统消息列表
	getMessageInfo({
		page,
	}) {
		getToken('token');
		return fetch.post("/Help/getMessageList", {
			token,
			page,
		});
	},
	// 新增修改系统消息列表
	addMessage({
		id,
		title,
		content,
	}) {
		getToken('token');
		return fetch.post("/Help/addMessage", {
			token,
			id,
			title,
			content,
		});
	},
	// 删除系统消息列表
	delMessage({
		id,
	}) {
		getToken('token');
		return fetch.post("/Help/delMessage", {
			token,
			id,
		});
	},
	// 帮助中心列表
	getHelpList({
		page,
	}) {
		getToken('token');
		return fetch.post("/Help/getHelpList", {
			token,
			page,
		});
	},
	// 新增修改帮助中心列表
	addHelpInfo({
		id,
		question,
		answer,
	}) {
		getToken('token');
		return fetch.post("/Help/addHelpInfo", {
			token,
			id,
			question,
			answer,
		});
	},
	// 删除帮助中心信息
	delHelpInfo({
		id,
	}) {
		getToken('token');
		return fetch.post("/Help/delHelpInfo", {
			token,
			id,
		});
	},
	//客服
	kefuList() {
		getToken('token');
		return fetch.post("/kefu/index", {
			token,
		});
	},
	//执行修改客服
	update({
		kefu
	}) {
		getToken('token');
		return fetch.post("/kefu/update", {
			token,
			kefu
		});
	},
	//关于我们
	aboutMe() {
		getToken('token');
		return fetch.post("/bank/aboutMe", {
			token,
		});
	},
	//常见问题列表
	question({
		page
	}) {
		getToken('token');
		return fetch.post("/bank/question", {
			token,
			page
		});
	},
	//添加修改常见问题
	addQuestion({
		title,
		is_show,
		content,
		id
	}) {
		getToken('token');
		return fetch.post("/bank/addQuestion", {
			token,
			title,
			is_show,
			content,
			id
		});
	},
	//删除常见问题
	delQuestion({
		id
	}) {
		getToken('token');
		return fetch.post("/bank/delQuestion", {
			token,
			id
		});
	},
	//系统管理
	systemManagement({
		page
	}) {
		getToken('token');
		return fetch.post("/bank/systemManagement", {
			token,
			page
		});
	},
	//执行修改系统管理
	updateSystemManagement({
		id,
		value
	}) {
		getToken('token');
		return fetch.post("/bank/updateSystemManagement", {
			token,
			id,
			value
		});
	},

	/*   系统管理结束 */


	/*
	 * 匹配系统
	 */
	// 匹配列表
	getGoodsList({}) {
		getToken('token');
		return fetch.post("/Order/getGoodsList", {
			token,
		});
	},
	// 匹配信息
	matchingInfo({
		goods_id,
	}) {
		getToken('token');
		return fetch.post("/Order/matchingInfo", {
			token,
			goods_id,
		});
	},
	// 匹配选中选不中
	updateQianggouStatus({
		goods_id,
		member_id,
		status,
		type
	}) {
		getToken('token');
		return fetch.post("/Order/updateQianggouStatus", {
			token,
			goods_id,
			member_id,
			status,
			type
		});
	},
	//  匹配拆分订单
	userOrderBreak({
		order_id,
		money_str,
		goods_id_str
	}) {
		getToken('token');
		return fetch.post("/Order/userOrderBreak", {
			token,
			order_id,
			money_str,
			goods_id_str
		});
	},

	// 拆分价值判断
	getGoodsPrice({
		money
	}) {
		getToken('token');
		return fetch.post("/Order/getGoodsPrice", {
			token,
			money,
		});
	},

	// 删除匹配中心列表
	delQiangRedis({
		member_id,
		goods_id,
	}) {
		getToken('token');
		return fetch.post("/Order/delQiangRedis", {
			token,
			member_id,
			goods_id,
		});
	},

	/*匹配系统结束*/
	//公告列表
	announcements({
		page
	}) {
		getToken('token');
		return fetch.post("/art/index", {
			token,
			page,
		});
	},
	//公告审核成功
	auditSuccess({
		id
	}) {
		getToken('token');
		return fetch.post("/art/auditSuccess", {
			token,
			id,
		});
	},
	//公告审核失败
	auditError({
		id
	}) {
		getToken('token');
		return fetch.post("/art/auditError", {
			token,
			id,
		});
	},
	//添加公告
	addgonggao({
		title,
		content,
		id
	}) {
		getToken('token');
		return fetch.post("/art/addgonggao", {
			token,
			title,
			content,
			id
		});
	},
	//删除公告
	del({
		id
	}) {
		getToken('token');
		return fetch.post("/art/del", {
			token,
			id
		});
	},
	
	// 公告管理
	
	
	//公告管理结束
	/*
	 * 权限管理
	 */
	//添加合伙人
	
	// 管理员列表
	index({}) {
		getToken('token');
		return fetch.post("/manage/index", {
			token
		});
	},
	//添加合伙人
	addPartner({
		user_name,
		password,
		admin_id
	}) {
		getToken('token');
		return fetch.post("/manage/addPartner", {
			token,
			user_name,
			password,
			admin_id
		});
	},
	// 添加管理员
	addAdmin({
		username,
		password,
		admin_id,
		bumen
	}) {
		getToken('token');
		return fetch.post("/manage/addAdmin", {
			token,
			username,
			password,
			admin_id,
			bumen
		});
	},
	// 修改管理员密码
	pwdUpdate({
		password,
		new_pwd,
		admin_id,
	}) {
		getToken('token');
		return fetch.post("/manage/pwdUpdate", {
			token,
			password,
			new_pwd,
			admin_id,
		});
	},
	// 删除管理员
	delMember({
		admin_id
	}) {
		getToken('token');
		return fetch.post("/manage/delMember", {
			token,
			admin_id
		});
	},
	// 管理员权限列表
	showNav({
		admin_id = ''
	}) {
		getToken('token');
		return fetch.post("/manage/showNav", {
			token,
			admin_id
		});
	},
	//合伙人--列表
	hehuoreList({
		page,
		name,
		mobile,
		level
	}) {
		getToken('token');
		return fetch.post("/member/hehuoreList", {
			token,
			page,
			name,
			mobile,
			level
		});
	},
	//会员等级
	huiyuanLevel({
		user_id
	}) {
		getToken('token');
		return fetch.post("/member/huiyuanLevel", {
			token,
			user_id
		});
	},
	//修改会员等级
	updateMemberlevel({
		user_id,
		level,
		mobile
	}) {
		getToken('token');
		return fetch.post("/member/updateMemberlevel", {
			token,
			user_id,
			level,
			mobile
		});
	},
	// 修改权限
	saveNav({
		admin_id,
		nav
	}) {
		getToken('token');
		return fetch.post("/manage/saveNav", {
			token,
			admin_id,
			nav
		});
	},
	// 管理员日志
	administratorLog({
		page,
		user_name
	}) {
		getToken('token');
		return fetch.post("/manage/administratorLog", {
			token,
			page,
			user_name
		});
	},
	/*   权限管理结束 */
	//广告管理
	//广告列表
	advertisement() {
		getToken('token');
		return fetch.post("/art/advertisement", {
			token
		});
	},
	//广告列表删除
	delGuanggao({id}) {
		getToken('token');
		return fetch.post("member/delGuanggao", {
			token,
			id
		});
	},
	//审核通过
	shenheyes({
		id,
		hehuoren_id
	}) {
		getToken('token');
		return fetch.post("/art/shenheyes", {
			token,
			id,
			hehuoren_id
		});
	},
	//审核不通过
	shenheno({
		id,
		hehuoren_id
	}) {
		getToken('token');
		return fetch.post("/art/shenheno", {
			token,
			id,
			hehuoren_id
		});
	},
	//轮播图列表
	lunbo_list({
		page,
		zhixiang
	}) {
		getToken('token');
		return fetch.post("/lunbo/index", {
			token,
			page,
			zhixiang
		});
	},
	//添加轮播图
	addLunbo({
		zhixiang_id,
		type,
		pic,
		status,
		content,
		goods_id,
		title,
		id
	}) {
		getToken('token');
		return fetch.post("/lunbo/addLunbo", {
			token,
			zhixiang_id,
			type,
			pic,
			status,
			content,
			goods_id,
			title,
			id
		});
	},
	//删除轮播图
	delLunbo({
		id
	}) {
		getToken('token');
		return fetch.post("/lunbo/delLunbo", {
			token,
			id
		});
	},
	//赏金任务
	lunboSearch() {
		getToken('token');
		return fetch.post("/lunbo/lunboSearch", {
			token,
		});
	},
	//商品详情
	goodsInformation() {
		getToken('token');
		return fetch.post("/lunbo/goodsInformation", {
			token,
		});
	},
	//商学院音频区列表
	yinpinqu({
		page
	}) {
		getToken('token');
		return fetch.post("/art/yinpinqu", {
			token,
			page
		});
	},
	//所有音频
	yinpinAll() {
		getToken('token');
		return fetch.post("/art/yinpinAll", {
			token
		});
	},
	//添加商学院音频
	addYinpin({
		shipin_name,
		shipin_url,
		is_lianjie,
		gongxianzhi,
		shipin_code,
		pic,
		shipin_id
	}) {
		getToken('token');
		return fetch.post("/art/addYinpin", {
			token,
			shipin_name,
			shipin_url,
			is_lianjie,
			gongxianzhi,
			shipin_code,
			pic,
			shipin_id
		});
	},
	//音频视频上传
	uploadCode({
		shipin_code
	}) {
		getToken('token');
		return fetch.post("/art/uploadCode", {
			token,
			shipin_code
		});
	},
	//删除音频
	delyinpin({
		shipin_id
	}) {
		getToken('token');
		return fetch.post("/art/delyinpin", {
			token,
			shipin_id
		});
	},
	//商学院图文列表
	tuwen({
		page
	}) {
		getToken('token');
		return fetch.post("/art/tuwen", {
			token,
			page
		});
	},
	//添加商学院图文
	addtuwen({
		shipin_name,
		shipin_code,
		gongxianzhi,
		pic,
		shipin_id,
		shipin_url,
		is_lianjie
	}) {
		getToken('token');
		return fetch.post("/art/addtuwen", {
			token,
			shipin_name,
			shipin_code,
			gongxianzhi,
			pic,
			shipin_id,
			shipin_url,
			is_lianjie
		});
	},
	//删除图文
	deltuwen({
		shipin_id
	}) {
		getToken('token');
		return fetch.post("/art/deltuwen", {
			token,
			shipin_id
		});
	},
	//商学院视频区列表
	shipin({
		page
	}) {
		getToken('token');
		return fetch.post("/art/shipin", {
			token,
			page
		});
	},
	//添加视频
	addShipin({
		shipin_name,
		shipin_url,
		is_lianjie,
		gongxianzhi,
		pic,
		shipin_code,
		shipin_id
	}) {
		getToken('token');
		return fetch.post("/art/addShipin", {
			token,
			shipin_name,
			shipin_url,
			is_lianjie,
			gongxianzhi,
			pic,
			shipin_code,
			shipin_id
		});
	},
	//删除商学院视频
	delShipin({
		shipin_id
	}) {
		getToken('token');
		return fetch.post("/art/delShipin", {
			token,
			shipin_id
		});
	},
	//所有视频
	shipinAll() {
		getToken('token');
		return fetch.post("/art/shipinAll", {
			token
		});
	},
	// 广告管理结束
}
