<template>
	<view class="detail">
		<view class="detail-title">
			{{ formData.title }}
		</view>
		
		<view class="detail-header">
			<view class="detail-header_logo">
				<image :src="formData.author.avatar" mode="aspectFill"></image>
			</view>
			<view class="detail-header_content">
				<view class="detail-header_content-title">
					{{ formData.author.author_name }}
				</view>
				<view class="detail-header_content-info">
					<text>{{ formData.create_tiem }}</text>
					<text>{{ formData.browse_count }} 浏览</text>
					<text>{{ formData.thumbs_up_count }} 赞</text>
				</view>
			</view>
			<button class="detail-header_button" @click="follow(formData.author.id)">
				{{ formData.is_author_like ? '已关注' : '关注' }}
			</button>
		</view>
		
		<view class="detail-content">
			<view class="detail-html">
				<!-- <u-parse :content="formData.content" :noData="noData"></u-parse> -->
				内容
			</view>
			<view class="detail-comment">
				<view class="comment-title">
					最新评论
				</view>
				<view
				class="comment-content"
				v-for="(item, index) in commentsList"
				:key="item.comment_id"
				>
					<comments-box :comments="item" @reply="reply"></comments-box>
				</view>
			</view>
		</view>
		
		<view class="detail-bottom">
			<view class="detail-bottom_input" @click="openComment">
				<text>
					谈谈你的看法
				</text>
				<uni-icons type="compose" size="16" color="#f07373"></uni-icons>
			</view>
			<view class="detail-bottom_icons">
				<view class="detail-bottom_icons-box" @click="openComment">
					<uni-icons type="chat" size="22" color="#f07373"></uni-icons>
				</view>
				<view class="detail-bottom_icons-box" @click="likeTap(formData._id)">
					<uni-icons
					:type="formData.is_like ? 'heart-filled' : 'heart'"
					size="22"
					color="#f07373"
					></uni-icons>
				</view>
				<view class="detail-bottom_icons-box" @click="thumbeup(formData._id)">
					<uni-icons
					:type="formData.is_thumbs_up ? 'hand-thumbsup-filled' : 'hand-thumbsup'"
					size="22"
					color="#f07373"
					></uni-icons>
				</view>
			</view>
		</view>
		
		<uni-popup ref="popup" type="bottom" :maskClick="false">
			<view class="popup-wrap">
				<view class="popup-header">
					<view class="popup-header_item" @click="close">
						取消
					</view>
					<view class="popup-header_item" @click="submit">
						发布
					</view>
				</view>
				<view class="popup-content">
					<textarea
					class="popup-textarea"
					v-model="commentsValue"
					maxlength="200"
					fixed="true"
					placeholder="请输入评论内容"
					 />
					<view class="popup-count">
						{{ commentsValue.length }}/200
					</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	// 引入 将html转为uniapp标签
	import uParse from '@/components/gaoyia-parse/parse.vue'
	
	export default {
		components: {
			uParse
		},
		
		data() {
			return {
				// 文章数据
				formData: {},
				
				noData: '<p style="text-align:center;color:#666">详情加载中...</p>',
				
				// 评论框的值
				commentsValue: '',
				
				// 评论数据
				commentsList: [],
				
				// 回复数据
				replyFormData: {}
			}
		},
		
		onLoad(query) {
			// 获取 跳转页面 传送过来的值
			this.formData = JSON.parse(query.params)
			
			// 请求文章数据
			this.getDetail()
			
			// 获取评论
			this.getComments()
		},
		
		onReady() {
			
			
		},
		
		methods: {
			// 请求文章数据
			getDetail() {
				this.$api.get_detail({
					article_id: this.formData._id
				}).then(res => {
					console.log('请求文章数据 res ==> ', res)
					
					const {
						data
					} = res
					
					this.formData = data
				})
			},
			
			// 打开评论框
			openComment() {
				this.$refs.popup.open()
			},
			
			// 取消评论框
			close() {
				this.$refs.popup.close()
				
				this.commentsValue = ''
			},
			
			// 发布
			submit() {
				if (!this.commentsValue) {
					uni.showToast({
						title: "请输入评论",
						icon: "none"
					})
					return
				}
				
				// 提交评论
				this.setUpdateComment({content: this.commentsValue, ...this.replyFormData})
				
				this.$refs.popup.close()	// 关闭窗口
			},
			
			// 提交评论
			setUpdateComment(content) {
				const formdata = {
					article_id: this.formData._id,
					...content
				}
				
				uni.showLoading()
				
				this.$api.update_comment(formdata).then(res => {
					// console.log('提交评论 res ==> ', res)
					uni.hideLoading()
					uni.showToast({
						title:'评论发布成功'
					})
					
					// 获取评论
					this.getComments()
					
					this.commentsValue = ''
					this.replyFormData = {}
				})
			},
			
			// 获取评论
			getComments() {
				this.$api.get_comments({
					article_id: this.formData._id
				}).then(res => {
					console.log('获取评论 res ==> ', res)
					
					const {data} = res
					
					this.commentsList = data
				})
			},
			
			// 回复
			reply(e) {
				// 获取回复id
				this.replyFormData = {
					"comment_id": e.comments.comment_id,
					"is_reply": e.is_reply
				}
				
				// 判断当前回复是主回复(文章下单评论), 还是子回复(评论的回复)
				if (e.comments.reply_id) {
					this.replyFormData.reply_id = e.comments.reply_id
				}
				
				this.openComment()
			},
			
			// 关注
			follow(author_id) {
				// 设置关注
				this.setUpdateAuhtor(author_id)
			},
			
			// 设置关注
			setUpdateAuhtor(author_id) {
				uni.showLoading()
				this.$api.update_author({
					author_id
				}).then(res => {
					console.log('设置关注 res => ', res)
					
					uni.hideLoading()
					
					this.formData.is_author_like = !this.formData.is_author_like
					
					uni.showToast({
						title: this.formData.is_author_like ? '关注作者成功' : '取消关注作者',
						icon: 'none'
					})
				})
			},
			
			// 收藏
			likeTap(article_id) {
				// 设置收藏
				this.setUpdateLike(article_id)
			},
			
			// 设置收藏
			setUpdateLike(article_id) {
				uni.showLoading()
				this.$api.update_like({
					article_id
				}).then(res => {
					console.log('设置收藏 res => ', res)
					
					uni.hideLoading()
					
					this.formData.is_like = !this.formData.is_like
					
					console.log('this.formData ==> ', this.formData)
					
					// 自定义事件让 list.vue 监听
					uni.$emit('update_article')
					
					uni.showToast({
						title: this.formData.is_like ? '收藏成功' : '取消收藏',
						icon: 'none'
					})
				})
			},
			
			// 点赞
			thumbeup(article_id) {
				// 设置点赞
				this.setUpdateThumbs(article_id)
			},
			
			// 设置点赞
			setUpdateThumbs(article_id) {
				uni.showLoading()
				this.$api.update_thumbsup({
					article_id
				}).then(res => {
					console.log('设置点赞 res => ', res)
					
					uni.hideLoading()
					
					this.formData.is_thumbs_up = !this.formData.is_thumbs_up
					
					this.formData.thumbs_up_count++
					
					uni.showToast({
						title: this.formData.is_thumbs_up ? '点赞成功' : '取消点赞',
						icon: 'none'
					})
				})
			},
			
			// 打开评论
			openComment() {
				uni.navigateTo({
					url: '../detail-comments/detail-comments?id=' + this.formData._id
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		
	}
	
	.detail {
		padding: 15px 0;
		padding-bottom: 54px;
		
		.detail-title {
			padding: 0 15px;
			font-size: 18px;
			font-weight: bold;
			color: #333;
		}
		
		.detail-header {
			display: flex;
			align-items: center;
			margin-top: 10px;
			padding: 0 15px;
			
			.detail-header_logo {
				flex-shrink: 0;
				width: 40px;
				height: 40px;
				border-radius: 50%;
				overflow: hidden;
				
				image {
					width: 100%;
					height: 100%;
				}
			}
			
			.detail-header_content {
				width: 100%;
				padding-left: 10px;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				font-size: 12px;
				
				.detail-header_content-title {
					font-size: 14px;
					color: #333;
				}
				
				.detail-header_content-info {
					color: #999;
					
					text {
						margin-right: 10px;
					}
				}
			}
			
			.detail-header_button {
				flex-shrink: 0;
				height: 30px;
				font-size: 12px;
				color: #fff;
				background-color: #f07373;
			}
		}
		
		.detail-content {
			margin-top: 20px;
			min-height: 500px;
			
			.detail-html {
				padding: 0 15px;
			}
			
			.detail-comment {
				margin-top: 30px;
				
				.comment-title {
					padding: 10px 15px;
					font-size: 14px;
					color: #666;
					border-bottom: 1px #f5f5ff solid;
				}
				
				.comment-content {
					padding: 0 15px;
					border-top: 1px #eee solid;
				}
			}
		}
		
		.detail-bottom {
			position: fixed;
			bottom: 0;
			left: 0;
			display: flex;
			align-items: center;
			width: 100%;
			height: 44px;
			border-top: 1px solid #F07373;
			background-color: #fff;
			box-sizing: border-box;
			
			.detail-bottom_input {
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-left: 10px;
				padding: 0 10px;
				width: 100%;
				height: 30px;
				border: 1px solid #ddd;
				border-radius: 5px;
				
				text {
					font-size: 14px;
					color: #999;
				}
			}
			
			.detail-bottom_icons {
				display: flex;
				flex-shrink: 0;
				padding: 0 10px;
					
				.detail-bottom_icons-box {
					position: relative;
					display: flex;
					align-items: center;
					justify-content: center;
					width: 44px;
					height: 44px;
				}
			}
		}
		
		.popup-wrap {
			background-color: #fff;
			
			.popup-header {
				display: flex;
				justify-content: space-between;
				font-size: 14px;
				color: #666;
				border-bottom: 1px #f5f5f5 solid;
				
				.popup-header_item {
					height: 50px;
					line-height: 50px;
					padding: 0 15px;
				}
			}
			
			.popup-content {
				width: 100%;
				padding: 15px;
				box-sizing: border-box;
				
				.popup-textarea {
					width: 100%;
					height: 200px;
				}
				
				.popup-count {
					display: flex;
					justify-content: flex-end;
					font-size: 12px;
					color: #999;
				}
			}
		}
	}
</style>
