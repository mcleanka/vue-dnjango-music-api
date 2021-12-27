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

    <div id="card-element" class="mb-5 ml-2">
      <button class="button is-dark" @click="submitForm">
        Pay with Stripe
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "ShippingDetails",
  data() {
    return {
      cart: {
        items: [],
      },
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
    },
  },
};
</script>