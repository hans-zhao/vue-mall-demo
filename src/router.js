import VueRouter from 'vue-router';


// 路由组件  都放在组件文件夹（实际上，除了入口类，其他都不应该放在根目录）
import contact from './components/tabbercom/contact.vue';
import search from './components/tabbercom/search.vue';
import home from './components/tabbercom/home.vue';
import cart from './components/tabbercom/cart.vue';
import newsList from './components/news/newsList.vue';
import newsInfo from './components/news/newsInfo.vue';
import photosList from './components/photos/photosList.vue';
import photosInfo from './components/photos/photosInfo.vue';
import goodsList from './components/goodsList/goodsList.vue';
import goodsInfo from './components/goodsList/goodsInfo.vue';
import getDesc from './components/goods/getDesc.vue';
import getComments from './components/goods/getComments.vue';

export default new VueRouter({
    // vue-router自带属性 选中切换高亮 linkActiveClass(属性值为类名)
    linkActiveClass: 'mui-active',
    routes: [
        { path: '/', redirect: '/home' },
        { path: '/home', component: home },
        { path: '/contact', component: contact },
        { path: '/cart', component: cart },
        { path: '/search', component: search },
        // 点击home页面的 新闻资讯 跳转到新页面 ，路由深入一层，但是！！！
        // 但是注意这里不是父子路由：父子路由要求父路由一直显示，而这里是要一个干净的页面
        // 因此是同级的页面 ，不用新加一个 router-view
        { path: '/home/newsList', component: newsList },
        // 页面具体数据用id
        // 冒号只是说明 它是动态变化的，将来的真实路由是不带冒号
        { path: '/home/newsList/:id', component: newsInfo },
        { path: '/home/photosList', component: photosList },
        { path: '/home/photosInfo/:id', component: photosInfo },
        { path: '/home/goodsList', component: goodsList },
        { path: '/home/goodsInfo/:id', component: goodsInfo, name: 'goodsInfo' },
        { path: '/home/getdesc/:id', name: 'getdesc', component: getDesc},
        // params的id是路由的一部分，而query则不是
        { path: '/home/getComments/:id', name: 'getComments', component: getComments}
    ],

})