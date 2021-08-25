<template>
	<view class="icons" @click.stop="likeTap">
		<uni-icons
		:type="like ? 'heart-filled' : 'heart'"
		size="20"
		color="#f07373"
		></uni-icons>
	</view>
</template>

<script>
	export default {
		props: ['item'],
		
		name:"likes",
		
		data() {
			return {
				// 收藏状态
				like: false
			};
		},
		
		watch: {
			item(newVal) {
				this.like = this.item.is_like
			}
		},
		
		created() {
			this.like = this.item.is_like
		},
		
		methods: {
			// 点击收藏
			likeTap() {
				this.like = !this.like
				
				// 获取收藏状态
				this.updateLikes()
			},
			
			// 获取收藏状态
			updateLikes() {
				// console.log('文章id => ', this.item._id)
				// 显示 加载提示框
				uni.showLoading()
				
				this.$api.update_like({
					article_id: this.item._id
				}).then(res => {	// 成功
					// 隐藏 加载提示框
					uni.hideLoading()
					
					// 显示 提示框
					uni.showToast({
						title: this.like ? '收藏成功' : '取消收藏',
						icon: 'none'
					})
					
					console.log('收藏状态 res => ', res)
				}).catch(() => {	// 失败
					// 隐藏 加载提示框
					uni.hideLoading()
				})
			}
		}
	}
</script>

<style>
	.icons {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 20px;
		height: 20px;
		position: absolute;
		right: 0;
		top: 0;
	}
</style>
