<template>
  <transition-group name="item" v-if="cats.length !== 0">
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
          :src="require(`../assets/${cat.likeSrc}`)"
          alt="like"
          ref="like"
          @click="likeHandler(idx, cat.id, cat.url)"
        />
      </div>
    </div>
  </transition-group>
</template>

<script>
import { computed, ref } from '@vue/runtime-core'
import { useStore } from 'vuex'

export default {
  props: {
    cats: {
      type: Array,
      required: true,
    },
  },
  setup(props) {
    const store = useStore()

    const cats = computed(() => props.cats)
    const like = ref([])

    const mouseOver = (idx) => {
      try {
        like.value[idx].style.display = 'block'
      } catch (e) {}
    }

    const mouseLeave = (idx) => {
      try {
        like.value[idx].style.display = 'none'
      } catch (e) {}
    }

    const likeHandler = (idx, id, url) => {
      if (like.value[idx].src === `${require('../assets/like.png')}`) {
        like.value[idx].src = `${require('../assets/likeFill.png')}`
        store.commit('addFavoriteCats', { id, url, likeSrc: 'likeFill.png' })
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
