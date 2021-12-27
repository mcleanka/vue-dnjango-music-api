<template>
  <tr>
    <th>
      <router-link :to="product.product.get_absolute_url">{{
        product.product.name
      }}</router-link>
    </th>
    <td>{{ product.product.price }}</td>
    <td>
      <a @click="decrementQuantity(product)"><i class="fas fa-minus"></i></a>
      {{ product.quantity }}
      <a @click="incrementQuantity(product)"><i class="fas fa-plus"></i></a>
    </td>
    <td>${{ getItemTotal(product).toFixed(2) }}</td>
    <td><button class="delete" @click="removeFromCart(product)"></button></td>
  </tr>
</template>

<script>
export default {
  name: "TableRow",
  props: {
    item: Object,
  },
  data() {
    return {
      product: this.item,
    };
  },
  methods: {
    getItemTotal(item) {
      return item.quantity * item.product.price;
    },
    decrementQuantity(item) {
      item.quantity -= 1;

      if (item.quantity === 0) {
        this.$emit("removeFromCart", item);
      }

      this.updateCart();
    },
    incrementQuantity(item) {
      item.quantity += 1;
      this.updateCart();
    },
    updateCart() {
      localStorage.setItem("cart", JSON.stringify(this.$store.state.cart));
    },
    removeFromCart(item) {
      this.$emit("removeFromCart", item);
      this.updateCart();
    },
  },
};
</script>