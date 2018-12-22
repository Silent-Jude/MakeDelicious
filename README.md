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










已解决的问题：
  1.调用短信验证接口后进行登录时，一直提示验证码错误。但是输入结果无误，经排查发现：阿里云短信验证码发送给用户的最大长度只有5位，后端设定的验证码长度超过5位也只显示5位。导致用户手机短信收到的验证码为5位长度，但是后端服务器记录下的短信验证码长度为6位，所以无论怎么输入结果都报错。解决办法，将后端生成的验证码长度改为5位，问题解决，登录成功。
  2.手机号输入提示图标那里，通过判断手机号输入格式来显示正确图片或者错误图标。但是刚加载页面时，并不希望显示图标，因为此时的图标一定是错误状态，影响用户体验。在不想改动太多代码的情况下，通过给图标加上加上v-show，并设置一个状态码来控制显示或者隐藏图标，默认为隐藏图标。当用户输入完手机手机号后，触发blur事件，将图标显示。
  3.vuex中获取state中的属性语法是 this.$store.getters.函数名，而不是getters.属性名....api要记熟练。
  4.在router-link上面绑定的事件无效，例如<router-link to='/home' @click="getId">,需要写成<router-link to='/home' @click.native="getId">   @click.native这样才有效。
  5.监听属性watch，无法监听使用vueX赋值的属性，例如isLogin:$store.getters.getLogInfo，原理是赋值的只是函数地址，函数结果改变但是函数地址不会变，所以无法监听到。
  6.大坑，使用Vuex赋值，有一定延时,；而使用父组件往子组件传值，几乎没有延时。本例的问题是，使用父组件往子组件传递登录状态isLogin时，子组件中watch监听到了登录状态isLogin的改变,同时子组件中的phone赋值应该是vueX中存储的手机号。但是在isLogion改变的瞬间，由于这个短暂的延时导致此时的phone没有赋值，结果是undefined，进一步导致发送的axios失败！解决办法是使用父组件往子组件传值的时候，直接传递phone，而phone的值是vuex中存储的手机号。子组件再对传入的phone进行监听，当phone由null改变为数值时，发起axios请求，就能保证此时的phone一定有值！避免报错！
  7.调用函数时，若传入的参数为一个复杂表达式，只能以字符串的形式传递进来。可以在函数定义中使用eval()函数，将字符串转换为表达式。例如调用函数时：@click="showDate('this.details[i].cost','#952E88','元',1)",在函数定义时将函数引用的位置用eval()包起来：
  function showDate(item,color,unit,rate){
    ....
    var h = Math.ceil(eval(item)) * rate;
    ....
  }  
  这样就能成功执行！
  8.画用户消费柱状图时候，后台传入的数值不固定，导致柱状图可能超出范围。解决方案是在画图之前，循环判断一下值乘以倍率的结果，是否超出，如果超出就让倍率乘以0.9，一直到倍率与值的乘积在范围内，取此时的倍率作为柱状图高度倍率。
  9.实现数字有小数显示1位小数，无小数显示整数parseFloat(num.toFixed(1))
  10.组件之间，通过vuex异步传值问题，最简单的解决途径，使用computed计算属性，在接收属性的组件中使用computed，这样当缓存中的,这样当缓存中的值改变了，就会更新computed中的值。缺点是在数据更新之前，数值是undefined导致报错，解决办法是使用v-if控制。

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
12-14
  前端：填坑2个，见5,6
  后端：
    1.mysql多表多项子查询的运用，已记录笔记。
    2.mysql事件函数MONTH(),CURDATE()的运用，已记录csdn


12-18
  完成demo线上部署
