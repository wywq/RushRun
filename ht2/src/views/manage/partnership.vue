<template>
	<div class="partnership">
		<el-form :inline="true" :model="searchform" class="searchform">
			<el-form-item label="会员名称:">
				<el-input v-model="searchform.name" placeholder="关键字"></el-input>
			</el-form-item>
			<el-form-item label="会员电话:">
				<el-input v-model="searchform.mobile" placeholder="关键字"></el-input>
			</el-form-item>
			<el-form-item label="会员ID:">
				<el-input v-model="searchform.level" placeholder="关键字"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="onSearchClick">搜索</el-button>
			</el-form-item>
		</el-form>
		<el-table :data="tabletwoData" :header-cell-style="{background:'#F9F9F9',color:'#606266'}" border style="margin-top:10px">
			<el-table-column label="会员ID" prop="code" :resizable="false" align="center">
			</el-table-column>
			<el-table-column label="真实姓名" prop="realname" :resizable="false" align="center">
			</el-table-column>
			<el-table-column label="手机号" prop="mobile" :resizable="false" align="center">
			</el-table-column>
			<el-table-column label="会员等级" prop="level" :resizable="false" align="center">
			</el-table-column>
			<el-table-column label="等级名称" prop="level_name" :resizable="false" align="center">
			</el-table-column>
			<el-table-column label="是否是合伙人" prop="is_hehuoren" :resizable="false" align="center">
				<template slot-scope="scope">
					<div v-if="scope.row.is_hehuoren == 0">否</div>
					<div v-if="scope.row.is_hehuoren == 1">是</div>
				</template>
			</el-table-column>
			<el-table-column label="合伙人所属城市" prop="name" :resizable="false" align="center">
			</el-table-column>
			<el-table-column label="操作" :resizable="false" align="center" width="350px">
				<template slot-scope="scope">
					<el-button type="primary" size="small" @click="tianjiaClick(scope.row)">升级为合伙人</el-button>
					<el-button type="primary" size="small" @click="modifyClick(scope.row)">修改会员信息</el-button>
				</template>
			</el-table-column>
		</el-table>
		<div class="mark" v-show="show">
			<div class="mark-content">
				<div class="hytj">升级为合伙人</div>
				<!-- 提交的表单 -->
				<el-form class="submitform" :model="submitform">
					<table style="width:90%;height:80px; border:1px dashed #000;background:#F9F9F9" rules="all">
						<tr style="background: #EEEEEE">
							<td style="text-align: center;">名称</td>
							<td style="text-align: center;">内容</td>
						</tr>
						<tr>
							<td class="td3" style="text-align: center;">搜索指向</td>
							<td class="td2">
								<el-form-item label="搜索城市:" style="margin-top:20px;">
									<el-input v-model="submitform.city" placeholder="关键字"></el-input>
									<el-button type="primary" @click="onSearchClick1">搜索</el-button>
								</el-form-item>
							</td>
						</tr>
						<tr>
							<td class="td3" style="text-align: center;">城市</td>
							<td class="td2">
								<div style="margin: 15px 0;"></div>
								<el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
									<el-checkbox v-for="(item,index) in cities" :label="item.chengshi_id" :key="index">{{item.chengshi_name}}</el-checkbox>
								</el-checkbox-group>
							</td>
						</tr>
						<tr>
							<td></td>
							<td class="td2">
								<el-button type="primary" @click="onSubmitClick" size="small">提交</el-button>
								<el-button type="primary" @click="clone1" size="small">返回</el-button>
							</td>
						</tr>
					</table>
				</el-form>
			</div>
		</div>
		<div class="mark" v-show="show1">
			<div class="mark-content">
				<div class="hytj">修改会员信息</div>
				<!-- 提交的表单 -->
				<el-form class="submitform" :model="submitform">
					<table style="width:90%;height:80px; border:1px dashed #000;background:#F9F9F9" rules="all">
						<tr style="background: #EEEEEE">
							<td style="text-align: center;">名称</td>
							<td style="text-align: center;">内容</td>
						</tr>
						<tr>
							<td style="text-align: center;">会员等级:</td>
							<td style="text-align: center;">
								<el-select v-model="submitform.value" placeholder="请选择" style="width:150px">
									<el-option key="" label="全部" :value="qb"></el-option>
									<el-option v-for="item in dj" :key="item.value" :label="item.level_name" :value="item.level_id">
									</el-option>
								</el-select>
							</td>
						</tr>
						<tr>
							<td style="text-align: center;">会员账号:</td>
							<td style="text-align: center;">
								<el-input v-model="submitform.huiyuan" size="small" clearable></el-input>
							</td>
						</tr>
						<tr>
							<td></td>
							<td class="td2">
								<el-button type="primary" @click="onSubmitClick1" size="small">提交</el-button>
								<el-button type="primary" @click="clone" size="small">返回</el-button>
							</td>
						</tr>
					</table>
				</el-form>
			</div>
		</div>
		<div class="tanc" v-show="tanc">
			<p class="tishi_title">提示</p>
			<p class="tishi_content">{{tishi}}</p>
			<div class="queding" @click="haode"><p class="queding_p">确定</p></div>
			<div class="quxiao" @click="close"><p class="quxiao_p">取消</p></div>
		</div>
		<!-- 分页 -->
		<div class="block">
			<el-pagination @current-change="handleCurrentChange" layout="total, prev, pager, next, jumper" :total="Number(shujuData)"
			 :page-size="15">
			</el-pagination>
		</div>
	</div>
