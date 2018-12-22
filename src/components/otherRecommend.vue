<template>
  <div class="app_other">
    <div :class="{'rec_three':count==3,'rec_two':count==2,'rec_one':count==1}">
      <div class="content">
        <ul>
          <li
            class="rec_item"
            v-for="(item,i) of list"
            :key="i"
          >
            <div class="info">
              <p>{{item.title}}</p>
              <p>{{item.desc}}</p>
            </div>
            <img
              class="deal"
              src="@/assets/img/H5_button_img_12@2x.png"
            >
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [
        { title: "超极皇家会员极皇家会员", desc: "无限流量！限流量限流量" },
        { title: "超极皇家会员极皇家会员", desc: "无限流量！限流量限流量" },
        { title: "超极皇家会员极皇家会员", desc: "无限流量！限流量限流量" }
      ],
      count: 3
    };
  },
  methods: {},
  created() {}
};
</script>
<style scoped lang="stylus">
.app_other
  margin: 20px auto
  font-size: 13px
  font-weight: 700
  line-height: 18px
  color: #4B2E95
  .rec_three
    height: 248px
    background: url('../assets/img/H5_background_img_3@2x.png') 0 0 / contain
  .rec_two
    height: 180px
    background: url('../assets/img/H5_background_img_5@2x.png') 0 0 / contain
  .rec_one
    height: 116px
    background: url('../assets/img/H5_background_img_6@2x.png') 0 0 / contain
  .rec_three, .rec_two, .rec_one
    width: 345px
    margin: 20px auto
    .content
      padding-top: 30px
      ul
        padding-left: 20px
        padding-right: 20px
        .rec_item
          height: 65px
          border-bottom: 1px solid rgba(75, 46, 149, 0.2)
          display: flex
          justify-content: space-between
        .info
          text-align: left
          width: 312px
        .deal
          align-self: center
          width: 100px
          height: 26px
          cursor: pointer
</style>