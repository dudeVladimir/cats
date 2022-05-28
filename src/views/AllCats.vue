<template>
  <the-loader v-if="loading" />
  <section v-else>
    <div class="all-cats">
      <cats-list :cats="cats" />
    </div>
    <the-loader v-if="loadingMore" />
    <button class="load__btn" @click="loadMore" v-else>
      Загрузить еще котиков
    </button>
  </section>
</template>

<script>
import { computed, onMounted, ref } from '@vue/runtime-core'
import { useStore } from 'vuex'
import TheLoader from '@/components/UI/TheLoader.vue'
import CatsList from '../components/CatsList.vue'

export default {
  setup() {
    const store = useStore()
    const cats = computed(() => store.getters.cats)

    const loading = ref(false)
    const loadingMore = ref(false)

    onMounted(async () => {
      loading.value = true
      await store.dispatch('loadAllCats')
      loading.value = false
    })

    const loadMore = async () => {
      loadingMore.value = true
      await store.dispatch('loadAllCats')
      loadingMore.value = false
    }

    return {
      loadingMore,
      loadMore,
      loading,
      cats,
    }
  },
  components: { TheLoader, CatsList },
}
</script>

<style></style>
