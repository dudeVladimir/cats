<template>
  <teleport to="body">
    <the-navbar />
  </teleport>
  <main>
    <router-view></router-view>
  </main>
</template>

<script>
import TheNavbar from './components/UI/TheNavbar.vue'

export default {
  components: { TheNavbar },
}
</script>
