<template>
  <div style="padding: 20px;">
    <!-- 表格 -->
	<el-radio-group v-model="reverse">
	      <el-radio :label="true">倒序</el-radio>
	      <el-radio :label="false">正序</el-radio>
	    </el-radio-group>
	<div style="overflow: auto;height: 85vh;">
		<el-timeline :reverse="reverse" style="margin: 40px;">
		    <el-timeline-item
		      v-for="(activity, index) in list"
		      :key="index"
		      :timestamp="activity.time">
		      <h6>{{activity.status}}</h6>
					<div>{{activity.context}}</div>
		    </el-timeline-item>
		 </el-timeline>
	</div>
      
  </div>
</template>
<script>
export default {
  props:['order_id'],
  data() {
    return {
      //评论id
      id: "",
	   reverse: true,
      list: [],
      showReplyDialog: false,
    };
  },
  created() {
    this.getlist();
  },
  methods: {
    //
    async getlist() {
		
      let postdata = {
	  order_id:this.order_id
      };
      let res = await this.$zcy.logisticsView(postdata);
      console.log("comment", res);
      if (res.status == 1) {
        this.list = res.data.data;
		if(res.data.message != 'ok')
		{
			this.$message.error(res.data.message)
		}
		console.log(res.data.message,'123')
      }
    },
    refresh() {
      this.getlist();
    },
    //关闭弹窗
    replyDialogClose() {
      this.showReplyDialog = false;
      this.getlist();
    },
  },
};
</script>

<style lang="scss">
.el-form-item {
  margin-bottom: 10px;
}
.el-row {
  font-size: 14px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  text-align: left;
  padding-left: 10px;
  border-radius: 4px;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.goods-pic {
  width: 40px;
  height: 40px;
}
.display-flex {
  display: flex;
}
</style>
