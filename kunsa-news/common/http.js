// 封装请求云函数


export default function $http(options) {
	const {
		// 请求云函数
		url,
		// 传入数据
		data
	} = options
	
	// 指定用户传入数据
	const dataObj = {
		user_id: '608a5d47e4fb000001cfd0be',
		...data
	}
	
	return new Promise((reslove, reject) => {
		uniCloud.callFunction({
			name: url,
			data: dataObj
		}).then((res) => {	// 成功
			if (res.result.code === 200) {
				// 成功
				reslove(res.result)
			} else {
				
				// 失败
				reject(res.result)
			}
		}).catch((err) => {	// 失败
		
			reject(err)
		})
	})
}