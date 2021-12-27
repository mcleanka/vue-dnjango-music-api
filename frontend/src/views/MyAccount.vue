<template>
  <div class="page-my-account">
    <div class="columns is-multiline">
      <div class="column is-12">
        <h1 class="title">My Account</h1>
      </div>

      <div class="column is-12">
        <button class="button is-danger" @click="logout()">Log Out</button>
      </div>

      <hr />

      <div class="column is-12">
        <h2 class="subtitle">My Orders</h2>

        <OrderSummary v-for="order in orders" :key="order.id" :order="order" />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { toast } from "bulma-toast";
import OrderSummary from "./OrderSummary.vue";

export default {
  components: { OrderSummary },
  name: "MyAccount",
  mounted() {
    document.title = "My Account | API";

    this.getMyOrders();
  },
  data() {
    return {
      orders: [],
    };
  },
  methods: {
    async getMyOrders() {
      this.$store.commit("setIsLoading", true);

      await axios
        .get("orders")
        .then((response) => {
          this.orders = response.data;
        })
        .catch((error) => {
          toast({
            message: error.message,
          });
        });

      this.$store.commit("setIsLoading", false);
    },
    logout() {
      axios.defaults.headers.common["Authorization"] = "";

      localStorage.removeItem("token");
      localStorage.removeItem("username");
      localStorage.removeItem("userId");

      this.$store.commit("removeToken");
      this.$router.push("/");
    },
  },
};
</script>