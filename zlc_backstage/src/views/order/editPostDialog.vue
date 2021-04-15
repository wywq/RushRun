<template>
    <el-dialog :visible.sync="isShow" width="600px" center @close="onClose">
		<el-form :inline="true" ref="form" :model="form" class="demo-form-inline">
                <el-row :gutter="24" class="item-style">
                    <el-col :span="6" :offset="1"><div>快递公司名称</div></el-col>
                    <el-col :span="15"><div>
                        <!-- <el-input v-model="form.courier" clearable size="mini"></el-input> -->
                        <el-select v-model="form.shipping_id" placeholder="请选择" @change="courierChange" size="mini">
                            <el-option
                            v-for="item in postList"
                            :key="item.shipping_id"
                            :label="item.shipping_name"
                            :value="item.shipping_id">
                            </el-option>
                        </el-select></div>
                    </el-col>
                </el-row>
                <el-row :gutter="24" class="item-style">
                    <el-col :span="6" :offset="1"><div>快递单号</div></el-col>
                    <el-col :span="15"><div><el-input v-model="form.shipping_code" clearable size="mini"></el-input></div></el-col>
                </el-row>
                <el-row :gutter="24" class="item-style">
                    <el-col :span="23" :offset="1">
                        <el-button type="primary" size="small" @click="post">发货</el-button>
                    </el-col>
                </el-row>
        </el-form>
	</el-dialog>
</template>
<script>
	export default {
		 props:['order_id','value_show'],
		data() {
            return {
                isShow:this.value_show,
                //快递信息
				form: {
					shipping_code: '',
					shipping_id:'',
					shipping_name:''
                },
                rules: {
                    courier: [
                        { required: true, message: "请填写快递公司名称", trigger: 'blur' }
                    ],
                    courier_num: [
                        { required: true, message: "请填写快递单号", trigger: 'blur' }
                    ]
                },
                postList: [],
                post_id: ''
            }
        },
        watch: {
            value_show (val){
                this.isShow = val
				this.form ={
					shipping_code: '',
					shipping_id:''
                }
            }
        },
        created() {
            this.getPost()
        },
        methods: {
            //获取快递公司
            async getPost() {
                let res = await this.$zcy.getPost()
                console.log("快递公司",res)
				if (res.status == 1) {
                    this.postList = res.data
                }else {
                    this.$message.error(res.info)
                }
            },
            onClose(){
                this.$emit('close')
            },
			async post(){
				if(!this.form.shipping_id){
					this.$message.error('请选择快递公司')
					return
				}
				if(!this.form.shipping_code){
					this.$message.error('请填写快递号')
					return
				}
				let postdata ={
					...this.form,
					order_id:this.order_id,
				}
				let res = await this.$zcy.deliverGoods(postdata)
				console.log("快递公司",res)
				if (res.status == 1) {
					this.$message.success('发货成功')
					 this.$emit('close')
				}else {
				    this.$message.error(res.info)
				}
			},
			courierChange(val){
				console.log(val)
			}
        }
    }
</script>
<style scoped>
	.item-style{
		text-align: center;
		margin-bottom: 20px;
	}

</style>