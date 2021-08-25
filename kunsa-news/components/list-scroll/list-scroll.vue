<template>
	<view class="scrll">
		<!-- @scrolltolower 事件 =》 滚动到底部和最右部触发 -->
		<scroll-view class="list-scroll" scroll-y="true" @scrolltolower="loadmore">
			<view>
				<slot></slot>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		name:"list-scroll",
		data() {
			return {
				
			};
		},
		
		methods: {
			loadmore() {
				
				this.$emit('loadmore')
			}
		}
	}
</script>

<style lang="scss">
	.scrll {
		float: 1;
		overflow: hidden;
		box-sizing: border-box;
		
		.list-scroll {
			height: 100%;
			display: flex;
			flex-direction: column;
		}
	}
</style>
