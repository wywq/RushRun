import fetch from "@/api/fetch";
export const Information = {
  //资讯首页
  getNewsList(data) {
    return fetch.post("/News/getNewsList", { ...data }, false, "");
  },
  //资讯详情
  getNewsDetails(data) {
    return fetch.post("/News/getNewsDetails", { ...data }, false, "");
  },
  //点赞
  thumbsUp(data) {
    return fetch.post("/News/thumbsUp", { ...data }, false, "");
  },
  //分享
  share(data) {
    return fetch.post("/News/share", { ...data }, false, "");
  },
};
