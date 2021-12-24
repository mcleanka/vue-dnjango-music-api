<template>
  <div>
    <form action="/search" method="get">
      <div class="field has-addons">
        <div class="control">
          <input
            class="input is-radiusless"
            type="text"
            name="query"
            placeholder="What are you looking for?"
          />
        </div>
        <div class="control">
          <button class="button is-success is-radiusless">
            <i class="fas fa-search"></i>
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "SearchForm",
};
</script>