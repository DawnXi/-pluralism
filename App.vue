<script>
	export default {
		onLaunch: function () {
			console.log('App Launch')
		},
		onShow: function () {
			console.log('App Show')
		},
		onHide: function () {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
</style>
<style>
	/* uni.css - 通用组件、模板样式库，可以当作一套ui库应用 */
	@import "./common/uni.css";

    /*每个页面公共css */

    /* @import "/static/Simple-login/css/simplepro.css"; */
	
	/* icfont样式库 */
	@import "./common/iconfont.css";
	
	/* 以下样式用于 hello uni-app 演示所需 */
	page {
		background-color:#f5f5f5;
		height: 100%;
		font-size:28upx;
		line-height: 1.8;
		bottom:var(--window-bottom);
	}
	.uni-header-logo{
		padding:30upx;
		text-align:center;
		margin-top:10upx;
	}
	.uni-header-logo image{
		width: 140upx;
		height: 140upx;
	}
	.uni-hello-text{
		color:#7A7E83;
	}
	.uni-hello-addfile{
		text-align:center; 
		line-height:300upx;
		background:#FFF;
		padding:50upx;
		margin-top:10px;
		font-size:38upx;
		color:#808080;
	}
	/* tabbar遮挡内容问题修复(要用到条件编译) */
	/* #ifdef H5 */
	/* body {
		margin-bottom: 200upx;
	} */
	/* #endif */
	/* #ifdef H5 */
	/* page:after{
		margin-bottom:500upx;
	} */
	/* #endif */
</style>
