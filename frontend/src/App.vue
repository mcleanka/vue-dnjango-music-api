<template>
  <div id="wrapper">
    <Header :totalLength="cartTotalLength" />
    <Footer />
  </div>
</template>

<script>
import axios from "axios";
import Footer from "./components/Footer.vue";
import Header from "./components/Header.vue";

export default {
  components: { Header, Footer },
  data() {
    return {
      cart: {
        items: [],
      },
    };
  },
  beforeCreate() {
    this.$store.commit("initializeStore");

    const token = this.$store.state.token;

    if (token) {
      axios.defaults.headers.common["Authorization"] = "Token " + token;
    } else {
      axios.defaults.headers.common["Authorization"] = "";
    }
  },
  mounted() {
    this.cart = this.$store.state.cart;
  },
  computed: {
    cartTotalLength() {
      let totalLength = 0;

      for (let i = 0; i < this.cart.items.length; i++) {
        totalLength += this.cart.items[i].quantity;
      }

      return totalLength;
    },
  },
};
</script>


<style lang="scss">
@import "https://cdn.jsdelivr.net/npm/bulma@0.9.3/css/bulma.min.css";
</style>
