<template>
	<view class="comments">
		<view class="header">
			<view>全部</view>
			<view>好评</view>
			<view>吐槽</view>
		</view>
		<view class="list">
			<view class="item">
				<view class="left">
					<img class="img" src="https://picsum.photos/500/500?image=399" alt="">
					<view class="user-info">
						<view class="name">肉包来一笼</view>
						<view class="time">10-16 10：32</view>
					</view>
				</view>
				<view class="comment">评论内容评论内容评论内容评论内容评论内容</view>
				<view class="right">
					<i class="iconfont icon-pinglun"></i>
					<text class="reply">38</text>
					<i class="iconfont icon-zan"></i>
					<text class="like">87</text>
				</view>
			</view>
			<view class="item">
				<view class="left">
					<img class="img" src="https://picsum.photos/500/500?image=399" alt="">
					<view class="user-info">
						<view class="name">肉包来一笼</view>
						<view class="time">10-16 10：32</view>
					</view>
				</view>
				<view class="comment">评论内容评论内容评论内容评论内容评论内容</view>
				<view class="right">
					<i class="iconfont icon-pinglun"></i>
					<text class="reply">38</text>
					<i class="iconfont icon-zan"></i>
					<text class="like">87</text>
				</view>
			</view>
			<view class="item">
				<view class="left">
					<img class="img" src="https://picsum.photos/500/500?image=399" alt="">
					<view class="user-info">
						<view class="name">肉包来一笼</view>
						<view class="time">10-16 10：32</view>
					</view>
				</view>
				<view class="comment">评论内容评论内容评论内容评论内容评论内容</view>
				<view class="right">
					<i class="iconfont icon-pinglun"></i>
					<text class="reply">38</text>
					<i class="iconfont icon-zan"></i>
					<text class="like">87</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'comments',
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style>
.comments{
	background: #fff;
	min-height: 100%;
}
uni-view.header {
display: flex;
justify-content: space-around;
}
.user-info .name {
    font-weight: 700;
}

.user-info .time {
    line-height: 1;
    font-size: 12px;
    color: #999;
}
uni-view.left .img {
    width: 50px;
    height: 50px;
    border-radius: 50px;
    float: left;
    margin-right: 10px;
}

uni-view.right {
	text-align: right;
}

uni-view.left {
}

uni-view.item {
    overflow: hidden;
    border-bottom: #ddd solid 1px;
    padding: 10px 0;
    position: relative;
}

uni-view.comment {
    padding-left: 60px;
}

uni-view.list {
    border-top: #ddd solid 1px;
	padding: 0 20upx;
}
i.iconfont {
    margin-left: 20px;
    margin-right: 3px;
}
</style>
