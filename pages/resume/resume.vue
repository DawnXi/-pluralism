<template>
	<view class="main">
		<view>简历编辑页面</view>
		<view class="header">
			<img class="avatar" src="https://picsum.photos/500/500?image=399" alt="">
			<text class="add">点击添加头像</text>
		</view>
		<view class="form">
			<view class="item">
				<view class="list-title">姓名</view>
				<input class="uni-input" placeholder="请输入真实姓名" />
			</view>
			<view class="item">
				<view class="list-title">性别</view>
				<view class="radio-group">
					<label class="radio"><radio value="male" checked="true" />男</label>
					<label class="radio"><radio value="female" />女</label>
				</view>
			</view>
			<view class="item">
				<view class="list-title">出生年月</view>
			</view>
			<view class="item">
				<view class="list-title">省份</view>
			</view>
			<view class="item">
				<view class="list-title">电话</view>
				<input class="uni-input" placeholder="请输入联系电话" />
			</view>
			<view class="item">
				<view class="list-title">邮箱</view>
				<input class="uni-input" placeholder="请输入联系邮箱" />
			</view>
			<view class="item">
				<view class="list-title">自我介绍</view>
				<view class="uni-textarea">
					<textarea placeholder-style="color:#F76260" placeholder="请输入自我介绍"/>
				</view>
			</view>
			<button class="button">提交</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		onLoad(e) {
			console.log(e.userId)
		}
	}
</script>

<style lang="less">
	img.avatar {
		width: 60px;
		border-radius: 60px;
	}

	uni-view.header {
		text-align: center;
		color: #666;
	}
	.add {
		display: block;
	}

	.list-title{
		color: #999;
		padding-left: 20px;
		line-height: 40px;
	}
	.list-title:after{
		display: block;
		content: '';
		width: 4px;
		height: 25px;
		position: absolute;
		left: 10px;
		top: 8px;
		background: red;
	}
	uni-page-body{
		background: #daf3fa;
		min-height: 720px;
	}

	uni-view.form .item {
		position: relative;
	}

	uni-input.uni-input {
		margin: 10px;
		border-radius: 2px;
	}

	uni-view.radio-group {
		padding-left: 10px;
	}

	.uni-textarea {
		width: 95%;
		background: #FFF;
		display: block;
		margin: 0 auto;
	}

	uni-view.uni-textarea {
		width: 95%;
		background: #FFF;
		display: block;
		margin: 0 auto;
		border-radius: 2px;
	}

</style>
