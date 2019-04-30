<template>
    <view>
        <view class="container">
            <!--<view class="select-box">-->
                <!--<view class="select_item">一周内</view>-->
                <!--<view class="select_item">成华区</view>-->
                <!--<view class="select_item">一周内</view>-->
                <!--<view class="select_item">一周内</view>-->
            <!--</view>-->
            <view class="top-bar">
                <view @tap="changeSelect(1)">区域</view>
                <view @tap="changeSelect(2)">薪资</view>
                <view @tap="changeSelect(3)">发布时间</view>
                <view @tap="changeSelect(4)">更多</view>
            </view>
            <view class="fliter" v-if="selectedCode">
                <view class="area" v-if="selectedCode === 1">
                    <view class="city">
                        <view class="filter-title">全部</view>
                        <view v-for="(item, index) in cityList" :key="index">{{item.name}}</view>
                    </view>
                    <view class="street">
                        <view class="filter-title">全部</view>
                        <view v-for="(value, index) in cityList[cityCode]" :key="index">{{value.name}}</view>
                    </view>
                </view>
                <view class="salary" v-if="selectedCode === 2">
                    <view @tap="selectSalary(item)" v-for="(item,index) in filterInfo.salary" :key="item.name + index">{{item.name}}</view>
                    <view>2000-3000</view>
                    <view>3000-5000</view>
                    <view>5000以上</view>
                </view>
                <view class="time" v-if="selectedCode === 3">
					<view  @tap="selectTime(item)" v-for="(item,index) in filterInfo.time" :key="item.name + index">{{item.name}}</view>
                    <view>一天内</view>
                    <view>三天内</view>
                    <view>一周内</view>
                    <view>一周前</view>
                </view>
                <view class="more" v-if="selectedCode === 4">
                    <view class="filter-title">福利</view>
                    <view class="fliter-list">
						<view @tap="selectFilter(item)" v-for="(item,index) in filterInfo.filterList" :key="item.name + index">{{item.name}}</view>
                        <view>五险一金</view>
                        <view>周末双休</view>
                        <view>sdafaad</view>
                        <view>dsaffdasfadsfdsaf</view>
                        <view>dafsfafddafa</view>
                        <view>sdfafda</view>
                        <view>afdssdfasdfsafadsf</view>
                    </view>
                </view>
            </view>
        </view>
        <view>
            <button @click.native="cancel">取消</button>
            <button @click.native="getWorks">确定</button>
        </view>
    </view>
</template>

<script>
    export default {
        name: "myFilter",
        data () {
            return {
                cityList: [],
                cityCode: 0,
                selectedCode: '',
				filterInfo: {
					salary: [
						{ name: '2000以下' },
						{ name: '2000-3000' },
						{ name: '3000-5000' },
						{ name: '5000以上' }
					],
					time: [
						{ name: '一天内' },
						{ name: '三天内' },
						{ name: '一周内' },
						{ name: '一周前' }
					],
					filterList: [
						{ name: '五险一金' },
						{ name: '周末双休' },
						{ name: '带薪年假' },
						{ name: '年底双薪' },
						{ name: '五险一金' }
					]
				},
                formData: {}
            }
        },
        onLoad () {
            //加载区域信息
            this.getCityList();
        },
        methods: {
            getCityList () {
                uni.request({
                    url: 'https://unidemo.dcloud.net.cn/api/banner/36kr',
                    success: (data) => {
                        if (data.statusCode == 200) {
                            this.banner = data.data;
                        }
                    },
                    fail: (data, code) => {
                        console.log('fail' + JSON.stringify(data));
                    }
                })
            },
            getWorks () {
                uni.request({
                    url: 'https://unidemo.dcloud.net.cn/api/banner/36kr',
                    data: formData,
                    success: (data) => {
                        if (data.statusCode == 200) {
                            this.banner = data.data;
                        }
                    },
                    fail: (data, code) => {
                        console.log('fail' + JSON.stringify(data));
                    }
                })
            },
            cancel () {
                this.selectedCode = '';
                this.formData = {};
            },
            changeSelect (index) {
                this.selectedCode = index;
            },
			selectSalary(item) {
				console.log(item.name);
			},
			selectTime(item) {
				console.log(item.name);
			},
			selectFilter(item) {
				console.log(item.name);
			}
        }
    }
</script>

<style scoped>
    .top-bar{
        display: flex;
        justify-content: space-around;
    }
    .top-bar view {
        color: #04be02;
		font-size: 30upx;
    }
    view.container{
        /* min-height: 200px; */
		margin-bottom: 10upx;
    }
    .fliter view {
        padding: 0 20upx;
        line-height: 2;
        border-bottom: #ddd solid 1px;
		font-size: 30upx;
		color: #DDDDDD;
    }
	.filter-title {
		border: none;
	}
	.fliter-list {
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
	}
	.fliter-list view {
		background:#04be02;
		color: #fff;
		border: none;
		margin: 10upx 0;
	}
</style>