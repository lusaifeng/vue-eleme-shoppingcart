<template>
  <div class="shopcart">
    <h2>购物车 <a href="#" @click.parent="emptyCart">[清空]</a></h2>
    <ul>
      <li v-for="(item, index) in foods">
        <span>{{item.name}}</span>
        <div class="amount">
          <button @click="decrease(index)">-</button>
          <input v-model="item.cart_number">
          <button @click="increase(index)">+</button>
        </div>
        <em>&yen;{{item.specfoods[0].price * item.cart_number}}</em>
      </li>
    </ul>
    <div class="shopcart-total">
      &yen;
      <strong>
        {{total}}
      </strong>
    </div>
  </div>
</template>

<script>
export default {
  name: 'cart',
  data () {
    return {}
  },
  computed: {
    total: function () {
      return this.$store.state.cartTotal
    },
    foods: function () {
      return this.$store.state.cartProducts
    }
  },
  methods: {
    emptyCart: function () {
      this.$store.commit('emptyCart')
    }
  }
}
</script>

<style lang="less" scoped>
@import '../less/css.less';
.shopcart {
  position: fixed;
  bottom: 0;
  right: 0;
  width: 320px;
  background: #fff;
  box-shadow: 0 1px 15px #ccc;
  border-top: 2px solid #0089dc;
  font-size:14px;
  h2 {
    background: #fafafa;
    height: 45px;
    line-height: 45px;
    padding: 0 10px;
    font-size:14px;
    border-bottom: 1px #eee solid;
    color: #666;
    a {
      color: @primary-color;
    }
  }
  li {
    margin: 0 10px;
    border-bottom: 1px #eee solid;  
    line-height: 40px;
    span {
      width: 180px;
      float: left;
      overflow: hidden;
      text-overflow:ellipsis;
      white-space: nowrap;
    }
    .amount {
      display: inline-block;
      width: 66px;
      height: 18px;
      line-height: 18px;
      vertical-align: middle;
      button {
        border: none;
        float:left;
        background: none;
        width:18px;
        text-align: center;
        cursor: pointer;
        border: 1px #ddd solid;
      }
      input {
        width: 26px;
        float: left;
        border: 1px #ddd solid;
        border-left: none;
        border-right: none;
        text-align: center;
      }
    }
    em {
      font-style: normal;
      float: right;
    }
  }
  .shopcart-total {
    line-height: 40px;
    background: #444;
    color: #fff;
    padding: 0 10px;
    font-size: 16px;
  }
}
</style>