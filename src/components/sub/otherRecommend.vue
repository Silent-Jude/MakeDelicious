<template>
  <div class="app_other">
    <div :class="{'rec_three':count==3,'rec_two':count==2,'rec_one':count==1}">
      <div class="content">
        <ul>
          <li
            class="rec_item"
            v-for="(item,i) of recommend"
            :key="i"
            v-if="recommend.length>0"
          >
            <div class="info">
              <p>{{item.pname}}</p>
              <p>{{item.des}}</p>
            </div>
            <img
              class="deal"
              src="@/assets/img/H5_button_img_12@2x.png"
              :data-pid="recommend.length>0?item.pid:0"
              @click="dealBusiness"
            >
          </li>
        </ul>
      </div>
    </div>
    <div
      class="more"
      @click="getAll"
    ></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      count: 3
    };
  },
  computed: {
    recommend() {
      //bus总线接收avgs数据，放在这里是因为此时确保已经接收到了。
      this.count = this.$store.state.recommend.length;
      return this.$store.state.recommend;
    }
  },
  methods: {
    dealBusiness(e) {
      // var pid = document.getElementById("deal").dataset.pid;
      var pid = e.target.dataset.pid;
      console.log(pid);
      if (pid > 0) {
        this.$router.push(`/business/${pid}`);
      }
    },
    getAll() {
      if (this.recommend.length > 0) {
        var pid = "all";
        this.$router.push(`/business/${pid}`);
      }
    }
  },
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
    background: url('../../assets/img/H5_background_img_3@2x.png') 0 0 / contain
  .rec_two
    height: 180px
    background: url('../../assets/img/H5_background_img_5@2x.png') 0 0 / contain
  .rec_one
    height: 116px
    background: url('../../assets/img/H5_background_img_6@2x.png') 0 0 / contain
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
.more
  width: 11.5rem
  height: 1.9rem
  background: url('../../assets/img/H5_button_img_13@2x.png') no-repeat 0 0 / cover
  margin: 0 auto
  cursor: pointer
</style>