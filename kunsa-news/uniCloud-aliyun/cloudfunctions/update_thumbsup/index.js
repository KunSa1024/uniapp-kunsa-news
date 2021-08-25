'use strict';

// 获取数据库引用
const db = uniCloud.database()

// 获取操作符
const dbCmd = db.command

exports.main = async (event, context) => {
	const {
		user_id,
		article_id
	} = event
	
	// 获取 用户数据
	const user = await db.collection('user').doc(user_id).get()
	
	// 获取 用户点赞的文章id
	const thumbs_up_article_ids = user.data[0].thumbs_up_article_ids
	
	// 判断 文章id是否存在	存在 => 取消赞, 不存在 => 点赞
	let thumbs_ids = null
	if (thumbs_up_article_ids.includes(article_id)) {
		return {
			code:200,
			msg:'已点过赞了！'
		}
	} else {
		thumbs_ids = dbCmd.addToSet(article_id)
	}
	
	// 更新 用户点赞数据
	await db.collection('user').doc(user_id).update({
		thumbs_up_article_ids: thumbs_ids
	})
	
	// 更新 文章点赞数据
	await db.collection('article').doc(article_id).update({
		// inc() 用于指示字段自增某个值
		thumbs_up_count: dbCmd.inc(1)
	})
	
	//返回数据给客户端
	return {
		code: 200,
		msg: '点赞成功！！！'
	}
};
