<template>
	<view class="main">
		<view v-if="id">这是第{{id}}条兼职的数据</view>
		<view class="work-info">
			<view class="name">兼职名称兼职名称兼职名称兼职名称</view>
			<view class="detail">
				<view class="price">50元/小时</view>
				<view class="other">
					<text class="time">04-18 15:21 更新</text>
					<text class="view">浏览量 10</text>
				</view>
			</view>
			<view class="options">
				<view class="comment">评论</view>
				<view class="collent">收藏</view>
			</view>
		</view>
		<view class="duty">
			<view class="title">岗位职责</view>
			<view class="text-box">
				<view>1、 根据销售目标制定推广手段，提升店铺及产品的访问量；</view>
				<view>2、 对推广效果进行评估，对店铺及产品访问量、转化率数据进行分析；</view>
			</view>
			<view class="title">任职要求</view>
			<view class="text-box">
				<view>1、大专及以上学历，电子商务及市场营销相关专业；</view>
				<view>2、具有1年以上的商城的营销经验；</view>
			</view>
		</view>
		<!-- 地图区域 -->
		<view class="title">公司地址</view>
		<div id="allmap"></div>
		
		<div id="container"></div>
		<view><a href="bdapp://map/geocoder?src=andr.baidu.openAPIdemo&address=北京市海淀区上地信息路9号奎科科技大厦">导航百度地图导航</a></view>
		<!-- <view><a href="http://uri.amap.com/marker?position=116.473195,39.993253&name=首开广场&src=mypage&coordinate=gaode&callnative=1">高德地图导航</a></view> -->
		<a href="androidamap://viewMap?sourceApplication=appname&poiname=abc&lat=36.2&lon=116.1&dev=0">高德地图导航</a>
		<view class="tabbar">
			<view class="item">电话确认</view>
			<view class="item">我要报名</view>
			<view class="item">在线沟通</view>
		</view>
		
		
		<!-- #ifdef MP-WEIXIN -->
			<map id="myMap" show-location />
					
			<button type="primary" @tap="getCenterLocation">获取位置</button>
			<button type="primary" @tap="moveToLocation">移动位置</button>
			<button type="primary" @tap="translateMarker">移动标注</button>
			<button type="primary" @tap="includePoints">缩放视野展示所有经纬度</button>
		<!-- #endif -->

	</view>
</template>
<script>
	export default {
		data() {
			return {
				title: 'list-triplex-row',
				id: null
			}
		},
// 		onShareAppMessage() {
// 			return {
// 				title: this.banner.title,
// 				path: '/pages/template/list2detail-detail/list2detail-detail?detailDate=' + JSON.stringify(this.banner)
// 			}
// 		},
		onLoad(e) {
			this.id = e.id
			// window.onBMapCallback()
			// window.onLoad()
		},
		methods: {
// 			getDetail() {
// 				uni.request({
// 					url: 'https://unidemo.dcloud.net.cn/api/news/36kr/' + this.banner.post_id,
// 					success: (data) => {
// 						if (data.statusCode == 200) {
// 							this.htmlString = data.data.content.replace(/\\/g, "").replace(/<img/g, "<img style=\"display:none;\"");
// 						}
// 					},
// 					fail: () => {
// 						console.log('fail');
// 					}
// 				})
// 			}
		}
	}
	
	
	
	
	//#ifdef H5
	// 高德地图
	var url = 'https://webapi.amap.com/maps?v=1.4.14&key=e0f2dc4c622ac1679e93f21c54000820&callback=onLoad';
	var jsapi = document.createElement('script');
	jsapi.charset = 'utf-8';
	jsapi.src = url;
	document.head.appendChild(jsapi);
	window.onLoad  = function(){
		// 初始化地图
		var geolocation,mapObj;
		// mapObj = new AMap.Map('container',{
		// 	zoom:15,
		// 	center:[104.065,30.658]
		// });
		
		// 获取定位
		// mapObj.plugin('AMap.Geolocation', function () {
		// 	geolocation = new AMap.Geolocation({
		// 		enableHighAccuracy: true,//是否使用高精度定位，默认:true
		// 		timeout: 800,          //超过10秒后停止定位，默认：无穷大
		// 		maximumAge: 0,           //定位结果缓存0毫秒，默认：0
		// 		convert: true,           //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
		// 		showButton: true,        //显示定位按钮，默认：true
		// 		buttonPosition: 'LB',    //定位按钮停靠位置，默认：'LB'，左下角
		// 		buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
		// 		showMarker: true,        //定位成功后在定位到的位置显示点标记，默认：true
		// 		showCircle: true,        //定位成功后用圆圈表示定位精度范围，默认：true
		// 		panToLocation: true,     //定位成功后将定位到的位置作为地图中心点，默认：true
		// 		zoomToAccuracy:true      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
		// 	});
		// 	mapObj.addControl(geolocation);
		// 	geolocation.getCurrentPosition();
		// 	AMap.event.addListener(geolocation, 'complete', onComplete);//返回定位信息
		// 	AMap.event.addListener(geolocation, 'error', onError);      //返回定位出错信息
		// });
		
		
		// 添加自定义点
		// var marker1 = new AMap.Marker({
		// 	position: new AMap.LngLat(104.066744,30.653186),   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
		// 	title: '北京'
		// });
		// var marker2 = new AMap.Marker({
		// 	position: new AMap.LngLat(104.051747,30.653111),   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
		// 	title: '北京'
		// });
		// mapObj.add(marker1);
		// mapObj.add(marker2);
	}
	
	// 百度地图
	var url2 = 'http://api.map.baidu.com/api?v=2.0&ak=TGfrGSYYe52MqlgGobheG4cGywWRvsFk&callback=onBMapCallback';
	var jsapi2 = document.createElement('script');
	jsapi2.charset = 'utf-8';
	jsapi2.src = url2;
	document.head.appendChild(jsapi2);
	window.onBMapCallback = function() {
		// var map2 = new BMap.Map("allmap");          // 创建地图实例  
		// var point = new BMap.Point(116.404, 39.915);  // 创建点坐标  
		// map2.centerAndZoom(point, 10);                 // 初始化地图，设置中心点坐标和地图级别  
		
		// 初始化地图
		var map2 = new BMap.Map("allmap");      
		var point = new BMap.Point(116.331398,39.897445);
		map2.centerAndZoom(point);

		var geolocation = new BMap.Geolocation();
		geolocation.getCurrentPosition(function(r){
			if(this.getStatus() == BMAP_STATUS_SUCCESS){
				var mk = new BMap.Marker(r.point);
				map2.addOverlay(mk);
				map2.panTo(r.point);
				alert('您的位置：'+r.point.lng+','+r.point.lat);
			}
			else {
				alert('failed'+this.getStatus());
			}        
		});
		
		
		// 获取定位点
		map2.centerAndZoom(new BMap.Point(116.404, 39.915));      
		// 创建地址解析器实例     
		var myGeo = new BMap.Geocoder();      
		// 将地址解析结果显示在地图上，并调整地图视野    
		myGeo.getPoint("四川省成都市科园二路10号", function(point){      
			if (point) {      
				map2.centerAndZoom(point, 16);      
				map2.addOverlay(new BMap.Marker(point));      
			}      
		 }, 
		"成都市");
		
        // 添加自定义点				
		// var point = new BMap.Point(104.051747,30.653111);    
		// map2.centerAndZoom(point);    
		// var marker = new BMap.Marker(point);        // 创建标注    
		// map2.addOverlay(marker);    
	}
	//#endif
	
	// #ifdef MP-WEIXIN
		wx.openLocation({
		 latitude: 39.900000,
		 longitude: 116.39000,
		 name:"花园桥肯德基",
		 scale: 28
		})
		
		// wx.getLocation({
		//   type: 'gcj02', // 返回可以用于wx.openLocation的经纬度
		//   success(res) {
		// 	const latitude = res.latitude
		// 	const longitude = res.longitude
		// 	wx.openLocation({
		// 	  latitude,
		// 	  longitude,
		// 	  scale: 18
		// 	})
		//   }
		// })
	// #endif
