<template>
   <section class="text-gray-600 body-font">
     <div class="container px-5 py-24 mx-auto">
       <div class="flex flex-wrap">
         <div class="lg:w-1/4 px-10 py-6">
           <div class="brand-widget">
             <h1 class="mb-6 pb-3 text-xl text-gray-900 font-base mt-10">Brands </h1>
             <ul>
               <li v-for="brand in brands" :key="brand.id"
                 class="text-gray-600 hover:text-indigo-700 transition duration-500 ease-in-out font-sm capitalize mb-2">
                 <nuxt-link :to="{name: 'shop-brands-slug', params: {slug: brand.slug}}">{{ brand.name }}</nuxt-link>
               </li>
             </ul>
           </div>
         </div>
         <div class="lg:w-3/4">
           <div id="store" class="w-full z-30 top-0 px-6 py-1">
             <div class="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 px-2 py-3">
               <div class="text-gray-800">
                <div class="inline-block mx-2">
                   <label class="text-sm text-gray-900 mb-2">Show : </label>
                   <select @change="show($event)" class="w-auto rounded-sm border bg-white py-2 px-3 text-sm">
                     <option value="5">5</option>
                     <option value="10" selected>10</option>
                     <option value="20">20</option>
                     <option value="30">30</option>
                   </select>
                 </div>
                 <div class="inline-block mx-2">
                   <label class="text-sm text-gray-900 mb-2">Sort By: </label>
                   <select @change="sortBy($event)" class="w-auto rounded-sm border bg-white py-2 px-3 text-sm">
                     <option value="name">Name</option>
                     <option value="price">Price</option>
                   </select>
                 </div>
               </div>
               <div class="flex items-center overflow-hidden relative">
                 <input type="text" @keyup="search($event)" placeholder="Search" style="width:250px"
                   class="block w-full rounded-sm border bg-white py-2 px-3 text-sm">
                 <svg class="fill-current absolute hover:text-black" style="right: 6px" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                   viewBox="0 0 24 24">
                   <path
                     d="M10,18c1.846,0,3.543-0.635,4.897-1.688l4.396,4.396l1.414-1.414l-4.396-4.396C17.365,13.543,18,11.846,18,10 c0-4.411-3.589-8-8-8s-8,3.589-8,8S5.589,18,10,18z M10,4c3.309,0,6,2.691,6,6s-2.691,6-6,6s-6-2.691-6-6S6.691,4,10,4z" />
                 </svg>
               </div>
             </div>
           </div>
           <div v-if="products.length != 0" class="flex flex-wrap -m-4">
             <div v-for="product in products" :key="product.id" class="lg:w-1/3 md:w-1/2 p-4 w-full">
               <a class="block relative h-48 rounded overflow-hidden">
                 <img v-if="product.Images.length != 0" alt="ecommerce"
                   class="object-cover object-center transform hover:scale-125 transition duration-500 ease-in-out w-full h-full block"
                   :src="'http://app-api.test/storage/uploads/products/' + product.Images[0].image">
                 <img v-else alt="ecommerce"
                   class="object-cover object-center transform hover:scale-125 transition duration-500 ease-in-out w-full h-full block"
                   src="https://dummyimage.com/421x261">
               </a>
               <div class="mt-4">
                 <h3 class="text-gray-500 text-xs tracking-widest title-font uppercase mb-1">{{ product.Brand.name }}
                 </h3>
                 <h2 class="text-gray-900 title-font text-lg font-medium">
                   <nuxt-link :to="{name: 'shop-slug',params: {slug: product.slug}}">{{ product.name }}</nuxt-link>
                 </h2>
                 <span v-if="product.sale_price == 0" class="mt-1">${{ product.price }}</span>
                 <span v-if="product.sale_price > 0" class="mt-1 text-red-400 line-through">${{ product.price }}</span>
                 <span v-if="product.sale_price > 0" class="mt-1">${{ product.sale_price }}</span>
               </div>
             </div>
           </div>
           <div v-else class="m-10">
             <p class="text-gray-500">Product are not Avilable right now</p>
           </div>
         </div>
       </div>
     </div>
   </section>
</template>

<script>
  import _ from 'underscore';

  export default {
    data() {
      return {
        products: [],
      }
    },
    created() {
      this.products = _.sortBy(this.productslist.slice(0,10), 'name');
    },
    computed: {
      brands(){
        return this.$store.getters['data/brands'];
      },
      productslist(){
        return _.filter(this.$store.getters['data/products'],(product) => {
                  return product.Brand.slug == this.$route.params.slug;
                });
      }
    },
    methods: {
       sortBy(e) {
          this.products = _.sortBy(this.products, e.target.value);
       },
       show(e){
          this.products = this.productslist.slice(0,e.target.value);
       },
       search(e){
         this.products = this.productslist;
         if(e.target.value != ""){
           this.products = _.filter(this.productslist,(product) => {
             return product.name.toLowerCase().startsWith(e.target.value.toLowerCase());
           });
         }
       }
    },
  }

</script>
