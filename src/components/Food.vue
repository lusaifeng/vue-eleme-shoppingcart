<template>
  <a href="#" class="item">
    <img src="https://fuss10.elemecdn.com/4/de/a743c6b1b5485711464efe3fd0d57jpeg.jpeg?imageMogr2/thumbnail/200x200/format/webp/quality/85">
    <div class="item-info">
      <h3>{{food.name}}</h3>
      <p>{{food.description}}</p>
      <p>
        <strong>&yen; {{food.specfoods[0].price}}</strong>
      </p>
    </div>

    <div class="amount" v-show="food.cart_number > 0">
      <button @click="decrement(index, food)">-</button>
      <input v-model="food.cart_number">
      <button @click="increment(index, food)">+</button>
    </div>
    <button class="button" @click="increment(index, food)" v-show="!food.cart_number">加入购物车</button>
  </a>
</template>

<script>
export default {
  name: 'food',
  props: {
    food: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      required: true
    }
  },
  data () {
    return {}
  },
  computed: {
    cartProducts () {
      return this.$store.state.cartProducts
    }
  },
  methods: {
    increment (index, food) {
      this.$store.commit('changeCartAmount', {
        opt: 'increment',
        index,
        food
      })
    },
    decrement (index, food) {
      this.$store.commit('changeCartAmount', {
        opt: 'decrement',
        index,
        food
      })
    }
  }
}
</script>

<style lang="less">
  .item {
    position: relative;
    .button {
      position: absolute;
      background: #0089dc;
      color: #fff;
      width: 100px;
      bottom: 10px;
      right: 10px;
      border: none;
      line-height: 25px;
      border-radius: 25px;
      font-size: 13px;
      cursor: pointer;
    }
    .amount {
      width: 100px;
      height: 25px;
      line-height: 25px;
      position: absolute;
      bottom: 10px;
      right: 10px;
      background: #eee;
      border-radius: 25px;
      border: 1px #ddd solid;
      button {
        border: none;
        float:left;
        background: none;
        width:29px;
        text-align: center;
        cursor: pointer;
        line-height: 25px;
      }
      input {
        width: 40px;
        float: left;
        height: 25px;
        border: 1px #ddd solid;
        border-top: none;
        border-bottom: none;
        text-align: center;
      }
    }
    img {
      width:100px;
      height: 100px;
      vertical-align: bottom;
    }
    .item-info {
      vertical-align: top;
      padding: 8px 10px;
      width: 365px;
      float: right;
      h3 {
        font-size: 14px;
      }
      p {
        font-size: 12px;
        strong {
          line-height: 25px;
          color: #f00;
          font-size: 14px;
        }
      }
    }
  }
</style>