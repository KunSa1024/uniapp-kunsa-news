<template>
	<view class="tab">
		<scroll-view
		class="tab-scroll"
		scroll-x="true"
		>
			<view class="tab-scroll_box">
				<view
				v-for="(item, index) in list"
				:key="index"
				class="tab-scroll_item"
				@click="clickTab(item, index)"
				:class="{active:activeIndex === index}"
				>
					{{ item.name }}
				</view>
			</view>
		</scroll-view>
		
		<view class="tab-icons" @click="open">
			<uni-icons
			type="gear"
			size="26"
			color="#666666"
			></uni-icons>
		</view>
	</view>
</template>

<script>
	export default {
		name:"tab",
		
		props: ['list', 'tabIndex'],
		
		data() {
			return {
				// 高亮导航栏下标
				activeIndex: 0
			};
		},
		
		methods: {
			// 切换导航栏
			clickTab(item, index) {
				
				this.activeIndex = index
				
				this.$emit('tab', {
					data: item,
					index: index
				})
			},
			
			// 标签设置
			open() {
				uni.navigateTo({
					url: "/pages/home-label/home-label"
				})
			}
		},
		
		// watch 可以监听 data 和 props 值的变化
		watch: {
			tabIndex(newVal) {
				this.activeIndex = newVal
			}
		}
	}
</script>

<style lang="scss">
	.tab {
		display: flex;
		width: 100%;
		background-color: #ffffff;
		border-bottom: 1px solid #f5f5f5;
		box-sizing: border-box;
		
		.tab-scroll {
			float: 1;
			overflow: hidden;
			box-sizing: border-box;
			
			.tab-scroll_box {
				display: flex;
				align-items: center;
				flex-wrap: nowrap;
				height: 45px;
				box-sizing: border-box;
				
				.tab-scroll_item {
					flex-shrink: 0;
					padding: 0 10px;
					color: #333333;
					font-size: 14px;
					
					&.active {
						color: $mk-base-color;
					}
				}
			}
		}
		
		.tab-icons {
			display: flex;
			justify-content: center;
			align-items: center;
			width: 45px;
			position: relative;
			
			&::after {
				content: '';
				position: absolute;
				top: 12px;
				bottom: 12px;
				left: 0;
				width: 1px;
				background-color: #dddddd;
			}
		}
	}
</style>
