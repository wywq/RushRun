<template>
  <div>
    <el-card>
      <el-table :data="list" border style="width: 100%">
        <el-table-column prop="name" label="参数位置">
          <template slot-scope="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="value" label="参数">
          <template slot-scope="scope">
            <el-input
              v-model="scope.row.value"
              @change="updateXian(scope.row.id, scope.row.key, scope.row.value)"
            ></el-input>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import upload from "@/components/upload.vue";
export default {
  data() {
    return {
      list: [],
      id: "",
      dialogVisible: false,
      img: "",
    };
  },
  components: {
    upload,
  },
  created() {
    this.getlist();
  },
  methods: {
    async getlist() {
      let res = await this.$zcy.configsAll();
      if (res.status == 1) {
        this.list = res.data;
      }
    },
    async updateXian(id, key, value) {
      if (key == "" || value == "") {
        this.$message.error("请完善信息");
        return;
      }
      let res = await this.$zcy.updateConfig({
        value: value,
        key: key,
        id: id,
      });
      if (res.status == 1) {
        this.$message.success(res.info);
        this.getlist();
      }
    },
  },
};
</script>

<style></style>