</template>

<script>
	import util from '@/utils/utils.js'
	import service from '@/service/service.js'
	export default {
		data() {
			return {
				tabletwoData:[],
				searchform:{
					name:'',
					mobile:'',
					level:'',
				},
				submitform:{
					city:'',
					huiyuan:'',
					value:''
				},
				shujuData:'',
				show:false,
				checkedCities:[],
				checkAll: false,
				cities:[],
				qxls:[],
				show1:false,
				dj:[],
				qb:'',
				name:[],
				tanc:false,
				tishi:''
			}
		},
		async created() {
			this.hehuoreList(1)
			const dengji = await service.dengji();
			if(dengji.data.status == 1){
				this.dj = dengji.data.data
			}
		},
		methods: {
			async hehuoreList(page){
				const hehuoreList = await service.hehuoreList({
					page:page,
					name:this.searchform.name,
					mobile:this.searchform.mobile,
					level:this.searchform.value
				})
				if(hehuoreList.data.status == 1){
					this.shujuData = hehuoreList.data.data.num
					this.tabletwoData = hehuoreList.data.data.list
					// this.name = hehuoreList.data.data.list.city_name.map((item,index)=>{
					// 	this.name = item.realname
					// 	return item
					// })
					this.$message.success(hehuoreList.data.info);
				}else{
					this.tabletwoData = hehuoreList.data.data.list
					this.$message.error(hehuoreList.data.info);
				}
			},
			//关闭
			close(){
				this.tanc = false
			},
			//搜索
			onSearchClick(){
				this.hehuoreList(1)
			},
			//合伙人关闭
			clone1(){
				this.show = false
			},
			//等级按钮返回
			clone(){
				this.show1 = false
			},
			handleCheckedCitiesChange(value) {
				this.qxls = value
				let checkedCount = value.length;
				this.checkAll = checkedCount === this.cities.length;
				this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
				console.log(this.qxls.join(',') )
					
			  },
			  //点击升级为合伙人按钮
			  async tianjiaClick(row) {
			  	this.show = true
			  	this.id1 = row.user_id
			  	const hehuorenlist = await service.hehuorenlist({
			  		name:'',
			  		user_id:row.user_id
			  	})
			  	if(hehuorenlist.data.status == 1){
			  		this.cities = hehuorenlist.data.data
			  		
			  			let stock_id = []
			  			let qxglxx = []
			  			for (const item of hehuorenlist.data.data) {
			  				if (item.status == 1) {
			  					stock_id.push(item.chengshi_id)
			  				}
			  				qxglxx.push(item.chengshi_id)
			  			}
			  			this.checkedCities = stock_id
			  			this.qxglxx = qxglxx
			  			this.cities = hehuorenlist.data.data
			  			this.user_id = row.user_id
			  		
			  	}
				this.tanchuang()
			  },
			//搜索1
			async onSearchClick1(){
				const hehuorenlist = await service.hehuorenlist({
					name:this.submitform.city,
					user_id:this.id1
				})
				if(hehuorenlist.data.status == 1){
					this.cities = hehuorenlist.data.data
				}
			},
			async tanchuang(){
				const tanchuang = await service.tanchuang({
					user_id:this.id1,
					chengshi_id:this.qxls.join(',')
				})
				if(tanchuang.data.status == 1){
					this.tishi = tanchuang.data.data
				}
			},
			async haode(){
				const partnershengji = await service.partnershengji({
					user_id:this.id1,
					chengshi_id:this.qxls.join(',')
				})
				if(partnershengji.data.status == 1){
					this.$message.success(partnershengji.data.info);
					this.show = false
					this.tanc = false
					this.hehuoreList(1)
				}else{
					this.$message.error(partnershengji.data.info);
					this.hehuoreList(1)
				}
			},
			//提交
			async onSubmitClick(){
				this.tanc = true
				this.tanchuang()
				// const partnershengji = await service.partnershengji({
				// 	user_id:this.id1,
				// 	chengshi_id:this.qxls.join(',')
				// })
				// if(partnershengji.data.status == 1){
				// 	this.$message.success(partnershengji.data.info);
				// 	this.show = false
				// 	this.memeberList(1)
				// }else{
				// 	this.$message.error(partnershengji.data.info);
				// }
			},
			//点击修改会员等级
			async modifyClick(row){
				const dengji = await service.dengji();
				if(dengji.data.status == 1){
					this.dj = dengji.data.data
				}
				this.submitform.huiyuan = row.mobile
				this.id1 = row.user_id
				const huiyuanLevel = await service.huiyuanLevel({
					user_id:row.user_id
				})
				if(huiyuanLevel.data.status == 1){
					this.show1 = true
					this.submitform.huiyuan = huiyuanLevel.data.data.mobile
					this.submitform.value = huiyuanLevel.data.data.level_name
				}
			},
			//修改会员等级提交
			async onSubmitClick1(item){
				const updateMemberlevel = await service.updateMemberlevel({
					user_id:this.id1,
					level:item.level_id,
					mobile:this.submitform.huiyuan
				})
				if(updateMemberlevel.data.status == 1){
					this.show1 = false
					this.hehuoreList(1)
					console.log(this.submitform.value)
					this.$message.success(updateMemberlevel.data.info);
				}else{
					this.$message.error(updateMemberlevel.data.info);
				}
			},
			// 分页
			handleCurrentChange(val) {
				this.hehuoreList(val)
			},
			
		},
	}
