<template>
	<!-- @change事件监听 swiper 组件滑动监听 -->
	<!-- :current 当前滑块下标 -->
	<swiper
	class="home-swiper"
	@change="change"
	:current="activeIndex"
	>
		<swiper-item
		class="swiper-item"
		v-for="(item, index) in tab"
		:key="index"
		>
			<!-- 内容 -->
			<list-item
			:list="listCatchData[index]"
			:load="load[index]"
			@loadmores="loadmores"
			></list-item>
		</swiper-item>
	</swiper>
</template>

<script>
	import listItem from './list-item.vue'
	export default {
		props: ['tab', 'activeIndex'],
		
		components: {
			listItem
		},
		
		name:"list",
		
		data() {
			return {
				// 列表数据
				list: [],
				
				// 缓存列表数据
				listCatchData: {},
				
				// 页面数据
				load: {},
				
				// 每页的数量
				pageSize: 10
			};
		},
		
		created() {
			// 获取列表数据
			// this.getList(this.activeIndex)
			
			// uni.$on() => 监听自定义事件
			uni.$on('update_article', () => {
				console.log(123)
				this.listCatchData = {}
				this.load = {}
				// 获取列表数据
				this.getList(this.activeIndex)
			})
		},
		
		methods: {
			// 轮播滑动监听事件
			change(e) {
				const {current} = e.detail;
				
				// console.log('轮播滑动监听事件 current ==> ', current)
				
				// 获取列表数据
				this.getList(current)
				
				this.$emit('change', current)
			},
			
			// 获取列表数据
			getList(current) {
				// console.log('当前列表 ', this.tab[current].name)
				// console.log('获取列表数据 current ==> ', current)
				
				if (!this.load[current]) {
					this.load[current] = {
						page: 1,
						loading: 'loading'
					}
				}
				
				this.$api.get_list({
					name: this.tab[current].name,
					page: this.load[current].page,	// 页数
					pageSize: this.pageSize	// 每一页有几个
				})
				.then(res => {
					console.log('获取列表数据 res = >', res)
					const {data} = res
					
					// 没有数据 底部显示“没有更多数据了”
					if (data.length === 0) {
						let oldList = {}
						oldList.loading = 'noMore'
						oldList.page = this.load[current].page
						this.$set(this.load, current, oldList)
						
						// 强制渲染页面
						this.$forceUpdate()
						
						return
					}
					
					let oldList = this.listCatchData[current] || []
					oldList.push(...data)
					
					// console.log('this.listCatchData[current] ==> ', this.listCatchData[current])
					
					// 懒加载
					this.$set(this.listCatchData, current, oldList)
				})
			},
			
			// 滚动到底部触发事件返回的函数
			loadmores() {
				// console.log('到底了 list')
				
				// 判断数据是否到底了 到了就返回掉
				if(this.load[this.activeIndex].loading === 'noMore') return
				
				this.load[this.activeIndex].page++
				
				this.getList(this.activeIndex)
			},
			
			
		},
		
		watch: {
			// 监听 导航栏数据
			tab(newVal) {
				// console.log('导航栏数据 newVal ==> ', newVal)
				if(newVal.length === 0) returns
				
				this.listCatchData = {}
				
				this.load = {}
				
				// 获取列表数据
				this.getList(this.activeIndex)
			}
		}
	}
</script>

<style lang="scss">
	page {
		height: 100%;
		display: flex;
	}
	
	.home-swiper {
		height: 100%;

		.swiper-item {
			height: 100%;
		}
	}
</style>
