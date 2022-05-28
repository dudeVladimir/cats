<template>
  <h1>FAQ</h1>
  <div
    class="question"
    v-for="q in questions"
    :key="q.title"
    @click="q.isOpen = !q.isOpen"
  >
    <h3>{{ q.title }}</h3>
    <span v-if="q.isOpen">{{ q.description }}</span>
  </div>
</template>

<script>
import { useStore } from 'vuex'
export default {
  setup() {
    const store = useStore()
    return {
      questions: store.state.about.questions,
    }
  },
}
</script>
