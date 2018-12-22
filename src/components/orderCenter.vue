<template>
  <div class="app_order">
    <div class="title">
      <div
        class="back"
        @click="goBack"
      >
        <span>&lt;返回</span>
      </div>
      <p class="provider">青岛移动</p>
      <i class="icon">
        <i class="navIcon">
          <canvas
            id="point"
            width="44"
            height="20"
          >
          </canvas>
        </i>
        <i
          class="home"
          @click="turnHome"
        >
          <svg
            width="44"
            height="20"
          >
            <circle
              cx="22"
              cy="10"
              r="9"
              stroke-width="2"
              fill="transparent"
              stroke="black"
            ></circle>
            <circle
              cx="22"
              cy="10"
              r="3"
            ></circle>
          </svg>
        </i>
      </i>
    </div>
    <div class="navBar">
      <ul>
        <li>
          <router-link
            to="/orderCenter/all"
            id="default"
            :class="{'selected':selected=='all'}"
            @click.native="selected='all';point(1)"
          >全部</router-link>
        </li>
        <li>
          <router-link
            to="/orderCenter/success"
            :class="{'selected':selected=='success'}"
            @click.native="selected='success';point(2)"
          >办理成功</router-link>
        </li>
        <li>
          <router-link
            to="/orderCenter/fail"
            :class="{'selected':selected=='fail'}"
            @click.native="selected='fail';point(3)"
          >办理失败</router-link>
        </li>
      </ul>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selected: ""
    };
  },
  methods: {
    goBack() {
      history.go(-1);
    },
    turnHome() {
      console.log(123);
      this.$router.push("/home");
    },
    point(targetId) {
      var c = document.getElementById("point");
      var ctx = c.getContext("2d");
      ctx.clearRect(0, 0, 44, 20);
      ctx.beginPath();
      ctx.arc(14, 10, targetId == 1 ? 3 : 2, 0, 2 * Math.PI);
      ctx.arc(22, 10, targetId == 2 ? 3 : 2, 0, 2 * Math.PI);
      ctx.arc(30, 10, targetId == 3 ? 3 : 2, 0, 2 * Math.PI);
      ctx.fill();
    }
  },
  mounted() {
    var selected = document.getElementById("default");
    selected.click();
  }
};
</script>
<style scoped lang="stylus">
@import '../assets/common/title.styl'
.app_order
  background: #F7F7F7
.title
  border-bottom: 1px solid #a1a1a1
  .back
    height: 64px
    line-height: 64px
    position: absolute
    top: 50%
    left: 0
    transform: translateY(-50%)
    cursor: pointer
    span
      padding-left: 10px
      letter-spacing: 8px
      font-size: 18px
.navBar
  height: 65px
  ul
    margin: 0
    padding: 0
    list-style: none
    display: flex
    justify-content: space-around
    font-size: 13px
    color: #414141
    li
      height: 65px
      line-height: 65px
      a
        text-decoration: none
        // 取消移动端背景色
        -webkit-tap-highlight-color: rgba(255, 255, 255, 0)
        -webkit-user-select: none
        -moz-user-focus: none
        -moz-user-select: none
        padding-bottom: 10px
        color: #414141
        outline: none
        &:visited
          color: #414141
        &.selected
          font-weight: 550
          color: #0084CF
          border-bottom: #0084CF 2px solid
</style>