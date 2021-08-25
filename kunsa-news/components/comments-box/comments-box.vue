<template>
	<view class="comments-box">
		<view class="comments-header">
			<view class="comments-header_logo">
				<image :src="comments.author.avatar" mode="aspectFill"></image>
			</view>
			<view class="comments-header_info">
				<view class="title" v-if="!comments.is_reply">
					{{ comments.author.author_name }}
				</view>
				<view class="title" v-else>
					{{ comments.author.author_name }}
					<text class="reply-text">回复</text>
					{{ comments.to }}
				</view>
				<view>
					{{ comments.create_time }}
				</view>
			</view>
		</view>
		<view class="comment-content">
			<view>
				{{ comments.comment_content }}
			</view>
			<view class="comment-info">
				<view
				class="comment-button"
				@click="commentsReply({comments, is_reply: reply})"
				>
					回复
				</view>
			</view>
			<view
			class="comment-reply"
			v-for="item in comments.replys"
			:key="item.comment_id"
			>
				<comments-box :reply="true" :comments="item" @reply="commentsReply"></comments-box>
			</view>
		</view>
	</view>
</template>

<script>
	import commentsBox from '@/components/comments-box/comments-box.vue'
	
	export default {
		name:"comments-box",
		
		components: {
			commentsBox
		},
		
		props: ['comments', 'reply'],
		
		data() {
			return {
				
			};
		},
		
		methods: {
			// 点击回复
			commentsReply(comment) {
				// console.log('点击回复 ==> ', comments)
				
				// 判断 区分 主回复(文章下单评论), 还是子回复(评论的回复)
				if (comment.is_reply) {
					// comment.comments.comment_id => 主回复id
					// comment.comments.reply_id => 子回复id
					comment.comments.reply_id = comment.comments.comment_id
					
					comment.comments.comment_id = this.comments.comment_id
				}
				
				this.$emit('reply', comment)
			}
		}
	}
</script>

<style lang="scss">
	.comments-box {
		margin: 15px 0;
		
		.comments-header {
			display: flex;
			
			.comments-header_logo {
				flex-shrink: 0;
				width: 30px;
				height: 30px;
				border-radius: 5px;
				overflow: hidden;
				
				image {
					width: 100%;
					height: 100%;
				}
			}
			
			.comments-header_info {
				display: flex;
				flex-direction: column;
				padding-left: 15px;
				font-size: 12px;
				color: #999;
				line-height: 1;
				
				.title {
					margin-bottom: 10px;
					font-size: 14px;
					color: #333;
					
					.reply-text {
						margin: 0px 10px;
						font-weight: bold;
						color: #000;
					}
				}
			}
		}
		
		.comment-content {
			margin-top: 10px;
			font-size: 14px;
			color: #000;
			
			.comment-info {
				margin-top: 15px;
				display: flex;
				
				.comment-button {
					padding: 2px 10px;
					font-size: 12px;
					color: #999;
					border-radius: 20px;
					border: 1px solid #ccc;
				}
			}
			
			.comment-reply {
				display: flex;
				margin: 15px 0;
				padding: 0 10px;
				border: 1px solid #eee;
			}
		}
	}
</style>
