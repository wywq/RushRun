import jiuaiDebounce from "@/common/utils/jiuai-debounce/jiuai-debounce.js";

function preventReClick(key, callback) {
  jiuaiDebounce.canDoFunction({
    key, //基于此值判断是否可以操作，如两个方法传入了同样的key，则会混淆，建议传入调用此事件的方法名，简单好梳理
    time: 2000, //如果传入time字段，则为定时器后，自动解除锁定状态，单位（毫秒）
    success: () => {
      //成功中调用应该操作的方法，被锁定状态不会执行此代码块内的方法
      console.log("我被点击了");
      callback && callback();
    },
  });
}

module.exports = {
  preventReClick,
};
