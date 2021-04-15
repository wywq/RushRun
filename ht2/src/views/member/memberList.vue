<template>
  <div class="memberList">
    <!-- 搜索的表单 -->
    <el-form :inline="true" :model="searchform" class="searchform">
      <el-form-item label="会员账号:">
        <el-input v-model="searchform.phone" placeholder="关键字"></el-input>
      </el-form-item>
      <el-form-item label="会员ID:">
        <el-input v-model="searchform.searchid" placeholder="ID"></el-input>
      </el-form-item>
      <el-form-item label="真实姓名:">
        <el-input
          v-model="searchform.searchname"
          placeholder="真实姓名"
        ></el-input>
      </el-form-item>

      <!-- 		<el-form-item label="推荐人:">
				<el-input v-model="searchform.referrer" placeholder="推荐人"></el-input>
			</el-form-item> -->
      <el-form-item label="等级:">
        <el-select
          v-model="searchform.value"
          placeholder="请选择"
          style="width:150px"
        >
          <el-option key="" label="全部" :value="qb"></el-option>

          <el-option
            :label="item.level_name"
            :value="item.level_id"
            v-for="(item, index) in dengji"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="达人等级:">
        <el-select
          v-model="searchform.sou"
          placeholder="请选择"
          style="width:150px"
        >
          <el-option key="" label="全部" :value="qd"></el-option>

          <el-option
            :label="item.name"
            :value="item.id"
            v-for="(item, index) in darenlevel"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSearchClick">搜索</el-button>
        <el-button type="primary" @click="addMerberClick()">添加会员</el-button>
      </el-form-item>
    </el-form>

    <!-- 表格 -->
    <!--会员管理用户信息 -->
    <el-table
      :data="tabletwoData"
      :header-cell-style="{ background: '#F9F9F9', color: '#606266' }"
      border
      style="margin-top:10px"
    >
      <el-table-column
        label="会员ID"
        prop="code"
        :resizable="false"
        align="center"
      >
      </el-table-column>
      <el-table-column
        label="会员账号"
        prop="mobile"
        :resizable="false"
        align="center"
        width="160px"
      >
      </el-table-column>
      <!-- <el-table-column label="可解绑次数" prop="jiebangcishu" :resizable="false" align="center" width="160px">
			</el-table-column> -->
      <el-table-column
        label="推荐人手机号"
        prop="tuijianphone"
        :resizable="false"
        align="center"
        width="160px"
      >
      </el-table-column>
      <el-table-column
        label="直推人数"
        prop="tuijiannum"
        :resizable="false"
        align="center"
        width="80px"
      >
      </el-table-column>
      <el-table-column
        label="是否为合伙人"
        prop="is_hehuoren"
        :resizable="false"
        align="center"
        width="160px"
      >
        <template slot-scope="scope">
          <div v-if="scope.row.is_hehuoren == 0">否</div>
          <div v-if="scope.row.is_hehuoren == 1">是</div>
        </template>
      </el-table-column>
      <el-table-column
        label="姓名"
        prop="realname"
        :resizable="false"
        align="center"
      >
      </el-table-column>
      <el-table-column label="是否冻结" prop="is_lock" align="center">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.is_lock"
            @change="changeSwitch(scope.row)"
            :on-value="scope.row.is_lock == true"
            :off-value="scope.row.is_lock == false"
          >
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column
        label="是否解绑"
        prop="is_jiebang"
        :resizable="false"
        align="center"
      >
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.is_jiebang"
            @change="changeSwitch1(scope.row)"
            :on-value="scope.row.is_jiebang == true"
            :off-value="scope.row.is_jiebang == false"
          >
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column
        label="等级"
        prop="dengji.level_name"
        :resizable="false"
        align="center"
        width="180px"
      >
      </el-table-column>
      <el-table-column
        label="达人等级"
        prop="daren_name"
        :resizable="false"
        align="center"
        width="180px"
      >
      </el-table-column>
      <el-table-column
        label="拥有卷轴数量"
        prop="juanzhounum"
        :resizable="false"
        align="center"
        width="180px"
      >
      </el-table-column>
      <el-table-column
        label="添加时间"
        prop="addtime"
        :resizable="false"
        align="center"
        width="160px"
      >
      </el-table-column>
      <el-table-column
        label="操作"
        :resizable="false"
        align="center"
        width="450px"
      >
        <template slot-scope="scope">
          <el-button
            @click="handleClick(scope.row)"
            type="primary"
            size="small"
            style="margin-left:10px"
            >查看财务日志</el-button
          >
          <el-button type="primary" size="small" @click="modifyClick(scope.row)"
            >编辑</el-button
          >
          <el-button
            type="primary"
            size="small"
            @click="juanzhouClick(scope.row)"
            >会员卷轴详情</el-button
          >
          <el-button
            type="primary"
            size="small"
            @click="shimingClick(scope.row)"
            v-if="scope.row.is_renzhen == 0"
            >实名认证</el-button
          >
          <!-- <el-button type="primary" size="small" @click="tianjiaClick(scope.row)">升级为合伙人</el-button> -->
        </template>
      </el-table-column>
    </el-table>

    <!-- 添加会员弹窗 -->
    <div class="mark" v-if="is_show == 1">
      <div class="mark-content">
        <div class="hytj" v-if="sjhjy == 0">会员添加</div>
        <div class="hytj" v-if="sjhjy == 1">会员修改</div>

        <!-- 提交的表单 -->
        <el-form class="submitform" :model="submitform">
          <table
            style="width:90%;height:80px; border:1px dashed #000;background:#F9F9F9"
            rules="all"
          >
            <tr style="background: #EEEEEE">
              <td style="text-align: center;">名称</td>
              <td style="text-align: center;">内容</td>
            </tr>
            <tr>
              <td style="text-align: center;">会员账号:</td>
              <td class="td2">
                <el-input
                  v-model="submitform.telphone"
                  size="small"
                  clearable
                  disabled
                ></el-input>
              </td>
            </tr>
            <tr>
              <td style="text-align: center;">登录密码:</td>
              <td class="td2">
                <el-input
                  v-model="submitform.password"
                  size="small"
                  clearable
                ></el-input>
              </td>
            </tr>
            <tr v-if="zfmm">
              <td style="text-align: center;">支付密码:</td>
              <td class="td2">
                <el-input
                  v-model="submitform.jypassword"
                  size="small"
                  clearable
                ></el-input>
              </td>
            </tr>
            <tr v-if="xg">
              <td style="text-align: center;">支付密码:</td>
              <td class="td2">
                <el-input
                  v-model="submitform.jypassword"
                  size="small"
                  clearable
                  placeholder="如果为空默认不修改支付密码"
                ></el-input>
              </td>
            </tr>
            <tr v-if="zfmm">
              <td style="text-align: center;">推荐人手机号:</td>
              <td class="td2">
                <el-input
                  v-model="submitform.referrername"
                  size="small"
                  clearable
                ></el-input>
              </td>
            </tr>
            <tr v-if="zfmm">
              <td style="text-align: center;">真实姓名:</td>
              <td class="td2">
                <el-input
                  v-model="submitform.zsname"
                  size="small"
                  clearable
                ></el-input>
              </td>
            </tr>
            <tr v-if="zfmm">
              <td style="text-align: center;">身份证号码:</td>
              <td class="td2">
                <el-input
                  v-model="submitform.idcard"
                  size="small"
                  clearable
                ></el-input>
              </td>
            </tr>
            <!-- <tr>
              <td style="text-align: center;">可解绑次数:</td>
              <td class="td2">
                <el-input
                  v-model="submitform.jiebangcishu"
                  size="small"
                  clearable
                ></el-input>
              </td>
            </tr> -->
            <!-- <tr v-if="xg">
							<td style="text-align: center;">是否冻结:</td>
							<td class="td2">
								<el-radio v-model="submitform.resource" :label="1">是</el-radio>
								<el-radio v-model="submitform.resource" :label="0">否</el-radio>
							</td>
						</tr>
						<tr v-if="xg">
							<td style="text-align: center;">是否解绑:</td>
							<td class="td2">
								<el-radio v-model="submitform.is_jiebang" :label="0">否</el-radio>
								<el-radio v-model="submitform.is_jiebang" :label="1">是</el-radio>
							</td>
						</tr>
						<tr v-if="xg">
							<td style="text-align: center;">是否实名认证:</td>
							<td class="td2">
								<el-radio v-model="submitform.is_shiming" :label="0">否</el-radio>
								<el-radio v-model="submitform.is_shiming" :label="1">是</el-radio>
							</td>
						</tr> -->
            <!-- <tr v-if="xg">
							<td class="td1">等级:</td>
							<td class="td2">
								<el-select v-model="submitform.region" placeholder="请选择" size="small">
									<el-option :label="item.level_name" :value="item.level_id" v-for="(item,index) in dengji"></el-option>
								</el-select>
							</td>
						</tr> -->
            <tr>
              <td></td>
              <td class="td2">
                <el-button type="primary" @click="onSubmitClick" size="small"
                  >提交</el-button
                >
                <el-button type="primary" @click="clone" size="small"
                  >返回</el-button
                >
              </td>
            </tr>
          </table>
        </el-form>
      </div>
    </div>
    <div class="mark" v-show="show">
      <div class="mark-content">
        <div class="hytj">升级为合伙人</div>
        <!-- 提交的表单 -->
        <el-form class="submitform" :model="submitform">
          <table
            style="width:90%;height:80px; border:1px dashed #000;background:#F9F9F9"
            rules="all"
          >
            <tr style="background: #EEEEEE">
              <td style="text-align: center;">名称</td>
              <td style="text-align: center;">内容</td>
            </tr>
            <tr>
              <td class="td3" style="text-align: center;">搜索指向</td>
              <td class="td2">
                <el-form-item label="搜索城市:" style="margin-top:20px;">
                  <el-input
                    v-model="searchform.city"
                    placeholder="关键字"
                  ></el-input>
                  <el-button type="primary" @click="onSearchClick1"
                    >搜索</el-button
                  >
                </el-form-item>
              </td>
            </tr>
            <tr>
              <td class="td3" style="text-align: center;">城市</td>
              <td class="td2">
                <div style="margin: 15px 0;"></div>
                <el-checkbox-group
                  v-model="checkedCities"
                  @change="handleCheckedCitiesChange"
                >
                  <el-checkbox
                    v-for="(item, index) in cities"
                    :label="item.chengshi_id"
                    :key="index"
                    >{{ item.chengshi_name }}</el-checkbox
                  >
                </el-checkbox-group>
              </td>
            </tr>
            <tr>
              <td></td>
              <td class="td2">
                <el-button type="primary" @click="onSubmitClick1" size="small"
                  >提交</el-button
                >
                <el-button type="primary" @click="clone1" size="small"
                  >返回</el-button
                >
              </td>
            </tr>
          </table>
        </el-form>
      </div>
    </div>
    <!-- 实名认证 -->
    <div class="mark" v-show="shiming">
      <div class="mark-content">
        <div class="hytj">实名认证</div>
        <!-- 提交的表单 -->
        <el-form class="submitform" :model="submitform">
          <table
            style="width:90%;height:80px; border:1px dashed #000;background:#F9F9F9"
            rules="all"
          >
            <tr style="background: #EEEEEE">
              <td style="text-align: center;">名称</td>
              <td style="text-align: center;">内容</td>
            </tr>
            <tr>
              <td style="text-align: center;">
                真实姓名<span style="color:red">*</span>:
              </td>
              <td class="td2">
                <el-input
                  v-model="submitform.ming"
                  size="small"
                  clearable
                ></el-input>
              </td>
            </tr>
            <tr>
              <td style="text-align: center;">
                身份证号<span style="color:red">*</span>:
              </td>
              <td class="td2">
                <el-input
                  v-model="submitform.hao"
                  size="small"
                  clearable
                ></el-input>
              </td>
            </tr>
            <tr>
              <td style="text-align: center;">
                支付宝账号<span style="color:red">*</span>:
              </td>
              <td class="td2">
                <el-input
                  v-model="submitform.zfb_hao"
                  size="small"
                  clearable
                ></el-input>
              </td>
            </tr>
            <tr>
              <td class="td3" style="text-align: center;">银行名称</td>
              <td class="td2">
                <el-select
                  v-model="searchform.bank_name"
                  placeholder="请选择"
                  style="width:150px"
                >
                  <el-option
                    v-for="item in options"
                    :key="item.name"
                    :label="item.name"
                    :value="item.name"
                  >
                  </el-option>
                </el-select>
              </td>
            </tr>
            <tr>
              <td style="text-align: center;">银行卡号:</td>
              <td class="td2">
                <el-input
                  v-model="submitform.yh_num"
                  size="small"
                  clearable
                ></el-input>
              </td>
            </tr>
            <tr>
              <td></td>
              <td class="td2">
                <el-button type="primary" @click="onSubmitClickS" size="small"
                  >提交</el-button
                >
                <el-button type="primary" @click="clone1" size="small"
                  >返回</el-button
                >
              </td>
            </tr>
          </table>
        </el-form>
      </div>
    </div>
    <!-- 会员卷轴详情 -->
    <div class="mark" v-show="isShow">
      <div class="mark-content">
        <div class="hytj">会员卷轴详情</div>
        <el-table
          :data="tableoneData"
          :header-cell-style="{ background: '#F9F9F9', color: '#606266' }"
          border
          style="margin-top:10px"
        >
          <el-table-column
            label="卷轴ID"
            prop="juanzhou_id"
            :resizable="false"
            align="center"
          >
          </el-table-column>
          <el-table-column
            label="卷轴等级"
            prop="juanzhou_level"
            :resizable="false"
            align="center"
            width="160px"
          >
          </el-table-column>
          <el-table-column
            label="卷轴开始时间"
            prop="start_time"
            :resizable="false"
            align="center"
            width="160px"
          >
          </el-table-column>
          <el-table-column
            label="状态"
            prop="status"
            :resizable="false"
            align="center"
            width="160px"
          >
            <template slot-scope="scope">
              <div v-if="scope.row.status == 0">未进行</div>
              <div v-if="scope.row.status == 1">进行中</div>
              <div v-if="scope.row.status == 2">已完成</div>
            </template>
          </el-table-column>
          <el-table-column
            label="已返还金币"
            prop="yifanhuan"
            :resizable="false"
            align="center"
          >
          </el-table-column>
          <el-table-column
            label="当天剩余未完成"
            prop="dangtianshengyu"
            :resizable="false"
            align="center"
          >
          </el-table-column>
          <el-table-column
            label="当天是否获得任务锁仓时间"
            prop="today_finish"
            :resizable="false"
            align="center"
          >
            <template slot-scope="scope" prop="today_finish">
              <div v-if="scope.row.today_finish == 0">否</div>
              <div v-if="scope.row.today_finish == 1">是</div>
            </template>
          </el-table-column>
          <el-table-column
            label="锁仓时间(天)"
            prop="suocang_num"
            :resizable="false"
            align="center"
            width="180px"
          >
          </el-table-column>
          <el-table-column
            label="最近一次任务日期(试炼卷轴)"
            prop="relese_date"
            :resizable="false"
            align="center"
            width="180px"
          >
          </el-table-column>
          <el-table-column
            label="近日完成秒数(试炼卷轴)"
            prop="today_time"
            :resizable="false"
            align="center"
            width="180px"
          >
          </el-table-column>
          <el-table-column
            label="卷轴等级名称"
            prop="juanzhou_name"
            :resizable="false"
            align="center"
            width="160px"
          >
          </el-table-column>
        </el-table>
        <el-button
          type="primary"
          @click="clone1"
          size="small"
          style="margin:30px 0 0 48%;"
          >返回</el-button
        >
      </div>
    </div>
    <!-- 分页 -->
    <div class="block">
      <el-pagination
        @current-change="handleCurrentChange"
        layout="total, prev, pager, next, jumper"
        :total="shujuData.num"
        :page-size="15"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import util from "@/utils/utils.js";