</script>

<style scoped>
	.block {
		width: 100%;
		height: 80px;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	/* 遮罩 */
	.mark {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.5);
		z-index: 999;
		padding-left: -20px;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	
	.mark-content {
		width: 70%;
		height: 80%;
		background: #f0f2f5;
		overflow: auto;
	}
	
	.hytj {
		color: #666666;
		padding: 15px 0;
		text-align: center;
		border-bottom: 1px solid #D7D7D7;
		font-size: 28px;
	
	}
	.submitform {
		margin: 15px 0;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	
	.submitform .el-input {
		margin-right: 10px;
		width: 270px;
		float: left;
		display: flex;
		align-items: center;
		height: 100%;
	}
	
	tr {
		height: 50px;
		width: 100%;
		border: 1px lightgray dashed;
	}
	
	.td1 {
		text-align: right;
		padding-right: 10px;
	}
	
	.td2 {
		padding-left: 10px;
	}
	.tanc{
		width:500px;
		height:300px;
		border-radius:5%;
		background: #eee;
		position: absolute;
		top:20%;
		left:40%;
		z-index:9999;
	}
	.tishi_title{
		font-size:20px;
		padding-left:8%;
		margin-top:30px;
	}
	.queding{
		width:80px;
		height:40px;
		border-radius:5px;
		background: #0088FF;
		position:absolute;
		bottom:20px;
		left:30%;
		cursor: pointer;
	}
	.queding_p{
		width:100%;
		height:40px;
		line-height: 40px;
		color:#FFF;
		font-size:15px;
		text-align: center;
	}
	.quxiao{
		width:80px;
		height:40px;
		border-radius:5px;
		background: #0088FF;
		position:absolute;
		bottom:20px;
		left:50%;
		cursor: pointer;
	}
	.quxiao_p{
		width:100%;
		height:40px;
		line-height: 40px;
		color:#FFF;
		font-size:15px;
		text-align: center;
	}
	.tishi_content{
		width:85%;
		height:120px;
		margin:50px auto 0;
	}
</style>
