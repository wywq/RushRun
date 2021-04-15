<template>
    <el-dialog :visible.sync="isShow" width="35%" center @close="onClose">
        <div class="dialog-title">添加店铺</div>
		<el-form :inline="true" ref="addForm" :model="form" :rules="rules" label-width="100px" class="demo-form-inline">
                <el-row :gutter="24" class="item-style">
                    <el-col :span="23" :offset="1">
                        <el-form-item label="店铺名称" prop="shopName">
                        <div><el-input v-model="form.shopName" clearable size="mini"></el-input></div>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="24" class="item-style">
                    <el-col :span="23" :offset="1">
                        <el-form-item label="店铺logo" prop="pic">
                        <upload :imgUrl="form.pic" @getimg="getimg"></upload>
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
                    <el-col :span="23" :offset="1">
                        <el-form-item label="联系电话" prop="phone">
                        <div><el-input v-model="form.phone" type="number" clearable size="mini"></el-input></div>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="24" class="item-style">
                    <el-col :span="23" :offset="1">
                        <el-form-item label="姓名" prop="name">
                            <div><el-input v-model="form.name" clearable size="mini"></el-input></div>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="24" class="item-style">
                    <el-col :span="23" :offset="1">
                        <el-form-item label="店铺等级" prop="shopLevel">
                        <div><el-input v-model="form.shopLevel" type="number" maxlength="1" clearable size="mini"></el-input></div>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="24" class="item-style">
                    <el-col :span="23" :offset="1">
                        <el-form-item label="地点" prop="place">
                            <div><el-input v-model="form.place" clearable size="mini"></el-input></div>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="24" class="item-style">
                    <el-col :span="23" :offset="1">
                        <el-form-item label="描述" prop="shopMiaoshu">
                            <div><el-input v-model="form.shopMiaoshu" clearable size="mini"></el-input></div>
                        </el-form-item>
                    </el-col>
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
                    <el-col :span="20" :offset="4">
                        <el-button type="primary" size="small" @click="addShop('addForm')">添加</el-button>
                    </el-col>
                </el-row>
        </el-form>
	</el-dialog>
</template>
<script>
    import upload from "@/components/upload.vue";
	export default {
        props: {
            value_show: Boolean,
            sid: String
        },
        components:{
            upload
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
                    pic: '',
					background_img:'',
					money_type:1
                },
                rules: {
                    shopName: [
                        { required: true, message: "请填写店铺名称", trigger: 'blur' }
                    ],
                    phone: [
                        { required: true, message: "请填写联系电话", trigger: 'blur' }
                    ],
                    name: [
                        { required: true, message: "请填写姓名", trigger: 'blur' }
                    ],
                    shopLevel: [
                        { required: true, message: "请填写店铺等级", trigger: 'blur' }
                    ],
                    place: [
                        { required: true, message: "请填写地点", trigger: 'blur' }
                    ],
                    shopMiaoshu: [
                        { required: true, message: "请填写描述", trigger: 'blur' }
                    ],
                    pic: [
                        { required: true, message: "请上传店铺logo", trigger: 'blur' }
                    ],
					money_type: [
					    { required: true, message: "请选择支付方式", trigger: 'blur' }
					],
                },
            }
        },
        watch: {
            value_show (val){
                this.isShow = val
            }
        },
        methods: {
            //添加店铺信息
            async addShop(formName){
                this.$refs[formName].validate(async (valid) => {
                    if (valid) {
                        let postdata = {
                            "shopName": this.form.shopName,
                            "phone": this.form.phone,
                            "name": this.form.name,
                            "shopLevel": this.form.shopLevel,
                            "place": this.form.place,
                            "shopMiaoshu": this.form.shopMiaoshu,
                            "img": this.form.pic,
							"background_img":this.form.background_img,
							"money_type":this.form.money_type
							
                        }
                        let res = await this.$zcy.addShop(postdata)
                        // console.log("添加店铺",res)
                        if (res.status == 1) {
                            this.$message.success('添加成功')
                            this.onClose()
                        }else {
                            this.$message.error(res.info)
                        }
                    }
                })
            },
            getimg(val){
				console.log(val)
				this.form.pic = val
			},
			getimgs(val){
				console.log(val)
				this.form.background_img = val
			},
            onClose(){
                this.$emit('close')
            }
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