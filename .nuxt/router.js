import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'

const _23103039 = () => interopDefault(import('../pages/about.vue' /* webpackChunkName: "pages/about" */))
const _b02bf03e = () => interopDefault(import('../pages/brand-cooperation.vue' /* webpackChunkName: "pages/brand-cooperation" */))
const _bb7c4b68 = () => interopDefault(import('../pages/contact.vue' /* webpackChunkName: "pages/contact" */))
const _67b13b96 = () => interopDefault(import('../pages/businessSuperCooperation/default.vue' /* webpackChunkName: "pages/businessSuperCooperation/default" */))
const _66e8b142 = () => interopDefault(import('../pages/myBrand/brand.vue' /* webpackChunkName: "pages/myBrand/brand" */))
const _3bf31d7d = () => interopDefault(import('../pages/myBrand/brandlist.vue' /* webpackChunkName: "pages/myBrand/brandlist" */))
const _a0495cba = () => interopDefault(import('../pages/brandCooperation/_id.vue' /* webpackChunkName: "pages/brandCooperation/_id" */))
const _7df3990f = () => interopDefault(import('../pages/businessSuperCooperation/_id.vue' /* webpackChunkName: "pages/businessSuperCooperation/_id" */))
const _9a2ea7dc = () => interopDefault(import('../pages/myBrand/_id.vue' /* webpackChunkName: "pages/myBrand/_id" */))
const _030749fc = () => interopDefault(import('../pages/news/_id.vue' /* webpackChunkName: "pages/news/_id" */))
const _832294a0 = () => interopDefault(import('../pages/news/_child/_id.vue' /* webpackChunkName: "pages/news/_child/_id" */))
const _42c80afe = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

Vue.use(Router)

if (process.client) {
  if ('scrollRestoration' in window.history) {
    window.history.scrollRestoration = 'manual'

    // reset scrollRestoration to auto when leaving page, allowing page reload
    // and back-navigation from other pages to use the browser to restore the
    // scrolling position.
    window.addEventListener('beforeunload', () => {
      window.history.scrollRestoration = 'auto'
    })

    // Setting scrollRestoration to manual again when returning to this page.
    window.addEventListener('load', () => {
      window.history.scrollRestoration = 'manual'
    })
  }
}
const scrollBehavior = function (to, from, savedPosition) {
  // if the returned position is falsy or an empty object,
  // will retain current scroll position.
  let position = false

  // if no children detected and scrollToTop is not explicitly disabled
  if (
    to.matched.length < 2 &&
    to.matched.every(r => r.components.default.options.scrollToTop !== false)
  ) {
    // scroll to the top of the page
    position = { x: 0, y: 0 }
  } else if (to.matched.some(r => r.components.default.options.scrollToTop)) {
    // if one of the children has scrollToTop option set to true
    position = { x: 0, y: 0 }
  }

  // savedPosition is only available for popstate navigations (back button)
  if (savedPosition) {
    position = savedPosition
  }

  return new Promise((resolve) => {
    // wait for the out transition to complete (if necessary)
    window.$nuxt.$once('triggerScroll', () => {
      // coords will be used if no selector is provided,
      // or if the selector didn't match any element.
      if (to.hash) {
        let hash = to.hash
        // CSS.escape() is not supported with IE and Edge.
        if (typeof window.CSS !== 'undefined' && typeof window.CSS.escape !== 'undefined') {
          hash = '#' + window.CSS.escape(hash.substr(1))
        }
        try {
          if (document.querySelector(hash)) {
            // scroll to anchor by returning the selector
            position = { selector: hash }
          }
        } catch (e) {
          console.warn('Failed to save scroll position. Please add CSS.escape() polyfill (https://github.com/mathiasbynens/CSS.escape).')
        }
      }
      resolve(position)
    })
  })
}

export function createRouter() {
  return new Router({
    mode: 'history',
    base: decodeURI('/'),
    linkActiveClass: 'nuxt-link-active',
    linkExactActiveClass: 'nuxt-link-exact-active',
    scrollBehavior,

    routes: [{
      path: "/about",
      component: _23103039,
      name: "about"
    }, {
      path: "/brand-cooperation",
      component: _b02bf03e,
      name: "brand-cooperation"
    }, {
      path: "/contact",
      component: _bb7c4b68,
      name: "contact"
    }, {
      path: "/businessSuperCooperation/default",
      component: _67b13b96,
      name: "businessSuperCooperation-default"
    }, {
      path: "/myBrand/brand",
      component: _66e8b142,
      name: "myBrand-brand"
    }, {
      path: "/myBrand/brandlist",
      component: _3bf31d7d,
      name: "myBrand-brandlist"
    }, {
      path: "/brandCooperation/:id?",
      component: _a0495cba,
      name: "brandCooperation-id"
    }, {
      path: "/businessSuperCooperation/:id?",
      component: _7df3990f,
      name: "businessSuperCooperation-id"
    }, {
      path: "/myBrand/:id?",
      component: _9a2ea7dc,
      name: "myBrand-id"
    }, {
      path: "/news/:id?",
      component: _030749fc,
      name: "news-id"
    }, {
      path: "/news/:child?/:id?",
      component: _832294a0,
      name: "news-child-id"
    }, {
      path: "/",
      component: _42c80afe,
      name: "index"
    }],

    fallback: false
  })
}
