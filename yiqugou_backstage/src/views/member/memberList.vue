<template>
	<div class="member">
		<el-card >
			<el-button type="success" size="small" @click="add('')">添加用户</el-button>&nbsp;
			<el-button type="success" size="small" @click="page=1;memberList();">搜索</el-button>&nbsp;
			<el-input v-model="loginName" placeholder="按用户账号搜索" @change="page=1;memberList();" clearable size="mini" style="width: 200px;"></el-input>
			&nbsp;<el-input v-model="member_id" placeholder="按用户ID搜索" @change="page=1;memberList();" clearable size="mini" style="width: 200px;"></el-input>
		</el-card >
		<el-card >
			<el-table :data="memberlist" border style="width: 100%">
				<el-table-column type="expand">
					<template slot-scope="props">
						<el-form label-position="left" class="demo-table-expand">
							<el-form-item label="注册时间">
								<span>{{ props.row.ad_time }}</span>
							</el-form-item>
							<el-form-item label="代数">
								<span>{{ props.row.ceng }}</span>
							</el-form-item>
							<!-- <el-form-item  label="是否实名支付">
								<template slot-scope="scope">{{zhifu(props.row.is_money)}}</template>
							</el-form-item> -->
							<el-form-item  label="登录密码">
								<span>{{ props.row.loginSecret}}</span>
							</el-form-item>
							<el-form-item  label="支付密码">
								<span>{{ props.row.showPwd}}</span>
							</el-form-item>
						</el-form>
					</template>
				</el-table-column>
				<el-table-column prop="member_id" label="用户ID" :show-overflow-tooltip="true"></el-table-column>
				<el-table-column prop="loginName" label="用户账号"></el-table-column>
				<el-table-column prop="nick" label="用户名称"></el-table-column>
				<el-table-column prop="zhuce" label="推荐人账号"></el-table-column>
				<el-table-column prop="code" label="邀请码"></el-table-column>
				<!-- <el-table-column prop="daren_name" label="用户等级"></el-table-column> -->
				<el-table-column prop="real_state" label="是否实名">
					<template slot-scope="scope">{{shiming(scope.row.real_state)}}</template>
				</el-table-column>
				<el-table-column prop="name" label="真实姓名"></el-table-column>
				<el-table-column prop="idcard" label="身份证号"></el-table-column>
				<el-table-column prop="yeji" label="业绩"></el-table-column>
				<el-table-column prop="status" label="是否冻结" width="160px">
					<template slot-scope="scope">
						<el-switch v-model="scope.row.status" @change="updatestatus(scope.row.member_id)" active-text="否" inactive-text="是" :active-value="1">
						</el-switch>
					</template>
				</el-table-column>
				<el-table-column  label="操作">
					<template slot-scope="scope">
						<el-dropdown trigger="click" split-button size="mini" type="primary">
							<span class="el-dropdown-link">
								下拉菜单
							</span>
							<el-dropdown-menu slot="dropdown">
								<el-dropdown-item style="text-align: center;">
									<el-button type="primary" size="mini" @click="add(scope.row.member_id,scope.row)" style="margin: 5px 0;">编辑</el-button>
								</el-dropdown-item style="text-align: center;">
								<el-dropdown-item  style="text-align: center;">
									<el-button type="warning" size="mini" @click="mima(1,scope.row)" style="margin: 5px 0;">登录密码</el-button>
								</el-dropdown-item>
								<el-dropdown-item style="text-align: center;">
									<el-button type="warning" size="mini" @click="mima(2,scope.row)" style="margin: 5px 0;">支付密码</el-button>
								</el-dropdown-item style="text-align: center;">
										
							</el-dropdown-menu>
						</el-dropdown>
					
					</template>
				</el-table-column>
				
			</el-table>
			
			<div style="text-align: center;">
				<el-pagination background @current-change="handleCurrentChange" layout="prev, pager, next" :page-size="15"
				 :current-page="page" :total="total" style="margin-top:10px;"></el-pagination>
			</div>
			
			<el-dialog title="修改密码" :visible.sync="password">
				<el-form :model="show">
					<el-form-item label="原密码" label-width="120px">
						<el-input v-model="show.yuan" autocomplete="off" disabled></el-input>
					</el-form-item>
					<el-form-item label="新密码" label-width="120px">
						<el-input v-model="newlogin" autocomplete="off"></el-input>
					</el-form-item>
					<el-form-item label="确认密码" label-width="120px">
						<el-input v-model="again" autocomplete="off"></el-input>
					</el-form-item>
				</el-form>
				<div slot="footer" class="dialog-footer">
					<el-button @click="password = false">取 消</el-button>
					<el-button type="primary" @click="changaddress(show.yuan,show.member_id)">确 定</el-button>
				</div>
			</el-dialog>
		
			<el-drawer
			  :title="yonghu_id?'编辑':'添加'"
			  :visible.sync="dialog"
			  direction="rtl"
			  size="500px"
			  custom-class="demo-drawer"
			  ref="drawer"
			  >
			  <div class="demo-drawer__content">
			    <el-form :model="addform" label-width="100px">
					<el-form-item label="账号" v-if="yonghu_id == ''">
					  <el-input v-model="addform.phone" size="mini"></el-input>
					</el-form-item>
					<el-form-item label="登录密码" v-if="yonghu_id == ''">
					  <el-input v-model="addform.loginPwd" size="mini"></el-input>
					</el-form-item>
					<el-form-item label="支付密码" v-if="yonghu_id == ''">
					  <el-input v-model="addform.payPwd" size="mini"></el-input>
					</el-form-item>
					<el-form-item label="邀请码" v-if="yonghu_id == ''">
					  <el-input v-model="addform.code" size="mini"></el-input>
					</el-form-item>
					<el-form-item label="用户昵称" v-if="yonghu_id != ''">
					  <el-input v-model="addform.nick" size="mini"></el-input>
					</el-form-item>
					 <!-- <el-form-item label="用户等级" v-if="yonghu_id != ''">
					 	<el-select v-model="addform.level" placeholder="请选择" 
					 	 size="mini">
					 		<el-option v-for="item in levellist" :key="item.id" :label="item.name" :value="item.id"></el-option>
					 	</el-select>
					 </el-form-item> -->
				  <el-form-item label="用户头像" v-if="yonghu_id != ''">
				  	<upload :imgUrl="addform.pic" @getimg="getimg"></upload>
				  </el-form-item>
	               <el-form-item label="银行卡号" v-if="yonghu_id != ''">
					  <el-input v-model="addform.bank_card" size="mini"></el-input>
					</el-form-item>
				<el-form-item label="开户人" v-if="yonghu_id != ''">
					  <el-input v-model="addform.kaihuren" size="mini"></el-input>
					</el-form-item>
					<el-form-item label="开户行" v-if="yonghu_id != ''">
					  <el-input v-model="addform.kaihuhang" size="mini"></el-input>
					</el-form-item>
						<el-form-item label="开户支行" v-if="yonghu_id != ''">
					  <el-input v-model="addform.bank_kaihu" size="mini"></el-input>
					</el-form-item>
					<el-form-item label="微信号" v-if="yonghu_id != ''">
					  <el-input v-model="addform.weixin" size="mini"></el-input>
					</el-form-item>
					<el-form-item label="微信昵称" v-if="yonghu_id != ''">
					  <el-input v-model="addform.wx_name" size="mini"></el-input>
					</el-form-item>
					<el-form-item label="微信收款码" v-if="yonghu_id != ''">
					  <upload :imgUrl="addform.wx_pic" @getimg="getimgWx"></upload>
					</el-form-item>
					<el-form-item label="支付宝账号" v-if="yonghu_id != ''">
					  <el-input v-model="addform.zhifubao" size="mini"></el-input>
					</el-form-item>
					<el-form-item label="支付宝昵称" v-if="yonghu_id != ''">
					  <el-input v-model="addform.zhifubao_name" size="mini"></el-input>
					</el-form-item>
					<el-form-item label="支付宝收款码" v-if="yonghu_id != ''">
					  <upload :imgUrl="addform.zhifubao_pic" @getimg="getimgAli"></upload>
					</el-form-item>
			    </el-form>
			    <div class="demo-drawer__footer">
			      <el-button @click="dialog=false">取 消</el-button>
			      <el-button type="primary" @click="sub">确定</el-button>
			    </div>
			  </div>
			</el-drawer>
		</el-card>
	</div>
	
