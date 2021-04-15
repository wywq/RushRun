<template>
    <el-dialog :visible.sync="isShow" width="35%" center @close="onClose">
        <div class="dialog-title" v-if="type == 1">添加优惠券</div>
        <div class="dialog-title" v-if="type == 2">修改优惠券</div>
		<el-form :inline="true" ref="couponForm" :model="form" :rules="rules" label-width="180px" class="demo-form-inline">
                <el-row :gutter="24" class="item-style">
                    <el-col :span="24">
                        <el-form-item label="优惠券名称" prop="coupon_name">
                        <div><el-input v-model="form.coupon_name" clearable size="mini"></el-input></div>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="24" class="item-style">
                    <el-col :span="24">
                        <el-form-item label="开启的店铺">
                        <el-select v-model="form.shop_id" placeholder="请选择" size="mini" @change="shopChange">
                            <el-option
                            v-for="item in shoplist"
                            :key="item.shop_id"
                            :label="item.shopName"
                            :value="item.shop_id">
                            </el-option>
                        </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="24" class="item-style">
                    <el-col :span="22" :offset="2">
                        <el-form-item label="上架商品">
                            <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
                            <div style="margin: 15px 0;"></div>
                            <el-checkbox-group v-model="goods_id" @change="handleCheckedGoodsChange">
                                <el-checkbox v-for="(goods,index) in goodslist" :label="goods.goods_id" :key="index">{{goods.name}}</el-checkbox>
                            </el-checkbox-group>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="24" class="item-style">
                    <el-col :span="24">
                        <el-form-item label="可抵扣金额" prop="money">
                        <div><el-input v-model="form.money" type="number" clearable size="mini"></el-input></div>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="24" class="item-style">
                    <el-col :span="24">
                        <el-form-item label="满多少钱可用" prop="money_max">
                            <div><el-input v-model="form.money_max" type="number" clearable size="mini"></el-input></div>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="24" class="item-style">
                    <el-col :span="24">
                        <el-form-item label="每个用户最多可领取数量" prop="num">
                        <div><el-input v-model="form.num" type="number" maxlength="10" clearable size="mini"></el-input></div>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="24" class="item-style">
                    <el-col :span="24">
                        <el-form-item label="发放总数量" prop="grant_num">
                            <div><el-input v-model="form.grant_num" clearable size="mini"></el-input></div>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="24" class="item-style">
                    <el-col :span="24">
                        <el-form-item label="可使用开始时间" prop="begin_time">
                            <el-date-picker
                                v-model="form.begin_time"
                                type="datetime"
                                placeholder="选择日期时间"
                                value-format="timestamp"
                                size="small">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="24" class="item-style">
                    <el-col :span="24">
                        <el-form-item label="可使用结束时间" prop="end_time">
                            <el-date-picker
                                v-model="form.end_time"
                                type="datetime"
                                placeholder="选择日期时间"
                                value-format="timestamp"
                                size="small">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="24" class="item-style">
                    <el-col :span="24">
                        <el-form-item label="是否开启" prop="status">
                            <el-radio v-model="form.status" :label="1">开启</el-radio>
                            <el-radio v-model="form.status" :label="2">关闭</el-radio>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="24" class="item-style">
                    <el-col :span="16" :offset="8">
                        <el-button type="primary" size="small" @click="confirm('couponForm')"><span v-if="type==1">添加</span><span v-if="type==2">修改</span></el-button>
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
            type: Number, //1添加2修改
            data: Object,
            coupon_id: Number
        },
        components:{
            upload
        },
		data() {
            return {
                isShow:this.value_show,
                //优惠券
				form: {
					coupon_name: '',
                    shop_id: '',
                    money: '',
                    money_max: '',
                    num: '',
                    grant_num: '',
                    begin_time: '',
                    end_time: '',
                    status: 1
                },
                rules: {
                    coupon_name: [
                        { required: true, message: "请填写优惠券名称", trigger: 'blur' }
                    ],
                    money: [
                        { required: true, message: "请填写可抵扣金额", trigger: 'blur' }
                    ],
                    money_max: [
                        { required: true, message: "请填写满多少钱可用", trigger: 'blur' }
                    ],
                    num: [
                        { required: true, message: "请填写每个用户最多可领取数量", trigger: 'blur' }
                    ],
                    grant_num: [
                        { required: true, message: "请填写发放总数量", trigger: 'blur' }
                    ],
                    begin_time: [
                        { required: true, message: "请填写可使用开始时间", trigger: 'blur' }
                    ],
                    end_time: [
                        { required: true, message: "请填写可使用结束时间", trigger: 'blur' }
                    ]
                },
                //店铺
                shoplist: [],
                //商品
                goodslist: [],
                //全选
                checkAll: false,
                goods_id: [],
                allGoodsId: [],
                isIndeterminate: true
            }
        },
        watch: {
            value_show (val){
                this.isShow = val
            }
        },
        created (){
            this.getShop()
            if(this.type == 2){
                this.form.coupon_name = this.data.coupon_name
                this.form.money = this.data.money
                this.form.money_max = this.data.money_max
                this.form.shop_id = this.data.shop_id
                this.form.num = this.data.num
                this.form.grant_num = this.data.grant_num
                this.form.begin_time = this.data.begin_time * 1000
                this.form.end_time = this.data.end_time * 1000
                this.form.status = this.data.status
                this.getGoods(this.form.shop_id)
            }
            console.log("coupon_id",this.coupon_id)
        },
        methods: {
            //店铺信息
            async getShop(){
                let res = await this.$zcy.getShop();
                console.log("shoplist", res.data);
                if (res.status == 1) {
                    this.shoplist = res.data;
                }
            },
            //选择店铺
            shopChange(val){
                this.getGoods(val)
            },
            //上架商品
            async getGoods(id){
                let res = await this.$zcy.getGoods({'shop_id':this.form.shop_id});
                console.log("goodslist", res.data);
                if (res.status == 1) {
                    this.goodslist = res.data;
                    let tempArr = []
                    this.goodslist.forEach(element => {
                        console.log("aaa",element.goods_id)
                        tempArr.push(element.goods_id)
                    });
                    this.allGoodsId = tempArr
                    console.log("allGoodsId",this.allGoodsId)
                    if(this.type == 2){
                        this.$nextTick(() => {
                            this.goods_id = this.data.goods_id.split(",")
                            console.log("goods_id111",this.goods_id)
                        })
                    }
                }
            },
            async confirm(formName){
                this.$refs[formName].validate(async (valid) => {
                    if (valid) {
                        let postdata = {
                            "coupon_name": this.form.coupon_name,
                            "shop_id": this.form.shop_id,
                            "money": this.form.money,
                            "money_max": this.form.money_max,
                            "num": this.form.num,
                            "grant_num": this.form.grant_num,
                            "begin_time": this.form.begin_time,
                            "end_time": this.form.end_time,
                            "status": this.form.status
                        }
                        let res = await this.$zcy.addShop(postdata)
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
            onClose(){
                this.$emit('close')
            },
            handleCheckAllChange(val) {
                console.log('value777',val)
                this.goods_id = val ? this.allGoodsId : [];
                console.log("allcheck",this.goods_id)
                this.isIndeterminate = false
            },
            handleCheckedGoodsChange(value) {
                console.log('value',this.goods_id)
                let checkedCount = value.length;
                this.checkAll = checkedCount === this.goodslist.length;
                this.isIndeterminate = checkedCount > 0 && checkedCount < this.goodslist.length;
            },
            formatDataTime (value, formatter = 'yyyy-MM-dd HH:mm:ss') {
                if(!value) return '';
                const date = new Date(value);
                return formatter
                    .replace('yyyy', date.getFullYear())
                    .replace('MM', (date.getMonth() + 1) >= 10 ? (date.getMonth() + 1) : '0' + (date.getMonth() + 1))
                    .replace('dd', (date.getDate()) >= 10 ? (date.getDate()) : '0' + (date.getDate()))
                    .replace('HH', (date.getHours()) >= 10 ? (date.getHours()) : '0' + (date.getHours()))
                    .replace('mm', (date.getMinutes()) >= 10 ? (date.getMinutes()) : '0' + (date.getMinutes()))
                    .replace('ss', (date.getSeconds()) >= 10 ? (date.getSeconds()) : '0' + (date.getSeconds()));
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