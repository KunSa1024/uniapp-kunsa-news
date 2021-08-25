<template>
	<view class="home">
		<!-- 导航栏组件 -->
		<navbar></navbar>
		
		<!-- 导航栏 -->
		<tab
		:list="labelData"
		@tab="tab"
		:tabIndex="tabIndex"
		></tab>
		
		<view class="home-list">
			<list
			:tab="labelData"
			@change="change"
			:activeIndex="activeIndex"
			></list>
		</view>
	</view>
</template>

<script>
	// import tab from '../../../components/tab/tab.vue'
	
	export default {
		// components: {
		// 	tab
		// },
		data() {
			return {
				// 导航栏数据
				labelData: [],
				
				// 当前滑动下标
				tabIndex: 0,
				
				// 当前点击导航栏的下标
				activeIndex: 0
			}
		},
		onLoad() {
			// 获取导航栏数据
			this.getLabel()
			
			// uni.$on() => 监听自定义事件。事件可以由 uni.$emit 触发。回调函数会接收 uni.$emit 传递的参数。
			// 监听到 标签管理页面的自定义事件并触发
			uni.$on('labelChange', res => {
				// 初始化数据
				this.labelData = []
				this.tabIndex = 0
				this.activeIndex = 0
				
				// 获取导航栏数据
				this.getLabel()
			})
		},
		methods: {
			// 获取导航栏数据
			getLabel() {
				
				this.$api.get_label().then((res) => {
					// console.log('成功 获取导航栏数据 res ==> ', res)
					const {data} = res
					
					// 插入一条数据
					// unshift() => 向数组头部添加元素，支持传入单个元素或数组 
					data.unshift({
						name: '全部'
					})
					
					this.labelData = data
					
				}).catch((err) => {
					console.log('失败 获取导航栏数据 err ==> ', err)
				})
			},
			
			// 获取 点击导航栏传送过来的数据
			tab({data, index}) {
				// console.log('data => ', data)
				// console.log('点击导航栏传送过来的数据 index => ', index)
				this.activeIndex = index
			},
			
			// 获取当前滑动位置并赋值给对应的导航栏
			change(index) {
				// console.log('当前滑动位置 index ==> ', index)
				this.tabIndex = index
				
				this.activeIndex = index
			}
		}
	}
</script>

<style lang="scss" scoped>
	page {
		height: 100%;
		display: flex;
	}
	
	.home {
		width: 100%;
		display: flex;
		flex-direction: column;
		float: 1;
		overflow: hidden;
		
		.home-list {
			float: 1;
			height: 100%;
			box-sizing: border-box;
			
		}
	}
</style>
