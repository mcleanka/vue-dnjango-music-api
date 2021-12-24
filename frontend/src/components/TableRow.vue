<template>
  <tr>
    <th>
      <router-link :to="item.product.get_absolute_url">{{
        item.product.name
      }}</router-link>
    </th>
    <td>{{ item.product.price }}</td>
    <td>
      <a @click="decrementQuantity(item)"><i class="fas fa-minus"></i></a>
      {{ item.quantity }}
      <a @click="incrementQuantity(item)"><i class="fas fa-plus"></i></a>
    </td>
    <td>${{ getItemTotal(item).toFixed(2) }}</td>
    <td><button class="delete" @click="removeFromCart(item)"></button></td>
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
      item: this.item,
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