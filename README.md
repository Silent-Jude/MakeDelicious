# 2018年9月30日


# saving_onekey

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).


未决：
  1.多人同时同时注册，如何让存储验证码信息与对应手机号对应起来？

已解决的问题：
  1.调用短信验证接口后进行登录时，一直提示验证码错误。但是输入结果无误，经排查发现：阿里云短信验证码发送给用户的最大长度只有5位，后端设定的验证码长度超过5位也只显示5位。导致用户手机短信收到的验证码为5位长度，但是后端服务器记录下的短信验证码长度为6位，所以无论怎么输入结果都报错。解决办法，将后端生成的验证码长度改为5位，问题解决，登录成功。
  2.手机号输入提示图标那里，通过判断手机号输入格式来显示正确图片或者错误图标。但是刚加载页面时，并不希望显示图标，因为此时的图标一定是错误状态，影响用户体验。在不想改动太多代码的情况下，通过给图标加上加上v-show，并设置一个状态码来控制显示或者隐藏图标，默认为隐藏图标。当用户输入完手机手机号后，触发blur事件，将图标显示。
  3.vuex中获取state中的属性语法是 this.$store.getters.函数名，而不是getters.属性名....api要记熟练。

12-6:
  1.完成stylus的语法转换，将项目css替换为stylus。
  2.完成home主体模板搭建。

12-9
后台
  1.完成服务器端短信发送接口功能：调用接口，验证手机号格式正确后发送随机短信验证码到对应手机号，并在服务器端存储当前验证码和当前手机号。300秒后自动清空验证码和手机号。若短时间内（60——300内）重复发送,则清除上一个定时器，避免上一次自动清空验证码对本次验证码的影响。
  2.完成服务器端登录接口功能：调用接口，验证当前输入的手机号和验证码是否匹配，若匹配成功，则提示登录成功！并发送登录用户信息到客户端。登录失败则返回错误提示信息。
  3.创建了一个测试用验证码——888，只要输入验证码888即可登录。
前端：
  1.完成手机号输入验证，根据输入格式显示对应提示。
  2.完成验证码的发送验证，若手机号验证不通过，则无法点击；若手机号验证通过，点击后发送获取验证码请求，同时获取验证码按钮变为不可选状态，60秒倒计时之后才可重新获取验证码。
  3.完成登录验证功能。若手机号验证通过，且验证码格式正确，则发送登录请求。经测试已验证成功！
  
  12-10
  前端
    1.使用sessionStorage保存登录状态，刷新页面后依然登录成功。
