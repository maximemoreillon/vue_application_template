(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('vue-material-design-icons/Menu.vue'), require('vue-material-design-icons/Backburger.vue'), require('vue-cookies'), require('vue-material-design-icons/Logout.vue'), require('vue'), require('axios'), require('@moreillon/vue_loader'), require('vue-material-design-icons/Account.vue'), require('vue-material-design-icons/Key.vue'), require('vue-material-design-icons/styles.css')) :
  typeof define === 'function' && define.amd ? define(['exports', 'vue-material-design-icons/Menu.vue', 'vue-material-design-icons/Backburger.vue', 'vue-cookies', 'vue-material-design-icons/Logout.vue', 'vue', 'axios', '@moreillon/vue_loader', 'vue-material-design-icons/Account.vue', 'vue-material-design-icons/Key.vue', 'vue-material-design-icons/styles.css'], factory) :
  (global = global || self, factory(global.AppTemplate = {}, global.MenuIcon, global.BackburgerIcon, global.VueCookies, global.LogoutIcon, global.Vue, global.axios, global.Loader, global.AccountIcon, global.KeyIcon));
}(this, (function (exports, MenuIcon, BackburgerIcon, VueCookies, LogoutIcon, Vue, axios, Loader, AccountIcon, KeyIcon) { 'use strict';

  MenuIcon = MenuIcon && Object.prototype.hasOwnProperty.call(MenuIcon, 'default') ? MenuIcon['default'] : MenuIcon;
  BackburgerIcon = BackburgerIcon && Object.prototype.hasOwnProperty.call(BackburgerIcon, 'default') ? BackburgerIcon['default'] : BackburgerIcon;
  VueCookies = VueCookies && Object.prototype.hasOwnProperty.call(VueCookies, 'default') ? VueCookies['default'] : VueCookies;
  LogoutIcon = LogoutIcon && Object.prototype.hasOwnProperty.call(LogoutIcon, 'default') ? LogoutIcon['default'] : LogoutIcon;
  Vue = Vue && Object.prototype.hasOwnProperty.call(Vue, 'default') ? Vue['default'] : Vue;
  axios = axios && Object.prototype.hasOwnProperty.call(axios, 'default') ? axios['default'] : axios;
  Loader = Loader && Object.prototype.hasOwnProperty.call(Loader, 'default') ? Loader['default'] : Loader;
  AccountIcon = AccountIcon && Object.prototype.hasOwnProperty.call(AccountIcon, 'default') ? AccountIcon['default'] : AccountIcon;
  KeyIcon = KeyIcon && Object.prototype.hasOwnProperty.call(KeyIcon, 'default') ? KeyIcon['default'] : KeyIcon;

  var state = Vue.observable({
    state: 'initial',
    user: null,
    route_loading: false,
    nav_open: false,
    template_options: null,
  });



  var mutations = {
    set_options: function set_options(new_options) {
      state.template_options = new_options;
    },
    set_state: function set_state(new_state) {
      state.state = new_state;
    },
    set_user: function set_user(user) {
      state.user = user;
    },
    get_user: function get_user(){
      var this$1 = this;


      this.set_state('loading');

      var jwt = VueCookies.get("jwt");
      if(!jwt) {
        this.set_user(undefined);
        this.set_state('login');
        return
      }

      var headers = { Authorization: ("Bearer " + jwt) };
      var url = state.template_options.identification_url;

      axios.get(url, {headers: headers})
      .then( function (ref) {
        var data = ref.data;

        this$1.set_user(data);

        // This will show even if the user is logged in already at the time of opening the app
        this$1.set_state('greetings');
        setTimeout(function () {
          this$1.set_state('content');
        },2000);


      })
      .catch( function (error) {
        // there was a problem authenticating the user against the auth API
        // Consequently, completely remove any trace of the user data to start fresh
        console.error(error);
        this$1.set_user(undefined);
        this$1.set_state('login');
        VueCookies.remove('jwt');
      });

    },
    set_user_loading: function set_user_loading(loading){
      state.user_loading = loading;
    },
    set_route_loading: function set_route_loading(loading){
      state.route_loading = loading;
    },
    set_nav_open: function set_nav_open(nav_state){
      state.nav_open = nav_state;
    },
    open_nav: function open_nav(){
      state.nav_open = true;
    },
    close_nav: function close_nav(){
      state.nav_open = false;
    },
    toggle_nav: function toggle_nav(){
      state.nav_open = !state.nav_open;
    }
  };

  var AppTemplateStore = {
    state: state,
    mutations: mutations
  };

  // This mixins facilitates access to states and mutations of the store
  // NOTE: Mixins imported in other components don't share date

  var state$1 = AppTemplateStore.state;
  var mutations$1 = AppTemplateStore.mutations;


  var computed = {};
  var loop = function ( key ) {
    computed[key] = function () { return state$1[key]; };
  };

  for (var key in state$1) loop( key );

  var StoreMixin = {
    methods: mutations$1,
    computed: computed,

  };

  //

  var script = {
    name: 'LogoutButton',
    components: {
      LogoutIcon: LogoutIcon
    },
    mixins: [StoreMixin],
    methods: {

      logout: function logout(){
        VueCookies.remove('jwt');
        this.get_user();
      },
    },

  };

  function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
      if (typeof shadowMode !== 'boolean') {
          createInjectorSSR = createInjector;
          createInjector = shadowMode;
          shadowMode = false;
      }
      // Vue.extend constructor export interop.
      var options = typeof script === 'function' ? script.options : script;
      // render functions
      if (template && template.render) {
          options.render = template.render;
          options.staticRenderFns = template.staticRenderFns;
          options._compiled = true;
          // functional template
          if (isFunctionalTemplate) {
              options.functional = true;
          }
      }
      // scopedId
      if (scopeId) {
          options._scopeId = scopeId;
      }
      var hook;
      if (moduleIdentifier) {
          // server build
          hook = function (context) {
              // 2.3 injection
              context =
                  context || // cached call
                      (this.$vnode && this.$vnode.ssrContext) || // stateful
                      (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
              // 2.2 with runInNewContext: true
              if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                  context = __VUE_SSR_CONTEXT__;
              }
              // inject component styles
              if (style) {
                  style.call(this, createInjectorSSR(context));
              }
              // register component module identifier for async chunk inference
              if (context && context._registeredComponents) {
                  context._registeredComponents.add(moduleIdentifier);
              }
          };
          // used by ssr in case component is cached and beforeCreate
          // never gets called
          options._ssrRegister = hook;
      }
      else if (style) {
          hook = shadowMode
              ? function (context) {
                  style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
              }
              : function (context) {
                  style.call(this, createInjector(context));
              };
      }
      if (hook) {
          if (options.functional) {
              // register for functional component in vue file
              var originalRender = options.render;
              options.render = function renderWithStyleInjection(h, context) {
                  hook.call(context);
                  return originalRender(h, context);
              };
          }
          else {
              // inject component registration as beforeCreate hook
              var existing = options.beforeCreate;
              options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
          }
      }
      return script;
  }

  var isOldIE = typeof navigator !== 'undefined' &&
      /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
  function createInjector(context) {
      return function (id, style) { return addStyle(id, style); };
  }
  var HEAD;
  var styles = {};
  function addStyle(id, css) {
      var group = isOldIE ? css.media || 'default' : id;
      var style = styles[group] || (styles[group] = { ids: new Set(), styles: [] });
      if (!style.ids.has(id)) {
          style.ids.add(id);
          var code = css.source;
          if (css.map) {
              // https://developer.chrome.com/devtools/docs/javascript-debugging
              // this makes source maps inside style tags work properly in Chrome
              code += '\n/*# sourceURL=' + css.map.sources[0] + ' */';
              // http://stackoverflow.com/a/26603875
              code +=
                  '\n/*# sourceMappingURL=data:application/json;base64,' +
                      btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) +
                      ' */';
          }
          if (!style.element) {
              style.element = document.createElement('style');
              style.element.type = 'text/css';
              if (css.media)
                  { style.element.setAttribute('media', css.media); }
              if (HEAD === undefined) {
                  HEAD = document.head || document.getElementsByTagName('head')[0];
              }
              HEAD.appendChild(style.element);
          }
          if ('styleSheet' in style.element) {
              style.styles.push(code);
              style.element.styleSheet.cssText = style.styles
                  .filter(Boolean)
                  .join('\n');
          }
          else {
              var index = style.ids.size - 1;
              var textNode = document.createTextNode(code);
              var nodes = style.element.childNodes;
              if (nodes[index])
                  { style.element.removeChild(nodes[index]); }
              if (nodes.length)
                  { style.element.insertBefore(textNode, nodes[index]); }
              else
                  { style.element.appendChild(textNode); }
          }
      }
  }

  /* script */
  var __vue_script__ = script;

  /* template */
  var __vue_render__ = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c("LogoutIcon", {
      staticClass: "logout_button",
      on: {
        click: function($event) {
          return _vm.logout()
        }
      }
    })
  };
  var __vue_staticRenderFns__ = [];
  __vue_render__._withStripped = true;

    /* style */
    var __vue_inject_styles__ = function (inject) {
      if (!inject) { return }
      inject("data-v-7753e810_0", { source: "\n.logout_button[data-v-7753e810] {\r\n  cursor: pointer;\n}\r\n\r\n", map: {"version":3,"sources":["/home/moreillon/vue/vue_application_template/src/components/LogoutButton.vue"],"names":[],"mappings":";AAkCA;EACA,eAAA;AACA","file":"LogoutButton.vue","sourcesContent":["<template>\r\n  <LogoutIcon\r\n    class=\"logout_button\"\r\n    @click=\"logout()\"/>\r\n</template>\r\n\r\n<script>\r\n/*\r\nThis component exchanges credentials for a JWT and manages the storage of the JWT in cookies\r\n*/\r\n\r\nimport VueCookies from 'vue-cookies'\r\nimport LogoutIcon from 'vue-material-design-icons/Logout.vue'\r\nimport StoreMixin from '../mixins/store.js'\r\n\r\nexport default {\r\n  name: 'LogoutButton',\r\n  components: {\r\n    LogoutIcon\r\n  },\r\n  mixins: [StoreMixin],\r\n  methods: {\r\n\r\n    logout(){\r\n      VueCookies.remove('jwt')\r\n      this.get_user()\r\n    },\r\n  },\r\n\r\n}\r\n</script>\r\n\r\n<style scoped>\r\n\r\n.logout_button {\r\n  cursor: pointer;\r\n}\r\n\r\n</style>\r\n"]}, media: undefined });

    };
    /* scoped */
    var __vue_scope_id__ = "data-v-7753e810";
    /* module identifier */
    var __vue_module_identifier__ = undefined;
    /* functional template */
    var __vue_is_functional_template__ = false;
    /* style inject SSR */
    
    /* style inject shadow dom */
    

    
    var __vue_component__ = /*#__PURE__*/normalizeComponent(
      { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
      __vue_inject_styles__,
      __vue_script__,
      __vue_scope_id__,
      __vue_is_functional_template__,
      __vue_module_identifier__,
      false,
      createInjector,
      undefined,
      undefined
    );

  //

  var script$1 = {
    name: 'AppTemplateHeader',
    props: {
      options: Object,
    },
    components: {
      LogoutButton: __vue_component__,
      MenuIcon: MenuIcon,
      BackburgerIcon: BackburgerIcon,
    },
    mixins: [
      StoreMixin
    ],
    methods: {

    },
    computed: {


    }
  };

  var img = "data:image/png;base64,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";

  /* script */
  var __vue_script__$1 = script$1;
  var __vue_render__$1 = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c(
      "header",
      [
        _vm.nav_open
          ? _c("backburger-icon", {
              staticClass: "navigation_control button",
              on: {
                click: function($event) {
                  return _vm.toggle_nav()
                }
              }
            })
          : _c("menu-icon", {
              staticClass: "navigation_control button",
              on: {
                click: function($event) {
                  return _vm.toggle_nav()
                }
              }
            }),
        _vm._v(" "),
        _c("img", {
          staticClass: "logo rotating",
          attrs: { src: img, alt: "logo" }
        }),
        _vm._v(" "),
        _c("span", { staticClass: "title" }, [_vm._v(_vm._s(_vm.options.title))]),
        _vm._v(" "),
        _c("div", { staticClass: "spacer" }),
        _vm._v(" "),
        _vm.$slots.default ? _vm._t("default") : _vm._e(),
        _vm._v(" "),
        _vm.user ? _c("LogoutButton") : _vm._e()
      ],
      2
    )
  };
  var __vue_staticRenderFns__$1 = [];
  __vue_render__$1._withStripped = true;

    /* style */
    var __vue_inject_styles__$1 = function (inject) {
      if (!inject) { return }
      inject("data-v-4a2cdb2a_0", { source: "\nheader[data-v-4a2cdb2a] {\r\n  padding: 0.5em 0.75em;\r\n\r\n  font-size: 130%;\r\n\r\n  background: #444;\r\n  color: #eee;\r\n\r\n  display: flex;\r\n  align-items: center;\r\n\r\n  /*\r\n  animation-name: apparition;\r\n  animation-duration: 1s;\r\n  animation-fill-mode: both;\r\n  */\r\n\r\n  //box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);\r\n  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);\n}\n.navigation_control[data-v-4a2cdb2a]{\r\n  cursor: pointer;\r\n  transform: translateX(-200%);\r\n  transition: transform 0.5s;\n}\nheader .logo[data-v-4a2cdb2a] {\r\n  height: 1.4em;\r\n  width: 1.4em;\n}\nheader > *[data-v-4a2cdb2a]:not(:last-child) {\r\n  margin-right: 0.5em;\n}\n.spacer[data-v-4a2cdb2a] {\r\n  flex-grow: 1;\n}\n.title[data-v-4a2cdb2a] {\r\n  margin-right: auto;\n}\n@keyframes apparition-data-v-4a2cdb2a {\nfrom {transform: translateY(-150%);}\nto {transform: translateX(0%);}\n}\r\n\r\n\r\n\r\n", map: {"version":3,"sources":["/home/moreillon/vue/vue_application_template/src/components/AppTemplateHeader.vue"],"names":[],"mappings":";AA+DA;EACA,qBAAA;;EAEA,eAAA;;EAEA,gBAAA;EACA,WAAA;;EAEA,aAAA;EACA,mBAAA;;EAEA;;;;GAIA;;EAEA,oEAAA;EACA,kEAAA;AAEA;AAGA;EACA,eAAA;EACA,4BAAA;EACA,0BAAA;AACA;AAGA;EACA,aAAA;EACA,YAAA;AACA;AAEA;EACA,mBAAA;AACA;AAEA;EACA,YAAA;AACA;AACA;EACA,kBAAA;AACA;AAEA;AACA,MAAA,4BAAA,CAAA;AACA,IAAA,yBAAA,CAAA;AACA","file":"AppTemplateHeader.vue","sourcesContent":["<template>\r\n  <header>\r\n\r\n\r\n    <backburger-icon\r\n      class=\"navigation_control button\"\r\n      v-if=\"nav_open\"\r\n      v-on:click=\"toggle_nav()\"/>\r\n\r\n    <menu-icon\r\n      class=\"navigation_control button\"\r\n      v-else\r\n      v-on:click=\"toggle_nav()\"/>\r\n\r\n\r\n    <img\r\n      src=\"../assets/img/logo/logo.png\"\r\n      alt=\"logo\"\r\n      class=\"logo rotating\">\r\n\r\n    <span class=\"title\">{{options.title}}</span>\r\n\r\n    <div class=\"spacer\"/>\r\n\r\n    <slot v-if=\"$slots.default\"/>\r\n\r\n    <LogoutButton v-if=\"user\"/>\r\n\r\n  </header>\r\n</template>\r\n\r\n<script>\r\nimport MenuIcon from 'vue-material-design-icons/Menu.vue'\r\nimport BackburgerIcon from 'vue-material-design-icons/Backburger.vue'\r\n\r\nimport LogoutButton from './LogoutButton.vue'\r\nimport StoreMixin from '../mixins/store.js'\r\n\r\nexport default {\r\n  name: 'AppTemplateHeader',\r\n  props: {\r\n    options: Object,\r\n  },\r\n  components: {\r\n    LogoutButton,\r\n    MenuIcon,\r\n    BackburgerIcon,\r\n  },\r\n  mixins: [\r\n    StoreMixin\r\n  ],\r\n  methods: {\r\n\r\n  },\r\n  computed: {\r\n\r\n\r\n  }\r\n}\r\n</script>\r\n\r\n<style scoped>\r\n\r\nheader {\r\n  padding: 0.5em 0.75em;\r\n\r\n  font-size: 130%;\r\n\r\n  background: #444;\r\n  color: #eee;\r\n\r\n  display: flex;\r\n  align-items: center;\r\n\r\n  /*\r\n  animation-name: apparition;\r\n  animation-duration: 1s;\r\n  animation-fill-mode: both;\r\n  */\r\n\r\n  //box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);\r\n  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);\r\n\r\n}\r\n\r\n\r\n.navigation_control{\r\n  cursor: pointer;\r\n  transform: translateX(-200%);\r\n  transition: transform 0.5s;\r\n}\r\n\r\n\r\nheader .logo {\r\n  height: 1.4em;\r\n  width: 1.4em;\r\n}\r\n\r\nheader > *:not(:last-child) {\r\n  margin-right: 0.5em;\r\n}\r\n\r\n.spacer {\r\n  flex-grow: 1;\r\n}\r\n.title {\r\n  margin-right: auto;\r\n}\r\n\r\n@keyframes apparition {\r\n  from {transform: translateY(-150%);}\r\n  to {transform: translateX(0%);}\r\n}\r\n\r\n\r\n\r\n</style>\r\n"]}, media: undefined });

    };
    /* scoped */
    var __vue_scope_id__$1 = "data-v-4a2cdb2a";
    /* module identifier */
    var __vue_module_identifier__$1 = undefined;
    /* functional template */
    var __vue_is_functional_template__$1 = false;
    /* style inject SSR */
    
    /* style inject shadow dom */
    

    
    var __vue_component__$1 = /*#__PURE__*/normalizeComponent(
      { render: __vue_render__$1, staticRenderFns: __vue_staticRenderFns__$1 },
      __vue_inject_styles__$1,
      __vue_script__$1,
      __vue_scope_id__$1,
      __vue_is_functional_template__$1,
      __vue_module_identifier__$1,
      false,
      createInjector,
      undefined,
      undefined
    );

  //

  /*
  this did not work
  import router from '@/router'

  function component_factory(){
    return router.options.routes.reduce((acc,route) => {
      if(!route.nav || !route.name || !route.nav.icon) return acc
      const component_name = `route-${route.name}-icon`
      acc[component_name] = route.nav.icon
      return acc
    },{})
  }
  */


  var script$2 = {
    name: 'AppTemplateNav',
    props: {
      title: String,
    },
    mixins: [StoreMixin],
    components: {
      MenuIcon: MenuIcon,
      //...component_factory(),
    },
    computed: {
      router_nav_items: function router_nav_items(){
        return this.$router.options.routes.filter(function (route) {
          return !!route.nav
        })
      }
    }
  };

  /* script */
  var __vue_script__$2 = script$2;

  /* template */
  var __vue_render__$2 = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c(
      "nav",
      [
        _vm.$slots.default
          ? _vm._t("default")
          : _vm.$router
          ? _vm._l(_vm.router_nav_items, function(nav_item) {
              return _c(
                "router-link",
                { key: nav_item.name, attrs: { to: { name: nav_item.name } } },
                [
                  nav_item.nav.icon
                    ? [_c(nav_item.nav.icon, { tag: "component" })]
                    : _c("MenuIcon"),
                  _vm._v(" "),
                  _c("span", [_vm._v(_vm._s(nav_item.nav.label))])
                ],
                2
              )
            })
          : _vm._e()
      ],
      2
    )
  };
  var __vue_staticRenderFns__$2 = [];
  __vue_render__$2._withStripped = true;

    /* style */
    var __vue_inject_styles__$2 = function (inject) {
      if (!inject) { return }
      inject("data-v-f457519e_0", { source: "\nnav {\r\n  position: relative;\r\n  display: flex;\r\n  flex-direction: column;\r\n  background-color: white;\r\n\r\n  z-index: 2;\r\n\r\n  /* this animation runs when the comonent becomes visible */\r\n  /* WARNING: animation clashes with retracted nav*/\r\n  /*\r\n  animation-name: apparition;\r\n  animation-duration: 1s;\r\n  animation-fill-mode: backwards;\r\n  */\r\n\r\n  //border-right: 1px solid #dddddd;\r\n  font-size: 120%;\r\n\r\n  transition: 0.25s;\n}\nnav::after {\r\n  z-index: 1;\r\n  content: '';\r\n  position: absolute;\r\n  top: 1em;\r\n  bottom: 1em;\r\n  left: 100%;\r\n  right: 0;\r\n  border-right: 1px solid #dddddd;\n}\na {\r\n  color: inherit;\r\n  padding: 0.5em 1em;\r\n  display: flex;\r\n  align-items: center;\r\n  text-decoration: none;\r\n  transition: 0.25s;\r\n\r\n  border-right: 3px solid transparent;\n}\na:hover {\r\n  color: #c00000;\r\n  border-right: 3px solid #666666;\n}\nnav a.router-link-exact-active {\r\n  border-right: 3px solid #c00000;\n}\na > * {\r\n  margin-right: 1em;\n}\n@keyframes apparition {\nfrom {transform: translateX(-150%);}\nto {transform: translateX(0%);}\n}\r\n\r\n\r\n", map: {"version":3,"sources":["/home/moreillon/vue/vue_application_template/src/components/AppTemplateNav.vue"],"names":[],"mappings":";AAsEA;EACA,kBAAA;EACA,aAAA;EACA,sBAAA;EACA,uBAAA;;EAEA,UAAA;;EAEA,0DAAA;EACA,iDAAA;EACA;;;;GAIA;;EAEA,iCAAA;EACA,eAAA;;EAEA,iBAAA;AACA;AAEA;EACA,UAAA;EACA,WAAA;EACA,kBAAA;EACA,QAAA;EACA,WAAA;EACA,UAAA;EACA,QAAA;EACA,+BAAA;AACA;AAEA;EACA,cAAA;EACA,kBAAA;EACA,aAAA;EACA,mBAAA;EACA,qBAAA;EACA,iBAAA;;EAEA,mCAAA;AACA;AAEA;EACA,cAAA;EACA,+BAAA;AACA;AAEA;EACA,+BAAA;AACA;AAGA;EACA,iBAAA;AACA;AAEA;AACA,MAAA,4BAAA,CAAA;AACA,IAAA,yBAAA,CAAA;AACA","file":"AppTemplateNav.vue","sourcesContent":["<template>\r\n  <!-- Could think of having a nav wrapper to contain the nav background -->\r\n  <nav>\r\n\r\n    <!-- Allow to pass nav items using slot -->\r\n    <slot v-if=\"$slots.default\"/>\r\n\r\n    <!-- If no slot, Nav items can be generated from router -->\r\n    <!-- Currently not working -->\r\n    <template v-else-if=\"$router\">\r\n      <router-link\r\n        v-for=\"nav_item in router_nav_items\"\r\n        :key=\"nav_item.name\"\r\n        :to=\"{ name: nav_item.name }\">\r\n\r\n        <template v-if=\"nav_item.nav.icon\">\r\n          <component :is=\"nav_item.nav.icon\"/>\r\n        </template>\r\n        <MenuIcon v-else/>\r\n\r\n        <span>{{nav_item.nav.label}}</span>\r\n\r\n      </router-link>\r\n    </template>\r\n\r\n  </nav>\r\n</template>\r\n\r\n<script>\r\n\r\nimport MenuIcon from 'vue-material-design-icons/Menu.vue'\r\nimport StoreMixin from '../mixins/store.js'\r\n\r\n/*\r\nthis did not work\r\nimport router from '@/router'\r\n\r\nfunction component_factory(){\r\n  return router.options.routes.reduce((acc,route) => {\r\n    if(!route.nav || !route.name || !route.nav.icon) return acc\r\n    const component_name = `route-${route.name}-icon`\r\n    acc[component_name] = route.nav.icon\r\n    return acc\r\n  },{})\r\n}\r\n*/\r\n\r\n\r\nexport default {\r\n  name: 'AppTemplateNav',\r\n  props: {\r\n    title: String,\r\n  },\r\n  mixins: [StoreMixin],\r\n  components: {\r\n    MenuIcon,\r\n    //...component_factory(),\r\n  },\r\n  computed: {\r\n    router_nav_items(){\r\n      return this.$router.options.routes.filter(route => {\r\n        return !!route.nav\r\n      })\r\n    }\r\n  }\r\n}\r\n</script>\r\n\r\n<style>\r\n\r\nnav {\r\n  position: relative;\r\n  display: flex;\r\n  flex-direction: column;\r\n  background-color: white;\r\n\r\n  z-index: 2;\r\n\r\n  /* this animation runs when the comonent becomes visible */\r\n  /* WARNING: animation clashes with retracted nav*/\r\n  /*\r\n  animation-name: apparition;\r\n  animation-duration: 1s;\r\n  animation-fill-mode: backwards;\r\n  */\r\n\r\n  //border-right: 1px solid #dddddd;\r\n  font-size: 120%;\r\n\r\n  transition: 0.25s;\r\n}\r\n\r\nnav::after {\r\n  z-index: 1;\r\n  content: '';\r\n  position: absolute;\r\n  top: 1em;\r\n  bottom: 1em;\r\n  left: 100%;\r\n  right: 0;\r\n  border-right: 1px solid #dddddd;\r\n}\r\n\r\na {\r\n  color: inherit;\r\n  padding: 0.5em 1em;\r\n  display: flex;\r\n  align-items: center;\r\n  text-decoration: none;\r\n  transition: 0.25s;\r\n\r\n  border-right: 3px solid transparent;\r\n}\r\n\r\na:hover {\r\n  color: #c00000;\r\n  border-right: 3px solid #666666;\r\n}\r\n\r\nnav a.router-link-exact-active {\r\n  border-right: 3px solid #c00000;\r\n}\r\n\r\n\r\na > * {\r\n  margin-right: 1em;\r\n}\r\n\r\n@keyframes apparition {\r\n  from {transform: translateX(-150%);}\r\n  to {transform: translateX(0%);}\r\n}\r\n\r\n\r\n</style>\r\n"]}, media: undefined });

    };
    /* scoped */
    var __vue_scope_id__$2 = undefined;
    /* module identifier */
    var __vue_module_identifier__$2 = undefined;
    /* functional template */
    var __vue_is_functional_template__$2 = false;
    /* style inject SSR */
    
    /* style inject shadow dom */
    

    
    var __vue_component__$2 = /*#__PURE__*/normalizeComponent(
      { render: __vue_render__$2, staticRenderFns: __vue_staticRenderFns__$2 },
      __vue_inject_styles__$2,
      __vue_script__$2,
      __vue_scope_id__$2,
      __vue_is_functional_template__$2,
      __vue_module_identifier__$2,
      false,
      createInjector,
      undefined,
      undefined
    );

  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //


  var script$3 = {
    name: 'AppTemplateFooter',
    props: {
      options: Object,
    },
    components: {

    },
    data: function data(){
      return {

      }
    },
    computed: {

    }
  };

  /* script */
  var __vue_script__$3 = script$3;
  var __vue_render__$3 = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c("footer", [
      _c("img", {
        staticClass: "logo rotating",
        attrs: { src: img, alt: "logo" }
      }),
      _vm._v(" "),
      _c("span", [_vm._v(_vm._s(_vm.options.title))]),
      _vm._v(" "),
      _c("span", [_vm._v("-")]),
      _vm._v(" "),
      _c("a", { attrs: { href: "https://maximemoreillon.com" } }, [
        _vm._v("Maxime Moreillon")
      ])
    ])
  };
  var __vue_staticRenderFns__$3 = [];
  __vue_render__$3._withStripped = true;

    /* style */
    var __vue_inject_styles__$3 = function (inject) {
      if (!inject) { return }
      inject("data-v-211f5b5c_0", { source: "\nfooter[data-v-211f5b5c] {\r\n  padding: 0.5em;\r\n  font-size: 80%;\r\n  display: flex;\r\n  justify-content: center;\r\n  align-items: center;\r\n  /*\r\n  animation-name: apparition;\r\n  animation-duration: 1s;\r\n  animation-fill-mode: both;\r\n  */\n}\nfooter a[data-v-211f5b5c] {\r\n  text-decoration: none;\r\n  color: inherit;\n}\nfooter .logo[data-v-211f5b5c] {\r\n  height: 1.5em;\r\n  width: 1.5em;\n}\nfooter > *[data-v-211f5b5c]:not(:last-child) {\r\n  margin-right: 0.5em;\n}\n@keyframes apparition-data-v-211f5b5c {\nfrom {transform: translateY(150%);}\nto {transform: translateX(0%);}\n}\r\n\r\n", map: {"version":3,"sources":["/home/moreillon/vue/vue_application_template/src/components/AppTemplateFooter.vue"],"names":[],"mappings":";AAmCA;EACA,cAAA;EACA,cAAA;EACA,aAAA;EACA,uBAAA;EACA,mBAAA;EACA;;;;GAIA;AACA;AAEA;EACA,qBAAA;EACA,cAAA;AACA;AAEA;EACA,aAAA;EACA,YAAA;AACA;AAEA;EACA,mBAAA;AACA;AAGA;AACA,MAAA,2BAAA,CAAA;AACA,IAAA,yBAAA,CAAA;AACA","file":"AppTemplateFooter.vue","sourcesContent":["<template>\r\n  <footer>\r\n    <img\r\n      src=\"../assets/img/logo/logo.png\"\r\n      alt=\"logo\"\r\n      class=\"logo rotating\">\r\n    <span>{{options.title}}</span>\r\n    <span>-</span>\r\n    <a href=\"https://maximemoreillon.com\">Maxime Moreillon</a>\r\n  </footer>\r\n</template>\r\n\r\n<script>\r\n\r\nexport default {\r\n  name: 'AppTemplateFooter',\r\n  props: {\r\n    options: Object,\r\n  },\r\n  components: {\r\n\r\n  },\r\n  data(){\r\n    return {\r\n\r\n    }\r\n  },\r\n  computed: {\r\n\r\n  }\r\n}\r\n</script>\r\n\r\n<style scoped>\r\n\r\nfooter {\r\n  padding: 0.5em;\r\n  font-size: 80%;\r\n  display: flex;\r\n  justify-content: center;\r\n  align-items: center;\r\n  /*\r\n  animation-name: apparition;\r\n  animation-duration: 1s;\r\n  animation-fill-mode: both;\r\n  */\r\n}\r\n\r\nfooter a {\r\n  text-decoration: none;\r\n  color: inherit;\r\n}\r\n\r\nfooter .logo {\r\n  height: 1.5em;\r\n  width: 1.5em;\r\n}\r\n\r\nfooter > *:not(:last-child) {\r\n  margin-right: 0.5em;\r\n}\r\n\r\n\r\n@keyframes apparition {\r\n  from {transform: translateY(150%);}\r\n  to {transform: translateX(0%);}\r\n}\r\n\r\n</style>\r\n"]}, media: undefined });

    };
    /* scoped */
    var __vue_scope_id__$3 = "data-v-211f5b5c";
    /* module identifier */
    var __vue_module_identifier__$3 = undefined;
    /* functional template */
    var __vue_is_functional_template__$3 = false;
    /* style inject SSR */
    
    /* style inject shadow dom */
    

    
    var __vue_component__$3 = /*#__PURE__*/normalizeComponent(
      { render: __vue_render__$3, staticRenderFns: __vue_staticRenderFns__$3 },
      __vue_inject_styles__$3,
      __vue_script__$3,
      __vue_scope_id__$3,
      __vue_is_functional_template__$3,
      __vue_module_identifier__$3,
      false,
      createInjector,
      undefined,
      undefined
    );

  //


  var script$4 = {
    name: 'AppTemplateMain',
    props: {
      options: Object,
    },
    mixins: [
      StoreMixin
    ],
    components: {
      AppTemplateFooter: __vue_component__$3,
      Loader: Loader,
    }


  };

  /* script */
  var __vue_script__$4 = script$4;

  /* template */
  var __vue_render__$4 = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c(
      "main",
      { key: "main" },
      [
        _vm.$slots.default
          ? _c("div", { staticClass: "actual_main" }, [_vm._t("default")], 2)
          : [
              _c(
                "transition",
                {
                  attrs: { name: "route-transition", mode: "out-in", appear: "" }
                },
                [
                  !_vm.route_loading
                    ? _c("router-view", { staticClass: "actual_main" })
                    : _vm._e(),
                  _vm._v(" "),
                  _vm.route_loading
                    ? _c(
                        "div",
                        { staticClass: "actual_main loader_wrapper" },
                        [_c("Loader")],
                        1
                      )
                    : _vm._e()
                ],
                1
              )
            ],
        _vm._v(" "),
        _c("AppTemplateFooter", { attrs: { options: _vm.options } })
      ],
      2
    )
  };
  var __vue_staticRenderFns__$4 = [];
  __vue_render__$4._withStripped = true;

    /* style */
    var __vue_inject_styles__$4 = function (inject) {
      if (!inject) { return }
      inject("data-v-597512fd_0", { source: "\nmain[data-v-597512fd] {\r\n  overflow-y: auto;\r\n  display: flex;\r\n  flex-direction: column;\n}\n.loader_wrapper[data-v-597512fd] {\r\n  display: flex;\r\n  justify-content: center;\r\n  align-items: center;\r\n  font-size: 200%;\n}\n.actual_main[data-v-597512fd] {\r\n  flex-grow: 1;\r\n  padding: 0 1em;\n}\n.route-transition-enter-active[data-v-597512fd], .route-transition-leave-active[data-v-597512fd] {\r\n  transition: opacity 0.25s;\n}\n.route-transition-enter[data-v-597512fd], .route-transition-leave-to[data-v-597512fd] {\r\n  opacity: 0;\n}\r\n\r\n", map: {"version":3,"sources":["/home/moreillon/vue/vue_application_template/src/components/AppTemplateMain.vue"],"names":[],"mappings":";AAiEA;EACA,gBAAA;EACA,aAAA;EACA,sBAAA;AACA;AAEA;EACA,aAAA;EACA,uBAAA;EACA,mBAAA;EACA,eAAA;AACA;AAEA;EACA,YAAA;EACA,cAAA;AACA;AAEA;EACA,yBAAA;AACA;AACA;EACA,UAAA;AACA","file":"AppTemplateMain.vue","sourcesContent":["<template>\r\n  <main key=\"main\">\r\n    <!-- main and actual_main different divs due to footer -->\r\n\r\n    <!-- Main can be passed as slot -->\r\n    <!-- Wrapping so as to be the same as when using router -->\r\n    <!-- NOT VERY ELEGANT -->\r\n    <div class=\"actual_main\" v-if=\"$slots.default\">\r\n      <slot />\r\n    </div>\r\n\r\n\r\n    <template v-else>\r\n      <!-- Route transitions -->\r\n      <transition\r\n        name=\"route-transition\"\r\n        mode=\"out-in\"\r\n        appear>\r\n\r\n        <router-view\r\n          v-if=\"!route_loading\"\r\n          class=\"actual_main\"/>\r\n\r\n        <div\r\n          v-if=\"route_loading\"\r\n          class=\"actual_main loader_wrapper\">\r\n          <Loader/>\r\n        </div>\r\n\r\n\r\n\r\n      </transition>\r\n    </template>\r\n\r\n    <AppTemplateFooter :options=\"options\"/>\r\n\r\n  </main>\r\n</template>\r\n\r\n<script>\r\n\r\nimport AppTemplateFooter from './AppTemplateFooter.vue'\r\nimport Loader from '@moreillon/vue_loader'\r\n\r\nimport StoreMixin from '../mixins/store.js'\r\n\r\n\r\nexport default {\r\n  name: 'AppTemplateMain',\r\n  props: {\r\n    options: Object,\r\n  },\r\n  mixins: [\r\n    StoreMixin\r\n  ],\r\n  components: {\r\n    AppTemplateFooter,\r\n    Loader,\r\n  }\r\n\r\n\r\n}\r\n</script>\r\n\r\n<style scoped>\r\nmain {\r\n  overflow-y: auto;\r\n  display: flex;\r\n  flex-direction: column;\r\n}\r\n\r\n.loader_wrapper {\r\n  display: flex;\r\n  justify-content: center;\r\n  align-items: center;\r\n  font-size: 200%;\r\n}\r\n\r\n.actual_main {\r\n  flex-grow: 1;\r\n  padding: 0 1em;\r\n}\r\n\r\n.route-transition-enter-active, .route-transition-leave-active {\r\n  transition: opacity 0.25s;\r\n}\r\n.route-transition-enter, .route-transition-leave-to {\r\n  opacity: 0;\r\n}\r\n\r\n</style>\r\n"]}, media: undefined });

    };
    /* scoped */
    var __vue_scope_id__$4 = "data-v-597512fd";
    /* module identifier */
    var __vue_module_identifier__$4 = undefined;
    /* functional template */
    var __vue_is_functional_template__$4 = false;
    /* style inject SSR */
    
    /* style inject shadow dom */
    

    
    var __vue_component__$4 = /*#__PURE__*/normalizeComponent(
      { render: __vue_render__$4, staticRenderFns: __vue_staticRenderFns__$4 },
      __vue_inject_styles__$4,
      __vue_script__$4,
      __vue_scope_id__$4,
      __vue_is_functional_template__$4,
      __vue_module_identifier__$4,
      false,
      createInjector,
      undefined,
      undefined
    );

  //

  var script$5 = {
    name: 'LoginForm',
    props: {
      options: Object,
    },
    mixins: [StoreMixin],
    components: {
      KeyIcon: KeyIcon,
      AccountIcon: AccountIcon,
    },
    data: function data(){
      return {
        identifier: '',
        password: '',
        error: null,
        processing: false,
      }
    },
    methods: {
      login: function login(){
        var this$1 = this;

        // Send credentials and get JWT

        var url = this.options.login_url;
        var body = { identifier: this.identifier, password: this.password };

        this.error = null;
        this.processing = true;

        axios.post(url, body)
        .then( function (ref) {
          var data = ref.data;

          if(!data.jwt) { return }
          VueCookies.set('jwt', data.jwt);
          this$1.get_user();

          // clear the inputs
          this$1.identifier = '';
          this$1.password = '';

        })
        .catch( function (error) {
          if(error.response) { this$1.error = error.response.data; }
          else { this$1.error = "Error while logging in"; }
          console.error(error);
         })
        .finally(function () {

          this$1.processing = false;

        });
      },



    },
    computed: {

    }
  };

  /* script */
  var __vue_script__$5 = script$5;

  /* template */
  var __vue_render__$5 = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c(
      "form",
      {
        on: {
          submit: function($event) {
            $event.preventDefault();
            return _vm.login()
          }
        }
      },
      [
        _c("div", { staticClass: "title" }, [
          _vm._v("\n    " + _vm._s(_vm.options.title) + "\n  ")
        ]),
        _vm._v(" "),
        _c(
          "div",
          {},
          [
            _c("AccountIcon"),
            _vm._v(" "),
            _c("input", {
              directives: [
                {
                  name: "model",
                  rawName: "v-model",
                  value: _vm.identifier,
                  expression: "identifier"
                }
              ],
              attrs: {
                type: "text",
                autocomplete: "username",
                placeholder: "Username",
                disabled: _vm.processing
              },
              domProps: { value: _vm.identifier },
              on: {
                input: function($event) {
                  if ($event.target.composing) {
                    return
                  }
                  _vm.identifier = $event.target.value;
                }
              }
            })
          ],
          1
        ),
        _vm._v(" "),
        _c(
          "div",
          {},
          [
            _c("KeyIcon"),
            _vm._v(" "),
            _c("input", {
              directives: [
                {
                  name: "model",
                  rawName: "v-model",
                  value: _vm.password,
                  expression: "password"
                }
              ],
              attrs: {
                type: "password",
                autocomplete: "password",
                placeholder: "Password",
                disabled: _vm.processing
              },
              domProps: { value: _vm.password },
              on: {
                input: function($event) {
                  if ($event.target.composing) {
                    return
                  }
                  _vm.password = $event.target.value;
                }
              }
            })
          ],
          1
        ),
        _vm._v(" "),
        _c("input", { attrs: { type: "submit", value: "Login" } }),
        _vm._v(" "),
        _c(
          "button",
          {
            attrs: { type: "button", disabled: _vm.processing },
            on: {
              click: function($event) {
                return _vm.login()
              }
            }
          },
          [_c("span", [_vm._v("Login")])]
        ),
        _vm._v(" "),
        _c("div", { staticClass: "error" }, [
          _vm._v("\n    " + _vm._s(_vm.error) + "\n  ")
        ])
      ]
    )
  };
  var __vue_staticRenderFns__$5 = [];
  __vue_render__$5._withStripped = true;

    /* style */
    var __vue_inject_styles__$5 = function (inject) {
      if (!inject) { return }
      inject("data-v-552d8030_0", { source: "\nform[data-v-552d8030] {\r\n  display: flex;\r\n  flex-direction: column;\r\n  align-items: center;\r\n  justify-content: center;\n}\n.title[data-v-552d8030] {\r\n  font-size: 150%;\n}\nform > *[data-v-552d8030] {\r\n  margin: 0.5em;\n}\nform > div[data-v-552d8030] {\r\n  display: flex;\r\n  align-items: center;\n}\nform input[data-v-552d8030]:not(:first-child) {\r\n  margin-left: 0.5em;\n}\nform input[data-v-552d8030] {\r\n  border: none;\r\n  border-bottom: 1px solid #444444;\r\n  padding: 0.25em;\n}\r\n\r\n/* replace the submit button by a custom buttom */\nform input[type=\"submit\"][data-v-552d8030] {\r\n  display: none;\n}\r\n\r\n", map: {"version":3,"sources":["/home/moreillon/vue/vue_application_template/src/components/LoginForm.vue"],"names":[],"mappings":";AAiIA;EACA,aAAA;EACA,sBAAA;EACA,mBAAA;EACA,uBAAA;AACA;AAEA;EACA,eAAA;AACA;AAEA;EACA,aAAA;AACA;AAEA;EACA,aAAA;EACA,mBAAA;AACA;AAEA;EACA,kBAAA;AACA;AAEA;EACA,YAAA;EACA,gCAAA;EACA,eAAA;AACA;;AAEA,iDAAA;AACA;EACA,aAAA;AACA","file":"LoginForm.vue","sourcesContent":["<template>\r\n  <form\r\n    class=\"\"\r\n    @submit.prevent=\"login()\">\r\n\r\n    <div class=\"title\">\r\n      {{options.title}}\r\n    </div>\r\n\r\n    <!-- username input -->\r\n    <div class=\"\">\r\n\r\n      <AccountIcon />\r\n\r\n      <input\r\n        type=\"text\"\r\n        v-model=\"identifier\"\r\n        autocomplete=\"username\"\r\n        placeholder=\"Username\"\r\n        :disabled=\"processing\">\r\n\r\n    </div>\r\n\r\n    <!-- Password input -->\r\n    <div class=\"\">\r\n\r\n      <KeyIcon />\r\n\r\n      <input\r\n        type=\"password\"\r\n        v-model=\"password\"\r\n        autocomplete=\"password\"\r\n        placeholder=\"Password\"\r\n        :disabled=\"processing\">\r\n\r\n    </div>\r\n\r\n    <!-- This submit input is hidden -->\r\n    <input type=\"submit\" value=\"Login\">\r\n\r\n    <button type=\"button\"\r\n      @click=\"login()\"\r\n      :disabled=\"processing\">\r\n      <span>Login</span>\r\n    </button>\r\n\r\n    <div class=\"error\">\r\n      {{error}}\r\n    </div>\r\n\r\n  </form>\r\n</template>\r\n\r\n<script>\r\n/*\r\nThis component exchanges credentials for a JWT and manages the storage of the JWT in cookies\r\n*/\r\n\r\nimport axios from 'axios'\r\nimport VueCookies from 'vue-cookies'\r\n\r\nimport StoreMixin from '../mixins/store.js'\r\n\r\nimport AccountIcon from 'vue-material-design-icons/Account.vue'\r\nimport KeyIcon from 'vue-material-design-icons/Key.vue'\r\n\r\nexport default {\r\n  name: 'LoginForm',\r\n  props: {\r\n    options: Object,\r\n  },\r\n  mixins: [StoreMixin],\r\n  components: {\r\n    KeyIcon,\r\n    AccountIcon,\r\n  },\r\n  data(){\r\n    return {\r\n      identifier: '',\r\n      password: '',\r\n      error: null,\r\n      processing: false,\r\n    }\r\n  },\r\n  methods: {\r\n    login(){\r\n      // Send credentials and get JWT\r\n\r\n      const url = this.options.login_url\r\n      const body = { identifier: this.identifier, password: this.password }\r\n\r\n      this.error = null\r\n      this.processing = true\r\n\r\n      axios.post(url, body)\r\n      .then( ({data}) => {\r\n        if(!data.jwt) return\r\n        VueCookies.set('jwt', data.jwt)\r\n        this.get_user()\r\n\r\n        // clear the inputs\r\n        this.identifier = ''\r\n        this.password = ''\r\n\r\n      })\r\n      .catch( (error) => {\r\n        if(error.response) this.error = error.response.data\r\n        else this.error = `Error while logging in`\r\n        console.error(error)\r\n       })\r\n      .finally(() => {\r\n\r\n        this.processing = false\r\n\r\n      })\r\n    },\r\n\r\n\r\n\r\n  },\r\n  computed: {\r\n\r\n  }\r\n}\r\n</script>\r\n\r\n<style scoped>\r\n\r\n\r\nform {\r\n  display: flex;\r\n  flex-direction: column;\r\n  align-items: center;\r\n  justify-content: center;\r\n}\r\n\r\n.title {\r\n  font-size: 150%;\r\n}\r\n\r\nform > * {\r\n  margin: 0.5em;\r\n}\r\n\r\nform > div {\r\n  display: flex;\r\n  align-items: center;\r\n}\r\n\r\nform input:not(:first-child) {\r\n  margin-left: 0.5em;\r\n}\r\n\r\nform input {\r\n  border: none;\r\n  border-bottom: 1px solid #444444;\r\n  padding: 0.25em;\r\n}\r\n\r\n/* replace the submit button by a custom buttom */\r\nform input[type=\"submit\"] {\r\n  display: none;\r\n}\r\n\r\n</style>\r\n"]}, media: undefined });

    };
    /* scoped */
    var __vue_scope_id__$5 = "data-v-552d8030";
    /* module identifier */
    var __vue_module_identifier__$5 = undefined;
    /* functional template */
    var __vue_is_functional_template__$5 = false;
    /* style inject SSR */
    
    /* style inject shadow dom */
    

    
    var __vue_component__$5 = /*#__PURE__*/normalizeComponent(
      { render: __vue_render__$5, staticRenderFns: __vue_staticRenderFns__$5 },
      __vue_inject_styles__$5,
      __vue_script__$5,
      __vue_scope_id__$5,
      __vue_is_functional_template__$5,
      __vue_module_identifier__$5,
      false,
      createInjector,
      undefined,
      undefined
    );

  //

  var script$6 = {
    name: 'Greetings',
    computed: {
      user: function user(){
        return AppTemplateStore.state.user
      },
    }
  };

  /* script */
  var __vue_script__$6 = script$6;

  /* template */
  var __vue_render__$6 = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c("div", { staticClass: "greetings" }, [
      _vm._v("\r\n  Welcome " + _vm._s(_vm.user.properties.display_name) + "\r\n")
    ])
  };
  var __vue_staticRenderFns__$6 = [];
  __vue_render__$6._withStripped = true;

    /* style */
    var __vue_inject_styles__$6 = function (inject) {
      if (!inject) { return }
      inject("data-v-ae586378_0", { source: "\n.greetings[data-v-ae586378] {\r\n  font-size: 150%;\n}\r\n\r\n", map: {"version":3,"sources":["/home/moreillon/vue/vue_application_template/src/components/Greetings.vue"],"names":[],"mappings":";AAoBA;EACA,eAAA;AACA","file":"Greetings.vue","sourcesContent":["<template>\r\n<div class=\"greetings\">\r\n  Welcome {{user.properties.display_name}}\r\n</div>\r\n</template>\r\n\r\n<script>\r\nimport AppTemplateStore from '../template_store.js'\r\n\r\nexport default {\r\n  name: 'Greetings',\r\n  computed: {\r\n    user(){\r\n      return AppTemplateStore.state.user\r\n    },\r\n  }\r\n}\r\n</script>\r\n\r\n<style scoped>\r\n.greetings {\r\n  font-size: 150%;\r\n}\r\n\r\n</style>\r\n"]}, media: undefined });

    };
    /* scoped */
    var __vue_scope_id__$6 = "data-v-ae586378";
    /* module identifier */
    var __vue_module_identifier__$6 = undefined;
    /* functional template */
    var __vue_is_functional_template__$6 = false;
    /* style inject SSR */
    
    /* style inject shadow dom */
    

    
    var __vue_component__$6 = /*#__PURE__*/normalizeComponent(
      { render: __vue_render__$6, staticRenderFns: __vue_staticRenderFns__$6 },
      __vue_inject_styles__$6,
      __vue_script__$6,
      __vue_scope_id__$6,
      __vue_is_functional_template__$6,
      __vue_module_identifier__$6,
      false,
      createInjector,
      undefined,
      undefined
    );

  //
  var script$7 = {
    name: 'Loading',
    components: {
      Loader: Loader
    }
  };

  /* script */
  var __vue_script__$7 = script$7;

  /* template */
  var __vue_render__$7 = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c("Loader", { staticClass: "loading" }, [_vm._v("Loading")])
  };
  var __vue_staticRenderFns__$7 = [];
  __vue_render__$7._withStripped = true;

    /* style */
    var __vue_inject_styles__$7 = function (inject) {
      if (!inject) { return }
      inject("data-v-4024a914_0", { source: "\n.loading[data-v-4024a914] {\r\n  font-size: 150%;\n}\r\n\r\n", map: {"version":3,"sources":["/home/moreillon/vue/vue_application_template/src/components/Loading.vue"],"names":[],"mappings":";AAeA;EACA,eAAA;AACA","file":"Loading.vue","sourcesContent":["<template>\r\n<Loader class=\"loading\">Loading</Loader>\r\n</template>\r\n\r\n<script>\r\nimport Loader from '@moreillon/vue_loader'\r\nexport default {\r\n  name: 'Loading',\r\n  components: {\r\n    Loader\r\n  }\r\n}\r\n</script>\r\n\r\n<style scoped>\r\n.loading {\r\n  font-size: 150%;\r\n}\r\n\r\n</style>\r\n"]}, media: undefined });

    };
    /* scoped */
    var __vue_scope_id__$7 = "data-v-4024a914";
    /* module identifier */
    var __vue_module_identifier__$7 = undefined;
    /* functional template */
    var __vue_is_functional_template__$7 = false;
    /* style inject SSR */
    
    /* style inject shadow dom */
    

    
    var __vue_component__$7 = /*#__PURE__*/normalizeComponent(
      { render: __vue_render__$7, staticRenderFns: __vue_staticRenderFns__$7 },
      __vue_inject_styles__$7,
      __vue_script__$7,
      __vue_scope_id__$7,
      __vue_is_functional_template__$7,
      __vue_module_identifier__$7,
      false,
      createInjector,
      undefined,
      undefined
    );

  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //

  var script$8 = {
    name: 'AnimatedLogo',
    data: function data(){
      return {
        window_loaded: false,
      }
    },
    mounted: function mounted(){
      window.onload = function() {
        document.body.classList.add("loaded");
      };
    }


  };

  var img$1 = "data:image/svg+xml,%3c%3fxml version='1.0' encoding='UTF-8' standalone='no'%3f%3e%3c!-- Created with Inkscape (http://www.inkscape.org/) --%3e%3csvg xmlns:dc='http://purl.org/dc/elements/1.1/' xmlns:cc='http://creativecommons.org/ns%23' xmlns:rdf='http://www.w3.org/1999/02/22-rdf-syntax-ns%23' xmlns:svg='http://www.w3.org/2000/svg' xmlns='http://www.w3.org/2000/svg' xmlns:sodipodi='http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd' xmlns:inkscape='http://www.inkscape.org/namespaces/inkscape' width='344.7583mm' height='344.7583mm' viewBox='0 0 344.75829 344.7583' version='1.1' id='svg8' sodipodi:docname='logo.svg' inkscape:version='0.92.3 (2405546%2c 2018-03-11)' inkscape:export-filename='C:%5cUsers%5cmmore%5cNextcloud%5cImages%5clogo%5cv3%5clogo.png' inkscape:export-xdpi='96' inkscape:export-ydpi='96'%3e %3cdefs id='defs2' /%3e %3csodipodi:namedview id='base' pagecolor='white' bordercolor='%23666666' borderopacity='1.0' inkscape:pageopacity='0.0' inkscape:pageshadow='2' inkscape:zoom='0.24748737' inkscape:cx='1035.9924' inkscape:cy='674.58802' inkscape:document-units='mm' inkscape:current-layer='layer1' showgrid='false' inkscape:window-width='1920' inkscape:window-height='1017' inkscape:window-x='-8' inkscape:window-y='-8' inkscape:window-maximized='1' inkscape:snap-center='true' inkscape:snap-midpoints='false' inkscape:snap-intersection-paths='false' inkscape:object-nodes='true' fit-margin-top='0' fit-margin-left='0' fit-margin-right='0' fit-margin-bottom='0' /%3e %3cmetadata id='metadata5'%3e %3crdf:RDF%3e %3ccc:Work rdf:about=''%3e %3cdc:format%3eimage/svg%2bxml%3c/dc:format%3e %3cdc:type rdf:resource='http://purl.org/dc/dcmitype/StillImage' /%3e %3cdc:title%3e%3c/dc:title%3e %3c/cc:Work%3e %3c/rdf:RDF%3e %3c/metadata%3e %3cg inkscape:label='Layer 1' inkscape:groupmode='layer' id='layer1' transform='translate(1520.0621%2c691.41901)'%3e %3cg id='g2521'%3e %3cpath inkscape:transform-center-y='-49.821506' inkscape:transform-center-x='-85.72435' id='circle914-3-2-65-4' d='m -1347.6829%2c-691.01871 a 171.97916%2c171.97916 0 0 0 -0.5307%2c0.026 l 29.3093%2c29.3125 a 145.52083%2c145.52083 0 0 1 116.7448%2c142.6404 145.52083%2c145.52083 0 0 1 -19.3895%2c72.3361 l 33.7173%2c-9.0346 a 171.97916%2c171.97916 0 0 0 12.128%2c-63.3015 171.97916%2c171.97916 0 0 0 -171.9792%2c-171.9792 z' style='opacity:1%3bfill:%23c00000%3bfill-opacity:1%3bstroke:none%3bstroke-width:0.80000001%3bstroke-linecap:square%3bstroke-miterlimit:4%3bstroke-dasharray:none%3bstroke-opacity:1' inkscape:connector-curvature='0' /%3e %3cpath inkscape:connector-curvature='0' style='opacity:1%3bfill:%23c00000%3bfill-opacity:1%3bstroke:none%3bstroke-width:0.80000001%3bstroke-linecap:square%3bstroke-miterlimit:4%3bstroke-dasharray:none%3bstroke-opacity:1' d='m -1198.745%2c-433.05034 a 171.97916%2c171.97916 0 0 0 0.2428%2c-0.4726 l -40.04%2c10.72635 a 145.52083%2c145.52083 45 0 1 -181.9026%2c29.78376 145.52083%2c145.52083 45 0 1 -52.9501%2c-52.95985 l -9.0345%2c33.71734 a 171.97916%2c171.97916 0 0 0 48.7567%2c42.15391 171.97916%2c171.97916 0 0 0 234.928%2c-62.94876 z' id='path2514' inkscape:transform-center-x='-7.2172002' inkscape:transform-center-y='122.52324' /%3e %3cpath inkscape:transform-center-y='-41.825078' inkscape:transform-center-x='86.200681' id='path2516' d='m -1496.6211%2c-433.05052 a 171.97916%2c171.97916 0 0 0 0.2879%2c0.44657 l 10.7307%2c-40.03883 a 145.52083%2c145.52083 45 0 1 65.1578%2c-172.42416 145.52083%2c145.52083 45 0 1 72.3396%2c-19.3762 l -24.6828%2c-24.68278 a 171.97916%2c171.97916 0 0 0 -60.8847%2c21.14759 171.97916%2c171.97916 0 0 0 -62.9488%2c234.92799 z' style='opacity:1%3bfill:%23c00000%3bfill-opacity:1%3bstroke:none%3bstroke-width:0.80000001%3bstroke-linecap:square%3bstroke-miterlimit:4%3bstroke-dasharray:none%3bstroke-opacity:1' inkscape:connector-curvature='0' /%3e %3c/g%3e %3c/g%3e%3c/svg%3e";

  var img$2 = "data:image/svg+xml,%3c%3fxml version='1.0' encoding='UTF-8' standalone='no'%3f%3e%3c!-- Created with Inkscape (http://www.inkscape.org/) --%3e%3csvg xmlns:dc='http://purl.org/dc/elements/1.1/' xmlns:cc='http://creativecommons.org/ns%23' xmlns:rdf='http://www.w3.org/1999/02/22-rdf-syntax-ns%23' xmlns:svg='http://www.w3.org/2000/svg' xmlns='http://www.w3.org/2000/svg' xmlns:sodipodi='http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd' xmlns:inkscape='http://www.inkscape.org/namespaces/inkscape' width='344.7583mm' height='344.7583mm' viewBox='0 0 344.75829 344.7583' version='1.1' id='svg8' sodipodi:docname='1.svg' inkscape:version='0.92.3 (2405546%2c 2018-03-11)'%3e %3cdefs id='defs2' /%3e %3csodipodi:namedview id='base' pagecolor='white' bordercolor='%23666666' borderopacity='1.0' inkscape:pageopacity='0.0' inkscape:pageshadow='2' inkscape:zoom='0.24748737' inkscape:cx='-513.28795' inkscape:cy='898.38177' inkscape:document-units='mm' inkscape:current-layer='layer1' showgrid='false' inkscape:window-width='1920' inkscape:window-height='1017' inkscape:window-x='-8' inkscape:window-y='-8' inkscape:window-maximized='1' inkscape:snap-center='true' inkscape:snap-midpoints='false' inkscape:snap-intersection-paths='false' inkscape:object-nodes='true' fit-margin-top='0' fit-margin-left='0' fit-margin-right='0' fit-margin-bottom='0' /%3e %3cmetadata id='metadata5'%3e %3crdf:RDF%3e %3ccc:Work rdf:about=''%3e %3cdc:format%3eimage/svg%2bxml%3c/dc:format%3e %3cdc:type rdf:resource='http://purl.org/dc/dcmitype/StillImage' /%3e %3cdc:title%3e%3c/dc:title%3e %3c/cc:Work%3e %3c/rdf:RDF%3e %3c/metadata%3e %3cg inkscape:label='Layer 1' inkscape:groupmode='layer' id='layer1' transform='translate(923.25898%2c1014.5382)'%3e %3cpath style='opacity:1%3bfill:%23c00000%3bfill-opacity:1%3bstroke:none%3bstroke-width:0.30000001%3bstroke-linecap:square%3bstroke-miterlimit:4%3bstroke-dasharray:none%3bstroke-opacity:1' d='m -618.88382%2c-771.39362 a 149.93054%2c149.93054 0 0 0 -57.03027%2c-200.60916 149.93054%2c149.93054 0 0 0 -51.45192%2c-18.06161 l 5.48818%2c5.48862 a 145.52083%2c145.52083 45 0 1 43.75897%2c16.39177 145.52083%2c145.52083 45 0 1 53.50865%2c198.32476 z' id='path815-3-78-0-9' inkscape:connector-curvature='0' inkscape:transform-center-x='-86.652192' inkscape:transform-center-y='-37.802757' /%3e %3c/g%3e%3c/svg%3e";

  var img$3 = "data:image/svg+xml,%3c%3fxml version='1.0' encoding='UTF-8' standalone='no'%3f%3e%3c!-- Created with Inkscape (http://www.inkscape.org/) --%3e%3csvg xmlns:dc='http://purl.org/dc/elements/1.1/' xmlns:cc='http://creativecommons.org/ns%23' xmlns:rdf='http://www.w3.org/1999/02/22-rdf-syntax-ns%23' xmlns:svg='http://www.w3.org/2000/svg' xmlns='http://www.w3.org/2000/svg' xmlns:sodipodi='http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd' xmlns:inkscape='http://www.inkscape.org/namespaces/inkscape' width='344.7583mm' height='344.7583mm' viewBox='0 0 344.75829 344.7583' version='1.1' id='svg8' sodipodi:docname='2.svg' inkscape:version='0.92.3 (2405546%2c 2018-03-11)'%3e %3cdefs id='defs2' /%3e %3csodipodi:namedview id='base' pagecolor='white' bordercolor='%23666666' borderopacity='1.0' inkscape:pageopacity='0.0' inkscape:pageshadow='2' inkscape:zoom='0.49497475' inkscape:cx='465.81861' inkscape:cy='93.03787' inkscape:document-units='mm' inkscape:current-layer='layer1' showgrid='false' inkscape:window-width='1920' inkscape:window-height='1017' inkscape:window-x='-8' inkscape:window-y='-8' inkscape:window-maximized='1' inkscape:snap-center='true' inkscape:snap-midpoints='false' inkscape:snap-intersection-paths='false' inkscape:object-nodes='true' fit-margin-top='0' fit-margin-left='0' fit-margin-right='0' fit-margin-bottom='0' /%3e %3cmetadata id='metadata5'%3e %3crdf:RDF%3e %3ccc:Work rdf:about=''%3e %3cdc:format%3eimage/svg%2bxml%3c/dc:format%3e %3cdc:type rdf:resource='http://purl.org/dc/dcmitype/StillImage' /%3e %3cdc:title%3e%3c/dc:title%3e %3c/cc:Work%3e %3c/rdf:RDF%3e %3c/metadata%3e %3cg inkscape:label='Layer 1' inkscape:groupmode='layer' id='layer1' transform='translate(923.25898%2c1014.5382)'%3e %3cpath style='opacity:1%3bfill:%23c00000%3bfill-opacity:1%3bstroke:none%3bstroke-width:0.2%3bstroke-linecap:square%3bstroke-miterlimit:4%3bstroke-dasharray:none%3bstroke-opacity:1' d='m -879.70109%2c-757.49501 a 154.34033%2c154.34033 0 0 0 205.99046%2c48.99695 154.34033%2c154.34033 0 0 0 46.42799%2c-41.29271 l -14.76281%2c3.95492 a 145.52083%2c145.52083 0 0 1 -36.07474%2c29.70021 145.52083%2c145.52083 0 0 1 -198.50911%2c-52.8234 z' id='circle1085-8-6-44-3-6-9' inkscape:connector-curvature='0' inkscape:transform-center-x='2.6120385' inkscape:transform-center-y='113.72221' /%3e %3c/g%3e%3c/svg%3e";

  var img$4 = "data:image/svg+xml,%3c%3fxml version='1.0' encoding='UTF-8' standalone='no'%3f%3e%3c!-- Created with Inkscape (http://www.inkscape.org/) --%3e%3csvg xmlns:dc='http://purl.org/dc/elements/1.1/' xmlns:cc='http://creativecommons.org/ns%23' xmlns:rdf='http://www.w3.org/1999/02/22-rdf-syntax-ns%23' xmlns:svg='http://www.w3.org/2000/svg' xmlns='http://www.w3.org/2000/svg' xmlns:sodipodi='http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd' xmlns:inkscape='http://www.inkscape.org/namespaces/inkscape' width='344.7583mm' height='344.7583mm' viewBox='0 0 344.75829 344.7583' version='1.1' id='svg8' sodipodi:docname='3.svg' inkscape:version='0.92.3 (2405546%2c 2018-03-11)'%3e %3cdefs id='defs2' /%3e %3csodipodi:namedview id='base' pagecolor='white' bordercolor='%23666666' borderopacity='1.0' inkscape:pageopacity='0.0' inkscape:pageshadow='2' inkscape:zoom='0.49497475' inkscape:cx='465.81861' inkscape:cy='335.47448' inkscape:document-units='mm' inkscape:current-layer='layer1' showgrid='false' inkscape:window-width='1920' inkscape:window-height='1017' inkscape:window-x='-8' inkscape:window-y='-8' inkscape:window-maximized='1' inkscape:snap-center='true' inkscape:snap-midpoints='false' inkscape:snap-intersection-paths='false' inkscape:object-nodes='true' fit-margin-top='0' fit-margin-left='0' fit-margin-right='0' fit-margin-bottom='0' /%3e %3cmetadata id='metadata5'%3e %3crdf:RDF%3e %3ccc:Work rdf:about=''%3e %3cdc:format%3eimage/svg%2bxml%3c/dc:format%3e %3cdc:type rdf:resource='http://purl.org/dc/dcmitype/StillImage' /%3e %3cdc:title%3e%3c/dc:title%3e %3c/cc:Work%3e %3c/rdf:RDF%3e %3c/metadata%3e %3cg inkscape:label='Layer 1' inkscape:groupmode='layer' id='layer1' transform='translate(923.25898%2c1014.5382)'%3e %3cpath style='opacity:1%3bfill:%23c00000%3bfill-opacity:1%3bstroke:none%3bstroke-width:0.40000001%3bstroke-linecap:square%3bstroke-miterlimit:4%3bstroke-dasharray:none%3bstroke-opacity:1' d='m -763.99242%2c-1000.2526 a 158.75%2c158.74998 0 0 0 -145.63659%2c158.09368 158.75%2c158.74998 0 0 0 15.20992%2c67.36437 l 5.7025%2c-21.27517 a 145.52083%2c145.52083 0 0 1 -7.68325%2c-46.0892 145.52083%2c145.52083 0 0 1 144.9989%2c-145.50221 z' id='circle912-2-2-8-7-2-8' inkscape:connector-curvature='0' inkscape:transform-center-x='79.635155' inkscape:transform-center-y='-45.364582' /%3e %3c/g%3e%3c/svg%3e";

  var img$5 = "data:image/svg+xml,%3c%3fxml version='1.0' encoding='UTF-8' standalone='no'%3f%3e%3c!-- Created with Inkscape (http://www.inkscape.org/) --%3e%3csvg xmlns:dc='http://purl.org/dc/elements/1.1/' xmlns:cc='http://creativecommons.org/ns%23' xmlns:rdf='http://www.w3.org/1999/02/22-rdf-syntax-ns%23' xmlns:svg='http://www.w3.org/2000/svg' xmlns='http://www.w3.org/2000/svg' xmlns:sodipodi='http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd' xmlns:inkscape='http://www.inkscape.org/namespaces/inkscape' width='344.7583mm' height='344.7583mm' viewBox='0 0 344.75829 344.7583' version='1.1' id='svg8' sodipodi:docname='4.svg' inkscape:version='0.92.3 (2405546%2c 2018-03-11)'%3e %3cdefs id='defs2' /%3e %3csodipodi:namedview id='base' pagecolor='white' bordercolor='%23666666' borderopacity='1.0' inkscape:pageopacity='0.0' inkscape:pageshadow='2' inkscape:zoom='0.24748737' inkscape:cx='-186.97191' inkscape:cy='135.58617' inkscape:document-units='mm' inkscape:current-layer='layer1' showgrid='false' inkscape:window-width='1920' inkscape:window-height='1017' inkscape:window-x='-8' inkscape:window-y='-8' inkscape:window-maximized='1' inkscape:snap-center='true' inkscape:snap-midpoints='false' inkscape:snap-intersection-paths='false' inkscape:object-nodes='true' fit-margin-top='0' fit-margin-left='0' fit-margin-right='0' fit-margin-bottom='0' /%3e %3cmetadata id='metadata5'%3e %3crdf:RDF%3e %3ccc:Work rdf:about=''%3e %3cdc:format%3eimage/svg%2bxml%3c/dc:format%3e %3cdc:type rdf:resource='http://purl.org/dc/dcmitype/StillImage' /%3e %3cdc:title%3e%3c/dc:title%3e %3c/cc:Work%3e %3c/rdf:RDF%3e %3c/metadata%3e %3cg inkscape:label='Layer 1' inkscape:groupmode='layer' id='layer1' transform='translate(923.25898%2c1014.5382)'%3e %3cpath style='opacity:1%3bfill:%23c00000%3bfill-opacity:1%3bstroke:none%3bstroke-width:0.2%3bstroke-linecap:square%3bstroke-miterlimit:4%3bstroke-dasharray:none%3bstroke-opacity:1' d='m -618.79793%2c-771.41644 16.84944%2c-4.51517 a 163.15968%2c163.15968 0 0 0 -7.63094%2c-147.80736 163.15968%2c163.15968 0 0 0 -132.77672%2c-81.31743 l 14.92932%2c14.93088 a 149.93054%2c149.93054 0 0 1 106.39086%2c73.00159 149.93054%2c149.93054 0 0 1 2.23804%2c145.70749 z' id='circle1083-8-4-4-9' inkscape:connector-curvature='0' inkscape:transform-center-x='-85.790103' inkscape:transform-center-y='-46.077359' /%3e %3c/g%3e%3c/svg%3e";

  var img$6 = "data:image/svg+xml,%3c%3fxml version='1.0' encoding='UTF-8' standalone='no'%3f%3e%3c!-- Created with Inkscape (http://www.inkscape.org/) --%3e%3csvg xmlns:dc='http://purl.org/dc/elements/1.1/' xmlns:cc='http://creativecommons.org/ns%23' xmlns:rdf='http://www.w3.org/1999/02/22-rdf-syntax-ns%23' xmlns:svg='http://www.w3.org/2000/svg' xmlns='http://www.w3.org/2000/svg' xmlns:sodipodi='http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd' xmlns:inkscape='http://www.inkscape.org/namespaces/inkscape' width='344.7583mm' height='344.7583mm' viewBox='0 0 344.75829 344.7583' version='1.1' id='svg8' sodipodi:docname='5.svg' inkscape:version='0.92.3 (2405546%2c 2018-03-11)'%3e %3cdefs id='defs2' /%3e %3csodipodi:namedview id='base' pagecolor='white' bordercolor='%23666666' borderopacity='1.0' inkscape:pageopacity='0.0' inkscape:pageshadow='2' inkscape:zoom='0.98994949' inkscape:cx='719.80042' inkscape:cy='254.40329' inkscape:document-units='mm' inkscape:current-layer='layer1' showgrid='false' inkscape:window-width='1920' inkscape:window-height='1017' inkscape:window-x='-8' inkscape:window-y='-8' inkscape:window-maximized='1' inkscape:snap-center='true' inkscape:snap-midpoints='false' inkscape:snap-intersection-paths='false' inkscape:object-nodes='true' fit-margin-top='0' fit-margin-left='0' fit-margin-right='0' fit-margin-bottom='0' /%3e %3cmetadata id='metadata5'%3e %3crdf:RDF%3e %3ccc:Work rdf:about=''%3e %3cdc:format%3eimage/svg%2bxml%3c/dc:format%3e %3cdc:type rdf:resource='http://purl.org/dc/dcmitype/StillImage' /%3e %3cdc:title%3e%3c/dc:title%3e %3c/cc:Work%3e %3c/rdf:RDF%3e %3c/metadata%3e %3cg inkscape:label='Layer 1' inkscape:groupmode='layer' id='layer1' transform='translate(923.25898%2c1014.5382)'%3e %3cpath style='opacity:1%3bfill:%23c00000%3bfill-opacity:1%3bstroke:none%3bstroke-width:0.40000001%3bstroke-linecap:square%3bstroke-miterlimit:4%3bstroke-dasharray:none%3bstroke-opacity:1' d='m -879.73595%2c-757.35168 -1.52033%2c5.67563 a 158.75%2c158.74998 0 0 0 130.37861%2c68.26663 158.75%2c158.74998 0 0 0 130.11402%2c-68.12505 l -6.74946%2c1.80816 a 154.34033%2c154.34033 0 0 1 -123.36405%2c61.90682 154.34033%2c154.34033 0 0 1 -128.85879%2c-69.53219 z' id='circle912-2-5-1-6-8-5' inkscape:connector-curvature='0' inkscape:transform-center-x='0.13014313' inkscape:transform-center-y='121.77834' /%3e %3c/g%3e%3c/svg%3e";

  var img$7 = "data:image/svg+xml,%3c%3fxml version='1.0' encoding='UTF-8' standalone='no'%3f%3e%3c!-- Created with Inkscape (http://www.inkscape.org/) --%3e%3csvg xmlns:dc='http://purl.org/dc/elements/1.1/' xmlns:cc='http://creativecommons.org/ns%23' xmlns:rdf='http://www.w3.org/1999/02/22-rdf-syntax-ns%23' xmlns:svg='http://www.w3.org/2000/svg' xmlns='http://www.w3.org/2000/svg' xmlns:sodipodi='http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd' xmlns:inkscape='http://www.inkscape.org/namespaces/inkscape' width='344.7583mm' height='344.7583mm' viewBox='0 0 344.75829 344.7583' version='1.1' id='svg8' sodipodi:docname='6.svg' inkscape:version='0.92.3 (2405546%2c 2018-03-11)'%3e %3cdefs id='defs2' /%3e %3csodipodi:namedview id='base' pagecolor='white' bordercolor='%23666666' borderopacity='1.0' inkscape:pageopacity='0.0' inkscape:pageshadow='2' inkscape:zoom='1.4' inkscape:cx='253.91785' inkscape:cy='549.57432' inkscape:document-units='mm' inkscape:current-layer='layer1' showgrid='false' inkscape:window-width='1920' inkscape:window-height='1017' inkscape:window-x='-8' inkscape:window-y='-8' inkscape:window-maximized='1' inkscape:snap-center='true' inkscape:snap-midpoints='false' inkscape:snap-intersection-paths='false' inkscape:object-nodes='true' fit-margin-top='0' fit-margin-left='0' fit-margin-right='0' fit-margin-bottom='0' /%3e %3cmetadata id='metadata5'%3e %3crdf:RDF%3e %3ccc:Work rdf:about=''%3e %3cdc:format%3eimage/svg%2bxml%3c/dc:format%3e %3cdc:type rdf:resource='http://purl.org/dc/dcmitype/StillImage' /%3e %3cdc:title%3e%3c/dc:title%3e %3c/cc:Work%3e %3c/rdf:RDF%3e %3c/metadata%3e %3cg inkscape:label='Layer 1' inkscape:groupmode='layer' id='layer1' transform='translate(923.25898%2c1014.5382)'%3e %3cpath style='opacity:1%3bfill:%23c00000%3bfill-opacity:1%3bstroke:none%3bstroke-width:0.30000001%3bstroke-linecap:square%3bstroke-miterlimit:4%3bstroke-dasharray:none%3bstroke-opacity:1' d='m -897.85363%2c-761.97829 3.38004%2c-12.6106 a 158.74998%2c158.75 30 0 1 6.11142%2c-146.94286 158.74998%2c158.75 30 0 1 124.43484%2c-78.65625 l -8.00083%2c-8.0002 a 167.56949%2c167.56949 0 0 0 -124.07177%2c82.2462 167.56949%2c167.56949 0 0 0 -1.8537%2c163.96371 z' id='path815-1-0-6-7-24-6-0-4' inkscape:connector-curvature='0' inkscape:transform-center-x='90.265362' inkscape:transform-center-y='-42.92425' /%3e %3c/g%3e%3c/svg%3e";

  var img$8 = "data:image/svg+xml,%3c%3fxml version='1.0' encoding='UTF-8' standalone='no'%3f%3e%3c!-- Created with Inkscape (http://www.inkscape.org/) --%3e%3csvg xmlns:dc='http://purl.org/dc/elements/1.1/' xmlns:cc='http://creativecommons.org/ns%23' xmlns:rdf='http://www.w3.org/1999/02/22-rdf-syntax-ns%23' xmlns:svg='http://www.w3.org/2000/svg' xmlns='http://www.w3.org/2000/svg' xmlns:sodipodi='http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd' xmlns:inkscape='http://www.inkscape.org/namespaces/inkscape' width='344.7583mm' height='344.7583mm' viewBox='0 0 344.75829 344.7583' version='1.1' id='svg8' sodipodi:docname='7.svg' inkscape:version='0.92.3 (2405546%2c 2018-03-11)'%3e %3cdefs id='defs2' /%3e %3csodipodi:namedview id='base' pagecolor='white' bordercolor='%23666666' borderopacity='1.0' inkscape:pageopacity='0.0' inkscape:pageshadow='2' inkscape:zoom='0.49497475' inkscape:cx='339.4786' inkscape:cy='706.47658' inkscape:document-units='mm' inkscape:current-layer='layer1' showgrid='false' inkscape:window-width='1920' inkscape:window-height='1017' inkscape:window-x='-8' inkscape:window-y='-8' inkscape:window-maximized='1' inkscape:snap-center='true' inkscape:snap-midpoints='false' inkscape:snap-intersection-paths='false' inkscape:object-nodes='true' fit-margin-top='0' fit-margin-left='0' fit-margin-right='0' fit-margin-bottom='0' /%3e %3cmetadata id='metadata5'%3e %3crdf:RDF%3e %3ccc:Work rdf:about=''%3e %3cdc:format%3eimage/svg%2bxml%3c/dc:format%3e %3cdc:type rdf:resource='http://purl.org/dc/dcmitype/StillImage' /%3e %3cdc:title%3e%3c/dc:title%3e %3c/cc:Work%3e %3c/rdf:RDF%3e %3c/metadata%3e %3cg inkscape:label='Layer 1' inkscape:groupmode='layer' id='layer1' transform='translate(923.25898%2c1014.5382)'%3e %3cpath style='opacity:1%3bfill:%23c00000%3bfill-opacity:1%3bstroke:none%3bstroke-width:3.02362204%3bstroke-linecap:square%3bstroke-miterlimit:4%3bstroke-dasharray:none%3bstroke-opacity:1' d='m -2837.9785%2c-3832.9609 a 649.99997%2c649.99997 0 0 0 -1.9942%2c0.1 l 34.8711%2c34.8769 a 616.66651%2c616.66651 0 0 1 583.7989%2c615.0215 616.66651%2c616.66651 0 0 1 -53.5645%2c250.252 l 41.0488%2c-10.9981 a 649.99997%2c649.99997 0 0 0 45.8399%2c-239.2539 649.99997%2c649.99997 0 0 0 -650%2c-649.998 z' transform='scale(0.26458333)' id='circle914-38-4-2' inkscape:connector-curvature='0' inkscape:transform-center-x='-85.723786' inkscape:transform-center-y='-52.88293' /%3e %3c/g%3e%3c/svg%3e";

  var img$9 = "data:image/svg+xml,%3c%3fxml version='1.0' encoding='UTF-8' standalone='no'%3f%3e%3c!-- Created with Inkscape (http://www.inkscape.org/) --%3e%3csvg xmlns:dc='http://purl.org/dc/elements/1.1/' xmlns:cc='http://creativecommons.org/ns%23' xmlns:rdf='http://www.w3.org/1999/02/22-rdf-syntax-ns%23' xmlns:svg='http://www.w3.org/2000/svg' xmlns='http://www.w3.org/2000/svg' xmlns:sodipodi='http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd' xmlns:inkscape='http://www.inkscape.org/namespaces/inkscape' width='344.7583mm' height='344.7583mm' viewBox='0 0 344.75829 344.7583' version='1.1' id='svg8' sodipodi:docname='8.svg' inkscape:version='0.92.3 (2405546%2c 2018-03-11)'%3e %3cdefs id='defs2' /%3e %3csodipodi:namedview id='base' pagecolor='white' bordercolor='%23666666' borderopacity='1.0' inkscape:pageopacity='0.0' inkscape:pageshadow='2' inkscape:zoom='0.35' inkscape:cx='379.86188' inkscape:cy='363.21409' inkscape:document-units='mm' inkscape:current-layer='layer1' showgrid='false' inkscape:window-width='1920' inkscape:window-height='1017' inkscape:window-x='-8' inkscape:window-y='-8' inkscape:window-maximized='1' inkscape:snap-center='true' inkscape:snap-midpoints='false' inkscape:snap-intersection-paths='false' inkscape:object-nodes='true' fit-margin-top='0' fit-margin-left='0' fit-margin-right='0' fit-margin-bottom='0' /%3e %3cmetadata id='metadata5'%3e %3crdf:RDF%3e %3ccc:Work rdf:about=''%3e %3cdc:format%3eimage/svg%2bxml%3c/dc:format%3e %3cdc:type rdf:resource='http://purl.org/dc/dcmitype/StillImage' /%3e %3cdc:title%3e%3c/dc:title%3e %3c/cc:Work%3e %3c/rdf:RDF%3e %3c/metadata%3e %3cg inkscape:label='Layer 1' inkscape:groupmode='layer' id='layer1' transform='translate(923.25898%2c1014.5382)'%3e %3cpath style='opacity:1%3bfill:%23c00000%3bfill-opacity:1%3bstroke:none%3bstroke-width:0.80000001%3bstroke-linecap:square%3bstroke-miterlimit:4%3bstroke-dasharray:none%3bstroke-opacity:1' d='m -601.94154%2c-756.16923 a 171.97916%2c171.97916 0 0 0 0.24116%2c-0.47061 l -18.94664%2c5.07561 a 158.74998%2c158.75 30 0 1 -209.60871%2c46.88824 158.74998%2c158.75 30 0 1 -50.95513%2c-47.17878 l -4.41565%2c16.47965 a 171.97916%2c171.97916 0 0 0 48.75697%2c42.15458 171.97916%2c171.97916 0 0 0 234.92791%2c-62.94874 z' id='circle914-38-3-73-9-3-9' inkscape:connector-curvature='0' inkscape:transform-center-x='-7.2163783' inkscape:transform-center-y='128.74912' /%3e %3c/g%3e%3c/svg%3e";

  var img$a = "data:image/svg+xml,%3c%3fxml version='1.0' encoding='UTF-8' standalone='no'%3f%3e%3c!-- Created with Inkscape (http://www.inkscape.org/) --%3e%3csvg xmlns:dc='http://purl.org/dc/elements/1.1/' xmlns:cc='http://creativecommons.org/ns%23' xmlns:rdf='http://www.w3.org/1999/02/22-rdf-syntax-ns%23' xmlns:svg='http://www.w3.org/2000/svg' xmlns='http://www.w3.org/2000/svg' xmlns:sodipodi='http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd' xmlns:inkscape='http://www.inkscape.org/namespaces/inkscape' width='344.7583mm' height='344.7583mm' viewBox='0 0 344.75829 344.7583' version='1.1' id='svg8' sodipodi:docname='9.svg' inkscape:version='0.92.3 (2405546%2c 2018-03-11)'%3e %3cdefs id='defs2' /%3e %3csodipodi:namedview id='base' pagecolor='white' bordercolor='%23666666' borderopacity='1.0' inkscape:pageopacity='0.0' inkscape:pageshadow='2' inkscape:zoom='0.12374369' inkscape:cx='1732.934' inkscape:cy='717.91995' inkscape:document-units='mm' inkscape:current-layer='layer1' showgrid='false' inkscape:window-width='1920' inkscape:window-height='1017' inkscape:window-x='-8' inkscape:window-y='-8' inkscape:window-maximized='1' inkscape:snap-center='true' inkscape:snap-midpoints='false' inkscape:snap-intersection-paths='false' inkscape:object-nodes='true' fit-margin-top='0' fit-margin-left='0' fit-margin-right='0' fit-margin-bottom='0' /%3e %3cmetadata id='metadata5'%3e %3crdf:RDF%3e %3ccc:Work rdf:about=''%3e %3cdc:format%3eimage/svg%2bxml%3c/dc:format%3e %3cdc:type rdf:resource='http://purl.org/dc/dcmitype/StillImage' /%3e %3cdc:title%3e%3c/dc:title%3e %3c/cc:Work%3e %3c/rdf:RDF%3e %3c/metadata%3e %3cg inkscape:label='Layer 1' inkscape:groupmode='layer' id='layer1' transform='translate(923.25898%2c1014.5382)'%3e %3cpath style='opacity:1%3bfill:%23c00000%3bfill-opacity:1%3bstroke:none%3bstroke-width:0.80000001%3bstroke-linecap:square%3bstroke-miterlimit:4%3bstroke-dasharray:none%3bstroke-opacity:1' d='m -899.81801%2c-756.16919 a 171.97916%2c171.97916 0 0 0 0.28801%2c0.44594 l 1.67916%2c-6.26524 a 167.56949%2c167.56949 0 0 1 63.18619%2c-225.29032 167.56949%2c167.56949 0 0 1 62.57158%2c-21.07439 l -3.89137%2c-3.8916 a 171.97916%2c171.97916 0 0 0 -60.88473%2c21.14765 171.97916%2c171.97916 0 0 0 -62.94875%2c234.92791 z' id='circle914-38-1-7-6-3-2' inkscape:connector-curvature='0' inkscape:transform-center-x='96.596093' inkscape:transform-center-y='-41.825081' /%3e %3c/g%3e%3c/svg%3e";

  /* script */
  var __vue_script__$8 = script$8;
  var __vue_render__$8 = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _vm._m(0)
  };
  var __vue_staticRenderFns__$8 = [
    function() {
      var _vm = this;
      var _h = _vm.$createElement;
      var _c = _vm._self._c || _h;
      return _c("div", { staticClass: "logo_wrapper" }, [
        _c("div", { staticClass: "logo_layer logo_layer_full" }, [
          _c("img", {
            staticClass: "logo_part logo_full",
            attrs: { src: img$1 }
          })
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "logo_layer logo_layer_1" }, [
          _c("img", {
            staticClass: "logo_part logo_part_1",
            attrs: { src: img$2 }
          }),
          _vm._v(" "),
          _c("img", {
            staticClass: "logo_part logo_part_2",
            attrs: { src: img$3 }
          }),
          _vm._v(" "),
          _c("img", {
            staticClass: "logo_part logo_part_3",
            attrs: { src: img$4 }
          })
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "logo_layer logo_layer_2" }, [
          _c("img", {
            staticClass: "logo_part logo_part_4",
            attrs: { src: img$5 }
          }),
          _vm._v(" "),
          _c("img", {
            staticClass: "logo_part logo_part_5",
            attrs: { src: img$6 }
          }),
          _vm._v(" "),
          _c("img", {
            staticClass: "logo_part logo_part_6",
            attrs: { src: img$7 }
          })
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "logo_layer logo_layer_3" }, [
          _c("img", {
            staticClass: "logo_part logo_part_7",
            attrs: { src: img$8 }
          }),
          _vm._v(" "),
          _c("img", {
            staticClass: "logo_part logo_part_8",
            attrs: { src: img$9 }
          }),
          _vm._v(" "),
          _c("img", {
            staticClass: "logo_part logo_part_9",
            attrs: { src: img$a }
          })
        ])
      ])
    }
  ];
  __vue_render__$8._withStripped = true;

    /* style */
    var __vue_inject_styles__$8 = function (inject) {
      if (!inject) { return }
      inject("data-v-e8784578_0", { source: "\n.logo_wrapper[data-v-e8784578]{\r\n  /* This is a rotating frame for all logo elements */\r\n\r\n  /* IE compatibility */\r\n  position: relative;\r\n\r\n  /* centering */\r\n  display: flex;\r\n  justify-content: center;\r\n  align-items: center;\r\n\r\n  /* overall rotation of the logo */\r\n  animation-name: rotation-data-v-e8784578;\r\n  animation-duration: 100s;\r\n  animation-iteration-count: infinite;\r\n  animation-timing-function: linear;\n}\r\n\r\n\r\n/* Layouting */\n.logo_layer[data-v-e8784578] {\r\n\r\n  /* positioning and sizing */\r\n  position: absolute;\r\n  width: 100%;\r\n  height: 100%;\r\n\r\n  /* Needed for IE */\r\n  top: 0;\r\n  left: 0;\r\n\r\n  /* centering content*/\r\n  display: flex;\r\n  justify-content: center;\r\n  align-items: center;\r\n\r\n  opacity: 0; /* needs to be transparent until loading complete */\r\n\r\n  /* animations */\r\n  animation-iteration-count: 1;\r\n  animation-timing-function: ease;\r\n  animation-fill-mode: both;\n}\n.logo_part[data-v-e8784578] {\r\n\r\n  /* positioning and sizing */\r\n  position: absolute;\r\n  width: 100%;\r\n  height: 100%;\r\n\r\n  /* Needed for IE */\r\n  top: 0;\r\n  left: 0;\n}\n.logo_layer_full[data-v-e8784578] {\r\n  z-index: 10;\n}\nbody.loaded .logo_layer_1[data-v-e8784578]  {\r\n  animation-name: layer_1_apparition-data-v-e8784578;\r\n  animation-delay: 0;\r\n  animation-duration: 1.5s;\n}\nbody.loaded .logo_layer_2[data-v-e8784578] {\r\n  animation-name: layer_2_apparition-data-v-e8784578;\r\n  animation-delay: 0.25s;\r\n  animation-duration: 1.25s;\n}\nbody.loaded .logo_layer_3[data-v-e8784578]{\r\n  animation-name: layer_3_apparition-data-v-e8784578;\r\n  animation-delay: 0.5s;\r\n  animation-duration: 1s;\n}\r\n\r\n/* overlay of full logo */\nbody.loaded .logo_layer_full[data-v-e8784578]{\r\n  animation-name: fade;\r\n  animation-duration: 0.5s;\r\n  animation-delay: 1.5s;\n}\r\n\r\n\r\n/* ANIMATIONS */\n@keyframes rotation-data-v-e8784578 {\n0%   {\r\n    transform: rotate(0deg);\n}\n100% {\r\n    transform: rotate(360deg);\n}\n}\n@keyframes layer_1_apparition-data-v-e8784578 {\n0%   {\r\n    opacity: 0;\r\n    transform: scale(1.5) rotate(540deg);\n}\n100% {\r\n    opacity: 1;\r\n    transform: scale(1) rotate(0deg);\n}\n}\n@keyframes layer_2_apparition-data-v-e8784578 {\n0%   {\r\n    opacity: 0;\r\n    transform: scale(1.5) rotate(0);\n}\n100% {\r\n    opacity: 1;\r\n    transform: scale(1) rotate(360deg);\n}\n}\n@keyframes layer_3_apparition-data-v-e8784578 {\n0%   {\r\n    opacity: 0;\r\n    transform: scale(1.5) rotate(180deg);\n}\n100% {\r\n    opacity: 1;\r\n    transform: scale(1) rotate(0deg);\n}\n}\r\n\r\n", map: {"version":3,"sources":["/home/moreillon/vue/vue_application_template/src/components/AnimatedLogo.vue"],"names":[],"mappings":";AAoDA;EACA,mDAAA;;EAEA,qBAAA;EACA,kBAAA;;EAEA,cAAA;EACA,aAAA;EACA,uBAAA;EACA,mBAAA;;EAEA,iCAAA;EACA,wCAAA;EACA,wBAAA;EACA,mCAAA;EACA,iCAAA;AACA;;;AAGA,cAAA;AACA;;EAEA,2BAAA;EACA,kBAAA;EACA,WAAA;EACA,YAAA;;EAEA,kBAAA;EACA,MAAA;EACA,OAAA;;EAEA,qBAAA;EACA,aAAA;EACA,uBAAA;EACA,mBAAA;;EAEA,UAAA,EAAA,mDAAA;;EAEA,eAAA;EACA,4BAAA;EACA,+BAAA;EACA,yBAAA;AACA;AAEA;;EAEA,2BAAA;EACA,kBAAA;EACA,WAAA;EACA,YAAA;;EAEA,kBAAA;EACA,MAAA;EACA,OAAA;AAEA;AAEA;EACA,WAAA;AACA;AAIA;EACA,kDAAA;EACA,kBAAA;EACA,wBAAA;AACA;AAEA;EACA,kDAAA;EACA,sBAAA;EACA,yBAAA;AACA;AAEA;EACA,kDAAA;EACA,qBAAA;EACA,sBAAA;AACA;;AAEA,yBAAA;AACA;EACA,oBAAA;EACA,wBAAA;EACA,qBAAA;AACA;;;AAGA,eAAA;AACA;AACA;IACA,uBAAA;AACA;AACA;IACA,yBAAA;AACA;AACA;AAEA;AACA;IACA,UAAA;IACA,oCAAA;AACA;AACA;IACA,UAAA;IACA,gCAAA;AACA;AACA;AAEA;AACA;IACA,UAAA;IACA,+BAAA;AACA;AACA;IACA,UAAA;IACA,kCAAA;AACA;AACA;AAEA;AACA;IACA,UAAA;IACA,oCAAA;AACA;AACA;IACA,UAAA;IACA,gCAAA;AACA;AACA","file":"AnimatedLogo.vue","sourcesContent":["<template>\r\n  <!-- Logo wrapper for global rotation -->\r\n  <div class=\"logo_wrapper\">\r\n\r\n    <!-- The full logo that overlays with the parts once animation is done\r\n     This is used to hide seams between logo parts -->\r\n    <div class=\"logo_layer logo_layer_full\">\r\n      <img class=\"logo_part logo_full\" src=\"../assets/img/logo/logo.svg\">\r\n    </div>\r\n\r\n    <!-- Logo layers that can rotate independantly -->\r\n    <div class=\"logo_layer logo_layer_1\">\r\n      <img class=\"logo_part logo_part_1\" src=\"../assets/img/logo/parts/1.svg\">\r\n      <img class=\"logo_part logo_part_2\" src=\"../assets/img/logo/parts/2.svg\">\r\n      <img class=\"logo_part logo_part_3\" src=\"../assets/img/logo/parts/3.svg\">\r\n    </div>\r\n    <div class=\"logo_layer logo_layer_2\">\r\n      <img class=\"logo_part logo_part_4\" src=\"../assets/img/logo/parts/4.svg\">\r\n      <img class=\"logo_part logo_part_5\" src=\"../assets/img/logo/parts/5.svg\">\r\n      <img class=\"logo_part logo_part_6\" src=\"../assets/img/logo/parts/6.svg\">\r\n    </div>\r\n    <div class=\"logo_layer logo_layer_3\">\r\n      <img class=\"logo_part logo_part_7\" src=\"../assets/img/logo/parts/7.svg\">\r\n      <img class=\"logo_part logo_part_8\" src=\"../assets/img/logo/parts/8.svg\">\r\n      <img class=\"logo_part logo_part_9\" src=\"../assets/img/logo/parts/9.svg\">\r\n    </div>\r\n\r\n\r\n\r\n  </div>\r\n</template>\r\n\r\n<script>\r\nexport default {\r\n  name: 'AnimatedLogo',\r\n  data(){\r\n    return {\r\n      window_loaded: false,\r\n    }\r\n  },\r\n  mounted(){\r\n    window.onload = function() {\r\n      document.body.classList.add(\"loaded\");\r\n    }\r\n  }\r\n\r\n\r\n}\r\n</script>\r\n\r\n<!-- Add \"scoped\" attribute to limit CSS to this component only -->\r\n<style scoped>\r\n.logo_wrapper{\r\n  /* This is a rotating frame for all logo elements */\r\n\r\n  /* IE compatibility */\r\n  position: relative;\r\n\r\n  /* centering */\r\n  display: flex;\r\n  justify-content: center;\r\n  align-items: center;\r\n\r\n  /* overall rotation of the logo */\r\n  animation-name: rotation;\r\n  animation-duration: 100s;\r\n  animation-iteration-count: infinite;\r\n  animation-timing-function: linear;\r\n}\r\n\r\n\r\n/* Layouting */\r\n.logo_layer {\r\n\r\n  /* positioning and sizing */\r\n  position: absolute;\r\n  width: 100%;\r\n  height: 100%;\r\n\r\n  /* Needed for IE */\r\n  top: 0;\r\n  left: 0;\r\n\r\n  /* centering content*/\r\n  display: flex;\r\n  justify-content: center;\r\n  align-items: center;\r\n\r\n  opacity: 0; /* needs to be transparent until loading complete */\r\n\r\n  /* animations */\r\n  animation-iteration-count: 1;\r\n  animation-timing-function: ease;\r\n  animation-fill-mode: both;\r\n}\r\n\r\n.logo_part {\r\n\r\n  /* positioning and sizing */\r\n  position: absolute;\r\n  width: 100%;\r\n  height: 100%;\r\n\r\n  /* Needed for IE */\r\n  top: 0;\r\n  left: 0;\r\n\r\n}\r\n\r\n.logo_layer_full {\r\n  z-index: 10;\r\n}\r\n\r\n\r\n\r\nbody.loaded .logo_layer_1  {\r\n  animation-name: layer_1_apparition;\r\n  animation-delay: 0;\r\n  animation-duration: 1.5s;\r\n}\r\n\r\nbody.loaded .logo_layer_2 {\r\n  animation-name: layer_2_apparition;\r\n  animation-delay: 0.25s;\r\n  animation-duration: 1.25s;\r\n}\r\n\r\nbody.loaded .logo_layer_3{\r\n  animation-name: layer_3_apparition;\r\n  animation-delay: 0.5s;\r\n  animation-duration: 1s;\r\n}\r\n\r\n/* overlay of full logo */\r\nbody.loaded .logo_layer_full{\r\n  animation-name: fade;\r\n  animation-duration: 0.5s;\r\n  animation-delay: 1.5s;\r\n}\r\n\r\n\r\n/* ANIMATIONS */\r\n@keyframes rotation {\r\n  0%   {\r\n    transform: rotate(0deg);\r\n  }\r\n  100% {\r\n    transform: rotate(360deg);\r\n  }\r\n}\r\n\r\n@keyframes layer_1_apparition {\r\n  0%   {\r\n    opacity: 0;\r\n    transform: scale(1.5) rotate(540deg);\r\n  }\r\n  100% {\r\n    opacity: 1;\r\n    transform: scale(1) rotate(0deg);\r\n  }\r\n}\r\n\r\n@keyframes layer_2_apparition {\r\n  0%   {\r\n    opacity: 0;\r\n    transform: scale(1.5) rotate(0);\r\n  }\r\n  100% {\r\n    opacity: 1;\r\n    transform: scale(1) rotate(360deg);\r\n  }\r\n}\r\n\r\n@keyframes layer_3_apparition {\r\n  0%   {\r\n    opacity: 0;\r\n    transform: scale(1.5) rotate(180deg);\r\n  }\r\n  100% {\r\n    opacity: 1;\r\n    transform: scale(1) rotate(0deg);\r\n  }\r\n}\r\n\r\n</style>\r\n"]}, media: undefined });

    };
    /* scoped */
    var __vue_scope_id__$8 = "data-v-e8784578";
    /* module identifier */
    var __vue_module_identifier__$8 = undefined;
    /* functional template */
    var __vue_is_functional_template__$8 = false;
    /* style inject SSR */
    
    /* style inject shadow dom */
    

    
    var __vue_component__$8 = /*#__PURE__*/normalizeComponent(
      { render: __vue_render__$8, staticRenderFns: __vue_staticRenderFns__$8 },
      __vue_inject_styles__$8,
      __vue_script__$8,
      __vue_scope_id__$8,
      __vue_is_functional_template__$8,
      __vue_module_identifier__$8,
      false,
      createInjector,
      undefined,
      undefined
    );

  //

  var script$9 = {
    name: 'AppTemplateWall',
    props: {
      options: Object,
    },
    mixins: [
      StoreMixin ],
    components: {
      LoginForm: __vue_component__$5,
      Greetings: __vue_component__$6,
      Loading: __vue_component__$7,
      AnimatedLogo: __vue_component__$8,
    },
    computed: {

    }
  };

  /* script */
  var __vue_script__$9 = script$9;

  /* template */
  var __vue_render__$9 = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c(
      "div",
      { staticClass: "wall" },
      [
        _c("AnimatedLogo", { staticClass: "logo" }),
        _vm._v(" "),
        _c(
          "transition",
          { attrs: { name: "fade", mode: "out-in", appear: "" } },
          [
            _vm.state === "login"
              ? _c("LoginForm", {
                  key: "loginForm",
                  attrs: { options: _vm.options }
                })
              : _vm._e(),
            _vm._v(" "),
            _vm.state === "greetings" ? _c("Greetings") : _vm._e(),
            _vm._v(" "),
            ["loading", "initial"].includes(_vm.state) ? _c("Loading") : _vm._e()
          ],
          1
        )
      ],
      1
    )
  };
  var __vue_staticRenderFns__$9 = [];
  __vue_render__$9._withStripped = true;

    /* style */
    var __vue_inject_styles__$9 = function (inject) {
      if (!inject) { return }
      inject("data-v-18b75fcb_0", { source: "\n.wall[data-v-18b75fcb] {\r\n  height: 100vh;\r\n  display: flex;\r\n  justify-content: flex-start;\r\n  align-items: center;\r\n  flex-direction: column;\n}\n.logo[data-v-18b75fcb] {\r\n  margin-top: 15vh;\r\n  margin-bottom: 5vh;\r\n\r\n  width: 30vmin;\r\n  height: 30vmin;\n}\n.title[data-v-18b75fcb] {\r\n  font-size: 150%;\r\n  margin-bottom: 2.5vh;\n}\r\n\r\n\r\n\r\n", map: {"version":3,"sources":["/home/moreillon/vue/vue_application_template/src/components/AppTemplateWall.vue"],"names":[],"mappings":";AAmDA;EACA,aAAA;EACA,aAAA;EACA,2BAAA;EACA,mBAAA;EACA,sBAAA;AACA;AAEA;EACA,gBAAA;EACA,kBAAA;;EAEA,aAAA;EACA,cAAA;AAEA;AAEA;EACA,eAAA;EACA,oBAAA;AACA","file":"AppTemplateWall.vue","sourcesContent":["<template>\r\n<div class=\"wall\">\r\n\r\n  <!--<img class=\"logo rotating\" src=\"../assets/img/logo/logo.png\" alt=\"logo\">-->\r\n  <AnimatedLogo class=\"logo\"/>\r\n\r\n  <transition name=\"fade\" mode=\"out-in\" appear>\r\n    <LoginForm\r\n      key=\"loginForm\"\r\n      v-if=\"state === 'login'\"\r\n      :options=\"options\"/>\r\n\r\n    <Greetings\r\n      v-if=\"state === 'greetings'\" />\r\n\r\n    <Loading\r\n      v-if=\"['loading','initial'].includes(state)\" />\r\n\r\n  </transition>\r\n</div>\r\n</template>\r\n\r\n<script>\r\nimport StoreMixin from '../mixins/store.js'\r\n\r\nimport LoginForm from './LoginForm.vue'\r\nimport Greetings from './Greetings.vue'\r\nimport Loading from './Loading.vue'\r\nimport AnimatedLogo from './AnimatedLogo.vue'\r\n\r\nexport default {\r\n  name: 'AppTemplateWall',\r\n  props: {\r\n    options: Object,\r\n  },\r\n  mixins: [\r\n    StoreMixin,\r\n  ],\r\n  components: {\r\n    LoginForm,\r\n    Greetings,\r\n    Loading,\r\n    AnimatedLogo,\r\n  },\r\n  computed: {\r\n\r\n  }\r\n}\r\n</script>\r\n\r\n<style scoped>\r\n.wall {\r\n  height: 100vh;\r\n  display: flex;\r\n  justify-content: flex-start;\r\n  align-items: center;\r\n  flex-direction: column;\r\n}\r\n\r\n.logo {\r\n  margin-top: 15vh;\r\n  margin-bottom: 5vh;\r\n\r\n  width: 30vmin;\r\n  height: 30vmin;\r\n\r\n}\r\n\r\n.title {\r\n  font-size: 150%;\r\n  margin-bottom: 2.5vh;\r\n}\r\n\r\n\r\n\r\n</style>\r\n"]}, media: undefined });

    };
    /* scoped */
    var __vue_scope_id__$9 = "data-v-18b75fcb";
    /* module identifier */
    var __vue_module_identifier__$9 = undefined;
    /* functional template */
    var __vue_is_functional_template__$9 = false;
    /* style inject SSR */
    
    /* style inject shadow dom */
    

    
    var __vue_component__$9 = /*#__PURE__*/normalizeComponent(
      { render: __vue_render__$9, staticRenderFns: __vue_staticRenderFns__$9 },
      __vue_inject_styles__$9,
      __vue_script__$9,
      __vue_scope_id__$9,
      __vue_is_functional_template__$9,
      __vue_module_identifier__$9,
      false,
      createInjector,
      undefined,
      undefined
    );

  //

  // Haven't found a way to import CSS in a rollup package
  //import './assets/css/buttons.css'



  var script$a = {
    name: 'AppTemplate',
    components: {
      AppTemplateNav: __vue_component__$2,
      AppTemplateHeader: __vue_component__$1,
      AppTemplateMain: __vue_component__$4,
      AppTemplateFooter: __vue_component__$3,
      AppTemplateWall: __vue_component__$9,
    },
    mixins: [
      StoreMixin
    ],
    props: {
      options: Object
    },
    data: function data(){
      return {
      }
    },
    watch: {
      // User is in mixin
      user: function user(){
        this.set_authorization_header();
      }
    },
    mounted: function mounted(){
      this.set_options(this.options);
      this.set_router_loading_events();
      if(this.options.authenticate) { this.get_user(); }
      else { this.set_state('content'); }
    },
    methods: {

      set_router_loading_events: function set_router_loading_events(){
        var this$1 = this;

        // Check if router is installed
        if(!this.$router) { return }

        this.$router.beforeEach(function (to, from, next) {
          this$1.set_route_loading(true);
          next();
        });

        this.$router.afterEach(function () {
          this$1.set_route_loading(false);
        });
      },

      set_authorization_header: function set_authorization_header(){
        // This might not be the right place for this
        // check if axios is installed
        if(!this.axios) { return }

        var jwt = VueCookies.get("jwt");

        // wither set or unset the header depending on of jwt being in cookies
        if(jwt) { this.axios.defaults.headers.common['Authorization'] = "Bearer " + jwt; }
        else { delete this.axios.defaults.headers.common['Authorization']; }

      },

    },
    computed: {
      nav_exists: function nav_exists(){
        return !!this.$slots.nav
      },

    }
  };

  /* script */
  var __vue_script__$a = script$a;

  /* template */
  var __vue_render__$a = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c(
      "div",
      { staticClass: "application_template" },
      [
        _c(
          "transition",
          { attrs: { name: "fade", mode: "out-in", appear: "" } },
          [
            _vm.state === "content"
              ? _c(
                  "div",
                  { staticClass: "app_content_wrapper" },
                  [
                    _c(
                      "AppTemplateHeader",
                      { key: "header", attrs: { options: _vm.options } },
                      [_vm._t("header")],
                      2
                    ),
                    _vm._v(" "),
                    _c("transition", { attrs: { name: "fade", appear: "" } }, [
                      _vm.nav_open
                        ? _c("div", {
                            staticClass: "nav_background",
                            on: {
                              click: function($event) {
                                return _vm.toggle_nav()
                              }
                            }
                          })
                        : _vm._e()
                    ]),
                    _vm._v(" "),
                    _vm.nav_exists
                      ? _c(
                          "AppTemplateNav",
                          { key: "nav", class: { open: _vm.nav_open } },
                          [_vm._t("nav")],
                          2
                        )
                      : _vm._e(),
                    _vm._v(" "),
                    _c(
                      "AppTemplateMain",
                      { key: "main", attrs: { options: _vm.options } },
                      [_vm.$slots.default ? _vm._t("default") : _vm._e()],
                      2
                    )
                  ],
                  1
                )
              : _c("AppTemplateWall", { attrs: { options: _vm.options } })
          ],
          1
        )
      ],
      1
    )
  };
  var __vue_staticRenderFns__$a = [];
  __vue_render__$a._withStripped = true;

    /* style */
    var __vue_inject_styles__$a = function (inject) {
      if (!inject) { return }
      inject("data-v-2facc07a_0", { source: "\n@import url('https://fonts.googleapis.com/css2?family=Lexend+Deca&display=swap');\n* {\r\n  box-sizing: border-box;\n}\n.material-design-icon__svg {\r\n  bottom: 0 !important;\n}\nbody {\r\n  margin: 0;\r\n  font-family: 'Lexend Deca', Arial, sans-serif;\r\n  background-color: white;\n}\n.app_content_wrapper{\r\n\r\n  position: relative;\r\n  height: 100vh;\r\n\r\n  display: grid;\r\n  grid-template-areas:\r\n  'header header'\r\n  'nav main';\r\n  grid-template-columns: auto 1fr;\r\n  grid-template-rows: auto 1fr;\r\n\r\n  /* needed to hide animated elements coming into the screen */\r\n  overflow: hidden;\n}\n.columns_wrapper {\r\n  position: relative;\r\n  flex-grow: 1;\r\n  display: flex;\r\n  align-items: stretch;\n}\nmain {\r\n  grid-area: main;\r\n  /* transitions for what ? */\r\n  //transition: 0.25s;\n}\nnav {\r\n  padding: 0.5em 0;\r\n  grid-area: nav;\r\n  width: 200px;\r\n  transition: 0.25s;\n}\nheader {\r\n  grid-area: header;\r\n  z-index: 1000;\n}\nfooter {\r\n  grid-area: footer;\n}\n.fade-enter-active, .fade-leave-active {\r\n  transition: opacity .25s;\n}\n.fade-enter, .fade-leave-to {\r\n  opacity: 0;\n}\n.rotating {\r\n  animation-name: rotation;\r\n  animation-duration: 60s;\r\n  animation-fill-mode: both;\r\n  animation-timing-function: linear;\r\n  animation-iteration-count: infinite;\n}\n@keyframes rotation {\nfrom {transform: rotate(0deg);}\nto {transform: rotate(360deg);}\n}\nbutton {\r\n  background-color: transparent;\r\n  color: currentColor;\r\n\r\n  cursor: pointer;\r\n  padding: 0.25em 1em;\r\n  transition: 0.25s;\r\n  border: none;\n}\nbutton.bordered {\r\n  border: 1px solid currentColor;\n}\nbutton:hover:not(:disabled){\r\n  color: #c00000;\n}\nbutton.bordered:hover:not(:disabled) {\r\n  background-color: #c0000011;\r\n  border-color: #c00000;\n}\nbutton:disabled{\r\n  cursor: not-allowed;\n}\n.nav_background{\r\n  display: none; /* THIS WILL NOT ANIMATE */\r\n\r\n  position: absolute;\r\n  top: 0;\r\n  left: 0;\r\n  right: 0;\r\n  bottom: 0;\r\n\r\n  background-color: #00000044;\n}\nnav:not(.open){\n}\n@media only screen and (max-width: 800px) {\n.app_content_wrapper {\r\n    grid-template-columns: 0 1fr;\n}\n.nav_background {\r\n    display: block;\n}\nnav {\r\n    /* WARNING: has no proper parent with position relative */\r\n    /* can be solved with columns wrapper */\r\n    position: absolute;\r\n\r\n    /*\r\n    top: 0;\r\n    left: 0;\r\n    */\r\n    z-index: 10;\r\n\r\n    /* of columns_wrapper */\r\n    /* WARNING: no parent when using grid */\r\n    height: 100%;\n}\nnav::after {\r\n    display: none;\n}\nnav:not(.open){\r\n    transform: translateX(-100%);\n}\nheader .navigation_control{\r\n    transform: translateX(0%) !important;\n}\n}\r\n\r\n", map: {"version":3,"sources":["/home/moreillon/vue/vue_application_template/src/AppTemplate.vue"],"names":[],"mappings":";AAmJA,gFAAA;AAEA;EACA,sBAAA;AACA;AAEA;EACA,oBAAA;AACA;AAEA;EACA,SAAA;EACA,6CAAA;EACA,uBAAA;AACA;AAEA;;EAEA,kBAAA;EACA,aAAA;;EAEA,aAAA;EACA;;YAEA;EACA,+BAAA;EACA,4BAAA;;EAEA,4DAAA;EACA,gBAAA;AACA;AAEA;EACA,kBAAA;EACA,YAAA;EACA,aAAA;EACA,oBAAA;AACA;AAEA;EACA,eAAA;EACA,2BAAA;EACA,mBAAA;AACA;AAEA;EACA,gBAAA;EACA,cAAA;EACA,YAAA;EACA,iBAAA;AACA;AAEA;EACA,iBAAA;EACA,aAAA;AACA;AAEA;EACA,iBAAA;AACA;AAEA;EACA,wBAAA;AACA;AACA;EACA,UAAA;AACA;AAEA;EACA,wBAAA;EACA,uBAAA;EACA,yBAAA;EACA,iCAAA;EACA,mCAAA;AACA;AAEA;AACA,MAAA,uBAAA,CAAA;AACA,IAAA,yBAAA,CAAA;AACA;AAEA;EACA,6BAAA;EACA,mBAAA;;EAEA,eAAA;EACA,mBAAA;EACA,iBAAA;EACA,YAAA;AACA;AAEA;EACA,8BAAA;AACA;AAEA;EACA,cAAA;AACA;AAEA;EACA,2BAAA;EACA,qBAAA;AACA;AAEA;EACA,mBAAA;AACA;AAEA;EACA,aAAA,EAAA,0BAAA;;EAEA,kBAAA;EACA,MAAA;EACA,OAAA;EACA,QAAA;EACA,SAAA;;EAEA,2BAAA;AAEA;AAEA;AAEA;AAEA;AAEA;IACA,4BAAA;AACA;AAEA;IACA,cAAA;AACA;AAEA;IACA,yDAAA;IACA,uCAAA;IACA,kBAAA;;IAEA;;;KAGA;IACA,WAAA;;IAEA,uBAAA;IACA,uCAAA;IACA,YAAA;AACA;AAEA;IACA,aAAA;AACA;AAEA;IACA,4BAAA;AACA;AAEA;IACA,oCAAA;AAEA;AAGA","file":"AppTemplate.vue","sourcesContent":["<template>\r\n  <div class=\"application_template\">\r\n    <!-- Actual application only shown if non athenticating or logged in -->\r\n    <!-- Seems like there would need to be a wrapper here for layouting -->\r\n\r\n    <transition name=\"fade\" mode=\"out-in\" appear>\r\n\r\n      <div\r\n        class=\"app_content_wrapper\"\r\n        v-if=\"state === 'content'\">\r\n\r\n        <AppTemplateHeader\r\n          :options=\"options\"\r\n          key=\"header\">\r\n          <!-- Additional header item -->\r\n          <slot name=\"header\"/>\r\n        </AppTemplateHeader>\r\n\r\n        <transition name=\"fade\" appear>\r\n          <div\r\n            v-if=\"nav_open\"\r\n            class=\"nav_background\"\r\n            @click=\"toggle_nav()\"/>\r\n        </transition>\r\n\r\n        <AppTemplateNav\r\n          v-if=\"nav_exists\"\r\n          key=\"nav\"\r\n          :class=\"{open: nav_open}\">\r\n          <slot name=\"nav\" />\r\n        </AppTemplateNav>\r\n\r\n        <AppTemplateMain\r\n          key=\"main\"\r\n          :options=\"options\">\r\n          <slot v-if=\"$slots.default\"/>\r\n        </AppTemplateMain>\r\n\r\n\r\n      </div>\r\n\r\n      <AppTemplateWall\r\n        v-else\r\n        :options=\"options\">\r\n\r\n      </AppTemplateWall>\r\n\r\n\r\n\r\n    </transition>\r\n\r\n  </div>\r\n</template>\r\n\r\n<script>\r\n\r\nimport AppTemplateHeader from './components/AppTemplateHeader.vue'\r\nimport AppTemplateNav from './components/AppTemplateNav.vue'\r\nimport AppTemplateMain from './components/AppTemplateMain.vue'\r\nimport AppTemplateFooter from './components/AppTemplateFooter.vue'\r\nimport AppTemplateWall from './components/AppTemplateWall.vue'\r\n\r\n\r\nimport StoreMixin from './mixins/store.js'\r\n\r\n//import axios from 'axios'\r\nimport VueCookies from 'vue-cookies'\r\n\r\nimport 'vue-material-design-icons/styles.css'\r\n\r\n// Haven't found a way to import CSS in a rollup package\r\n//import './assets/css/buttons.css'\r\n\r\n\r\n\r\nexport default {\r\n  name: 'AppTemplate',\r\n  components: {\r\n    AppTemplateNav,\r\n    AppTemplateHeader,\r\n    AppTemplateMain,\r\n    AppTemplateFooter,\r\n    AppTemplateWall,\r\n  },\r\n  mixins: [\r\n    StoreMixin\r\n  ],\r\n  props: {\r\n    options: Object\r\n  },\r\n  data(){\r\n    return {\r\n    }\r\n  },\r\n  watch: {\r\n    // User is in mixin\r\n    user(){\r\n      this.set_authorization_header()\r\n    }\r\n  },\r\n  mounted(){\r\n    this.set_options(this.options)\r\n    this.set_router_loading_events()\r\n    if(this.options.authenticate) this.get_user()\r\n    else this.set_state('content')\r\n  },\r\n  methods: {\r\n\r\n    set_router_loading_events(){\r\n      // Check if router is installed\r\n      if(!this.$router) return\r\n\r\n      this.$router.beforeEach((to, from, next) => {\r\n        this.set_route_loading(true)\r\n        next()\r\n      })\r\n\r\n      this.$router.afterEach(() => {\r\n        this.set_route_loading(false)\r\n      })\r\n    },\r\n\r\n    set_authorization_header(){\r\n      // This might not be the right place for this\r\n      // check if axios is installed\r\n      if(!this.axios) return\r\n\r\n      const jwt = VueCookies.get(\"jwt\")\r\n\r\n      // wither set or unset the header depending on of jwt being in cookies\r\n      if(jwt) this.axios.defaults.headers.common['Authorization'] = `Bearer ${jwt}`\r\n      else delete this.axios.defaults.headers.common['Authorization']\r\n\r\n    },\r\n\r\n  },\r\n  computed: {\r\n    nav_exists(){\r\n      return !!this.$slots.nav\r\n    },\r\n\r\n  }\r\n}\r\n</script>\r\n\r\n<style>\r\n\r\n@import url('https://fonts.googleapis.com/css2?family=Lexend+Deca&display=swap');\r\n\r\n* {\r\n  box-sizing: border-box;\r\n}\r\n\r\n.material-design-icon__svg {\r\n  bottom: 0 !important;\r\n}\r\n\r\nbody {\r\n  margin: 0;\r\n  font-family: 'Lexend Deca', Arial, sans-serif;\r\n  background-color: white;\r\n}\r\n\r\n.app_content_wrapper{\r\n\r\n  position: relative;\r\n  height: 100vh;\r\n\r\n  display: grid;\r\n  grid-template-areas:\r\n  'header header'\r\n  'nav main';\r\n  grid-template-columns: auto 1fr;\r\n  grid-template-rows: auto 1fr;\r\n\r\n  /* needed to hide animated elements coming into the screen */\r\n  overflow: hidden;\r\n}\r\n\r\n.columns_wrapper {\r\n  position: relative;\r\n  flex-grow: 1;\r\n  display: flex;\r\n  align-items: stretch;\r\n}\r\n\r\nmain {\r\n  grid-area: main;\r\n  /* transitions for what ? */\r\n  //transition: 0.25s;\r\n}\r\n\r\nnav {\r\n  padding: 0.5em 0;\r\n  grid-area: nav;\r\n  width: 200px;\r\n  transition: 0.25s;\r\n}\r\n\r\nheader {\r\n  grid-area: header;\r\n  z-index: 1000;\r\n}\r\n\r\nfooter {\r\n  grid-area: footer;\r\n}\r\n\r\n.fade-enter-active, .fade-leave-active {\r\n  transition: opacity .25s;\r\n}\r\n.fade-enter, .fade-leave-to {\r\n  opacity: 0;\r\n}\r\n\r\n.rotating {\r\n  animation-name: rotation;\r\n  animation-duration: 60s;\r\n  animation-fill-mode: both;\r\n  animation-timing-function: linear;\r\n  animation-iteration-count: infinite;\r\n}\r\n\r\n@keyframes rotation {\r\n  from {transform: rotate(0deg);}\r\n  to {transform: rotate(360deg);}\r\n}\r\n\r\nbutton {\r\n  background-color: transparent;\r\n  color: currentColor;\r\n\r\n  cursor: pointer;\r\n  padding: 0.25em 1em;\r\n  transition: 0.25s;\r\n  border: none;\r\n}\r\n\r\nbutton.bordered {\r\n  border: 1px solid currentColor;\r\n}\r\n\r\nbutton:hover:not(:disabled){\r\n  color: #c00000;\r\n}\r\n\r\nbutton.bordered:hover:not(:disabled) {\r\n  background-color: #c0000011;\r\n  border-color: #c00000;\r\n}\r\n\r\nbutton:disabled{\r\n  cursor: not-allowed;\r\n}\r\n\r\n.nav_background{\r\n  display: none; /* THIS WILL NOT ANIMATE */\r\n\r\n  position: absolute;\r\n  top: 0;\r\n  left: 0;\r\n  right: 0;\r\n  bottom: 0;\r\n\r\n  background-color: #00000044;\r\n\r\n}\r\n\r\nnav:not(.open){\r\n\r\n}\r\n\r\n@media only screen and (max-width: 800px) {\r\n\r\n  .app_content_wrapper {\r\n    grid-template-columns: 0 1fr;\r\n  }\r\n\r\n  .nav_background {\r\n    display: block;\r\n  }\r\n\r\n  nav {\r\n    /* WARNING: has no proper parent with position relative */\r\n    /* can be solved with columns wrapper */\r\n    position: absolute;\r\n\r\n    /*\r\n    top: 0;\r\n    left: 0;\r\n    */\r\n    z-index: 10;\r\n\r\n    /* of columns_wrapper */\r\n    /* WARNING: no parent when using grid */\r\n    height: 100%;\r\n  }\r\n\r\n  nav::after {\r\n    display: none;\r\n  }\r\n\r\n  nav:not(.open){\r\n    transform: translateX(-100%);\r\n  }\r\n\r\n  header .navigation_control{\r\n    transform: translateX(0%) !important;\r\n\r\n  }\r\n\r\n\r\n}\r\n\r\n</style>\r\n"]}, media: undefined });

    };
    /* scoped */
    var __vue_scope_id__$a = undefined;
    /* module identifier */
    var __vue_module_identifier__$a = undefined;
    /* functional template */
    var __vue_is_functional_template__$a = false;
    /* style inject SSR */
    
    /* style inject shadow dom */
    

    
    var __vue_component__$a = /*#__PURE__*/normalizeComponent(
      { render: __vue_render__$a, staticRenderFns: __vue_staticRenderFns__$a },
      __vue_inject_styles__$a,
      __vue_script__$a,
      __vue_scope_id__$a,
      __vue_is_functional_template__$a,
      __vue_module_identifier__$a,
      false,
      createInjector,
      undefined,
      undefined
    );

  // Import vue component

  // Declare install function executed by Vue.use()
  function install(Vue) {
  	if (install.installed) { return; }
  	install.installed = true;
  	Vue.component('AppTemplate', __vue_component__$a);
  }

  // Create module definition for Vue.use()
  var plugin = {
  	install: install,
  };

  // Auto-install when vue is found (eg. in browser via <script> tag)
  var GlobalVue = null;
  if (typeof window !== 'undefined') {
  	GlobalVue = window.Vue;
  } else if (typeof global !== 'undefined') {
  	GlobalVue = global.Vue;
  }
  if (GlobalVue) {
  	GlobalVue.use(plugin);
  }

  exports.default = __vue_component__$a;
  exports.install = install;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
