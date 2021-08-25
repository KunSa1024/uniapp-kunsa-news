'use strict';

// 获取数据库引用
const db = uniCloud.database()

// 获取操作符
const $ = db.command.aggregate

exports.main = async (event, context) => {
	
	const {
		user_id,
		article_id
	} = event
	
	// 获取用户数据
	let user =  await db.collection('user').doc(user_id).get()
	// 获取用户id
	user = user.data[0]
	 
	// 获取文章数据
	let list = await db.collection('article')
	.aggregate()
	.addFields({
		// 是否关注作者
		is_author_like: $.in(['$author.id', user.author_likes_ids]),
		// 是否收藏文章
		is_like: $.in(['$_id', user.article_likes_ids]),
		// 是否点赞
		is_thumbs_up: $.in(['$_id', user.thumbs_up_article_ids])
	})
	.match({
		// 筛选当前文章id
		_id: article_id
	})
	.project({
		// 保存评论
		coments: 0
	})
	.end()
	
	//返回数据给客户端
	return {
		code: 200,
		msg: '数据请求成功',
		data: list.data[0]
	}
};
