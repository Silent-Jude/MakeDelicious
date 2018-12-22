<template>

  <div class="app_admin">
    <span>我是管理员</span>
    <button @click="addPhone">+</button>

    <div
      v-for="(item,i) of list"
      :key="i"
    >
      <span>请输入手机号</span><input
        type="tel"
        :id="item.i"
        maxlength="11"
        placeholder="请输入需要注册的手机号"
        v-model="item.phone"
      >
    </div>

    <br>
    <br>

    <button @click="reg">提交注册</button>
  </div>

</template>

<script>
export default {
  data() {
    return {
      list: [{ phone: "", i: 1 }],
      i: 1,
      progress: 0
    };
  },
  methods: {
    addPhone() {
      this.i++;
      this.list.push({ phone: "", i: this.i });
    },

    reg() {
      // console.log(this.list);
      var reg = /^1[35789]\d{9}$/;
      for (var item of this.list) {
        if (reg.test(item.phone)) {
          // console.log(item.phone);
          var phone = item.phone;
          this.axios.get(`/user/regUser?phone=${phone}`).then(res => {
            console.log(res.data);
            if (res.data.code == 1) {
              console.log("user注册成功");
            }
          });
          this.axios.get(`/user/regBill?phone=${phone}`).then(res => {
            if (res.data.code == 1) {
              console.log("账单表插入成功！");
            }
          });
          this.axios.get(`/user/regOrders?phone=${phone}`).then(res => {
            if (res.data.code == 1) {
              console.log("orders注册成功");
            }
          });
        }
      }
    }
  }
};
</script>
<style scoped>
</style>``