</script>

<style>
	.duty,.text-box{
		padding: 0 20upx;
	}
	.banner {
		height: 360upx;
		overflow: hidden;
		position: relative;
		background-color: #ccc;
	}

	.banner-img {
		width: 100%;
	}

	.banner-title {
		max-height: 84upx;
		overflow: hidden;
		position: absolute;
		left: 30upx;
		bottom: 30upx;
		width: 90%;
		font-size: 32upx;
		font-weight: 400;
		line-height: 42upx;
		color: white;
		z-index: 11;
	}

	.article-meta {
		padding: 20upx 40upx;
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		color: gray;
	}

	.article-text {
		font-size: 26upx;
		line-height: 50upx;
		margin: 0 20upx;
	}

	.article-author,
	.article-time {
		font-size: 30upx;
	}

	.article-content {
		padding: 0 30upx;
		overflow: hidden;
		font-size: 30upx;
		margin-bottom: 30upx;
	}
</style>
<style scoped>
	.main{
		padding-bottom: 70px;
	}
	.tabbar{
		/* position: fixed; */
		bottom: 0;
		left: 0;
		width: 100%;
		display: flex;
		justify-content: space-between;
	}
	.tabbar .item{
		display: inline-block;
		padding: 10upx 20upx;
		color: #fff;
		background-color: #007AFF;
		border-radius: 5upx;
	}
	.work-info {background-color: #03A9F4;color: #fff;}

	.work-info .name {
		text-align: center;
		font-size: 20px;
		line-height: 50px;
	}

	.work-info .detail {
		display: flex;
		justify-content: space-between;
	}

	.detail .time {
		margin-right: 10px;
	}

	.options {
		width: 100px;
		display: flex;
		justify-content: space-between;
	}
	.title {
		font-size: 20px;
		position: relative;
		margin: 20px 0;
		padding: 0;
	}
	.title:after{
		display: block;
		content: '';
		width: 20%;
		height: 3px;
		background-color: #007AFF;
		position: absolute;
	}
	.text-box{
		color: #666;
	}
	/* 地图相关 */
	#container {
		width:100%;
		height: 500px; 
	}  
	
	#allmap{width:100%;height:500px;}
	
	
	.btn-area{
	  margin-top: 60rpx;
	  box-sizing: border-box;
	  width: 100%;
	  padding: 0 30rpx;
	}
	
	.page-section-gap{
	  box-sizing: border-box;
	  padding: 0 30rpx;
	}

	.page-body-button {
	  margin-bottom: 30rpx;
	}
	</style>
