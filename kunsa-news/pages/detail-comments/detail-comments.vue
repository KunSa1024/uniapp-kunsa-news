<template>
	<view>
		<view
		class="comments-content"
		v-for="item in commentsList"
		:key="item.comment_id"
		>
			<comments-box :comments="item"></comments-box>
		</view>
		
		<!-- 加载框 -->
		<uni-load-more
		v-if="commentsList.length === 0 || commentsList.length > 5"
		iconType="snow"
		:status="loading"
		></uni-load-more>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 用户id
				article_id: '',
				
				// 评论数据
				commentsList: [],
				
				// 当前页数
				page: 1,
				
				// 当前评论数量
				pageSize: 5,
				
				// 加载框显示状态
				loading: 'loading'
			}
		},
		
		onLoad(query) {
			// query => 页面跳转过来传递的参数
			console.log('query ==> ', query)
			
			this.article_id = query.id
			
			// 获取评论数据
			this.getComments()
		},
		
		// onReachBottom() => 页面上拉触底事件的处理函数 
		onReachBottom() {
			// 判断 数据是否全部请求完 请求完不执行后面代码
			if (this.loading = 'noMore') return
			
			// 每次触底 页数加1
			this.page++
			
			// 获取评论数据
			this.getComments()
		},
		
		methods: {
			// 获取评论数据
			getComments() {
				console.log('this.article_id => ', this.article_id)
				this.$api.get_comments({
					article_id: this.article_id,
					page: this.page,
					pageSize: this.pageSize
				}).then(res => {
					console.log('获取评论 res ==> ', res)
					
					const {
						data
					} = res
					
					// 判断data有没有数据
					if (data.length === 0) {
						this.loading = 'noMore'
						return
					}
					
					// 对象复制
					let oldFormData = JSON.parse(JSON.stringify(this.commentsList))
					// 获取数据
					oldFormData.push(...data)
					
					this.commentsList = oldFormData
				})
			}
			
			
		}
	}
</script>

<style lang="scss" scoped>
	.comments-content {
		padding: 0px 15px;
	}
</style>
