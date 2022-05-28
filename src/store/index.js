import { createStore } from 'vuex'
import axios from 'axios'
import about from './modules/about.module'

export default createStore({
  state() {
    return {
      pageNumber: 1,
      cats: [],
      favotiteCats: JSON.parse(localStorage.getItem('favorite-cats')) ?? [],
    }
  },
  mutations: {
    setCats(state, cats) {
      state.cats = cats
    },
    pushCats(state, cats) {
      state.cats.push(cats)
    },
    pageCounter(state) {
      state.pageNumber = state.pageNumber + 1
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
    async loadAllCats({ commit, state }) {
      try {
        if (state.cats.length === 0) {
          const { data } = await axios.get(
            `https://api.thecatapi.com/v1/images/search?limit=15&page=1&order=DESC`
          )
          if (data) {
            const cats = data.map((e) => {
              return { ...e, likeSrc: 'like.png' }
            })
            commit('setCats', cats)
          }
        } else {
          commit('pageCounter')
          const { data } = await axios.get(
            `https://api.thecatapi.com/v1/images/search?limit=15&page=${state.pageNumber}&order=DESC`
          )
          if (data) {
            data.forEach((e) => {
              commit('pushCats', { ...e, likeSrc: 'like.png' })
            })
          }
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
  modules: { about },
})
