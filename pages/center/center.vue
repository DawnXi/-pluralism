<template>
	<view>
		<text>这个是个人中心</text>
        <view class="uni-card info">
            <view class="header">
                <img class="avatar" src="https://picsum.photos/500/500?image=399" alt="">
                <view class="des">
                    <view class="name">
                        自己。。。
                    </view>
                    <view class="more">
                        男/23岁/2年工作经验
                    </view>
                </view>
                <view class="edit">
                    编辑简历
                    <i class="iconfont"></i>
                </view>
                <view class="other">
                    <text class="text">资料完善42%</text>
                    <view class="button">立即完善</view>
                </view>

            </view>
        </view>
        <view class="my-data">
            <view class="item">
                <i class="iconfont icon-xiaofeijilu-copy"></i>
                <view>兼职记录</view>
            </view>
            <view class="item">
                <i class="iconfont icon-baoming"></i>
                <view>我的报名</view>
            </view>
            <view class="item">
                <i class="iconfont icon-shoucangdianjihou"></i>
                <view>我的收藏</view>
            </view>
        </view>
		<view class="uni-card">
			<view class="uni-list">
				<view class="uni-list-cell" hover-class="uni-list-cell-hover">
					<view class="uni-list-cell-navigate uni-navigate-right uni-navigate-badge">
						我的简历
                        <i class="iconfont icon-jianli"></i>
					</view>
				</view>
                <view class="uni-list-cell uni-list-cell-last" hover-class="uni-list-cell-hover" @tap="editResume(userId)">
                    <view class="uni-list-cell-navigate uni-navigate-right uni-navigate-badge">
                        我的简历
                        <i class="iconfont icon-jianli"></i>
                    </view>
                </view>
				<view class="uni-list-cell uni-list-cell-last" hover-class="uni-list-cell-hover">
					<view class="uni-list-cell-navigate uni-navigate-right uni-navigate-badge">
						我的收藏
                        <i class="iconfont icon-star"></i>
					</view>
				</view>
            </view>
        </view>
        <view class="uni-card">
            <view class="uni-list">
				<view class="uni-list-cell uni-list-cell-last" hover-class="uni-list-cell-hover">
					<view class="uni-list-cell-navigate uni-navigate-right uni-navigate-badge">
						常见问题
                        <i class="iconfont icon-wenti"></i>
					</view>
				</view>
                <view class="uni-list-cell uni-list-cell-last" hover-class="uni-list-cell-hover">
                    <view class="uni-list-cell-navigate uni-navigate-right uni-navigate-badge">
                        联系客服
                        <i class="iconfont icon-kefu"></i>
                    </view>
                </view>
                <view class="uni-list-cell uni-list-cell-last" hover-class="uni-list-cell-hover">
                    <view class="uni-list-cell-navigate uni-navigate-right uni-navigate-badge">
                        投诉反馈
                        <i class="iconfont icon-fankui"></i>
                    </view>
                </view>
                <view class="uni-list-cell uni-list-cell-last" hover-class="uni-list-cell-hover">
                    <view class="uni-list-cell-navigate uni-navigate-right uni-navigate-badge">
                        <i class="iconfont icon-shezhi"></i>
                        设置
                    </view>
                </view>
			</view>
		</view>
		<!--上传信息组件-->
		<Upload></Upload>

        <Test></Test>
	</view>
</template>

<script>
	import uniBadge from "../components/uni-badge.vue";
	import Upload from "@/components/upload.vue";
	import Test from "@/components/test.vue";
	export default {
		data() {
			return {
				userId: 'jnxlspqwxassa'
			};
		},
		components:{
			uniBadge,
			Upload,
            Test
		},
		methods: {
			editResume (userId) {
				uni.navigateTo({
					url: `/pages/resume/resume?userId=${userId}`
				})
			}
		}
	}
</script>

<style>
    .my-data{
        display: flex;
        justify-content: space-between;
    }
    img.avatar {
        width: 60px;
        border-radius: 60px;
        float: left;
        border: solid 3px #fff;
        margin-right: 15px;
    }

    uni-view.header {
        background: #36e7e1;
        color: #fff;
        font-size: 16px;
        padding-top: 15px;
        padding-left: 10px;
        padding-bottom: 10px;
    }

    uni-view.edit {
        float: right;
        margin-top: -24px;
        margin-right: 10px;
    }

    uni-view.other {
        width: 100%;
        display: flex;
        justify-content: space-between;
        margin-top: 20px;
    }

    uni-view.des {
        padding-top: 10px;
    }

    uni-view.other .button {
        border: #fff solid 1px;
        padding: 0px 3px;
        margin-right: 10px;
    }
    uni-view.my-data {
        background: #fff;
    }

    .uni-list i.iconfont {
        color:#36e7e1;
    }

    .uni-navigate-badge {
        padding-right: 24px;
        padding-left: 30px;
    }

    uni-view.item {}

    uni-view.my-data .item {
        width: 100px;
        text-align: center;
        padding-bottom: 10px;
    }

    uni-view.my-data i {
        font-size: 35px;
        color: #36e7e1;
    }

    .uni-list i.iconfont {
        position: absolute;
        left: 6px;
    }

    .uni-navigate-badge {
        padding-right: 24px;
        padding-left: 30px;
    }
</style>
