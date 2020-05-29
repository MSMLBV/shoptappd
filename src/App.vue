<template>
  <div id="app">
    <Cart v-if="showCart" />
    <div class="header">
      <h1 class="welcome">Good {{ getPartOfDay() }}</h1>
      <div class="counters">
        <div class="count-wrap" @click="toggleShowCart">
          <font-awesome-icon :icon="['fas', 'shopping-cart']" size="lg"/>
          <span class="counter-label">{{ numberOfCartItems }}</span>
        </div>
        <div class="count-wrap">
          <font-awesome-icon :icon="['fas', 'heart']" size="lg"/>
          <span class="counter-label">{{ numberOfFavorites }}</span>
        </div>
      </div>
    </div>
    <Search @searchResult="handleSearchResult" />
    <ProductList :items="products" />
  </div>
</template>

<script>
import dayjs from 'dayjs';
import Cart from './components/Cart';
import ProductList from './components/ProductList';
import Search from "./components/Search";

export default {
  name: 'App',
  components: {
    Cart,
    Search,
    ProductList    
  },
  data() {
    return {
      products: [],
      showCart: false,
    }
  },
  computed: {
    numberOfCartItems() {
      return this.$store.state.cart.quantity;
    },
    numberOfFavorites() {
      return this.$store.state.favorites.length;
    },
  },
  methods: {
    handleSearchResult(result) {
      this.products = result.beers.items;
    },
    addProductToCart(product) {
      console.log({ product });
      this.$store.dispatch('addToCart', product);
    },
    addToFavorites(product) {
      product.isFavorite = true;
      console.log({ favorite: product });
      this.$store.dispatch('addToFavorites', product);
    },
    getPartOfDay() {
      const date = new Date();
      return dayjs(date).hour() < 12 ? 'morning' : dayjs(date).hour() < 18 ? 'afternoon' : 'evening';
    },
    toggleShowCart() {
      this.showCart = !this.showCart;
    }
  },
}
</script>

<style lang="scss">
html, body {
  background-color: #ddd;
  margin: 0;
  padding: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.header {
  display: flex;
  flex-direction: column-reverse;
}
.welcome {
  color: #000;
  width: 100%;

  @media screen and (max-width: 375px) {
    width: 240px;
    left: 0;
    top: 0;
    font-size: 28px;
    position: relative;
  }
}
.counters {
  width: 100%;

  display: flex;
  justify-content: flex-end;
  padding: 15px;

  @media screen and (max-width: 375px) {
    width: 100px;
  }
}
.count-wrap {
  position: relative;
  height: 50px;
  width: 50px;
  cursor: pointer;

  display: flex;
  justify-content: center;
  align-items: center;
}
.counter-label {
  position: absolute;
  position: absolute;
  right: 0;
  top: 0;
  color: gold;
  background-color: #000;
  border-radius: 50%;
  height: 20px;
  width: 20px;
  font-weight: bold;
  padding: 2px;
}
</style>