</template>

<script>
	import upload from '@/components/upload.vue'
	export default {
		data() {
			return {
				loginName:'',
				member_id:'',
				memberlist:[],
				page:1,
				total:0,
				type:0,
				password:false,
				show:{},
				title:'',
				newlogin:'',
				again:'',
				levellist:[],
				addform:{
					member_id:'',
					name:'',
					pic:'',
					level:'',
					phone:'',
					loginPwd:'',
					payPwd:'',
					code:'',
					nick:'',
					bank_card:'',
					bank_kaihu:'',
					kaihuren:'',
					kaihuhang:'',
					weixin:'',
					wx_name:'',
					wx_pic:'',
					zhifubao:'',
					zhifubao_name:'',
					zhifubao_pic:'',
				},
				condition:{},
				yonghu_id:'',
				shopactive:0,
				dialog:false,
				// fenleilist:[],
				id: '',
			}
		},
		components:{
			upload
		},
		created() {
			this.memberList()
			this.getLevel()
		},
		methods: {
			//密码
			mima(type,row){
				this.type = type
				this.show = row
				if(type == 1)
				{
					this.title = '登录密码'
					this.show.yuan = row.loginSecret
				}else{
					this.title = '支付密码'
					this.show.yuan = row.showPwd
				}
				this.password = true,
				this.newlogin = '',
				this.again = '',
				console.log(this.show)
			},
			//实名状态
			shiming(type)
			{//1未实名2实名中 3实名成功 
				if(type == 1)
				{
					return "没实名"
				}else if(type == 2){
					return "失败"
				}else{
					return "成功"
				}
			},
			//实名支付
			zhifu(type){
				if(type == 1)
				{
					return "成功"
				}else{
					return "未支付"
				}
			},
			//修改支付密码和登录密码
			async changaddress(yuan,member_id){
				if(this.newlogin == '' || this.again == '')
				{
					this.$message.error("请输入密码")
					return
				}
				if(this.newlogin != this.again)
				{
					this.$message.error('两次密码不一致')
					return
				}
				if(yuan == this.newlogin)
				{
					this.$message.error('不可与原密码一致')
					return 
				}
				let res = await this.$zcy.updateLogin({
					member_id:member_id,
					pwd:this.newlogin,
					type:this.type
				});
				if(res.status == 1)
				{
					this.$message.success(res.info)
					this.password = false
					this.memberList()
				}else{
					this.$message.error(res.info)
				}
			},
			//获取用户全部等级
			async getLevel(){
				let res = await this.$zcy.getLevel();
				if(res.status == 1)
				{
					this.levellist = res.data
				}
			},
			
			handleCurrentChange(val) {
				this.page = val
				this.memberList()
			},
			getimg(val){
				this.addform.pic = val
				console.log(val)
				console.log(this.addform.pic)
			},
				getimgWx(val){
				this.addform.wx_pic = val
				console.log(val)
			},
				getimgAli(val){
				this.addform.zhifubao_pic = val
				console.log(val)
			},
			add(member_id,row){
				this.dialog = true
				
				if(member_id == '' || member_id == 'undefind')
				{
					this.yonghu_id = ''
					this.addform = {
						member_id:'',
						nick:'',
						pic:'',
						level:'',
						phone:'',
					}
				}else{
					this.yonghu_id = member_id
					this.addform = {
						member_id:member_id,
						nick:row.nick,
						pic:row.pic,
						level:row.level,
						bank_card:row.bank_card,
						kaihuren:row.kaihuren,
						kaihuhang:row.kaihuhang,
						bank_kaihu:row.bank_kaihu,
						weixin:row.weixin,
						wx_name:row.wx_name,
						wx_pic:row.wx_pic,
						zhifubao:row.zhifubao,
						zhifubao_name:row.zhifubao_name,
						zhifubao_pic:row.zhifubao_pic,
					}
				}
			},
			async memberList() {
				let res = await this.$zcy.memberList({
					page:this.page,
					page_num:15,
					loginName:this.loginName,
					member_id:this.member_id
				})
				if (res.status == 1) {
					this.memberlist = res.data
					this.total = res.all_num
				}
			},
			handleClick(){
				this.page = 1
			},
			//修改状态
			async updatestatus(id) {
				let res = await this.$zcy.udpdaetStatus({
					member_id:id
				})
				if (res.status == 1) {
					this.$message.success('修改成功')
				}
			},
			//添加/修改用户信息
			async sub(){
				console.log(this.addform.member_id,'member_idd')
				if(this.addform.member_id == '')
				{
					this.condition = {
						member_id:'',
						phone:this.addform.phone,
						loginPwd:this.addform.loginPwd,
						payPwd:this.addform.payPwd,
						code:this.addform.code,
					}
				}else{
					this.condition = {
						member_id:this.addform.member_id,
						nick:this.addform.nick,
						pic:this.addform.pic,
						level:this.addform.level,
						bank_card:this.addform.bank_card,
                        kaihuren:this.addform.kaihuren,
						kaihuhang:this.addform.kaihuhang,
 						bank_kaihu:this.addform.bank_kaihu,
						weixin:this.addform.weixin,
						wx_name:this.addform.wx_name,
						wx_pic:this.addform.wx_pic,
						zhifubao:this.addform.zhifubao,
						zhifubao_name:this.addform.zhifubao_name,
						zhifubao_pic:this.addform.zhifubao_pic,
					}
				}
				let condition = this.condition
				let res = await this.$zcy.addMember(condition)
				if(res.status == 1)
				{
					this.$message.success(res.info)
					this.dialog = false
					this.memberList()
				}else{
					this.$message.error(res.info)
				}
			},
			
		}
	};
</script>

<style scoped>
	.demo-drawer__content{
		padding: 20px;
	}
	.demo-drawer__footer{
		text-align: center;
	}
	.tanchuang{
		position: fixed;
		z-index: 999;
		width:100%;
		height:100vh;
		margin:5px;
		top:0;
		left: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: rgba(0,0,0,0.5);
	}
	.modal-bg{
		width: 50%;
		height: 50vh;
		background-color: #FFFFFF;
	}
	.modal-header{
		color:#858585;
		margin-left: 45%;
	}
</style>
<style>
.el-drawer.rtl{
    overflow-y: scroll;
}

</style>

