'use strict';

// 获取数据的索引
const db = uniCloud.database()

// 获取操作符
const dbCmd = db.command

exports.main = async (event, context) => {
	
	const {
		user_id,	// 用户id
		author_id	// 作者id
	} = event
	
	// 获取用户信息
	const user = await db.collection('user').doc(user_id).get()
	// 获取 关注作者id
	const author_likes_ids = user.data[0].author_likes_ids
	
	// 判断 关注的作者id是否存在	存在 => 取消关注, 不存在 => 关注
	let author_ids = null
	let text = ''
	if (author_likes_ids.includes(author_id)) {
		author_ids = dbCmd.pull(author_id)
		text = '取消关注'
	} else {
		author_ids = dbCmd.addToSet(author_id)
		text = '关注成功'
	}
	
	// 更新 关注作者
	await db.collection('user').doc(user_id).update({
		// addToSet() => 向数组中添加值，如果数组中已存在该值，不执行任何操作。它只能在 group 阶段中使用。
		author_likes_ids: author_ids
	})
	
	//返回数据给客户端
	return {
		code: 200,
		msg: text
	}
};
