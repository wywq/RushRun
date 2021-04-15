<template>
    <el-dialog :visible.sync="isShow" width="65%" :close-on-click-modal="false" center @close="onClose">
        <div class="dialog-title">发放优惠券</div>
        <el-form :inline="true" ref="form" :model="form" class="demo-form-inline">
            <el-form-item>
                <el-input v-model="form.phone" placeholder="按用户手机号搜索" clearable size="mini"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" size="small" @click="search">搜索</el-button>
            </el-form-item>
        </el-form>
        <!-- 表格 -->
		<el-card>
			<el-table :data="list" border style="width: 100%" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55"></el-table-column>
				<el-table-column prop="member_id" label="用户id"></el-table-column>
				<el-table-column prop="nick" label="用户昵称"></el-table-column>
				<el-table-column prop="phone" label="用户手机号"></el-table-column>
				<el-table-column prop="now_num" label="当前拥有此优惠券数量"></el-table-column>
			</el-table>
		</el-card>
        <div class="issue-btn-box">
            <el-button type="primary" size="small" @click="confirm('form')">确认发放</el-button>
        </div>
	</el-dialog>
</template>
<script>
	export default {
        props: {
            value_show: Boolean,
            coupon_id: Number
        },
		data() {
            return {
                isShow:this.value_show,
                //优惠券
				form: {
					phone: ''
                },
                rules: {
                    phone: [
                        { required: true, message: "请填写用户手机号", trigger: 'blur' }
                    ]
                },
                //用户列表
                list: [],
                //选中用户
                memberArr: []
            }
        },
        watch: {
            value_show (val){
                this.isShow = val
            }
        },
        created (){

        },
        methods: {
            //搜索
            async search(){
                let postdata = {
                    phone: this.form.phone,
                    coupon_id: this.coupon_id
                };
                let res = await this.$zcy.getMember(postdata);
                // console.log("couponlist", res.status);
                if (res.status == 1) {
                    this.list.push(res.data)
                }
                
            },
            //确认发放
            async confirm(formName){
                this.$refs[formName].validate(async (valid) => {
                    if (valid) {
                        let postdata = {
                            coupon_id: this.coupon_id,
                            memberArr: this.memberArr.join(",")
                        }
                        let res = await this.$zcy.couponGrant(postdata)
                        if (res.status == 1) {
                            this.$message.success('添加成功')
                            this.onClose()
                        }else {
                            this.$message.error(res.info)
                        }
                    }
                })
            },
            onClose(){
                this.$emit('close')
            },
            handleSelectionChange(val) {
                this.memberArr = []
                for(let i = 0; i<val.length; i++){
                    this.memberArr.push(val[i].member_id)
                }
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
    .issue-btn-box{
        margin-top: 20px;
        text-align: center;
    }
</style>