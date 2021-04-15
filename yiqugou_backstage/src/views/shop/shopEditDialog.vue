<template>
    <el-dialog :visible.sync="isShow" width="35%" center @close="onClose">
        <div class="dialog-title">编辑店铺</div>
		<el-form :inline="true" ref="editForm" :model="form"  class="demo-form-inline">
                <el-row :gutter="24" class="item-style">
                    <el-col :span="6" :offset="1"><div>店铺名称</div></el-col>
                    <el-col :span="15">
                        <div><el-input v-model="form.shopName" clearable size="mini"></el-input></div>
                    </el-col>
                </el-row>
                <el-row :gutter="24" class="item-style">
                    <el-col :span="6" :offset="1"><div>联系电话</div></el-col>
                    <el-col :span="15"><div><el-input v-model="form.phone" clearable size="mini"></el-input></div></el-col>
                </el-row>
                <el-row :gutter="24" class="item-style">
                    <el-col :span="6" :offset="1"><div>姓名</div></el-col>
                    <el-col :span="15"><div><el-input v-model="form.name" clearable size="mini"></el-input></div></el-col>
                </el-row>
				<el-row :gutter="24" class="item-style">
				    <el-col :span="23" :offset="1">
				        <el-form-item label="店铺logo" prop="pic">
				        <upload :imgUrl="form.logo" @getimg="getimg"></upload>
				        </el-form-item>
				    </el-col>
				</el-row>
                <el-row :gutter="24" class="item-style">
                    <el-col :span="6" :offset="1"><div>店铺等级</div></el-col>
                    <el-col :span="15"><div><el-input v-model="form.shopLevel" clearable size="mini"></el-input></div></el-col>
                </el-row>
                <el-row :gutter="24" class="item-style">
                    <el-col :span="6" :offset="1"><div>地点</div></el-col>
                    <el-col :span="15"><div><el-input v-model="form.place" clearable size="mini"></el-input></div></el-col>
                </el-row>
                <el-row :gutter="24" class="item-style">
                    <el-col :span="6" :offset="1"><div>描述</div></el-col>
                    <el-col :span="15"><div><el-input v-model="form.shopMiaoshu" clearable size="mini"></el-input></div></el-col>
                </el-row>
                <el-row :gutter="24" class="item-style">
                    <el-col :span="23" :offset="1">
                        <el-button type="primary" size="small" @click="editShop('editForm')">修改</el-button>
                    </el-col>
                </el-row>
        </el-form>
	</el-dialog>
</template>
<script>
	import upload from "@/components/upload.vue";
	export default {
	    props: ['value_show','sid','item'],
	    components:{
	        upload
	    },
		created(){
			console.log(this.item)
			for(let k in this.item){
				this.form[k] = this.item[k]
			}
		},
		data() {
            return {
                isShow:this.value_show,
                //快递信息
				form: {
					shopName: '',
                    phone: '',
                    name: '',
                    shopLevel: '',
                    place: '',
                    shopMiaoshu: '',
					logo:''
                },
                
            }
        },
        watch: {
            value_show (val){
                this.isShow = val
            }
        },
        methods: {
            //修改店铺信息
            async editShop(formName){
                this.$refs[formName].validate(async (valid) => {
                    if(valid){
                        let postdata = {
                            "shopName": this.form.shopName,
                            "phone": this.form.phone,
                            "name": this.form.name,
                            "shopLevel": this.form.shopLevel,
                            "place": this.form.place,
                            "shopMiaoshu": this.form.shopMiaoshu,
                            "shop_id": this.sid,
							img:this.form.logo
                        }
                        let res = await this.$zcy.shopUpdate(postdata)
                        // console.log("编辑店铺",res)
                        if (res.status == 1) {
                            this.$message.success('修改成功')
                            this.onClose()
                        }else {
                            this.$message.error(res.info)
                        }
                    }else {
                        return false
                    }
                })
            },
            onClose(){
                this.$emit('close')
            },
			getimg(val){
				console.log(val)
				this.form.logo = val
			},
        }
    }
</script>
<style>
    .dialog-title{
        text-align: center;
        font-size: 20px;
        color: #333;
        margin-bottom: 20px;
    }
    .el-form-item{
        margin-bottom: 10px;
    }
  .el-col {
    padding-left: 10px;
    border-radius: 4px;
  }
  .item-style{
      padding: 20px;
  }
</style>