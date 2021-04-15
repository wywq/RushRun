<template>
  <div>
    <el-card v-if="!isadd">
      <el-tabs v-model="type" type="card" @tab-click="getlist">
        <el-tab-pane label="爆款秒杀" name="1"></el-tab-pane>
        <!-- <el-tab-pane label="好货拼团" name="2"></el-tab-pane>
        <el-tab-pane label="天天折扣" name="3"></el-tab-pane>
        <el-tab-pane label="生鲜专区" name="4"></el-tab-pane> -->
      </el-tabs>
      <el-table :data="list" border style="width: 100%">
        <el-table-column prop="name" label="活动名称"> </el-table-column>
        <el-table-column prop="begin" label="开始时间" v-if="type == 1">
        </el-table-column>
        <el-table-column prop="end" label="结束时间" v-if="type == 1">
        </el-table-column>
        <!-- <el-table-column prop="status" label="状态" width="160px">
					<template slot-scope="scope">
						<el-switch :value="scope.row.status==1" @change="editStatus(scope.row.id)" active-text="开启" inactive-text="关闭">
						</el-switch>
					</template>
				</el-table-column> -->
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              @click="(id = scope.row.id), (isadd = true)"
              type="primary"
              size="mini"
              >编辑</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-card v-if="isadd">
      <el-button type="primary" size="small" @click="(isadd = false), (id = '')"
        >返回</el-button
      >
    </el-card>
    <el-card v-if="isadd">
      <activity-det :id="id" :type="type" @rels="(isadd = false), getlist()">
      </activity-det>
    </el-card>
  </div>
</template>

<script>
import upload from "@/components/upload.vue";
import activity_det from "./components/activity_det.vue";
export default {
  data() {
    return {
      list: [],
      id: "",
      type: "1",
      isadd: false,
    };
  },
  components: {
    upload,
    "activity-det": activity_det,
  },
  created() {
    this.getlist();
  },
  methods: {
    async getlist() {
      let res = await this.$zcy.getAllActivity({ type: this.type });
      if (res.status == 1) {
        this.list = res.data;
      }
    },
    async del(id) {
      let res = await this.$zcy.delLunbo({ id });
      if (res.status == 1) {
        this.$message.success("删除成功");
        this.getlist();
      }
    },
    //修改状态
    async editStatus(id) {
      let res = await this.$zcy.editStatus({
        id,
      });
      if (res.status == 1) {
        this.$message.success("修改成功");
        this.getlist();
      }
    },
  },
};
</script>

<style></style>
