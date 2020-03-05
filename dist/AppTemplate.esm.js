import BackburgerIcon from 'vue-material-design-icons/Backburger.vue';
import MenuIcon from 'vue-material-design-icons/Menu.vue';
import LoginIcon from 'vue-material-design-icons/Login.vue';
import LogoutIcon from 'vue-material-design-icons/Logout.vue';

//


var script = {
  name: 'AppTemplate',
  components: {
    BackburgerIcon: BackburgerIcon,
    MenuIcon: MenuIcon,
    LoginIcon: LoginIcon,
    LogoutIcon: LogoutIcon
  },
  props: {
    applicationName: {
      type: String,
    },
    navigation: {
      type: Array,
      default: function default$1(){
        return []
      },
    },
    slotted: {
      type: Boolean,
      default: function default$2() {
        return false
      }
    },
    noLoginControls: {
      type: Boolean,
      default: function default$3() {
        return false
      }
    }
  },
  data: function data(){
    return {
      navigation_open: false,
    }
  },
  methods: {
    toggle_navigation: function toggle_navigation(){
      this.navigation_open = !this.navigation_open;
    },
    close_navigation: function close_navigation(){
      this.navigation_open = false;
    },
    logout: function logout(){
      if(this.$cookies) {
        this.$cookies.remove('jwt');
        location.reload();
      }
    },
    login: function login(){
      location.href = "https://authentication.maximemoreillon.com/";
    }
  },
  computed: {
    navigation_control_icon: function navigation_control_icon(){
      if(this.navigation_open) { return "mdi-backburger" }
      else { return "mdi-menu" }
    },
    logged_in: function logged_in(){
      if(!this.$cookies) { return false }
      if(this.$cookies.get('jwt')) { return true }
      else { return false }

    }
  }
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
  return _c("div", { staticClass: "application_wrapper" }, [
    _c(
      "header",
      [
        _vm.navigation.length > 0
          ? [
              _vm.navigation_open
                ? _c("backburger-icon", {
                    staticClass: "navigation_control button",
                    on: {
                      click: function($event) {
                        return _vm.toggle_navigation()
                      }
                    }
                  })
                : _c("menu-icon", {
                    staticClass: "navigation_control button",
                    on: {
                      click: function($event) {
                        return _vm.toggle_navigation()
                      }
                    }
                  })
            ]
          : _vm._e(),
        _vm._v(" "),
        _c("img", {
          staticClass: "rotating_logo",
          attrs: {
            src: "https://cdn.maximemoreillon.com/logo/thick/logo.svg",
            alt: "Logo"
          }
        }),
        _vm._v(" "),
        _c("span", { staticClass: "application_name" }, [
          _vm._v(_vm._s(_vm.applicationName))
        ]),
        _vm._v(" "),
        !_vm.noLoginControls
          ? [
              _vm.logged_in
                ? _c("login-icon", {
                    staticClass: "aligned_right button",
                    on: {
                      click: function($event) {
                        return _vm.login()
                      }
                    }
                  })
                : _c("logout-icon", {
                    staticClass: "aligned_right button",
                    on: {
                      click: function($event) {
                        return _vm.logout()
                      }
                    }
                  })
            ]
          : _vm._e()
      ],
      2
    ),
    _vm._v(" "),
    _vm.navigation.length > 0
      ? _c(
          "nav",
          { class: { open: _vm.navigation_open } },
          _vm._l(_vm.navigation, function(navigationItem, index) {
            return _c(
              "router-link",
              { key: index, attrs: { to: navigationItem.route } },
              [
                _c(
                  "span",
                  {
                    staticClass: "mdi",
                    class: "mdi-" + navigationItem.icon,
                    on: {
                      click: function($event) {
                        return _vm.close_navigation()
                      }
                    }
                  },
                  [
                    _vm._v(
                      "\n        " + _vm._s(navigationItem.label) + "\n      "
                    )
                  ]
                )
              ]
            )
          }),
          1
        )
      : _vm._e(),
    _vm._v(" "),
    _c("div", {
      staticClass: "nav_background",
      class: { visible: _vm.navigation_open },
      on: {
        click: function($event) {
          return _vm.close_navigation()
        }
      }
    }),
    _vm._v(" "),
    _c(
      "main",
      [
        _c("router-view", { staticClass: "router_view" }),
        _vm._v(" "),
        _c("footer", [
          _c("img", {
            staticClass: "rotating_logo",
            attrs: {
              src: "https://cdn.maximemoreillon.com/logo/thick/logo.svg",
              alt: "Logo"
            }
          }),
          _vm._v(" "),
          _c("div", { staticClass: "application_info" }, [
            _c("div", { staticClass: "application_name" }, [
              _vm._v(_vm._s(_vm.applicationName))
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "author_name" }, [
              _vm._v("Maxime MOREILLON")
            ])
          ])
        ])
      ],
      1
    )
  ])
};
var __vue_staticRenderFns__ = [];
__vue_render__._withStripped = true;

  /* style */
  var __vue_inject_styles__ = function (inject) {
    if (!inject) { return }
    inject("data-v-4ab20d74_0", { source: "\n* {\r\n  box-sizing: border-box;\n}\nbody {\r\n  margin: 0;\n}\n.application_wrapper{\r\n\r\n  /* Forgot what for */\r\n  position: relative;\r\n\r\n  /* font parameters */\r\n  font-family: 'Avenir', Helvetica, Arial, sans-serif;\r\n  -webkit-font-smoothing: antialiased;\r\n  -moz-osx-font-smoothing: grayscale;\r\n\r\n  /* default text color */\r\n  color: #111111;\r\n\r\n  /* span all viewport vertically*/\r\n  height: 100vh;\r\n  width: 100%;\r\n\r\n  /* vertical layout */\r\n  display: grid;\r\n  grid-template-areas:\r\n    'header header'\r\n    'nav main';\r\n  grid-template-columns: auto 1fr;\r\n  grid-template-rows: auto 1fr;\n}\n.rotating_logo {\r\n  animation-name: logo_rotation;\r\n  animation-duration: 60s;\r\n  animation-timing-function: linear;\r\n  animation-iteration-count: infinite;\n}\n@keyframes logo_rotation {\n0% {transform: rotate(0deg);}\n100% {transform: rotate(360deg);}\n}\r\n\r\n/* HEADER */\nheader {\r\n  grid-area: header;\r\n\r\n  /* flex for content */\r\n  display: flex;\r\n  align-items: stretch;\r\n\r\n  /* shadows */\r\n  box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);\r\n  position: relative;\r\n  z-index: 11;\r\n\r\n  /* coloring and sizing */\r\n  background-color: #444444;\r\n  color: white;\r\n  font-size: 150%;\n}\nheader > * {\r\n  display: flex;\r\n  align-items: center;\r\n\r\n  margin: 10px;\r\n\r\n  /* keep only one margin width between elements */\r\n  margin-right: 0px;\n}\nheader > *:last-child {\r\n  margin-right: 10px;\n}\nheader .rotating_logo {\r\n  width: 35px;\n}\nheader .aligned_right{\r\n  margin-left: auto\n}\nheader .button{\r\n  cursor: pointer;\n}\nheader .button:hover{\r\n  color: #dddddd;\n}\nheader .navigation_control{\r\n  transform: translateX(-200%);\r\n  transition: transform 0.5s;\n}\r\n\r\n\r\n\r\n/* NAV */\nnav {\r\n\r\n  grid-area: nav;\r\n  width: 200px;\r\n\r\n  /* for the border not to hit the header and the bottom of the page */\r\n  margin: 15px 0;\r\n\r\n  /* vertical layout using flex */\r\n  display: flex;\r\n  flex-direction: column;\r\n  align-items: stretch;\r\n  border-right: 1px solid #dddddd;\r\n\r\n  /* additional visuals */\r\n  background-color: white;\r\n  transition: transform 0.5s;\n}\nnav > * {\r\n  font-size: 120%;\r\n  text-align: center;\r\n\r\n  /* vertical space between nav items */\r\n  padding: 15px 0;\r\n\r\n  text-decoration: none;\r\n  color: #111111;\r\n\r\n  border-right: 3px solid transparent;\r\n  transition: color 0.25s, border-color 0.25s;\n}\nnav a:hover {\r\n  border-right: 3px solid #666666;\r\n  color: #666666;\n}\nnav a.router-link-exact-active {\r\n  border-right: 3px solid #c00000;\n}\nnav .mdi {\r\n  /* space between icon and text */\r\n  margin-right: 5px;\n}\n.nav_background {\r\n  position: fixed;\r\n  left: 0;\r\n  top: 0;\r\n  z-index: 9;\r\n  width: 100vw;\r\n  height: 100vh;\r\n  background-color: #000000;\r\n  visibility: hidden;\r\n  opacity: 0;\r\n  transition: opacity 0.5s, visibility 0.5s;\n}\nmain {\r\n\r\n  grid-area: main;\r\n  position: relative;\r\n\r\n  /* grow horizontally */\r\n  flex-grow: 1;\r\n  flex-shrink: 1;\r\n\r\n  /* vertical layout */\r\n  display: flex;\r\n  flex-direction: column;\r\n\r\n\r\n  /* scroll only on main */\r\n  /* NOT WORKING */\r\n  overflow-y: auto;\n}\nmain .router_view{\r\n\r\n  flex-grow: 1;\r\n\r\n  padding: 25px;\n}\nfooter {\r\n\r\n  /* clearing the nav bar and leaving space for the border top*/\r\n  margin: 0 10%;\r\n\r\n  border-top: 1px solid #dddddd;\r\n\r\n  padding: 15px;\r\n\r\n  display: flex;\r\n  justify-content: center;\r\n  align-items: center;\n}\nfooter .rotating_logo {\r\n  width: 40px;\n}\nfooter .application_info{\r\n  margin-left: 10px;\n}\n@media only screen and (max-width: 800px) {\n.application_wrapper {\r\n    grid-template-columns: 0 1fr;\n}\nnav {\r\n    /* transform margin into padding */\r\n    /* This takes the border from upmost top to utmost bottom */\r\n    margin: 0;\r\n    padding: 15px 0;\r\n\r\n    border: none;\r\n\r\n    position: absolute;\r\n    top: 0;\r\n    left: 0;\r\n    z-index: 10;\r\n    height: 100%;\r\n    width: 200px; /* matching flex basis */\n}\nnav:not(.open){\r\n    transform: translateX(-100%);\n}\n.nav_background.visible {\r\n    opacity: 0.5;\r\n    visibility: visible;\n}\nheader .navigation_control{\r\n    transform: translateX(0%);\n}\n}\r\n\r\n", map: {"version":3,"sources":["/home/moreillon/vue/vue_application_template/src/AppTemplate.vue"],"names":[],"mappings":";AA0KA;EACA,sBAAA;AACA;AAEA;EACA,SAAA;AACA;AAEA;;EAEA,oBAAA;EACA,kBAAA;;EAEA,oBAAA;EACA,mDAAA;EACA,mCAAA;EACA,kCAAA;;EAEA,uBAAA;EACA,cAAA;;EAEA,gCAAA;EACA,aAAA;EACA,WAAA;;EAEA,oBAAA;EACA,aAAA;EACA;;cAEA;EACA,+BAAA;EACA,4BAAA;AACA;AAEA;EACA,6BAAA;EACA,uBAAA;EACA,iCAAA;EACA,mCAAA;AACA;AAEA;AACA,IAAA,uBAAA,CAAA;AACA,MAAA,yBAAA,CAAA;AACA;;AAEA,WAAA;AACA;EACA,iBAAA;;EAEA,qBAAA;EACA,aAAA;EACA,oBAAA;;EAEA,YAAA;EACA,kEAAA;EACA,kBAAA;EACA,WAAA;;EAEA,wBAAA;EACA,yBAAA;EACA,YAAA;EACA,eAAA;AAEA;AAEA;EACA,aAAA;EACA,mBAAA;;EAEA,YAAA;;EAEA,gDAAA;EACA,iBAAA;AACA;AAEA;EACA,kBAAA;AACA;AAEA;EACA,WAAA;AACA;AAEA;EACA;AACA;AAEA;EACA,eAAA;AACA;AAEA;EACA,cAAA;AACA;AAEA;EACA,4BAAA;EACA,0BAAA;AACA;;;;AAIA,QAAA;AACA;;EAEA,cAAA;EACA,YAAA;;EAEA,oEAAA;EACA,cAAA;;EAEA,+BAAA;EACA,aAAA;EACA,sBAAA;EACA,oBAAA;EACA,+BAAA;;EAEA,uBAAA;EACA,uBAAA;EACA,0BAAA;AACA;AAEA;EACA,eAAA;EACA,kBAAA;;EAEA,qCAAA;EACA,eAAA;;EAEA,qBAAA;EACA,cAAA;;EAEA,mCAAA;EACA,2CAAA;AACA;AAEA;EACA,+BAAA;EACA,cAAA;AACA;AACA;EACA,+BAAA;AACA;AAEA;EACA,gCAAA;EACA,iBAAA;AACA;AAEA;EACA,eAAA;EACA,OAAA;EACA,MAAA;EACA,UAAA;EACA,YAAA;EACA,aAAA;EACA,yBAAA;EACA,kBAAA;EACA,UAAA;EACA,yCAAA;AACA;AAEA;;EAEA,eAAA;EACA,kBAAA;;EAEA,sBAAA;EACA,YAAA;EACA,cAAA;;EAEA,oBAAA;EACA,aAAA;EACA,sBAAA;;;EAGA,wBAAA;EACA,gBAAA;EACA,gBAAA;AAGA;AAEA;;EAEA,YAAA;;EAEA,aAAA;AACA;AAGA;;EAEA,6DAAA;EACA,aAAA;;EAEA,6BAAA;;EAEA,aAAA;;EAEA,aAAA;EACA,uBAAA;EACA,mBAAA;AAEA;AAEA;EACA,WAAA;AACA;AAEA;EACA,iBAAA;AACA;AAEA;AAEA;IACA,4BAAA;AACA;AAEA;IACA,kCAAA;IACA,2DAAA;IACA,SAAA;IACA,eAAA;;IAEA,YAAA;;IAEA,kBAAA;IACA,MAAA;IACA,OAAA;IACA,WAAA;IACA,YAAA;IACA,YAAA,EAAA,wBAAA;AAEA;AAEA;IACA,4BAAA;AACA;AAEA;IACA,YAAA;IACA,mBAAA;AACA;AAEA;IACA,yBAAA;AAEA;AACA","file":"AppTemplate.vue","sourcesContent":["<template>\r\n  <div class=\"application_wrapper\">\r\n\r\n    <header>\r\n      <!-- hamburger to open and close navigation -->\r\n      <template v-if=\"navigation.length > 0 \">\r\n        <backburger-icon\r\n          class=\"navigation_control button\"\r\n          v-if=\"navigation_open\"\r\n          v-on:click=\"toggle_navigation()\"/>\r\n        <menu-icon\r\n          class=\"navigation_control button\"\r\n          v-else\r\n          v-on:click=\"toggle_navigation()\"/>\r\n      </template>\r\n\r\n      <!-- Logo -->\r\n      <!-- TODO: Serve a local logo -->\r\n      <img\r\n        class=\"rotating_logo\"\r\n        src=\"https://cdn.maximemoreillon.com/logo/thick/logo.svg\"\r\n        alt=\"Logo\">\r\n\r\n      <!-- application title -->\r\n      <span class=\"application_name\">{{applicationName}}</span>\r\n\r\n      <!-- Logout button -->\r\n      <template v-if=\"!noLoginControls\">\r\n        <login-icon\r\n          class=\"aligned_right button\"\r\n          v-if=\"logged_in\"\r\n          v-on:click=\"login()\"/>\r\n        <logout-icon\r\n          class=\"aligned_right button\"\r\n          v-else\r\n          v-on:click=\"logout()\"/>\r\n      </template>\r\n\r\n\r\n    </header>\r\n\r\n\r\n    <nav\r\n      v-if=\"navigation.length > 0\"\r\n      v-bind:class=\"{open: navigation_open}\">\r\n\r\n      <!-- NAV items must be passed as props -->\r\n      <router-link\r\n        v-for=\"(navigationItem, index) in navigation\"\r\n        v-bind:key=\"index\"\r\n        v-bind:to=\"navigationItem.route\">\r\n\r\n        <!-- Why have the onclick here? -->\r\n        <!-- Why have the icon and the text in the same span? -->\r\n        <!-- TODO: Find other way to add icons here -->\r\n        <span\r\n          class=\"mdi\"\r\n          v-bind:class=\"'mdi-' + navigationItem.icon\"\r\n          v-on:click=\"close_navigation()\">\r\n          {{navigationItem.label}}\r\n        </span>\r\n\r\n      </router-link>\r\n    </nav>\r\n\r\n    <div\r\n      class=\"nav_background\"\r\n      v-bind:class=\"{visible: navigation_open}\"\r\n      v-on:click=\"close_navigation()\"/>\r\n\r\n    <!-- Main. Note: footer is part of main -->\r\n    <main>\r\n      <router-view class=\"router_view\"/>\r\n\r\n      <!-- footer -->\r\n      <footer>\r\n        <img\r\n          class=\"rotating_logo\"\r\n          src=\"https://cdn.maximemoreillon.com/logo/thick/logo.svg\"\r\n          alt=\"Logo\">\r\n        <div class=\"application_info\">\r\n          <div class=\"application_name\">{{applicationName}}</div>\r\n          <div class=\"author_name\">Maxime MOREILLON</div>\r\n        </div>\r\n      </footer>\r\n    </main>\r\n\r\n\r\n\r\n  </div>\r\n</template>\r\n\r\n<script>\r\n\r\nimport BackburgerIcon from 'vue-material-design-icons/Backburger.vue';\r\nimport MenuIcon from 'vue-material-design-icons/Menu.vue';\r\nimport LoginIcon from 'vue-material-design-icons/Login.vue';\r\nimport LogoutIcon from 'vue-material-design-icons/Logout.vue';\r\n\r\n\r\nexport default {\r\n  name: 'AppTemplate',\r\n  components: {\r\n    BackburgerIcon,\r\n    MenuIcon,\r\n    LoginIcon,\r\n    LogoutIcon\r\n  },\r\n  props: {\r\n    applicationName: {\r\n      type: String,\r\n    },\r\n    navigation: {\r\n      type: Array,\r\n      default(){\r\n        return []\r\n      },\r\n    },\r\n    slotted: {\r\n      type: Boolean,\r\n      default() {\r\n        return false\r\n      }\r\n    },\r\n    noLoginControls: {\r\n      type: Boolean,\r\n      default() {\r\n        return false\r\n      }\r\n    }\r\n  },\r\n  data(){\r\n    return {\r\n      navigation_open: false,\r\n    }\r\n  },\r\n  methods: {\r\n    toggle_navigation(){\r\n      this.navigation_open = !this.navigation_open;\r\n    },\r\n    close_navigation(){\r\n      this.navigation_open = false;\r\n    },\r\n    logout(){\r\n      if(this.$cookies) {\r\n        this.$cookies.remove('jwt')\r\n        location.reload()\r\n      }\r\n    },\r\n    login(){\r\n      location.href = \"https://authentication.maximemoreillon.com/\"\r\n    }\r\n  },\r\n  computed: {\r\n    navigation_control_icon(){\r\n      if(this.navigation_open) return \"mdi-backburger\"\r\n      else return \"mdi-menu\"\r\n    },\r\n    logged_in(){\r\n      if(!this.$cookies) return false\r\n      if(this.$cookies.get('jwt')) return true\r\n      else return false\r\n\r\n    }\r\n  }\r\n}\r\n</script>\r\n\r\n<!-- Not scoped so as to access body and app -->\r\n<style>\r\n* {\r\n  box-sizing: border-box;\r\n}\r\n\r\nbody {\r\n  margin: 0;\r\n}\r\n\r\n.application_wrapper{\r\n\r\n  /* Forgot what for */\r\n  position: relative;\r\n\r\n  /* font parameters */\r\n  font-family: 'Avenir', Helvetica, Arial, sans-serif;\r\n  -webkit-font-smoothing: antialiased;\r\n  -moz-osx-font-smoothing: grayscale;\r\n\r\n  /* default text color */\r\n  color: #111111;\r\n\r\n  /* span all viewport vertically*/\r\n  height: 100vh;\r\n  width: 100%;\r\n\r\n  /* vertical layout */\r\n  display: grid;\r\n  grid-template-areas:\r\n    'header header'\r\n    'nav main';\r\n  grid-template-columns: auto 1fr;\r\n  grid-template-rows: auto 1fr;\r\n}\r\n\r\n.rotating_logo {\r\n  animation-name: logo_rotation;\r\n  animation-duration: 60s;\r\n  animation-timing-function: linear;\r\n  animation-iteration-count: infinite;\r\n}\r\n\r\n@keyframes logo_rotation {\r\n  0% {transform: rotate(0deg);}\r\n  100% {transform: rotate(360deg);}\r\n}\r\n\r\n/* HEADER */\r\nheader {\r\n  grid-area: header;\r\n\r\n  /* flex for content */\r\n  display: flex;\r\n  align-items: stretch;\r\n\r\n  /* shadows */\r\n  box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);\r\n  position: relative;\r\n  z-index: 11;\r\n\r\n  /* coloring and sizing */\r\n  background-color: #444444;\r\n  color: white;\r\n  font-size: 150%;\r\n\r\n}\r\n\r\nheader > * {\r\n  display: flex;\r\n  align-items: center;\r\n\r\n  margin: 10px;\r\n\r\n  /* keep only one margin width between elements */\r\n  margin-right: 0px;\r\n}\r\n\r\nheader > *:last-child {\r\n  margin-right: 10px;\r\n}\r\n\r\nheader .rotating_logo {\r\n  width: 35px;\r\n}\r\n\r\nheader .aligned_right{\r\n  margin-left: auto\r\n}\r\n\r\nheader .button{\r\n  cursor: pointer;\r\n}\r\n\r\nheader .button:hover{\r\n  color: #dddddd;\r\n}\r\n\r\nheader .navigation_control{\r\n  transform: translateX(-200%);\r\n  transition: transform 0.5s;\r\n}\r\n\r\n\r\n\r\n/* NAV */\r\nnav {\r\n\r\n  grid-area: nav;\r\n  width: 200px;\r\n\r\n  /* for the border not to hit the header and the bottom of the page */\r\n  margin: 15px 0;\r\n\r\n  /* vertical layout using flex */\r\n  display: flex;\r\n  flex-direction: column;\r\n  align-items: stretch;\r\n  border-right: 1px solid #dddddd;\r\n\r\n  /* additional visuals */\r\n  background-color: white;\r\n  transition: transform 0.5s;\r\n}\r\n\r\nnav > * {\r\n  font-size: 120%;\r\n  text-align: center;\r\n\r\n  /* vertical space between nav items */\r\n  padding: 15px 0;\r\n\r\n  text-decoration: none;\r\n  color: #111111;\r\n\r\n  border-right: 3px solid transparent;\r\n  transition: color 0.25s, border-color 0.25s;\r\n}\r\n\r\nnav a:hover {\r\n  border-right: 3px solid #666666;\r\n  color: #666666;\r\n}\r\nnav a.router-link-exact-active {\r\n  border-right: 3px solid #c00000;\r\n}\r\n\r\nnav .mdi {\r\n  /* space between icon and text */\r\n  margin-right: 5px;\r\n}\r\n\r\n.nav_background {\r\n  position: fixed;\r\n  left: 0;\r\n  top: 0;\r\n  z-index: 9;\r\n  width: 100vw;\r\n  height: 100vh;\r\n  background-color: #000000;\r\n  visibility: hidden;\r\n  opacity: 0;\r\n  transition: opacity 0.5s, visibility 0.5s;\r\n}\r\n\r\nmain {\r\n\r\n  grid-area: main;\r\n  position: relative;\r\n\r\n  /* grow horizontally */\r\n  flex-grow: 1;\r\n  flex-shrink: 1;\r\n\r\n  /* vertical layout */\r\n  display: flex;\r\n  flex-direction: column;\r\n\r\n\r\n  /* scroll only on main */\r\n  /* NOT WORKING */\r\n  overflow-y: auto;\r\n\r\n\r\n}\r\n\r\nmain .router_view{\r\n\r\n  flex-grow: 1;\r\n\r\n  padding: 25px;\r\n}\r\n\r\n\r\nfooter {\r\n\r\n  /* clearing the nav bar and leaving space for the border top*/\r\n  margin: 0 10%;\r\n\r\n  border-top: 1px solid #dddddd;\r\n\r\n  padding: 15px;\r\n\r\n  display: flex;\r\n  justify-content: center;\r\n  align-items: center;\r\n\r\n}\r\n\r\nfooter .rotating_logo {\r\n  width: 40px;\r\n}\r\n\r\nfooter .application_info{\r\n  margin-left: 10px;\r\n}\r\n\r\n@media only screen and (max-width: 800px) {\r\n\r\n  .application_wrapper {\r\n    grid-template-columns: 0 1fr;\r\n  }\r\n\r\n  nav {\r\n    /* transform margin into padding */\r\n    /* This takes the border from upmost top to utmost bottom */\r\n    margin: 0;\r\n    padding: 15px 0;\r\n\r\n    border: none;\r\n\r\n    position: absolute;\r\n    top: 0;\r\n    left: 0;\r\n    z-index: 10;\r\n    height: 100%;\r\n    width: 200px; /* matching flex basis */\r\n\r\n  }\r\n\r\n  nav:not(.open){\r\n    transform: translateX(-100%);\r\n  }\r\n\r\n  .nav_background.visible {\r\n    opacity: 0.5;\r\n    visibility: visible;;\r\n  }\r\n\r\n  header .navigation_control{\r\n    transform: translateX(0%);\r\n\r\n  }\r\n}\r\n\r\n</style>\r\n"]}, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__ = undefined;
  /* module identifier */
  var __vue_module_identifier__ = undefined;
  /* functional template */
  var __vue_is_functional_template__ = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__ = normalizeComponent(
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

// Import vue component

// Declare install function executed by Vue.use()
function install(Vue) {
	if (install.installed) { return; }
	install.installed = true;
	Vue.component('AppTemplate', __vue_component__);
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

export default __vue_component__;
export { install };
