<template>
    <el-dialog :visible.sync="isShow" width="35%" center @close="onClose">
		<el-form :inline="true" ref="form" :model="form" class="demo-form-inline">
                <el-row :gutter="24" class="item-style">
                    <el-col :span="6" :offset="1"><div>快递公司名称</div></el-col>
                    <el-col :span="15"><div>
                        <!-- <el-input v-model="form.courier" clearable size="mini"></el-input> -->
                        <el-select v-model="form.courier" placeholder="请选择" @change="courierChange">
                            <el-option
                            v-for="item in postList"
                            :key="item.shipping_id"
                            :label="item.shipping_name"
                            :value="item.shipping_id">
                            </el-option>
                        </el-select></div>
                    </el-col>
                </el-row>
                <el-row :gutter="24" class="item-style" style="margin-top: 20px;">
                    <el-col :span="6" :offset="1"><div>快递单号</div></el-col>
                    <el-col :span="15"><div><el-input v-model="form.courier_num" clearable size="mini"></el-input></div></el-col>
                </el-row>
                <el-row :gutter="24" class="item-style">
                    <el-col :span="23" :offset="1">
                        <el-button type="primary" size="small" @click="editPost">修改</el-button>
                    </el-col>
                </el-row>
        </el-form>
	</el-dialog>
</template>
<script>
	export default {
        props: {
            value_show: Boolean,
            order_id: '',
        },
		data() {
            return {
                isShow:this.value_show,
                //快递信息
				form: {
					courier: '',
					courier_num: ''
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
            //修改快递公司信息
            async editPost(){
				console.log(this.order_id)
                let postdata = {
                    "courier": this.form.courier,
                    "courier_num": this.form.courier_num,
                    "order_id": this.order_id,
                    "post_id": this.post_id
				}
                let res = await this.$zcy.editPost(postdata)
                console.log("快递信息",res)
				if (res.status == 1) {
                    this.$message.success('修改成功')
					this.onClose()
                }else {
                    this.$message.error(res.info)
                }
            },
            courierChange(val){
                console.log("val",val)
                let obj = {}
                this.postList.map((item) => {
                    if(item.id === val) {
                        obj = item
                        this.post_id = item.shipping_id
                    }
                })
            },
            onClose(){
                this.$emit('close')
            }
        }
    }
</script>
<style>

</style>