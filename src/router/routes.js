import { LocalStorage } from 'quasar'
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: 'serial', name: 'serial', component: () => import('pages/serial.vue') },
      { path: 'scan', name: 'scan', component: () => import('pages/scanCode.vue') },
      { path: '', name: 'home', component: () => import('pages/Index.vue') },
      { path: 'code', code: 'code', component: () => import('pages/code.vue') },
      { path: 'login', name: 'login', component: () => import('pages/login.vue') },
    ]
  },
  {
    path: '/saler',
    name: 'saler',
    component: () => import('layouts/saler'),
    // beforeEnter: (to, from, next) => {
    //   if (!LocalStorage.has('session')) next({ name: 'home' })
    //   else next()
    // },
    children: [
      { path: 'sale', name: 'sale', component: () => import('pages/scanCode.vue') },
      { path: 'saleBy', name: 'salebyCode', component: () => import('pages/serial.vue') }
    ]

  },
  {
    path: '/loader',
    name: 'loader',
    component: () => import('layouts/loader'),
    beforeEnter: (to, from, next) => {
      if (!LocalStorage.has('session')) next({ name: 'home' })
      else next()
    },
    children: [
      { path: 'load', name: 'loadByScan', component: () => import('pages/loadbyScan.vue') },
      { path: 'loadCode', name: 'loadbyCode', component: () => import('pages/loadByCode.vue') }
    ]

  },
  {
    path: '/scanner',
    name: 'scanner',
    component: () => import('layouts/scanner'),
    beforeEnter: (to, from, next) => {
      if (!LocalStorage.has('session')) next({ name: 'home' })
      else next()
    },
    children: [
      { path: 'scan', name: 'scan', component: () => import('pages/scan.vue') },
      { path: 'verify', name: 'verify', component: () => import('pages/verify.vue') }

    ]

  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