import service from "@/service/service.js";
export default {
  name: "memberList",
  data() {
    return {
      checkAll: false,
      checkedCities: [],
      isIndeterminate: true,
      is_show: 0,
      dengji: [],
      xg: false,
      zfmm: true,
      member_id: "",
      // 提交表单
      submitform: {
        telphone: "",
        password: "",
        jypassword: "",
        referrername: "",
        zsname: "",
        idcard: "",
        resource: "",
        is_jiebang: "",
        region: "",
        price: "",
        // jiebangcishu: "",
        is_shiming: "",
        ming: "",
        hao: "",
        zfb_hao: "",
        yh_num: ""
      },
      // 搜索表单
      searchform: {
        phone: "",
        searchid: "",
        referrer: "",
        searchname: "",
        value: "",
        city: "",
        sou: "",
        bank_name: ""
      },
      tabletwoData: [],
      qb: "",
      shujuData: "",
      selectGoods: [],
      value: "",
      sjhjy: 0,
      id: "",
      show: false,
      cities: [],
      qxls: [],
      qd: "",
      darenlevel: [],
      isShow: false,
      tableoneData: [],
      shiming: false,
      qbank: "",
      options: []
    };
  },
  async created() {
    const bankAll = await service.bankAll();
    if (bankAll.data.status == 1) {
      this.options = bankAll.data.data;
    }
    this.memeberList(1);
    // 会员等级
    const dengji = await service.dengji({});
    if (dengji.data.status == 1) {
      this.dengji = dengji.data.data;
    }
    // 达人等级
    const darenDengji = await service.darenDengji();
    if (darenDengji.data.status == 1) {
      this.darenlevel = darenDengji.data.data;
    }
  },
  methods: {
    async changeSwitch(row) {
      const jiedong = await service.jiedong({
        user_id: row.user_id,
        is_lock: row.is_lock
      });
      if (jiedong.data.status == 1) {
        this.$message.success(jiedong.data.info);
      } else {
        this.$message.error(jiedong.data.info);
      }
    },
    async changeSwitch1(row) {
      const jiebang = await service.jiebang({
        user_id: row.user_id,
        is_bangding: row.is_jiebang
      });
      if (jiebang.data.status == 1) {
        this.$message.success(jiebang.data.info);
      } else {
        this.$message.error(jiebang.data.info);
      }
    },
    // 转换成时间对象
    getDate(tm) {
      let date = new Date(tm);
      let year = date.getFullYear();
      let month =
        date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1;
      let time = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
      let hours =
        date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
      let fen =
        date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
      let miao =
        date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
      let tt =
        year + "-" + month + "-" + time + " " + hours + ":" + fen + ":" + miao;
      return tt;
    },
    // 合伙人提交
    async onSubmitClick1() {
      console.log(this.checkedCities);
      const partnershengji = await service.partnershengji({
        user_id: this.id1,
        chengshi_id: this.qxls.join(",")
      });
      if (partnershengji.data.status == 1) {
        this.$message.success(partnershengji.data.info);
        this.show = false;

        this.memeberList(1);
      } else {
        this.$message.error(partnershengji.data.info);
      }
    },
    // 会员卷轴详情
    async juanzhouClick(row) {
      this.isShow = true;
      this.id1 = row.user_id;
      const huiyuanJuanzhou = await service.huiyuanJuanzhou({
        user_id: this.id1
      });
      if (huiyuanJuanzhou.data.status == 1) {
        const tableoneData = huiyuanJuanzhou.data.data.map((item, index) => {
          item.start_time = this.getDate(item.start_time * 1000);
          return item;
        });
        this.tableoneData = tableoneData;
      }
    },
    // 合伙人关闭
    clone1() {
      this.show = false;
      this.isShow = false;
      this.shiming = false;
    },
    handleCheckedCitiesChange(value) {
      this.qxls = value;
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.cities.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.cities.length;
      console.log(this.qxls.join(","));
    },
    // 点击升级为合伙人按钮
    async tianjiaClick(row) {
      this.id1 = row.user_id;
      this.show = true;
      const hehuorenlist = await service.hehuorenlist({
        name: "",
        user_id: row.user_id
      });
      if (hehuorenlist.data.status == 1) {
        this.cities = hehuorenlist.data.data;

        let stock_id = [];
        let qxglxx = [];
        for (const item of hehuorenlist.data.data) {
          if (item.status == 1) {
            stock_id.push(item.chengshi_id);
          }
          qxglxx.push(item.chengshi_id);
        }
        this.checkedCities = stock_id;
        this.qxglxx = qxglxx;
        this.cities = hehuorenlist.data.data;
        this.user_id = row.user_id;
      }
    },
    // 点击搜索城市
    async onSearchClick1() {
      const hehuorenlist = await service.hehuorenlist({
        name: this.searchform.city,
        user_id: this.id1
      });
      if (hehuorenlist.data.status == 1) {
        this.cities = hehuorenlist.data.data;
      }
    },
    // 实名认证提交
    async onSubmitClickS() {
      const shimingrenzheng = await service.shimingrenzheng({
        user_id: this.ids,
        idcard: this.submitform.hao,
        realname: this.submitform.ming,
        zhifubao: this.submitform.zfb_hao,
        bank_card: this.submitform.yh_num,
        bank_name: this.searchform.bank_name
      });
      if (shimingrenzheng.data.status == 1) {
        this.shiming = false;
        this.$message.success(shimingrenzheng.data.info);
        this.memeberList(1);
      } else {
        this.$message.error(shimingrenzheng.data.info);
      }
    },
    // 会员信息列表
    async memeberList(page) {
      const memeberList = await service.memeberList({
        page: page,
        phone: this.searchform.phone,
        user_id: this.searchform.searchid,
        name: this.searchform.searchname,
        level: this.searchform.value,
        daren: this.searchform.sou
      });
      if (memeberList.data.status == 1) {
        this.$message.success(memeberList.data.info);
        const tabletwoData = memeberList.data.data.list.map((item, index) => {
          item.addtime = this.getDate(item.reg_time * 1000);
          return item;
        });

        this.tabletwoData = tabletwoData;
        this.shujuData = memeberList.data.data;
      } else {
        this.tabletwoData = [];
        this.$message.error(memeberList.data.info);
      }
    },

    // 搜索表单
    async onSearchClick() {
      this.memeberList(1);
    },
    // 查看财务日志
    handleClick(row) {
      console.log(row);
      this.$router.push({
        path: "/financialLog",
        query: {
          phone: row.phone
        }
      });
    },
    // 添加会员弹窗
    addMerberClick() {
      this.is_show = 1;
      //   this.submitform.jiebangcishu = "";
    },
    // 返回会员弹窗
    clone() {
      this.is_show = 0;
      (this.xg = false), (this.zfmm = true), (this.member_id = "");
      this.submitform.telphone = "";
      this.submitform.password = "";
      this.submitform.jypassword = "";
      this.submitform.referrername = "";
      this.submitform.zsname = "";
      this.submitform.idcard = "";
      this.submitform.resource = "";
      (this.submitform.region = ""), (this.sjhjy = 0);
    },
    async onSubmitClick() {
      if (this.submitform.telphone == "") {
        this.$message.error("请填写会员账号");
        return;
      }
      if (this.submitform.password == "") {
        this.$message.error("请填写登录密码");
        return;
      }
      if (this.submitform.jypassword == "") {
        this.$message.error("请填写支付密码");
        return;
      }
      if (this.submitform.referrername == "") {
        this.$message.error("请填写推荐人账号");
        return;
      }
      const addMember = await service.addMember({
        user_id: this.member_id,
        mobile: this.submitform.telphone,
        password: this.submitform.password,
        paypwd: this.submitform.jypassword,
        phone: this.submitform.referrername,
        name: this.submitform.zsname,
        idcard: this.submitform.idcard,
        is_lock: this.submitform.resource,
        level: this.submitform.region,
        is_jiebang: this.submitform.is_jiebang,
        // jiebangcishu: this.submitform.jiebangcishu,
        is_shiming: this.submitform.is_shiming
      });
      if (addMember.data.status == 1) {
        this.$message.success("添加成功");
        this.memeberList();
        this.is_show = 0;
        this.xg = false;
        this.zfmm = true;
        this.member_id = "";
        this.submitform.telphone = "";
        this.submitform.password = "";
        this.submitform.jypassword = "";
        this.submitform.referrername = "";
        this.submitform.zsname = "";
        this.submitform.idcard = "";
        this.submitform.resource = "";
        this.submitform.region = "";
        this.submitform.is_hehuo = "";
        // this.submitform.jiebangcishu = "";
        this.submitform.is_shiming = "";
      } else {
        this.$message.error(addMember.data.info);
      }
    },
    // 实名弹出
    shimingClick(row) {
      this.shiming = true;
      this.ids = row.user_id;
      this.submitform.hao = "";
      this.submitform.ming = "";
      this.submitform.zfb_hao = "";
      this.submitform.yh_num = "";
      this.searchform.bank_name = "";
    },
    // 编辑
    modifyClick(row) {
      this.is_show = 1;
      this.xg = true;
      this.zfmm = false;
      this.submitform.telphone = row.mobile;
      this.submitform.password = row.pwd;
      // this.submitform.jypassword = row.paypwd
      this.submitform.referrername = row.phone;
      this.submitform.zsname = row.realname;
      this.submitform.idcard = row.idcard;
      this.submitform.resource = row.is_lock;
      this.submitform.region = row.level;
      this.member_id = row.user_id;
      //   this.submitform.jiebangcishu = row.jiebangcishu;
      this.submitform.is_jiebang = Number(row.is_jiebang);
      this.submitform.is_shiming = Number(row.is_shiming);
      console.log(963, row.is_shiming);
      this.sjhjy = 1;
    },
    // 分页
    handleCurrentChange(val) {
      this.memeberList(val);
    }
  },
  mounted() {}
};
</script>

<style scoped>
.memberList {
  position: relative;
  width: 100%;
  height: 100%;
}

.searchform .el-input {
  margin: 0 5px;
  width: 150px;
  vertical-align: top;
}

.demo-ruleForm .el-input {
  margin: 0 5px;
  width: 150px;
  vertical-align: top;
}

/* 遮罩 */
.mark {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
  padding-left: -20px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.mark-content {
  width: 70%;
  height: 80%;
  background: #f0f2f5;
  overflow: auto;
}

.hytj {
  color: #666666;
  padding: 15px 0;
  text-align: center;
  border-bottom: 1px solid #d7d7d7;
  font-size: 28px;
}

/* 添加会员表单 */
.submitform {
  margin: 15px 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.submitform .el-input {
  margin-right: 10px;
  width: 270px;
  float: left;
  display: flex;
  align-items: center;
  height: 100%;
}

tr {
  height: 50px;
  width: 100%;
  border: 1px lightgray dashed;
}

.td1 {
  text-align: right;
  padding-right: 10px;
}

.td2 {
  padding-left: 10px;
}

.block {
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
