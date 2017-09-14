
export default {
	appInfo:{
		name:'Lambda-程序员学习社区',
		descr:'成为更好的自己',
		descr2:'聚焦最前沿的技术资源分享',
		site:'www.lambda-study.com',
		version: 'v0.0.1',
		copyright: '©2016 powered by lambda',
		registerUri: 'http://www.lambda-study.com/signup',
		declare: '社区里的视频资源需要99元购买成为会员后才有权限下载观看；所有pdf书籍可以免费下载；每邀请一位好友注册并成为会员后，有10元现金奖励'
	},
	authorInfo: {
		name:'lambda',
		email:'liuchao@lambda-study.com',
		homepage: '',
		declare: ''
	},
	commentTail: '',
	apiDomain: 'http://www.lambda-study.com:9000/',
	qiniuImageUrl: 'http://7xs544.com1.z0.glb.clouddn.com/images/'
};

export const postCategory = {
	home: "home", 
	rank: "rank",
	news: "news",
	blink: "blink",
	question: "question",
	favorite: "favorite",
	answer: "answer",
	statistics: "statistics",
	class: "class",
	doc: "doc",
	video: "video",
	book: "book",
	ted: "ted",
	share: "share"
};

export const authData = {
	pubKey : "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCp0wHYbg/NOPO3nzMD3dndwS0MccuMeXCHgVlGOoYyFwLdS24Im2e7YyhB0wrUsyYf0/nhzCzBK8ZC9eCWqd0aHbdgOQT6CuFQBMjbyGYvlVYU2ZP7kG9Ft6YV6oc9ambuO7nPZh+bvXH0zDKfi02prknrScAKC0XhadTHT3Al0QIDAQAB",     //rsa加密公钥
	clientId: "5e171868-c750-4eea-ab90-2d70cd06969a",    //cnblogs官方申请clientId
	clientSecret: "aW-ZHLcOzjVe1vfqu3HcGLgTOtb_FRK3fUQxVCjJ_xxMbLz4ROgIm_5ai5bpnIN81m7WcrN6gzqUEXfe" //cnblogs官方申请clientSecret
};

export const pageSize = 10;

export const storageKey = {
	OFFLINE_POSTS: "OFFLINE_POSTS",
	USER_TOKEN: "USER_TOKEN"
};