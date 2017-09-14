
export default  {
	home: {
		list: "topics",
		detail: "topics/<%=id%>",
		comments: "api/blogs/<%=blogger%>/posts/<%=id%>/comments?pageIndex=<%=pageIndex%>&pageSize=<%=pageSize%>",
		comment_add: "api/blogs/<%=blogger%>/posts/<%=id%>/comments",
	},
	doc: {
		list: "articles",
		detail: "articles/<%=id%>",
	},
	video: {
		list: "articles",
	},
	book: {
		list: "articles",
	},
	ted: {
		list: "articles",
	},
	rank: {
		list:"api/blogposts/@picked?pageIndex=<%=pageIndex%>&pageSize=<%=pageSize%>",
		detail: "api/blogposts/<%=id%>/body",
		comments: "api/blogs/<%=blogger%>/posts/<%=id%>/comments?pageIndex=<%=pageIndex%>&pageSize=<%=pageSize%>",
		comment_add: "api/blogs/<%=blogger%>/posts/<%id%>/comments",
	},
	news: {
		list:"api/NewsItems?pageIndex=<%=pageIndex%>&pageSize=<%=pageSize%>",
		detail: "api/newsitems/<%=id%>/body",
		comments: "api/news/<%=id%>/comments?pageIndex=<%=pageIndex%>&pageSize=<%=pageSize%>",
		comment_add: "api/news/<%=id%>/comments",
	},
	question: {
		list:"api/questions/@sitehome?pageIndex=<%=pageIndex%>&pageSize=<%=pageSize%>",
		detail: "api/questions/<%=id%>",
		add:"api/questions",
		remove: "api/questions/<%=id%>",
		status: 'api/questions/<%=id%>?userId=<%=uid%>',
		comments: "api/questions/<%=id%>/answers",
		comment_add:"api/questions/<%=id%>/answers",
	},
	answer: {
		comments:  "api/questions/answers/<%=id%>/comments",
		comment_add: "api/questions/<%=id%>/answers/<%=id%>/comments"
	},
	blink: {
		list:"api/statuses/@all?pageIndex=<%=pageIndex%>&pageSize=<%=pageSize%>",
		detail: "api/statuses/<%=id%>",
		add:"api/statuses",
		remove: "api/statuses/<%=id%>",
		comments: "api/statuses/<%=id%>/comments",
		comment_add: "api/statuses/<%=id%>/comments",
	},
	favorite:{
		list:"api/Bookmarks?pageIndex=<%=pageIndex%>&pageSize=<%=pageSize%>",
		add: "api/Bookmarks",
		status:"api/Bookmarks?url=<%=url%>",
		remove:"api/bookmarks?url=<%=url%>",
		topic_collect: "topics/<%=id%>/collect",
		post_collect: "articles/<%=id%>/collect",
	},
	user: {
		info: "users/me",
		auth: "auth/local/signin",
		blink: "articles",
		question: "articles",
		favorite: "articles",
		home: "api/blogs/<%=blogger%>/posts?pageIndex=<%=pageIndex%>",
		statistics: ""
	},
	author: {
		detail: "users/<%=user_id%>",
		posts: "api/blogs/<%=blogger%>/posts?pageIndex=<%=pageIndex%>"
	},
	search: {
		blog: "api/ZzkDocuments/1?keyWords=<%=key%>&pageIndex=<%=pageIndex%>&pageSize=10",
		news: "api/ZzkDocuments/2?keyWords=<%=key%>&pageIndex=<%=pageIndex%>",
		kb: "api/ZzkDocuments/4?keyWords=<%=key%>&pageIndex=<%=pageIndex%>",
	}
}