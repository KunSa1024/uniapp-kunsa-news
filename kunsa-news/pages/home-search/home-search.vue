<template>
	<view class="home">
		<!-- 搜索导航栏 -->
		<navbar
		:isSearch="true"
		@input="change"
		v-model="value"
		></navbar>
		
		<!-- 搜索历史 -->
		<view class="home-list">
			<view v-if="is_histroy" class="label-box">
				<view class="label-header">
					<text class="label-title">搜索历史</text>
					<text class="label-clear" @click="clear">清空</text>
				</view>
				
				<!-- 历史记录 -->
				<view
				v-if="historyLists.length > 0"
				class="laber-content"
				>
					<view
					class="label-content_item"
					v-for="(item, index) in historyLists"
					:key="index"
					@click="openHistroy(item)"
					>
						{{ item.name }}
					</view>
				</view>
				
				<!-- 没有搜索历史 -->
				<view
				v-else
				class="no-data"
				>
					没有搜索历史
				</view>
			</view>
			
			<!-- 搜索结果 -->
			<list-scroll
			v-else
			class="list-scroll"
			>
				<!-- 加载框 -->
				<uni-load-more
				v-if="loading"
				status="loading"
				iconType="snow"
				></uni-load-more>
				
				<view v-if="searchList.length > 0">
					<list-card
					mode="base"
					:item="item"
					v-for="item in searchList"
					:key="item._id"
					@click="setHistory"
					></list-card>
				</view>
				
				<view
				v-if="searchList.length === 0 && !loading"
				class="no-data"
				>
					没有搜索到相关数据
				</view>
				
			</list-scroll>
		</view>
	</view>
</template>

<script>
	// 引入 Vuex
	import { mapState } from 'vuex';
	
	export default {
		data() {
			return {
				// 搜索历史数据
				// historyList: [],
				
				// 搜索记录
				is_histroy: true,
				
				// 列表数据
				searchList: [],
				
				// 输入框内的值
				value: '',
				
				// 是否有搜索到结果
				loading: true
				
			}
		},
		
		computed: {
			...mapState(['historyLists'])
		},
		
		onLoad() {
			// 获取列表数据
			this.getSearch()
		},
		
		methods: {
			// 输入框传送过来的值
			change(value) {
				console.log('输入框传送过来的值 value => ', value)
				// this.value = value
				
				// 判断 value 是否有值
				if (!value) {
					clearTimeout(this.timer)
					this.mark = false
					// 获取列表数据
					this.getSearch(value)
					return
				}
				
				if (!this.mark) {
					this.mark = true
					
					clearTimeout(this.timer)
					
					this.timer = setTimeout(() => {
						this.mark = false
						// 获取列表数据
						this.getSearch(value)
					}, 1000)
				}
			},
			
			// 获取列表数据
			getSearch(value) {
				
				// 判断 value 是否有值
				if (!value) {
					this.searchList = []
					this.is_histroy = true
					return
				}
				
				this.is_histroy = false
				// this.loading = true
				
				this.$api.get_search({
					value
				})
				.then(res => {
					console.log('获取列表数据 res = >', res)
					const {data} = res
					
					this.searchList = data
					this.loading = false
				}).catch(() => {
					this.loading = true
				})
			},
			
			// 列表点击事件传送过来的值
			setHistory() {
				this.$store.dispatch('set_history', {
					name: this.value
				})
			},
			
			// 点击搜索历史关键字
			openHistroy(item) {
				this.value = item.name
				this.getSearch(this.value)
			},
			
			// 清空历史记录
			clear() {
				
				this.$store.dispatch('clearHistory')
				
				uni.showToast({
					title: '清空完成'
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		height: 100%;
		display: flex;
		background-color: #f5f5f5;
	}
	
	.home {
		display: flex;
		flex-direction: column;
		flex: 1;
		
		
		.label-box {
			background-color: #fff;
			margin-bottom: 10px;
			
			.label-header {
				display: flex;
				justify-content: space-between;
				font-size: 14px;
				color: #666;
				padding: 10px 15px;
				border-bottom: 1px solid #f5f5f5;
				
				.label-title {
					color: #F07373;
				}
				
				.label-clear {
					color: #30b33a;
					font-weight: bold;
				}
			}
			
			.laber-content {
				display: flex;
				flex-wrap: wrap;
				padding: 15px;
				padding-top: 0;
				
				.label-content_item {
					padding: 2px 10px;
					margin-top: 12px;
					margin-right: 10px;
					border-radius: 5px;
					border: 1px #666 solid;
					font-size: 14px;
					color: #666;
				}
			}
			
			.no-data {
				height: 200px;
				line-height: 200px;
				width: 100%;
				text-align: center;
				color: #666;
				font-size: 12px;
			}
		}
		
		.list-scroll {
			
			.no-data {
				height: 200px;
				line-height: 200px;
				width: 100%;
				text-align: center;
				color: #666;
				font-size: 12px;
			}
		}
	}
</style>
