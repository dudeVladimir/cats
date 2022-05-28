<template>
  <div
    class="all-cats__item"
    v-for="(cat, idx) in cats"
    :key="cat.id"
    @mouseover="mouseOver(idx)"
    @mouseleave="mouseLeave(idx)"
  >
    <img :src="cat.url" :alt="`cat-${cat.id}`" />
    <div class="item__like">
      <img
        src="../assets/like.png"
        alt="like"
        ref="like"
        @click="likeHandler(idx, cat.id, cat.url)"
      />
    </div>
  </div>
</template>

<script>
import { computed, ref } from '@vue/runtime-core'
import { useStore } from 'vuex'

export default {
  setup() {
    const store = useStore()

    const cats = computed(() => store.getters.cats)
    const like = ref([])

    const mouseOver = (idx) => {
      like.value[idx].style.display = 'block'
    }

    const mouseLeave = (idx) => {
      like.value[idx].style.display = 'none'
    }

    const likeHandler = (idx, id, url) => {
      if (like.value[idx].src === `${require('../assets/like.png')}`) {
        like.value[idx].src = `${require('../assets/likeFill.png')}`
        store.commit('addFavoriteCats', { id, url })
      } else {
        like.value[idx].src = `${require('../assets/like.png')}`
        store.commit(
          'removeFavoritesCats',
          store.getters.favoriteCats.findIndex((e) => e.id === id)
        )
      }
    }

    return {
      cats,
      mouseOver,
      mouseLeave,
      like,
      likeHandler,
    }
  },
}
</script>
