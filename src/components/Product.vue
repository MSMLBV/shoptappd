    <template>
  <div class="product" v-if="product && product.beer">
    <button @click="addProductToFavorites(product)" class="favorite-button" :class="{ favorite: product.isFavorite }">
        <font-awesome-icon v-if="!product.isFavorite" :icon="['far', 'heart']" size="lg"/>
        <font-awesome-icon v-if="product.isFavorite" :icon="['fas', 'heart']" size="lg"/>
    </button>
    <img class="label" :src="product.beer.beer_label" />
    <h1 class="title" :title="product.beer.beer_name">{{ product.beer.beer_name }}</h1>
    <span>$ {{ price }}</span>
    <p class="description">
      {{ product.beer.beer_description }}
    </p>
    <div class="button-row">
        <button @click="addProductToCart(product)" class="add-button"><font-awesome-icon :icon="['fas', 'plus']" size="lg"/> Add to cart</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Product',
  props: {
    product: {
        type: Object,
        required: true
    },
  },
  data() {
      return {
          price: parseFloat(Math.random() * 100).toFixed(2)
      }
  },
  methods: {
    addProductToCart(product) {
      this.$store.dispatch('addToCart', product);
    },
    addProductToFavorites(product) {
        this.$set(this.product, 'isFavorite', true);
        this.$store.dispatch('addToFavorites', product);
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
    .product {
        background-color: #fff;
        border-radius: 16px;
        padding: 20px;

        display: flex;
        flex-direction: column;
    }
    .title {
        height: 80px;
        overflow: hidden;
    }
    .label {
        height: 150px;
        align-self: center;
    }
    .description {
        overflow: hidden;
        height: 150px;
        white-space: normal;
    }
    .button-row {
        display: flex;
        justify-content: flex-end;
        align-items: flex-end;
        width: 250px;
        align-self: center;
    }
    button {
        background: none;
        color: gold;
        padding: 15px 30px;
        border: 2px solid gold;
        border-radius: 32px;
        cursor: pointer;
    }
    .favorite-button {
        width: 30px;
        height: 30px;
        padding: 25px;
        display: flex;
        align-items: center;
        justify-content: center;

        position: relative;
        left: 210px;
        top: -10px;
    }
    .add-button {
        position: relative;
        top: 48px;
        color: #fff;
        background-color: gold;
    }
</style>
