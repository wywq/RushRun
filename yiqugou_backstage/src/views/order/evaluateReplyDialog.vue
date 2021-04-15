<template>
    <el-dialog :visible.sync="isShow" width="35%" center @close="onClose">
		<el-form :inline="true" ref="form" :model="form" class="demo-form-inline">
                <el-row :gutter="24" class="item-style">
                    <el-col :span="6" :offset="1"><div>回复内容</div></el-col>
                    <el-col :span="15"><div><el-input v-model="form.reply_content" type="textarea" :rows="6" clearable size="mini"></el-input></div></el-col>
                </el-row>
                <el-row :gutter="24" class="item-style mt30">
                    <el-col :span="23" :offset="7">
                        <el-button type="primary" size="small" @click="editPost">回复</el-button>
                    </el-col>
                </el-row>
        </el-form>
	</el-dialog>
</template>
<script>
	export default {
        props: {
            value_show: Boolean,
            rid: String
        },
		data() {
            return {
                isShow:this.value_show,
                //快递信息
				form: {
					reply_content: ''
                },
                rules: {
                    reply_content: [
                        { required: true, message: "请填写回复内容", trigger: 'blur' }
                    ]
                },
            }
        },
        watch: {
            value_show (val){
                this.isShow = val
            }
        },
        methods: {
            //回复评价
            async editPost(){
                let postdata = {
                    "id": this.rid,
                    "reply_content": this.form.reply_content
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
            onClose(){
                this.$emit('close')
            }
        }
    }
</script>
<style>
    .mt30{margin-top: 30px;}
</style>