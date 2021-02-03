<template>
  <div class="py-12">
    <div class="max-w-md mx-auto md:max-w-xl mx-2">
      <div class="md:flex">
        <div class="w-full p-4 px-5 py-5">
          <span>Customer Information</span>
          <div class="relative pb-5">
            <input type="email" name="mail"
              class="border rounded h-10 w-full focus:outline-none focus:border-green-200 px-2 mt-2 text-sm"
              placeholder="E-mail" disabled v-model="email">
          </div>
          <span>Shipping Address</span>
          <div class="relative pb-5">
            <div class="grid md:grid-cols-2 md:gap-2">
              <input type="text" name="mail"
                class="border rounded w-full focus:outline-none focus:border-green-200 p-2 mt-2 text-sm"
                placeholder="First name*" v-model="data.first_name">
              <input type="text" name="mail"
                class="border rounded w-full focus:outline-none focus:border-green-200 p-2 mt-2 text-sm"
                placeholder="Last name*" v-model="data.last_name">
            </div>
            <input type="text" name="mail"
              class="border rounded w-full focus:outline-none focus:border-green-200 p-2 mt-2 text-sm"
              placeholder="Address*" v-model="data.address">
            <div class="grid md:grid-cols-3 md:gap-2">
              <input type="text" name="mail"
                class="border rounded w-full focus:outline-none focus:border-green-200 p-2 mt-2 text-sm"
                placeholder="Zipcode*" v-model="data.zip_code">
              <input type="text" name="mail"
                class="border rounded w-full focus:outline-none focus:border-green-200 p-2 mt-2 text-sm"
                placeholder="City*" v-model="data.city">
              <input type="text" name="mail"
                class="border rounded w-full focus:outline-none focus:border-green-200 p-2 mt-2 text-sm"
                placeholder="State*" v-model="data.state">
            </div>
            <input type="text" name="mail"
              class="border rounded p-2 w-full focus:outline-none focus:border-green-200 mt-2 text-sm"
              placeholder="Country*" v-model="data.country">
            <input type="text" name="mail"
              class="border rounded p-2 w-full focus:outline-none focus:border-green-200 mt-2 text-sm"
              placeholder="Phone Number*" v-model="data.phone_number">
          </div>
          <span>Payment Information</span>
          <div class='flex flex-wrap'>
            <card-number class='border rounded p-2 w-3/6 focus:outline-none focus:border-green-200 mt-2 text-sm'
              ref='cardNumber'
              stripe='pk_test_51I71CVLEntE1pXkNDyohW1z7ycV3OrrnLH4ahrMm9Tu8k7UcAXmKmr9365ioOPH92g3PHsLPUcMwNN8nErbC9OrQ00JIuXm6cD'/>
            <card-expiry class='border mx-2 rounded p-2 w-1/6 focus:outline-none focus:border-green-200 mt-2 text-sm'
              ref='cardExpiry'
              stripe='pk_test_51I71CVLEntE1pXkNDyohW1z7ycV3OrrnLH4ahrMm9Tu8k7UcAXmKmr9365ioOPH92g3PHsLPUcMwNN8nErbC9OrQ00JIuXm6cD' />
            <card-cvc class='border rounded p-2 w-1/6 focus:outline-none focus:border-green-200 mt-2 text-sm'
              ref='cardCvc'
              stripe='pk_test_51I71CVLEntE1pXkNDyohW1z7ycV3OrrnLH4ahrMm9Tu8k7UcAXmKmr9365ioOPH92g3PHsLPUcMwNN8nErbC9OrQ00JIuXm6cD' />
          </div>
          <div class="flex justify-between items-center pt-2">
            <nuxt-link :to="{name: 'cart'}" class="h-12 w-24 text-blue-500 text-xs font-medium">Return to cart</nuxt-link>
            <button class='h-12 w-48 rounded font-medium text-xs bg-blue-500 text-white' @click='pay'
              >Pay</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    CardNumber,
    CardExpiry,
    CardCvc,
    createToken
  } from 'vue-stripe-elements-plus'

  import CREATE_ORDER from '@/graphql/createOrder.gql';

  export default {
    middleware: 'isAuth',
    data() {
      return {
        data: {
          first_name: '',
          last_name: '',
          address: '',
          zip_code: '',
          city: '',
          state: '',
          country: '',
          phone_number: ''
        }
      }
    },
    computed: {
      email(){
        return this.$store.getters['auth/email'];
      },
      id(){
        return this.$store.getters['auth/id'];
      }
    },
    components: {
      CardNumber,
      CardExpiry,
      CardCvc
    },
    methods: {
      pay(){
        createToken()
        .then(data => {
        this.$apollo.mutate({
            mutation: CREATE_ORDER,
            variables: {
              input: {
                'first_name': this.data.first_name,
                'last_name': this.data.last_name,
                'address': this.data.address,
                'city': this.data.city,
                'phone_number': this.data.phone_number,
                'state': this.data.state,
                'zip_code': this.data.zip_code,
                'country': this.data.country,
                'user_id': this.id,
                'token': data.token.id,
                'amount': this.$store.getters['cart/Amount'],
                'items' : JSON.stringify(this.$store.getters['cart/items'])
              }
            }
          })
          .then(({data}) => {
            alert("your Order Has been placed");
            this.$store.commit('cart/setItems', []);
          });
        })
      }
    },
  }

</script>
