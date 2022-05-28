<template>
  <the-loader v-if="loading" />
  <div class="all-cats" v-else>
    <cats-list />
  </div>
</template>

<script>
import { onMounted, ref } from '@vue/runtime-core'
import { useStore } from 'vuex'
import TheLoader from '@/components/UI/TheLoader.vue'
import CatsList from '../components/CatsList.vue'

export default {
  setup() {
    const store = useStore()

    const loading = ref(false)

    onMounted(async () => {
      loading.value = true
      await store.dispatch('loadAllCats')
      loading.value = false
    })

    return {
      loading,
    }
  },
  components: { TheLoader, CatsList },
}
</script>

<style></style>
