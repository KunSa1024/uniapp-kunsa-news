'use strict';

const db = uniCloud.database()
const $ = db.command.aggregate

exports.main = async (event, context) => {
	const {
		user_id,
		article_id,
		pageSize = 10, // 每一页显示10条评论
		page = 1	// 当前是第几页
	} = event
	
	const list = await db.collection('article')
	.aggregate()
	.match({
		// 筛选文章id
		_id: article_id
	})
	// 拆分文档
	.unwind('$comments')
	.project({
		_id: 0,
		comments: 1
	})
	// 指定新的根节点
	.replaceRoot({
		newRoot: '$comments'
	})
	.skip(pageSize * (page - 1))
	.limit(pageSize)
	.end()
	
	console.log('event ==> ', event)
	
	//返回数据给客户端
	return {
		code: 200,
		msg: '评论数据请求成功',
		data: list.data
	}
};
