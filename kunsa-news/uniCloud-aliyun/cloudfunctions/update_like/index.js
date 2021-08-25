'use strict';

// 获取 数据库的引用
const db = uniCloud.database()

// 获取 操作符
const dbCmd = db.command

exports.main = async (event, context) => {
	const {
		user_id,	// 用户id
		article_id	// 文章id
	} = event
	
	// 收藏文章
	const userinfo = await db.collection('user')
	.doc(user_id)
	.get()
	
	// 获取 文章id
	const article_id_ids = userinfo.data[0].article_likes_ids
	
	let dbCmdFuns = null
	
	// 判断 当前收藏文章id是否存在
	// includes() => 该方法返回一个布尔值，表示某个数组是否包含给定的值，与字符串的includes方法类似。该方法属于 ES7
	if (article_id_ids.includes(article_id)) {	// 存在就删除
		dbCmdFuns = dbCmd.pull(article_id)
	} else {	// 不存在就添加
		// 操作符： addToSet() => 向数组中添加值，如果数组中已存在该值，不执行任何操作。它只能在 group 阶段中使用。
		dbCmdFuns = dbCmd.addToSet(article_id)
	}
	
	// 更新字段
	await db.collection('user')
	.doc(user_id)
	.update({
		article_likes_ids: dbCmdFuns
	})
	
	console.log('event ==> ', event)
	
	//返回数据给客户端
	return {
		code: 200,
		msg: '收藏成功',
		data: userinfo.data[0]
	}
};
