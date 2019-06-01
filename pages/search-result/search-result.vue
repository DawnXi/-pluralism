<template>
	<view>
		<view>这个是搜索结果页面</view>
		<!--筛选组件-->
		<myFilter></myFilter>
		<!--列表组件-->
		<List></List>
		<view>搜索关键字为{{this.keyWord}}</view>
	</view>
</template>

<script>
	import List from "@/components/list"
	import myFilter from "@/components/filter/filter"
	export default {
		data() {
			return {
				keyWord: ''
			};
		},
		components:{
			List,
			myFilter
		},
		onLoad(e) {
			console.log(e)
			this.keyWord = e.keyword
			// 调用兼职搜索接口
		}
	}
</script>

<style lang="less">

</style>
