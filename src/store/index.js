import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
  state() {
    return {
      cats: [],
      favotiteCats: JSON.parse(localStorage.getItem('favorite-cats')) ?? [],
    }
  },
  mutations: {
    setCats(state, cats) {
      state.cats = cats
    },
    addFavoriteCats(state, cats) {
      state.favotiteCats.push(cats)
      localStorage.setItem('favorite-cats', JSON.stringify(state.favotiteCats))
    },
    removeFavoritesCats(state, idx) {
      state.favotiteCats.splice(idx, 1)
      localStorage.setItem('favorite-cats', JSON.stringify(state.favotiteCats))
    },
  },
  actions: {
    async loadAllCats({ commit }) {
      try {
        const { data } = await axios.get(
          `https://api.thecatapi.com/v1/images/search?limit=15&page=1&order=DESC`
        )
        if (data) {
          commit('setCats', data)
        }
      } catch (e) {
        throw new Error(e)
      }
    },
  },
  getters: {
    cats(state) {
      return state.cats
    },
    favoriteCats(state) {
      return state.favotiteCats
    },
  },
})
