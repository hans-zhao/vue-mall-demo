<template>
<!-- 重点：编程式导航 -->
    <div class="goods-list">
        <div class="goods-item" v-for='item in goodsList' :key="item.id" @click='goGoodsInfo(item.id)'>
            <img :src="item.img_url" alt="">
            <h3>{{item.title}}</h3>
            <div class="info">
                <p class="price">
                    <span class="new">￥{{item.sell_price}}</span>
                    <span class="old">￥{{item.market_price}}</span>
                </p>
                <p class="sell">
                    <span>热卖中</span>
                    <span>剩{{item.stock_quantity}}件</span>
                </p>
            </div>
        </div>
        <!-- 以下为 router-link的导航方式（即a标签）
        还有一种方式：编程式导航（类似js脚本中 用location.href） -->
        <!-- <router-link class="goods-item" v-for='item in goodsList' :key="item.id" tag='div' :to="'/home/goodsInfo/'+item.id">
            <img :src="item.img_url" alt="">
            <h3>{{item.title}}</h3>
            <div class="info">
                <p class="price">
                    <span class="new">￥{{item.sell_price}}</span>
                    <span class="old">￥{{item.market_price}}</span>
                </p>
                <p class="sell">
                    <span>热卖中</span>
                    <span>剩{{item.stock_quantity}}件</span>
                </p>
            </div>
        </router-link> -->
        <mt-button type='danger' size='large' @click='getMoreGoods'>加载更多</mt-button>
    </div>
</template>
<script>
import VueResource from 'vue-resource';
export default {
    data(){
        return{
            pageindex: 1,
            goodsList: []
        }
    },
    methods:{
        // 默认获取第一页
        getGoodsList(){
            this.$http.get('api/getgoods?pageindex=' + this.pageindex).then(result => {
                if(result.body.status === 0){
                    this.goodsList = this.goodsList.concat(result.body.message);
                }
            })
        },
        // 点击之后 pageindex++
        getMoreGoods(){
            this.pageindex++;
            this.getGoodsList();
        },
        //编程式导航
        goGoodsInfo(id){
            // 注意$route与$router的区分：前面一个专门用于处理路由的参数，后面一个是路由
            // 写法1 router.push({ name: 'user', params: { userId: '123' }}) 
            // 写法2   router.push({ path: `/user/${userId}` }) // -> /user/123
            // this.$router.push( { path: `/home/goodsInfo/${id}`} );
            this.$router.push({ name: 'goodsInfo', params: { id }})
        }
    },
    created(){
        this.getGoodsList();
    }
}
</script>
<style lang="scss" scoped>
    .goods-list{
        display: flex;
        flex-wrap: wrap;
        // 针对右侧多出的空白，要想左右对称，可以用flex
        display: flex;
        justify-content: space-between;
        .goods-item{
            // 由于标准流的缘故，导致下面未填满区域出现空白，如果不用子绝父相，可用用flex 两边对齐
            // fle 只有主轴才存在 两端对齐
            // 一般外层使用margin 内层使用padding
            width: 48%;
            border: 1px solid #ccc;
            margin: 3px;
            box-shadow: 0 0 6px #bbb;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            min-height: 292px;
            img{
                width: 100%;
            }
            h3{
                font-size: 12px;
                padding: 0 1px;
            }
            .info{
                background-color: #eee;
                .price{
                    margin-bottom: 2px;
                    .new{
                        color: red;
                        font-size: 14px;
                        padding-left: 6px;
                        font-weight: bold;
                    }
                    .old{
                        font-size: 10px;
                        padding-left: 6px;
                        text-decoration: line-through;
                    }
                }
                .sell{
                    margin-bottom: 0;
                    padding: 0 10px;
                    font-size: 12px;
                    display: flex;
                    justify-content: space-between;
                }
            }
        }
    }
</style>
