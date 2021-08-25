import $http from "../http.js"

// 调用封装好的云函数进行请求

// 导航栏数据
export const get_label = (data) => {
	return $http({
		url: 'get_label',
		data
	})
}

// 列表数据
export const get_list = (data) => {
	return $http({
		url: 'get_list',
		data
	})
}

// 收藏
export const update_like = (data) => {
	return $http({
		url: 'update_like',
		data
	})
}

// 搜索
export const get_search = (data) => {
	return $http({
		url: 'get_search',
		data
	})
}

// 上传列表数据
export const update_label = (data) => {
	return $http({
		url: 'update_label',
		data
	})
}

// 文章数据
export const get_detail = (data) => {
	return $http({
		url: 'get_detail',
		data
	})
}

// 上传评论
export const update_comment = (data) => {
	return $http({
		url: 'update_comment',
		data
	})
}

// 获取评论
export const get_comments = (data) => {
	return $http({
		url: 'get_comments',
		data
	})
}

// 关注作者
export const update_author = (data) => {
	return $http({
		url: 'update_author',
		data
	})
}

// 点赞文章
export const update_thumbsup = (data) => {
	return $http({
		url: 'update_thumbsup',
		data
	})
}