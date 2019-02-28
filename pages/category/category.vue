<template>
	<view>
		<text>这个是分类页面</text>
		<view class="uni-grid-9 uni-common-mt">
			<view @click="toList(item,index)" class="uni-grid-9-item" hover-class="uni-grid-9-item-hover" v-for="(item,index) in grids" :key="index" :class="index % 3 === 2 ? 'no-border-right' : ''">
				<image class="uni-grid-9-image" :src="item"></image>
				<text class="uni-grid-9-text">{{names[index]}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				grids: ["../../static/c1.png", "../../static/c2.png", "../../static/c3.png",
					"../../static/c4.png", "../../static/c5.png", "../../static/c6.png",
					"../../static/c7.png", "../../static/c8.png", "../../static/c9.png"
				],
				names: ['最新', '传单派发', '家教', '服务员', '家政', '小时工', '单车维护', '地推活动', '其他']
			};
		},
		methods:{
			toList (item,index) {
				uni.navigateTo({
					url: `../../pages/list/list?id=${index}&&name=${this.names[index]}`
				})
			}
		}
	}
</script>

<style>

</style>
