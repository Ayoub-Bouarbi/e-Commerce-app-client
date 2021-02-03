<template>
</template>

 <script>
   import _ from 'underscore';

   export default {
     props: [
       'products',
       'brands',
     ],
     data() {
       return {
         productList: this.products
       }
     },
     created() {
       console.log(this.products);
     },
     methods: {
     },
   }

 </script>
