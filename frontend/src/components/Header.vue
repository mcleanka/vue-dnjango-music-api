<template>
  <div>
    <nav class="navbar is-dark" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <router-link to="/" class="navbar-item">
          <strong>API</strong>
        </router-link>

        <a
          role="button"
          class="navbar-burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbar-menu"
          @click="showMobileMenu = !showMobileMenu"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div
        id="navbar-menu"
        class="navbar-menu"
        v-bind:class="{ 'is-active': showMobileMenu }"
      >
        <div class="navbar-start">
          <div class="navbar-item">
            <SearchForm />
          </div>
        </div>

        <div class="navbar-end" id="navbar-menu">
          <router-link to="/about" class="navbar-item">about</router-link>

          <template v-if="$store.state.isAuthenticated">
            <router-link to="/my-account" class="navbar-item"
              >My Account</router-link
            >
          </template>
          <template v-else>
            <div class="navbar-item">
              <div class="buttons">
                <router-link to="/log-in" class="button is-primary">
                  Log in
                </router-link>
              </div>
            </div>
          </template>
          <div class="navbar-item">
            <div class="buttons">
              <router-link to="/cart" class="button is-light">
                <span class="icon">
                  <i class="fas fa-shopping-cart"></i>
                </span>
                <span>Cart ({{ totalLength }}) </span>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <Loader />

    <section class="section">
      <router-view />
    </section>
  </div>
</template>

<script>
import Loader from "./Loader.vue";
import SearchForm from "./SearchForm.vue";

export default {
  components: { Loader, SearchForm },
  name: "Header",
  props: ["totalLength"],
  data() {
    return {
      showMobileMenu: false,
    };
  },
};
</script>