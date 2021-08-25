<template>
	<view class="label">
		
		<view class="label-box">
			<view class="label-header">
				<view class="label-title">
					我的标签
				</view>
				<view class="label-edit" @click="editLabel">
					{{is_edit ? '完成' : '编辑'}}
				</view>
			</view>
			
			<!-- 加载状态 -->
			<uni-load-more v-if="loading" status="loading" iconType="snow"></uni-load-more>
			
			<view v-if="!loading" class="label-content">
				<view
				class="label-content_item"
				v-for="(item, index) in labelList"
				:key="item._id"
				>
					{{ item.name }}
					
					<uni-icons
					class="icons-close"
					type="clear"
					size="20"
					color="red"
					v-show="is_edit"
					@click="del(index)"
					></uni-icons>
				</view>
				
				<view v-if="labelList.length === 0 && !loading" class="no-data">
					当前没有数据
				</view>
			</view>
		</view>
		
		<view class="label-box">
			<view class="label-header">
				<view class="label-title">
					推荐标签
				</view>
			</view>
			
			<!-- 加载状态 -->
			<uni-load-more v-if="loading" status="loading" iconType="snow"></uni-load-more>
			
			<view v-if="!loading" class="label-content">
				<view
				class="label-content_item"
				v-for="(item, index) in list"
				:key="item._id"
				@click="add(index)"
				>
					{{ item.name }}
				</view>
				
				<view v-if="list.length === 0 && !loading" class="no-data">
					当前没有数据
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 是否显示删除按钮
				is_edit: false,
				
				// 我的标签数据
				labelList: [],
				
				// 推荐标签数据
				list: [],
				
				// 加载状态
				loading: true
			}
		},
		
		onLoad() {
			// 获取列表数据
			this.getLabel()
		},
		
		methods: {
			// 点击编辑
			editLabel() {
				if (this.is_edit) {
					this.is_edit = false
					
					// 设置列表数据
					this.setUpDateLabel(this.labelList)
				} else {
					this.is_edit = true
					
				}
			},
			
			// 获取列表数据
			getLabel() {
				this.loading = true
				
				this.$api.get_label({
					type: 'all'
				}).then((res) => {
					console.log('获取列表数据 res ==> ', res)
					
					this.loading = false
					
					const {data} = res
					this.labelList = data.filter(item => item.current)
					
					this.list = data.filter(item => !item.current)
				})
			},
			
			// 删除列表
			del(index) {
				// 判断 现在是否是编辑
				if (!this.is_edit) return
				
				// 添加
				this.list.push(this.labelList[index])
				
				// 删除
				this.labelList.splice(index, 1)
			},
			
			// 添加列表
			add(index) {
				// 判断 现在是否是编辑
				if (!this.is_edit) return
				
				// 添加
				this.labelList.push(this.list[index])
				
				// 删除
				this.list.splice(index, 1)
			},
			
			// 设置列表数据
			setUpDateLabel(label) {
				let newArrIds = []
				
				label.forEach(item => {
					newArrIds.push(item._id)
				})
				
				uni.showLoading()
				
				this.$api.update_label({
					label: newArrIds
				}).then(res => {
					console.log('设置列表数据 res ==> ', res)
					
					// 加载框
					uni.hideLoading()
					uni.showToast({
						title: '更新成功',
						icon: 'none'
					})
					
					// uni.$emit() => 触发自定义事件，附加的参数会传递给事件监听器。
					// 通知首页触发事件
					uni.$emit('labelChange')
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #f5f5f5;
	}
	
	.label {
		
		.label-box {
			background-color: #fff;
			margin-bottom: 10px;
			
			.label-header {
				display: flex;
				justify-content: space-between;
				padding: 10px 15px;
				font-size: 14px;
				color: #666;
				border-bottom: 1px #f5f5f5 solid;
				
				.label-title {
					
				}
				
				.label-edit {
					color: #30b33a;
					font-weight: bold;
				}
			}
			
			.label-content {
				display: flex;
				flex-wrap: wrap;
				padding: 15px;
				padding-top: 0px;
				
				.label-content_item {
					position: relative;
					padding: 2px 5px;
					margin-top: 12px;
					margin-right: 10px;
					border-right: 10px;
					border-radius: 5px;
					border: 1px #666 solid;
					font-size: 14px;
					color: #666;
					
					.icons-close {
						position: absolute;
						right: -8px;
						top: -8px;
						background-color: #fff;
						border-radius: 50%;
					}
				}
				
				.no-data {
					width: 100%;
					text-align: center;
					padding: 50px 0;
					color: #999;
					font-size: 14px;
				}
			}
		}
	}
</style>
