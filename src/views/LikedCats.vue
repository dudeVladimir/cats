<template>
  <div class="all-cats" v-if="cats.length !== 0">
    <cats-list :cats="cats" />
  </div>
  <span v-else>
    Любимых котиков нет,
    <router-link to="/" class="to">добавьте новых</router-link>
  </span>
</template>

<script>
import CatsList from '@/components/CatsList.vue'
import { computed } from '@vue/runtime-core'
import { useStore } from 'vuex'

export default {
  setup() {
    const store = useStore()

    return {
      cats: computed(() => store.getters.favoriteCats),
    }
  },
  components: { CatsList },
}
</script>

<style></style>
