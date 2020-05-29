<template>
  <transition name="fade">
    <div class="cart">
      <h1>My cart</h1>
      <ul v-if="cart.length > 0">
        <li v-for="item in cart" :key="item.title">
          {{ item.beer.beer_name }} [ {{ item.quantity }} ]
        </li>
      </ul>
      <p v-else>
        <span>Your cart is empty</span>
        <span>Please add some items to your cart</span>
      </p>
    </div>
  </transition>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Cart',
  components: {
  },
  data() {
    return {
    }
  },
  computed: {
    ...mapGetters({
      cart: 'cartItems',
    }),
    numberOfCartItems() {
      return this.$store.state.cart.quantity;
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.cart {
  padding: 15px;
  border-radius: 16px;
  background-color: #fff;
  margin: 30px;

  position: fixed;
  width: 400px;
  right: 55px;
  top: 10px;
  z-index: 1;
  
  box-shadow: 5px 5px 5px 0px rgba(0,0,0,5);

  @media screen and (max-width: 375px) {
      width: 300px;
      right: 0
  }

  ul {
    list-style: none;
    
    display: flex;
    justify-content: flex-end;
    flex-direction: column;
    align-items: flex-end;
  }

  p span {
    display: block;
    margin: 5px;
  }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
