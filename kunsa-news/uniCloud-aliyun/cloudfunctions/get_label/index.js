'use strict';

// 1. 获取数据库引用
const db = uniCloud.database()

// 获取操作符
const $ = db.command.aggregate

exports.main = async (event, context) => {
	
	const {
		user_id,
		type
	} = event
	
	let matchObj = {}
	
	if (type !== 'all') {
		matchObj = {
			current: true
		}
	}
	
	// 获取用户id
	let userinfo = await db.collection('user').doc(user_id).get()
	userinfo = userinfo.data[0]
	
	// 获取 label 表的数据
	// let label = await db.collection('label').get()
	let label = await db.collection('label')
	.aggregate()
	.addFields({
		// ifNull() => 计算给定的表达式，如果表达式结果为 null、undefined 或者不存在，那么返回一个替代值；否则返回原值。参数形式为：[表达式,替代值] 
		current: $.in(['$_id', $.ifNull([userinfo.label_ids, []])])
	})
	.match(matchObj)
	.end()
	
	//返回数据给客户端
	return {
		code: 200,
		msg: '导航栏数据请求成功',
		data: label.data
	}
};
