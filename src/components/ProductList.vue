<template>
  <div class="product-list">
    <ul>
      <li v-for="item in items" :key="item.title">
        <Product :product="item" />
      </li>
    </ul>
  </div>
</template>

<script>
import Product from './Product';

export default {
  name: 'ProductList',
  components: {
    Product 
  },
  props: {
    items: {
        type: Array,
        required: true
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  ul {
    list-style: none;

    display: flex;
    overflow-x: auto;
    padding-bottom: 20px;

    li {
      margin: 15px 12px;
    }
  }
</style>
