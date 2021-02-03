<template>
      <li class="rounded-sm relative px-3 py-1 hover:bg-gray-100">
        <button class="w-full text-left flex items-center outline-none focus:outline-none">
          <nuxt-link :to="{name: 'shop-categories-slug', params: {slug: category.slug}}" class="pr-1 flex-1">{{ category.name }}</nuxt-link>
          <span v-if="category.children" class="mr-auto">
            <svg class="fill-current h-4 w-4 transition duration-150 ease-in-out" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </span>
        </button>
        <ul v-if="category.children" class="bg-white border rounded-sm absolute top-0 right-0 transition duration-150 ease-in-out origin-top-left min-w-32">
          <categories v-for="category in category.children" :key="category.id" :category="category"></categories>
        </ul>
      </li>
</template>

<script>
  export default {
    name: 'categories',
    props: ["category"],
  }
</script>
