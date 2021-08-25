<template>
	<!-- 内容 -->
	<list-scroll class="list-scroll" @loadmore="loadmore">
		<!-- 切换卡片 -->
		<list-card
		v-for="(item, index) in list"
		:key="index"
		:item="item"
		/>
		
		<!-- 加载框 数据大于6 就显示加载框 -->
		<uni-load-more
		v-if="list.length === 0 || list.length > 6"
		iconType="snow"
		:status="load.loading"
		></uni-load-more>
	</list-scroll>
</template>

<script>
	export default {
		props:{
			list:{
				type:Array,
				default(){
					return[]
				}
			},
			load:{
				type:Object,
				default(){
					return {
						loading:'loading'
					}
				}
			}
		},
		methods: {
			// 滚动到底部触发事件返回的函数  传给父级
			loadmore() {
				// console.log('到底了 item')
				this.$emit('loadmores')
			}
		}
	}
	
</script>

<style lang="scss">
			
	.list-scroll {
		height: 100%;
	}
</style>
