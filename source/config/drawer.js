
import { postCategory } from './index';

export default [{
	text: "首页",
	icon: "ios-home-outline",
	action: "refresh",
	flag: postCategory.home
},{
	text: "精选文章",
	//icon: "ios-analytics-outline",
	icon: "ios-color-filter-outline",
	action: "refresh",
	flag: postCategory.doc
},
{
	text: "视频教程",
	//icon: "ios-color-filter-outline",
	//icon: "ios-analytics-outline",
	icon: "ios-videocam-outline",
	action: "refresh",
	flag: postCategory.video
},
{
	text: "PDF书籍",
	icon: "ios-book-outline",
	action: "refresh",
	flag: postCategory.book
},
{
	text: "实战",
	//icon: "ios-download-outline",
	icon: "ios-cloud-outline",
	action: "push",
	flag: postCategory.class
},
// {
// 	text: "个人中心",
//   	icon: "ios-color-palette-outline",
//  	action: "push",
//  	flag: "user"
//  },
 ];

// {
// 	text: "冒泡", --  闪存
// 	icon: "ios-color-palette-outline",
// 	action: "refresh",
// 	flag: postCategory.blink
// },{
// 	text: "L问",
// 	icon: "ios-document-outline",
// 	action: "refresh",
// 	flag: postCategory.question
// },{
// 	text: "离线",
// 	icon: "ios-download-outline",
// 	action: "push",
// 	flag:"offline"
// }
