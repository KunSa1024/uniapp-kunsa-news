<template>
	<view class="navbar">
		<view class="navbar-fixed">
			<!-- 状态栏 -->
			<view :style="{height: statusBarHeight + 'px'}"></view>
			
			<!-- 导航栏内容 -->
			<view
			class="navbar-content"
			:class="isSearch ? 'search' : ''"
			:style="{
			height: navBarHeight + 'px',
			width: windowWidth + 'px'
			}"
			@click.stop="openSearch"
			>
			
				<!-- 返回 -->
				<view
				class="navbar-content_search-icons"
				v-if="isSearch"
				@click="back"
				>
					<uni-icons
					type="back"
					size="22"
					color="#fff"
					></uni-icons>
				</view>
			
				<!-- 输入框 -->
				<view
				class="navbar-search"
				v-if="!isSearch"
				>
					<view class="navbar-search_icon">
						<uni-icons type="search" size="16" color="#999"></uni-icons>
					</view>
					<view class="navbar-search_text">
						uni-app、vue
					</view>
				</view>
				<!-- 在搜索页面显示的输入框 -->
				<view
				class="navbar-search"
				v-else="isSearch"
				>
					<input
					class="navbar-search_text"
					type="text"
					v-model="val"
					placeholder="请输入你要搜索的内容"
					@input="inputChange"
					/>
				</view>
				
				
			</view>
			
		</view>
		
		<view :style="{height: statusBarHeight + navBarHeight + 'px'}"></view>
	</view>
</template>

<script>
	export default {
		props: ['isSearch', 'value'],
		
		data() {
			return {
				// 状态栏高度
				statusBarHeight: 20,
				
				// 导航栏的高度
				navBarHeight: 45,
				
				// 屏幕宽度
				windowWidth: 375,
				
				// 输入框的值
				val: ''
			};
		},
		
		created() {
			// 获取手机系统信息
			const info = uni.getSystemInfoSync()
			// console.log('info ==> ', info)
			// 获取手机导航栏高度
			this.statusBarHeight = info.statusBarHeight
			// 获取屏幕宽度
			this.windowWidth = info.windowWidth
			
			
			// h5 app mp-alipay不支持微信的方法
			// #ifndef H5 || APP-PLUS || MP-ALIPAY
			// 获取胶囊位置,API getMenuButtonBoundingClientRect 只有在微信小程序运行的时候才会生效，H5端查看会报错
			
			// 获取 小程序胶囊位置
			const menuButtonInfo = uni.getMenuButtonBoundingClientRect()
			// console.log('menuButtonInfo ==> ', menuButtonInfo)	
			// 导航栏的高度 = （胶囊底部高度 - 状态栏的高度）+（胶囊顶部高度 - 状态栏内的高度）
			this.navBarHeight = (menuButtonInfo.bottom - info.statusBarHeight) + (menuButtonInfo.top - info.statusBarHeight)
			// 获取胶囊左边的距离,这是搜索框的宽度
			this.windowWidth = menuButtonInfo.left
			
			// #endif
		},
		
		methods: {
			// 跳转到 搜索页面
			openSearch() {
				
				// 判断当前页面是否是搜索页面 是就不执行跳转页面
				if (this.isSearch) return
				
				console.log('跳转到 搜索页面')
				// 跳转到 搜索页面
				uni.navigateTo({
					url: "/pages/home-search/home-search"
				})
			},
			
			// 输入框事件
			inputChange(e) {
				const {value} = e.detail
				
				// console.log('value ==> ', value)
				
				this.$emit('input', value)
			},
			
			// 返回
			back() {
				// uni.switchTab() => 跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面 
				uni.switchTab({
					url: '../../pages/tabber/index/index'
				})
			}
		},
		
		watch: {
			value(newVal) {
				this.val = newVal
			}
		}
	}
</script>

<style lang="scss">
	
	.navbar {
		.navbar-fixed {
			position: fixed;
			top: 0;
			left: 0;
			z-index: 99;
			width: 100%;
			background-color: $mk-base-color;

			.navbar-content {
				display: flex;
				justify-content: center;
				align-items: center;
				padding: 0 15px;
				height: 45px;
				box-sizing: border-box;
				
				&.search {
					padding-left: 0;
					
					.navbar-content_search-icons {
						margin-left: 10px;
						margin-right: 10px;
					}
					
					.navbar-search {
						border-radius: 5px;
						
						.navbar-search_text {
							width: 100%;
							color: #999999;
							font-size: 14px;
						}
					}
				}

				.navbar-search {
					display: flex;
					align-items: center;
					padding: 0 10px;
					width: 100%;
					height: 30px;
					border-radius: 30px;
					background-color: #fff;

					.navbar-search_icon {
						margin-right: 10px;
					}

					.navbar-search_text {
						width: 100%;
						color: #999999;
						font-size: 14px;
						
					}
				}
			}
	
		}
	
	}
</style>
