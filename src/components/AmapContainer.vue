<template>
    <div id="mapContainer">

    </div>
</template>

<script>
    import AMap from 'AMap'

    export default {
        props: {
        },
        name: 'amapContainer',
        data () {
            return {
                map: {},
                // to get lat/lng at map: https://lbs.amap.com/api/javascript-api/example/map/click-to-get-lnglat
                path: [
                    [104.073374,30.546931],
                    [104.075348,30.547559],
                    [104.077794,30.547836],
                    [104.080991,30.545804],
                    [104.088373,30.549222]
                ],
                point: [104.073374,30.546931]
            }
        },
        mounted() {
            // must load AMAP in mounted phase
            this.loadMap()
        },
        methods:{
            loadMap(){
                this.map = new AMap.Map('mapContainer', {
                    resizeEnable: true, //是否监控地图容器尺寸变化
                    zoom:11, //初始化地图层级
                    center: [116.397428, 39.90923] //初始化地图中心点
                })

                this.drawPipline()
            },
            drawPipline(){
                let polyline = new AMap.Polyline({
                    path: this.path,
                    isOutline: true,
                    outlineColor: '#ffeeff',
                    borderWeight: 3,
                    strokeColor: "#3366FF",
                    strokeOpacity: 1,
                    strokeWeight: 6,
                    // 折线样式还支持 'dashed'
                    strokeStyle: "solid",
                    // strokeStyle是dashed时有效
                    strokeDasharray: [10, 5],
                    lineJoin: 'round',
                    lineCap: 'round',
                    zIndex: 50,
                })

                polyline.setMap(this.map)
                // 缩放地图到合适的视野级别
                this.map.setFitView([ polyline ])

                this.addMarker(this.point)
            },
            // 实例化点标记
            addMarker(latlng) {
                let marker = new AMap.Marker({
                    icon: "//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png",
                    position: latlng , //[116.406315,39.908775],
                    offset: new AMap.Pixel(-25, -60)
                })
                marker.setMap(this.map)
                //鼠标点击marker弹出自定义的信息窗体
                AMap.event.addListener(marker, 'click', () =>{
                    this.buildInfoWindow().open(this.map, marker.getPosition())
                })
            },

            //在指定位置打开信息窗体
            buildInfoWindow() {
                //构建信息窗体中显示的内容
                let info = []
                info.push("<div>")
                info.push("<div style=\"padding:0px 0px 0px 0px;\"><h4>XXX软件</h4>")
                info.push("<p class='input-item'>破损点距离起始点： 1 米</p>")
                info.push("<a class='input-item' href=''>点击查看破损点图片</a></div></div>")

                return new AMap.InfoWindow({
                    content: info.join(""),  //使用默认信息窗体框样式，显示信息内容
                    offset: new AMap.Pixel(0, -60)
                })
            }
        }
    }
</script>
<style>
    #mapContainer{
        width: 100%;
        height: 600px;
    }
</style>
