<template>
	<div class="usertasklist">
		<el-form :inline="true" :model="searchform" class="searchform">
			<el-form-item label="用户名:">
				<el-input v-model="searchform.name" placeholder="姓名"></el-input>
			</el-form-item>
			<el-form-item label="任务标题:">
				<el-input v-model="searchform.title" placeholder="赏金"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="onSearchClick">搜索</el-button>
			</el-form-item>
		</el-form>
		<el-table :data="tabletwoData" :header-cell-style="{background:'#F9F9F9',color:'#606266'}" border
		 style="margin-top:10px">
			<el-table-column label="用户任务ID" prop="id" :resizable="false" align="center">
			</el-table-column>
			<el-table-column label="接受任务时间" prop="add_time" :resizable="false" align="center" width="210px">
			</el-table-column>
			<el-table-column label="任务状态" prop="status" :resizable="false" align="center" width="160px">
				<template slot-scope="scope">
					<div v-if="scope.row.status == 1">进行中</div>
					<div v-if="scope.row.status == 2">已上传截图</div>
					<div v-if="scope.row.status == 3">审核失败</div>
					<div v-if="scope.row.status == 4">审核成功</div>
				</template>
			</el-table-column>
			<el-table-column label="上传截图时间" prop="upload_time" :resizable="false" align="center" width="210px">
			</el-table-column>
			<el-table-column label="审核时间" prop="shenhe_time" :resizable="false" align="center" width="210px">
			</el-table-column>
			<el-table-column label="接受任务的用户名称" prop="user_name" :resizable="false" align="center" width="210px">
			</el-table-column>
			<el-table-column label="任务标题" prop="title" :resizable="false" align="center" width="180px">
			</el-table-column>
			<el-table-column label="单次赏金" prop="reward" :resizable="false" align="center" width="180px">
			</el-table-column>
			<el-table-column label="任务分类" prop="type" :resizable="false" align="center" width="180px">
			</el-table-column>
			<el-table-column label="操作" :resizable="false" align="center" width="400px">
				<template slot-scope="scope">
					<el-button type="primary" size="small" @click="lookClick(scope.row)">完成上传的图片</el-button>
				</template>
			</el-table-column>
		</el-table>
		<!-- 分页 -->
		<div class="block">
			<el-pagination @current-change="handleCurrentChange" layout="total, prev, pager, next, jumper" :total="shujuData.num"
			 :page-size="15">
			</el-pagination>
		</div>
		<div class="mark" v-show="tu">
			<div class="mark-content ">
				<el-button type="primary" @click="cloneClick" size="small" style="margin:20px 0 20px 90%;">返回</el-button>
				<div class="tan_box">
					<div class="tan " v-for="(item,index) in fits" :key="index" style="margin:10px 10px;">
						<img :src="img_url + item.pic" alt="" style="width:100%;height:100%;">
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
		import util from '@/utils/utils.js'
	import service from '@/service/service.js'
	export default {
		data() {
			return {
				searchform:{
					title:'',
					name:''
				},
				tabletwoData:[],
				shujuData:'',
				tu:false,
				img_utl:this.img_url,
				fits:[],
			}
		},
		async created() {
			this.userRenwu(1)
		},
		methods: {
			//转换成时间对象
			getDate(tm) {
				let date = new Date(tm);
				let year = date.getFullYear();
				let month = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
				let time = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
				let hours = (date.getHours() < 10 ? '0' + (date.getHours()) : date.getHours())
				let fen = (date.getMinutes() < 10 ? '0' + (date.getMinutes()) : date.getMinutes())
				let miao = (date.getSeconds() < 10 ? '0' + (date.getSeconds()) : date.getSeconds())
				let tt = year + '-' + month + '-' + time + ' ' + hours + ':' + fen + ":" + miao;
				return tt;
			},
			async userRenwu(page){
				const userRenwu = await service.userRenwu({
					user_name:this.searchform.name,
					title:this.searchform.title,
					page:page
				})
				if(userRenwu.data.status==1){
					this.shujuData = userRenwu.data.data
					const tabletwoData = userRenwu.data.data.list.map((item,index)=>{
						item.add_time = this.getDate(item.add_time * 1000)
						item.upload_time = this.getDate(item.upload_time * 1000)
						item.shenhe_time = this.getDate(item.shenhe_time * 1000)
						return item
					})
					this.tabletwoData = tabletwoData
					this.$message.success(userRenwu.data.info);
				}else{
					this.$message.error(userRenwu.data.info);
				}
			},
			//搜索
			onSearchClick(){
				this.userRenwu(1)
			},
			//上传图片
			async lookClick(row){
				this.tu = true
				const userRenwuPic = await service.userRenwuPic({
					id: row.id,
					user_id:row.user_id
				})
				if (userRenwuPic.data.status == 1) {
					this.fits = userRenwuPic.data.data
					
				}
				this.userRenwu(1)
			},
			//返回
			cloneClick(){
				this.tu = false
				this.fits = ''
			},
			// 分页
			handleCurrentChange(val) {
				this.userRenwu(val)
			},
		},
	}
</script>

<style>
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
	.tan{
		width:200px;
		height:200px;
		background: #000000;
	}
	.tan_box{
		width:90%;
		height:200px;
		margin:0 auto;
		display: flex;
		flex-wrap: wrap;
		justify-content:flex-start;
	}
</style>
