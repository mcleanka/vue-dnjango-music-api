<template>
  <div class="page-category">
    <div class="columns is-multiline">
      <div class="column is-12">
        <h2 class="is-size-2 has-text-centered">
          {{ category.name }}
        </h2>

        <ProductCard
          v-for="product in category.products"
          :product="product"
          :key="product.id"
        />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { toast } from "bulma-toast";
import ProductCard from "../components/ProductCard.vue";

export default {
  components: { ProductCard },
  name: "Category",
  data() {
    return {
      category: {
        products: [],
      },
    };
  },
  mounted() {
    this.getCategory();
  },
  watch: {
    $route(to) {
      if (to.name === "Category") {
        this.getCategory();
      }
    },
  },
  methods: {
    async getCategory() {
      const categorySlug = this.$route.params.category_slug;

      this.$store.commit("setIsLoading", true);

      await axios
        .get(`products/${categorySlug}`)
        .then((response) => {
          this.category = response.data;
          document.title = this.category.name + " | API";
        })
        .catch((error) => {
          toast({
            message: error.message,
            type: "is-danger",
            dismissible: true,
            pauseOnHover: true,
            duration: 2000,
            position: "bottom-right",
          });
        });

      this.$store.commit("setIsLoading", false);
    },
  },
};
</script>