export default {
  namespaced: true,
  state() {
    return {
      questions: [
        {
          title: 'Стек',
          description:
            'Vue Composition API, Vuex, Vue Router, Axios + The Cat API (https://thecatapi.com/)',
          isOpen: false,
        },
        {
          title: 'Контакты',
          description:
            'email: dude.vladimir@mail.ru; GitHub: github.com/dudeVladimir',
          isOpen: false,
        },
      ],
    }
  },
}
