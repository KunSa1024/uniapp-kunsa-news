// 批量导出文件(查找当前路径下的 .js 文件)
const requireApi = require.context(
	// api 目录的相对路径
	'.',
	// 是否查询子目录
	false,
	// 查询文件的一个后缀
	/.js$/
)

let module = {}

requireApi.keys().forEach((key, index) => {
	// 查到自己就返回掉
	if (key === './index.js') return
	
	// console.log('key ==> ', key)
	
	// 将找到的文件存储到 module 里面
	Object.assign(module, requireApi(key))
})

export default module