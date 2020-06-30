
import Vue from 'vue';
// 入口js，出口为bundle.js 且在内存中，自动加载到主页（script src引入式）：不用专门导入 导出 import export
import router from './router';
import app from './App.vue';
import VueRouter from 'vue-router';
import Vuex from 'vuex';

import './lib/mui/css/mui.min.css';
import './lib/mui/css/icons-extra.css';
import VuePreview from 'vue2-preview';
// 处理时间
import Moment from 'moment';

import VueResource from 'vue-resource';
Vue.use(VuePreview);

Vue.use(VueRouter);
Vue.use(VueResource);
Vue.use(Vuex);

// import { Header } from 'mint-ui';
// import { Swipe, SwipeItem, Button } from 'mint-ui';
// import {LazyLoad} from 'mint-ui';

// Vue.use(LazyLoad);

// Vue.component(Header.name, Header);
// Vue.component(Swipe.name, Swipe);
// Vue.component(SwipeItem.name, SwipeItem);
// Vue.component(Button.name, Button);
import MintUI from 'mint-ui';
Vue.use(MintUI);

import 'mint-ui/lib/style.css';

// 全局时间过滤器(注意 mm:ss不要大写！！否则会出错，H、h分别是24/12进制)
Vue.filter('dateFormat', function (dateStr, pattern = 'YYYY-MM-DD h:mm:ss') {
    return Moment(dateStr).format(pattern);
})

// 注意Vue.http必须在 resource后面
Vue.http.options.root = 'http://www.liulongbin.top:3005';
Vue.http.options.emulateJSON = true;


var store = new Vuex.Store({
    state: {

        // 购物车接受各个商品的信息
        //{id:this.id, count:selectedCount, price:stock_quantity.sell_price,selected:true};
        //localStorage.getItem('name') 可能为null
        cart: JSON.parse(localStorage.getItem('cart') || '[]')
    },
    mutations: {
        addCart(state, goods) {
            var flag = false;
            // 已经存在的商品，则只累加数量
            state.cart.some(item => {
                if (item.id == goods.id) {
                    item.count += parseInt(goods.count);
                    // flag：默认为不存在的商品=>由于遍历性质的函数没法else
                    flag = true;
                    return true;
                }
            })
            // 不存在的商品，push
            if (!flag) {
                state.cart.push(goods);
            }
            //持久化存储
            localStorage.setItem('cart', JSON.stringify(state.cart));
        },
        // 购物车页面，number变化
        // goodsInfo={id:'', count: 2}
        updateNumber(state, goodsInfo) {
            state.cart.some(item => {
                if (item.id == goodsInfo.id) {
                    item.count = parseInt(goodsInfo.count);
                    return true;
                }
            })
            localStorage.setItem('cart', JSON.stringify(state.cart));
        },
        removeGoods(state, id) {
            state.cart.some((item, i) => {
                if (item.id == id) {
                    //    delete item; 不能使用delete，就算能删也只是变成undefined，length没变
                    // console.log('要删除'+id)
                    state.cart.splice(i, 1);
                    return true;
                }
            })
            localStorage.setItem('cart', JSON.stringify(state.cart));
        },
        isSelected(state, selectedStatus) {
            state.cart.some(item => {
                if (item.id == selectedStatus.id) {
                    item.selected = selectedStatus.selected;
                    return true;
                }
            })
            localStorage.setItem('cart', JSON.stringify(state.cart));
        }
    },
    getters: {
        allCount: state => {
            var total = 0;
            state.cart.forEach(item => {
                total += item.count;
            })
            return total;
        },
        cartIdCount: state => {
            // 获取缓存中的count
            var obj = {};
            // state里面的属性的值会 自动更新状态（newVal）！！！
            state.cart.forEach(item => {
                // 两个数组匹配 采用 {value: value}
                obj[item.id] = item.count;
            });
            return obj;
        },
        getIsSelected(state) {
            // 购物车 获取初始时 是否选中 {value: value}
            var obj = {};
            state.cart.forEach(item => {
                obj[item.id] = item.selected;
            })
            return obj;
        },
        getTotal(state) {
            // 计算 总件数和总价
            var obj = { count: 0, price: 0 }
            state.cart.forEach(item => {
                if (item.selected) {
                    obj.count += parseInt(item.count);
                    obj.price += parseInt(item.count) * parseInt(item.price);
                }
            })
            return obj;
        }
    }
})

new Vue({
    data: {

    },
    methods: {

    },
    // 主页需要渲染不能使用组件注册，其他组件则不受限制
    render: c => c(app),
    router,
    store
}).$mount('#app')