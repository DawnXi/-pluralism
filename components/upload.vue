<template>
	<view>
		<button @tap="selectImg">点击选择图片</button>
		<view class="img-list">
			<view class="item" v-if="imgList.length >= 1" v-for="(item,index) in imgList" :key="index">
				<image class="img" :src="item"></image>
				<i class="remove" @tap="remove(index)"></i>
			</view>
		</view>
		<button @tap="upload(imgList)">上传</button>
        <button @tap="testFly">测试</button>
	</view>
</template>

<script>
	import { uploadImg } from '@/common/api/user'
    import fly from 'fly.js'
	export default {
		data() {
			return {
				imgList: []
			};
		},
		// props: {
		// 	mode: {
		// 		type:
		// 	}
		// },
		methods: {
		    testFly() {
                fly.get('/test').then(function (response) {
                    console.log(response);
                }).catch(function (error) {
                    console.log(error);
                });
            },
			selectImg() {
				let _this = this;
				uni.chooseImage({
					count: 6, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: function (res) {
						_this.imgList = res.tempFilePaths;
						console.log(JSON.stringify(res));
					}
				});
			},
			remove(index) {
				console.log(index);
				let _this = this;
				if (index > -1) {
					_this.imgList.splice(index, 1);
				}
			},
			upload (data) {
		        alert('上传')
				// 调用上传接口
				uploadImg(data).then((res) => {
					if (res.status === 200) {
						// 上传成功
						console.log(res);
					}
				}).catch((err) => {
				    console.log(err);
					// 上传失败
				})
				console.log(data)
			}
		}
	}
</script>

<style>
	.img-list{
		margin: 20px 0;
	}
	.img-list .item{
		width: 100px;
		height: 100px;
		position: relative;
	}
	.img-list .img{
		width: 100%;
		height: 100%;
	}
	.img-list .remove{
		width: 10px;
		height: 10px;
		background: red;
		position: absolute;
		top: 0px;
		right: 0px;
	}
</style>
