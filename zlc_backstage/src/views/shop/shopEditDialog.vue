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
				        <upload :imgUrl="form.shopLogo" @getimg="getimg"></upload>
				        </el-form-item>
						<font style="color: #8C939D;">建议图片大小 48*48</font>
				    </el-col>
				</el-row>
				<el-row :gutter="24" class="item-style">
				    <el-col :span="23" :offset="1">
				        <el-form-item label="店铺背景" prop="pic">
				        <upload :imgUrl="form.background_img" @getimg="getimgs"></upload>
				        </el-form-item>
						<font style="color: #8C939D;">建议图片大小 375(全屏)*150</font>
				    </el-col>
				</el-row>
                <el-row :gutter="24" class="item-style">
                    <el-col :span="6" :offset="1"><div>店铺等级</div></el-col>
                    <el-col :span="15"><div><el-input v-model="form.star" clearable size="mini"></el-input></div></el-col>
                </el-row>
                <el-row :gutter="24" class="item-style">
                    <el-col :span="6" :offset="1"><div>地点</div></el-col>
                    <el-col :span="15"><div><el-input v-model="form.shop_address" clearable size="mini"></el-input></div></el-col>
                </el-row>
                <el-row :gutter="24" class="item-style">
                    <el-col :span="6" :offset="1"><div>描述</div></el-col>
                    <el-col :span="15"><div><el-input v-model="form.shopMiaoshu" clearable size="mini"></el-input></div></el-col>
                </el-row>
				<!-- <el-row :gutter="24" class="item-style">
				    <el-col :span="23" :offset="1">
						<el-form-item label="支付方式">
							<el-radio v-model="form.money_type" :label="1" border>VM</el-radio>
							<el-radio v-model="form.money_type" :label="2" border>酷豆</el-radio>
						</el-form-item>
				    </el-col>
				</el-row> -->
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
                    star: '',
                    shop_address: '',
                    shopMiaoshu: '',
					shopLogo:'',
					background_img:'',
					money_type:'',
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
                            "shopLevel": this.form.star,
                            "place": this.form.shop_address,
                            "shopMiaoshu": this.form.shopMiaoshu,
                            "shop_id": this.sid,
							"img":this.form.shopLogo,
							"background_img":this.form.background_img,
							"money_type":this.form.money_type
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
				this.form.shopLogo = val
			},
			getimgs(val){
				console.log(val)
				this.form.background_img = val
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
  .imgarr .active {
  	border: 2px solid #409EFF;
  }
  
</style>