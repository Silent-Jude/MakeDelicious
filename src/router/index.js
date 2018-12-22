import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import orderCenter from '@/components/orderCenter'
import allOrder from '@/components/order/allOrder'
import successOrder from '@/components/order/successOrder'
import failOrder from '@/components/order/failOrder'
import store from '@/components/store'
import business from '@/components/business/business'
import refresh from '@/components/refresh'
import admin from '@/components/manager/admin'


Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      component: Home
    },
    {
      path: '/orderCenter',
      component: orderCenter,
      children: [{
        path: '',
        redirect: 'all'
      }, {
        path: 'all',
        component: allOrder
      }, {
        path: 'success',
        component: successOrder
      }, {
        path: 'fail',
        component: failOrder
      }]
    },
    {
      path: '/store/:sid',
      component: store
    },
    {
      path: '/business/:pid',
      component: business
    },
    {
      path: '/refresh',
      component: refresh
    },
    {
      path: '/admin',
      component: admin
    }
  ]
})
