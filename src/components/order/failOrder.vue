<template>

  <div class="app_fail">
    <div
      v-for="(item,i) of obj"
      :key="i"
      class="order_item"
    >
      <div class="info">
        <div class="sellerInfo">
          <p class="storeName">{{item.sname}}</p>
          <i
            class="storeDetail"
            :data-sid="item.sid"
            @click="storeDetail"
          >></i>
        </div>
        <div class="userInfo">
          <span class="phone">{{item.sphone}}</span>
          <span class="orderTime">{{item.o_time}}</span>
        </div>
        <div class="orderInfo">
          <div class="setNameWrap">
            <p class="setName">{{item.pname}}</p>
          </div>
          <span
            class="orderStatus"
            :class="{'success':item.status,'fail':!item.status}"
          >{{item.status|businessStatusFilter}}</span>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  data() {
    return {
      obj: [
        {
          store: "店铺名称店铺名称店铺名称",
          phone: "19853124578",
          date: "2018-08-03 12:12:12",
          setName: "省内不限流量48元套餐含1G国内流量老客户免费升档终极版",
          status: true
        },
        {
          store: "店铺名称店铺名称店铺名称",
          phone: "19853124578",
          date: "2018-08-03 12:12:12",
          setName: "充值30元",
          status: true
        },
        {
          store: "店铺名称店铺名称店铺名称",
          phone: "19853124578",
          date: "2018-08-03 12:12:12",
          setName: "省内不限流量48元套餐含1G国内流量老客户免费升档终极版",
          status: false
        },
        {
          store: "店铺名称店铺名称店铺名称",
          phone: "19853124578",
          date: "2018-08-03 12:12:12",
          setName: "充值30元",
          status: false
        }
      ],
      phone: sessionStorage.getItem("phone")
    };
  },
  methods: {
    storeDetail(e) {
      var sid = e.target.dataset.sid;
      var url = `/store/${sid}`;
      this.$router.push(url);
    }
  },
  created() {
    console.log(this.phone);
    var url = "/user/getFailOrders";
    var params = this.qs.stringify({ phone: this.phone });
    this.axios.post(url, params).then(res => {
      console.log(res.data);
      this.obj = res.data;
    });
  }
};
</script>
<style scoped lang="stylus">
@import './order.styl'
</style>