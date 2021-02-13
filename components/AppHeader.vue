<template>
  <header class="text-gray-600 body-font">
    <div class="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
      <a class="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-linecap="round"
          stroke-linejoin="round" stroke-width="2" class="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full"
          viewBox="0 0 24 24">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
        </svg>
        <span class="ml-3 text-xl">Store</span>
      </a>
      <nav
        class="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-400	flex flex-wrap items-center text-base justify-center">
        <nuxt-link class="mr-5 hover:text-gray-900" to="/">Shop</nuxt-link>
        <div class="group inline-block">
          <button class="px-3 py-1 bg-white flex items-center min-w-32">
            <span class="pr-1 flex-1">Categoires</span>
            <span>
              <svg class="fill-current h-4 w-4 transform group-hover:-rotate-180 transition duration-150 ease-in-out"
                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </span>
          </button>
          <ul
            class="bg-white border rounded-sm absolute transform scale-0 group-hover:scale-100 transition duration-150 ease-in-out origin-top min-w-32">
            <categories v-for="category in categories" :key="category.id" :category="category"></categories>
          </ul>
        </div>
        <nuxt-link class="mr-5 hover:text-gray-900" :to="{name: 'about'}">About</nuxt-link>
        <nuxt-link class="mr-5 hover:text-gray-900" :to="{name: 'contact'}">Contact</nuxt-link>
      </nav>
      <nuxt-link v-if="isAuth" :to="{name: 'auth-login'}"
        class="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">
        <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          class="w-4 h-4 ml-1" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      </nuxt-link>
      <div v-else class="group inline-block">
        <button class="px-3 py-1 bg-white flex items-center min-w-32">
          <span class="pr-1 flex-1 capitalize">{{ fullname }}</span>
          <span>
            <svg class="fill-current h-4 w-4 transform group-hover:-rotate-180 transition duration-150 ease-in-out"
              xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </span>
        </button>
        <ul
          class="bg-white border rounded-sm absolute transform scale-0 group-hover:scale-100 transition duration-150 ease-in-out origin-top min-w-32">
          <li class="rounded-sm relative px-3 py-1 hover:bg-gray-100">
            <button @click="logout()" class="w-full text-left flex items-center outline-none focus:outline-none">
              <span class="pr-1 flex-1">Logout</span>
            </button>
          </li>
        </ul>
      </div>
      <nuxt-link :to="{name: 'cart'}"
        class="inline-flex relative items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">
        <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          class="w-4 h-4 ml-1" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
        <span
          class="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-700 transform translate-x-1/2 -translate-y-1/2">{{ $store.getters['cart/itemsCount'] }}</span>
      </nuxt-link>
    </div>
  </header>
</template>


<script>
  import arrayToTree from 'array-to-tree';
  import _ from 'underscore';

  export default {
    methods: {
      logout() {
        this.$apolloHelpers.onLogout();
        this.$store.commit('auth/logout');
      }
    },
    computed: {
      isAuth(){
        return this.$store.getters['auth/isAuth'];
      },
      categories(){
        let categories = arrayToTree(this.$store.getters['data/categories']);

        if (_.first(categories) != undefined)
          return _.first(categories).children;
      },
      fullname(){
        return this.$store.getters['auth/fullname'];
      }
    },
  }

</script>

<style>
  /* since nested groupes are not supported we have to use
     regular css for the nested dropdowns
  */
  li>ul {
    transform: translatex(100%) scale(0)
  }

  li:hover>ul {
    transform: translatex(101%) scale(1)
  }

  li>button svg {
    transform: rotate(-90deg)
  }

  li:hover>button svg {
    transform: rotate(-270deg)
  }

  /* Below styles fake what can be achieved with the tailwind config
     you need to add the group-hover variant to scale and define your custom
     min width style.
  	 See https://codesandbox.io/s/tailwindcss-multilevel-dropdown-y91j7?file=/index.html
  	 for implementation with config file
  */
  .group:hover .group-hover\:scale-100 {
    transform: scale(1)
  }

  .group:hover .group-hover\:-rotate-180 {
    transform: rotate(180deg)
  }

  .scale-0 {
    transform: scale(0)
  }

  .min-w-32 {
    min-width: 8rem
  }

</style>
