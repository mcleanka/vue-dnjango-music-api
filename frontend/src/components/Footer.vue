<template>
  <footer class="footer">
    <p class="has-text-centered">{{ copyright }}</p>
  </footer>
</template>

<script>
export default {
  name: "Footer",
  data() {
    return {
      copyright: "Copyright (c) 2021",
    };
  },
};
</script>