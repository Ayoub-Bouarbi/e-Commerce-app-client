<template>
  <section class="text-gray-600 body-font overflow-hidden">
    <div v-if="$apollo.queries.product.loading" wire:loading
      class="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-white opacity-75 flex flex-col items-center justify-center">
      <div class="loader ease-linear rounded-full border-4 border-t-4 border-red-500 h-12 w-12 mb-4"></div>
    </div>
    <div v-else class="container px-5 py-24 mx-auto">
      <div class="lg:w-4/5 mx-auto flex flex-wrap">
        <img v-if="image != null" alt="ecommerce"
          class="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded" :src="image">
        <img v-else alt="ecommerce" class="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
          src="https://dummyimage.com/400x400">
        <div class="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
          <h2 class="text-sm title-font text-gray-500 uppercase tracking-widest">
            <nuxt-link :to="{name: 'shop-brands-slug',params: {'slug' : product.Brand.slug}}">{{ product.Brand.name }}
            </nuxt-link>
          </h2>
          <h1 class="text-gray-900 text-3xl title-font font-medium mb-1">{{ product.name }}</h1>
          <div class="flex mb-4">
            <span class="flex items-center">
              <svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                stroke-width="2" class="w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z">
                </path>
              </svg>
              <svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                stroke-width="2" class="w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z">
                </path>
              </svg>
              <svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                stroke-width="2" class="w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z">
                </path>
              </svg>
              <svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                stroke-width="2" class="w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z">
                </path>
              </svg>
              <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                class="w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z">
                </path>
              </svg>
              <span class="text-gray-600 ml-3">4 Reviews</span>
            </span>
            <span class="flex ml-3 pl-3 py-2 border-l-2 border-gray-200 space-x-2s">
              <a class="text-gray-500">
                <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5"
                  viewBox="0 0 24 24">
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                </svg>
              </a>
              <a class="text-gray-500">
                <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5"
                  viewBox="0 0 24 24">
                  <path
                    d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z">
                  </path>
                </svg>
              </a>
              <a class="text-gray-500">
                <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5"
                  viewBox="0 0 24 24">
                  <path
                    d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z">
                  </path>
                </svg>
              </a>
            </span>
          </div>
          <p class="leading-relaxed">
            {{ product.description }}
          </p>
          <div class="flex mt-6 attribute items-center pb-5 border-b-2 border-gray-100 mb-5">
            <div class="flex items-center">
              <span class="mr-3">Quantity</span>
              <div class="relative">
                <input type="number" v-model="quantity" min="1"
                  class="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-base px-3 w-24" />
              </div>
            </div>
          </div>
          <div class="flex">
            <span v-if="product.sale_price == 0"
              class="title-font font-medium text-2xl text-gray-900 pr-2">${{ product.price }}</span>
            <span v-if="product.sale_price > 0"
              class="title-font font-medium line-through text-2xl text-red-400 pr-2">${{ product.price }}</span>
            <span v-if="product.sale_price > 0"
              class="title-font font-medium text-2xl text-gray-900">${{ product.sale_price }}</span>
            <button @click="addToCart()"
              class="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">Add
              To Cart</button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import GET_PRODUCT from '@/graphql/product.gql'
  import _ from 'underscore';

  export default {
    data() {
      return {
        product: {
          id: 0,
          name: '',
          price: 0,
          description: '',
          Brand: {},
          Images: {},
        },
        quantity: 1
      }
    },
    apollo: {
      product: {
        prefetch: true,
        query: GET_PRODUCT,
        variables() {
          return {
            slug: this.$route.params.slug
          }
        }
      },
    },
    computed: {
      image() {
        //   let images = [];

        //   _.each(this.product.Images,(image) => {
        //     images.push('http://app-api.test/storage/uploads/products/' + image.image);
        //   });
        if (this.product.Images.length != 0 && this.product.Images[0] != undefined)
          return 'http://app-api.test/storage/uploads/products/' + this.product.Images[0].image;


        return null;

        //   return images;
      },

    },
    methods: {
      addToCart() {

        let item = {
          'id': this.product.id,
          'image': this.product.Images.length != 0 ? this.product.Images[0].image : null,
          'name': this.product.name,
          'price': this.product.price,
          'quantity': this.quantity
        }

        this.$store.commit('cart/addItem', item)
      }
    },
  }

</script>

<style scoped>
.loader {
	border-top-color: #3498db;
	-webkit-animation: spinner 1.5s linear infinite;
	animation: spinner 1.5s linear infinite;
}

@-webkit-keyframes spinner {
	0% {
		-webkit-transform: rotate(0deg);
	}
	100% {
		-webkit-transform: rotate(360deg);
	}
}

@keyframes spinner {
	0% {
		transform: rotate(0deg);
	}
	100% {
		transform: rotate(360deg);
	}
}

</style>
