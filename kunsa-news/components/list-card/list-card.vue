<template>
	<!-- 卡片试图 -->
	<view @click="open">
		<!-- 基础卡片 -->
		<view
		v-if="item.mode === 'base'"
		class="listcard">
			<view class="listcard-image">
				<image :src="item.cover[0]" mode="aspectFill"></image>
			</view>
			<view class="listcard-content">
				<view class="listcard-content_title">
					<text>
						{{ item.title }}
					</text>
					<likes :item="item"></likes>
				</view>
				<view class="listcard-content_des">
					<view class="listcard-content_des-label">
						<view class="listcard-content_des-label-item">
							{{ item.classify }}
						</view>
					</view>
					<view class="listcard-content_des-browse">
						{{ item.browse_count }}浏览
					</view>
				</view>
			</view>
		</view>
		
		
		<!-- 多图模式 -->
		<view
		 v-if="item.mode === 'column'"
		 class="listcard mode-column"
		 >
			<view class="listcard-content">
				<view class="listcard-content_title">
					<text>
						{{ item.title }}
					</text>
					<likes :item="item"></likes>
				</view>
				
				<view class="listcard-image">
					<view
					class="listcard-image_item"
					v-for="(items, index) in 3"
					:key="index"
					>
						<image
						:src="item.cover[index]"
						mode="aspectFill"
						></image>
					</view>
				</view>
				
				<view class="listcard-content_des">
					<view class="listcard-content_des-label">
						<view class="listcard-content_des-label-item">
							{{ item.classify }}
						</view>
					</view>
					<view class="listcard-content_des-browse">
						{{ item.browse_count }}浏览
					</view>
				</view>
			</view>
		</view>
		
		
		<!-- 大图模式 -->
		<view
		v-if="item.mode === 'image'"
		class="listcard mode-image"
		>
			<view class="listcard-image">
				<image :src="item.cover[0]" mode="aspectFill"></image>
			</view>
			
			<view class="listcard-content">
				<view class="listcard-content_title">
					<text>
						{{ item.title }}
					</text>
					<likes :item="item"></likes>
				</view>
				
				<view class="listcard-content_des">
					<view class="listcard-content_des-label">
						<view class="listcard-content_des-label-item">
							{{ item.classify }}
						</view>
					</view>
					<view class="listcard-content_des-browse">
						{{ item.browse_count }}浏览
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: ['item'],
		name:"list-card",
		data() {
			return {
				
			};
		},
		
		methods: {
			open() {
				const item = this.item
				
				this.$emit('click', item)
				
				const params = {
					_id: item._id,
					title: item.title,
					create_time: item.create_time,
					thumbs_up_count: item.thumbs_up_count,
					browse_count: item.browse_count,
					author: item.author
				}
				
				console.log(params)
				
				// 跳转到详情页面
				uni.navigateTo({
					url: "/pages/home-datail/home-datail?params=" + JSON.stringify(params)
					
				})
			}
		}
	}
</script>

<style lang="scss">
	.listcard {
		display: flex;
		padding: 10px;
		margin: 10px;
		border-radius: 5px;
		box-shadow: 0 0 5px 1px rgba($color: #000000, $alpha: 0.1);
		box-sizing: border-box;
		
		.listcard-image {
			flex-shrink: 0;
			width: 60px;
			height: 60px;
			border-radius: 5px;
			overflow: hidden;
			
			image {
				width: 100%;
				height: 100%;
			}
		}
		
		.listcard-content {
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			padding-left: 10px;
			width: 100%;
			
			.listcard-content_title {
				padding-right: 30px;
				font-size: 14px;
				color: #333333;
				font-weight: 400;
				line-height: 1.2;
				position: relative;
				
				text {
					display: -webkit-box;
					// 溢出显示 ...
					-webkit-box-orient: vertical;
					// 显示两行
					-webkit-line-clamp: 2;
					// 隐藏
					overflow: hidden;
				}
			}
			
			.listcard-content_des {
				display: flex;
				justify-content: space-between;
				font-size: 12px;
				
				.listcard-content_des-label {
					display: flex;
					
					.listcard-content_des-label-item {
						padding: 0 5px;
						margin-right: 5px;
						border-radius: 15px;
						border: 1px solid $mk-base-color;
					}
				}
				
				.listcard-content_des-browse {
					color: #999999;
					line-height: 1.5;
				}
			}
		}
	
		// 多图模式
		&.mode-column {
			
			.listcard-content {
				width: 100%;
				padding-left: 0;
				
				.listcard-content_title {
					position: relative;
				}
				
				.listcard-image {
					display: flex;
					margin-top: 10px;
					width: 100%;
					height: 70px;
					
					.listcard-image_item {
						margin-left: 10px;
						width: 100%;
						border-radius: 5px;
						overflow: hidden;
						
						// 父元素第一个
						&:first-child {
							margin-left: 0;
						}
						
						image {
							width: 100%;
							height: 100%;
						}
					}
				}
			}
		}
		
		
		// 大图模式
		&.mode-image {
			flex-direction: column;
			
			.listcard-image {
				width: 100%;
				height: 100px;
			}
			
			.listcard-content {
				padding-left: 0;
				margin-top: 10px;
				
				.listcard-content_title {
					position: relative;
				}
				
				.listcard-content_des {
					display: flex;
					align-items: center;
					margin-top: 10px;
				}
			}
		}
		
		.listcard-content_des {
			margin-top: 10px;
		}
		
	}
</style>
