<template>
  <div id="shop">
    <h1>产品列表</h1>
    <ul class="list">
      <li v-for="(food,index) in foods[0].foods">
        <a href="#" class="item">
          <img src="https://fuss10.elemecdn.com/4/de/a743c6b1b5485711464efe3fd0d57jpeg.jpeg?imageMogr2/thumbnail/200x200/format/webp/quality/85">
          <div class="item-info">
            <h3>{{index}}.{{food.name}}</h3>
            <p>{{food.description}}</p>
            <p>
              <strong>&yen; {{food.specfoods[0].price}}</strong>
            </p>
          </div>
          <div class="amount" v-show="cart.items[index] > 0">
            <button @click="decrease(index)">-</button>
            <input v-model.lazy="cart.items[index]">
            <button @click="increase(index)">+</button>
          </div>
          <button class="button" @click="addToCart(index)" v-show="!cart.items[index] || cart.items[index] < 1">加入购物车</button>
        </a>
      </li>
    </ul>

    <div class="shopcart">
      <h2>购物车 <a @click="cart.items = []">[清空]</a></h2>
      <ul>
        <li v-for="(item, index) in cart.items" v-show="cart.items[index] > 0">
          <span>{{foods[0].foods[index].name}}</span>
          <div class="amount">
            <button @click="decrease(index)">-</button>
            <input v-model="cart.items[index]">
            <button @click="increase(index)">+</button>
          </div>
          <em>&yen;{{foods[0].foods[index].specfoods[0].price * item}}</em>
        </li>
      </ul>
      <div class="shopcart-total">
        &yen;
        <strong>
          {{total}}
        </strong>
      </div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'

  export default {
    name: 'app',
    data () {
      return {
        foods: [{}],
        cart: {
          items: {}
        }
      }
    },
    methods: {
      fetch: function () {
        var that = this
        that.$http.get('http://192.168.1.7:8080/laratodo/public/api/v1/menu').then(function (response) {
          that.foods = response.data
        })
      },
      addToCart: function (index) {
        Vue.set(this.cart.items, index, 1)
      },
      decrease: function (index) {
        this.cart.items[index] --
      },
      increase: function (index) {
        this.cart.items[index] ++
      }
    },
    mounted: function () {
      var that = this
      this.fetch()
      this.$watch('cart.items', function (val) {
        for (var k in val) {
          Vue.set(that.cart.items, k, parseInt(val[k]))
        }
      }, {
        deep: true
      })
    },
    computed: {
      total: function () {
        var total = 0
        for (var index in this.cart.items) {
          total = this.foods[0].foods[index].specfoods[0].price * this.cart.items[index] + total
        }
        return total
      }
    }
  }
</script>

<style lang="less">
  @import './less/css.less';
  #shop {
    width: 1000px;
    margin: 20px auto;
    h1 {
      font-size: 16px;
      margin-bottom: 20px;
    }
    .list {
      width: 100%;
      &:after {
        content: '';
        display: block;
        height: 0;
        clear: both;
      }
      li {
        margin-bottom: 20px;
        float: left;
        width: 50%;
        a {
          display: block;
          background: #fff;
          border: 1px #eee solid;
          margin-right: 10px;
        }
      }
      li:nth-child(2n+2){
        a{
          margin-right: 0;
          margin-left: 10px;
        }
      }
      .item {
        position: relative;
        .button {
          position: absolute;
          background: @primary-color;
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

    }
  }
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
