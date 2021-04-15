<template>
	<div class="renchou_list">
		<!-- 会员账号搜索 -->
		<el-form :inline="true" :model="searchform" class="searchform">
			<el-form-item label="会员账号:">
				<el-input v-model="searchform.user" placeholder="关键字"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="onSearchClick">确认搜索</el-button>
			</el-form-item>
		</el-form>
		<!-- 会员账号搜索 -->
		<!-- 第一行表格 -->
		<el-table :data="tableoneData" :header-cell-style="{background:'#F9F9F9',color:'#606266'}" border style="margin-top:10px">
			<el-table-column v-for="(item,index) in tableone" :prop="item.prop" :label="item.label" class="elcolumn" align="center">
			</el-table-column>
		</el-table>
		
		
		<!-- 第二行表格 -->
		<el-table :data="tabletwoData" :header-cell-style="{background:'#F9F9F9',color:'#606266'}" border style="margin-top:10px">
			<el-table-column v-for="(item,index) in tabletwo" :prop="item.prop" :label="item.label" class="elcolumn" align="center">
			</el-table-column>
		</el-table>
		
	</div>
</template>

<script>
	export default{
		data(){
			return{
				searchform:{
					user:"",
				}
			}
		},
		components: {
			
		},
		methods:{
			onSearchClick(){
				console.log(this.searchform)
			}
		}
	}
</script>

<style scoped>
	/* 搜索表单 */
	.searchform {
		margin-top: 20px;
	}
	
	.searchform .el-input {
		margin: 0 5px;
		width: 150px;
		vertical-align: top;
	}
	
	.elcolumn {
		text-align: center;
	}
	
	.el-table {
		text-align: center;
	}
</style>
