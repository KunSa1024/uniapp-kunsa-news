'use strict';

// 1. 获取数据库的引用
const db = uniCloud.database()

// 获取 聚合字段
const $ = db.command.aggregate

exports.main = async (event, context) => {
	
	// 接受传送过来的值
	const {
		user_id,	// 用户id
		value	// 搜索值
	} = event
	
	
	// 获取 用户id
	const userinfo = await db.collection('user').doc(user_id).get()
	
	// 获取 用户收藏id
	const article_likes_ids = userinfo.data[0].article_likes_ids
	
	
	// 聚合: 更精细化的去处理数据 求和、分组、指定那些字段
	
	// 1. 获取数据库
	const list = await db.collection('article')
	// 2. 获取数据库集合的聚合操作实例 
	.aggregate()
	// 8. 聚合
	.addFields({
		// 追加一个字段
		// 当前文章的收藏状态
		is_like: $.in(['$_id', article_likes_ids])
	})
	// 4. 把指定的字段传递给下一个流水线，指定的字段可以是某个已经存在的字段，也可以是计算出来的新字段。 （修改当前字段）（字段 => 属性）
	.project({
		content: 0	// 把 content 的值设置为 0
	})
	// 筛选数据
	.match({
		title: new RegExp(value)
	})
	// 5. 标志聚合操作定义完成，发起实际聚合操作(聚合完成)
	.end()
	
	
	//返回数据给客户端
	return {
		code: 200,
		msg: '搜索结果获取成功',
		data: list.data
	}
};
