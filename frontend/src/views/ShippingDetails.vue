<template>
  <div class="column is-12 box">
    <h2 class="subtitle">Shipping Details</h2>
    <p class="has-text-grey mb-4">All fields are required</p>
    <div class="columns is-multiline">
      <div class="column is-6">
        <div class="field">
          <label for="first_name">First name</label>
          <div class="control">
            <input type="text" class="input" v-model="first_name" />
          </div>
        </div>
        <div class="field">
          <label for="last_name">Last name</label>
          <div class="control">
            <input type="text" class="input" v-model="last_name" />
          </div>
        </div>
        <div class="field">
          <label for="email">Email</label>
          <div class="control">
            <input type="text" class="input" v-model="email" />
          </div>
        </div>
      </div>
      <div class="column is-6">
        <div class="field">
          <label for="address">Address</label>
          <div class="control">
            <input type="text" class="input" v-model="address" />
          </div>
        </div>
        <div class="field">
          <label for="zipcode">Zipcode</label>
          <div class="control">
            <input type="text" class="input" v-model="zipcode" />
          </div>
        </div>
        <div class="field">
          <label for="phone">Phone</label>
          <div class="control">
            <input type="text" class="input" v-model="phone" />
          </div>
        </div>
        <div class="field">
          <label for="place">Place</label>
          <div class="control">
            <input type="text" class="input" v-model="place" />
          </div>
        </div>
      </div>
    </div>
    <div class="notification is-danger mt-4" v-if="errors.length">
      <p v-for="error in errors" :key="error">{{ error }}</p>
    </div>

    <hr />

    <div id="card-element" class="mb-5 ml-2"></div>

    <button class="button is-dark" @click="submitForm">Pay with Stripe</button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "ShippingDetails",
  props: {
    items: Object,
  },
  data() {
    return {
      cart: this.items,
      stripe: {},
      card: {},
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      address: "",
      zipcode: "",
      place: "",
      errors: [],
    };
  },
  mounted() {
    this.stripe = window.Stripe(
      "pk_test_51KBB4KDstz0lEQf9D5YgD23ZPPdWUp7YyazKvjw31AblD7qwIKmDRXmR5KzsT12K3RfstgP0iLFg5oMugXkDXVun00XrBthAqp"
    );
    const elements = this.stripe.elements();
    this.card = elements.create("card", { hidePostalCode: true });

    this.card.mount("#card-element");
  },
  methods: {
    submitForm() {
      this.errors = [];

      if (this.first_name === "") {
        this.errors.push("The first name is missing");
      }

      if (this.last_name === "") {
        this.errors.push("The last name is missing");
      }

      if (this.email === "") {
        this.errors.push("The email is missing");
      }

      if (this.phone === "") {
        this.errors.push("The phone is missing");
      }

      if (this.zipcode === "") {
        this.errors.push("The zipcode is missing");
      }

      if (this.address === "") {
        this.errors.push("The address is missing");
      }

      if (this.place === "") {
        this.errors.push("The place is missing");
      }

      if (!this.errors.length) {
        this.$store.commit("setIsLoading", true);

        this.stripe.createToken(this.card).then((result) => {
          if (result.error) {
            this.$store.commit("setIsLoading", false);
            this.errors.push(result.error.message);
          } else {
            this.stripeTokenHandler(result.token);
          }
        });
      }
    },
    async stripeTokenHandler(token) {
      const items = [];

      for (let i = 0; i < this.cart.items.length; i++) {
        const item = this.cart.items[i];
        const obj = {
          product: item.product.id,
          quantity: item.quantity,
          price: item.product.price * item.quantity,
        };

        items.push(obj);
      }

      const data = {
        first_name: this.first_name,
        last_name: this.last_name,
        email: this.email,
        address: this.address,
        zipcode: this.zipcode,
        place: this.place,
        phone: this.phone,
        items,
        stripe_token: token.id,
      };

      axios
        .post("checkout/", data)
        .then(() => {
          this.$store.commit("clearCart");
          this.$router.push("/cart/success");
        })
        .catch((error) => {
          this.errors.push(error.message);
        });

      this.$store.commit("setIsLoading", false);
    },
  },
};
</script>