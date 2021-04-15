<template>
	<div class="darenlist">
		<el-table :data="tabletwoData" :header-cell-style="{background:'#F9F9F9',color:'#606266'}" border style="margin-top:10px">
			<el-table-column label="达人ID" prop="id" :resizable="false" align="center">
			</el-table-column>
			<el-table-column label="等级名" prop="name" :resizable="false" align="center">
			</el-table-column>
			<el-table-column label="直推人数" prop="zhitui" :resizable="false" align="center">
			</el-table-column>
			<el-table-column label="要求达到总活跃" prop="huoyue" :resizable="false" align="center">
			</el-table-column>
			<el-table-column label="要求达到小区活跃" prop="xiaoqu" :resizable="false" align="center">
			</el-table-column>
			<el-table-column label="达人分红比例" prop="fenhong" :resizable="false" align="center">
			</el-table-column>
			<el-table-column label="卷轴名称" prop="juanzhou_id" :resizable="false" align="center">
			</el-table-column>
			<el-table-column label="操作" :resizable="false" align="center" width="350px">
				<template slot-scope="scope">
					<el-button type="primary" size="small" @click="modifyClick(scope.row)">编辑</el-button>
				</template>
			</el-table-column>
		</el-table>
		<div class="mark" v-show="show">
			<div class="mark-content">
				<div class="hytj">修改达人信息</div>
				<!-- 提交的表单 -->
				<el-form class="submitform" :model="submitform">
					<table style="width:90%;height:80px; border:1px dashed #000;background:#F9F9F9" rules="all">
						<tr>
							<td style="text-align: center;">等级名:</td>
							<td class="td2">
								<el-input v-model="submitform.name" size="small" clearable></el-input>
							</td>
						</tr>
						<tr>
							<td style="text-align: center;">直推人数:</td>
							<td class="td2">
								<el-input v-model="submitform.num" size="small" clearable></el-input>
							</td>
						</tr>
						<tr>
							<td style="text-align: center;">要求达到总活跃:</td>
							<td class="td2">
								<el-input v-model="submitform.huoyue" size="small" clearable></el-input>
							</td>
						</tr>
						<tr>
							<td style="text-align: center;">要求达到小区活跃:</td>
							<td class="td2">
								<el-input v-model="submitform.xiaoqu" size="small" clearable></el-input>
							</td>
						</tr>
						<tr>
							<td></td>
							<td class="td2">
								<el-button type="primary" @click="onSubmitClick" size="small">提交</el-button>
								<el-button type="primary" @click="clone" size="small">返回</el-button>
							</td>
						</tr>
					</table>
				</el-form>
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
			tabletwoData:[],
			show:false,
			submitform:{
				name:'',
				num:'',
				huoyue:'',
				xiaoqu:''
			},
			id:''
	    } 
	  },
		async created(){
			this.daren()
		},
	  methods: {
		  async daren(){
			  const daren = await service.daren();
			  if(daren.data.status==1){
				  this.tabletwoData = daren.data.data
				  console.log(this.tabletwoData)
				  this.$message.success(daren.data.info);
			  }else{
				  this.$message.error(daren.data.info);
			  }
		  },
		  //编辑
		  modifyClick(row){
			  this.show = true
			  this.id = row.id
			  this.submitform.name = row.name
			  this.submitform.num = row.zhitui
			  this.submitform.huoyue = row.huoyue
			  this.submitform.xiaoqu = row.xiaoqu
		  },
		  //提交
		 async onSubmitClick(row){
			  const updateDaren = await service.updateDaren({
				  name:this.submitform.name,
				  zhitui:this.submitform.num,
				  huoyue:this.submitform.huoyue,
				  id:this.id,
				  xiaoqu:this.submitform.xiaoqu,
			  })
			  if(updateDaren.data.status==1){
				  this.show = false
				  this.$message.success(updateDaren.data.info);
				  this.daren()
			  }else{
				  this.$message.error(updateDaren.data.info);
			  }
		  },
		  //返回
		  clone(){
			  this.show = false
		  }
	  },
	  mounted() {
		
	  },
	}
</script>

<style>
</style>
