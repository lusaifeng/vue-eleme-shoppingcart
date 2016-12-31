<template>
  <div id="shop">
    <h1>产品列表1</h1>
    <ul class="list">
      <li v-for="(food,index) in foods[0].foods">
        <food :food="food" :index="index"></food>
      </li>
    </ul>

    <cart></cart>
  </div>
</template>

<script>
  // import Vue from 'vue'
  import Food from 'components/Food'
  import Cart from 'components/Cart'

  export default {
    name: 'app',
    components: {
      Food, Cart
    },
    data () {
      return {
        foods: [{}]
      }
    },
    methods: {
      fetch: function () {
        var that = this
        that.$http.get('http://192.168.1.7:8080/laratodo/public/api/v1/menu').then(function (response) {
          var data = response.data
          data.forEach(function (cat) {
            cat.foods.forEach(function (food) {
              food.cart_number = 0
              return food
            })
            return cat
          })
          that.foods = data
        })
      }
    },
    mounted: function () {
      this.fetch()
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
    }
  }
  
</style>
