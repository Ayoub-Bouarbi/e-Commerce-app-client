<template>
  <div class="bg-gray-100">
    <div class="min-h-screen w-full p-6 flex justify-center items-center">
      <div class="w-full max-w-sm">
        <div class="bg-white border p-8 shadow rounded w-full mb-6">
          <h1 class="mb-6 text-lg text-gray-900 font-thin">Create an Account</h1>
          <div class="grid grid-cols-2 gap-2">
            <fieldset class="mb-4">
              <label class="block text-sm text-gray-900 mb-2">First Name</label>
              <input id="first_name" type="text" v-model="data.first_name" class="block w-full rounded-sm border bg-white py-2 px-3 text-sm"
                name="first_name" required autofocus>
            </fieldset>
            <fieldset class="mb-4">
              <label class="block text-sm text-gray-900 mb-2">Last Name</label>
              <input id="last_name" type="text" v-model="data.last_name" class="block w-full rounded-sm border bg-white py-2 px-3 text-sm"
                name="last_name" required autofocus>
            </fieldset>
          </div>
          <fieldset class="mb-4">
            <label class="block text-sm text-gray-900 mb-2">Email address</label>
            <input id="email" type="email" v-model="data.email" class="block w-full rounded-sm border bg-white py-2 px-3 text-sm"
              name="email" required autofocus>
          </fieldset>
            <fieldset class="mb-4">
              <label for="password" class="block text-sm text-gray-900 mb-2">Password</label>
              <input id="password" type="password" v-model="data.password" class="block w-full rounded-sm border bg-white py-2 px-3 text-sm"
                name="password" required>
            </fieldset>
            <fieldset class="mb-4">
              <label for="password" class="block text-sm text-gray-900 mb-2">Confirm Password</label>
              <input id="password_confirmation" v-model="data.password_confirmation" type="password" class="block w-full rounded-sm border bg-white py-2 px-3 text-sm"
                name="password_confirmation" required>
            </fieldset>
          <div class="pt-1 pb-5 text-sm text-gray-darker font-thin">
            <label><input class="mr-1" type="checkbox" name="agree" id="agree"> Agree Terms & Conditions</label>
          </div>
          <button @click="submit()" type="submit" class="block w-full bg-indigo-500 text-white rounded-sm py-3 text-sm tracking-wide">
            Sign up
          </button>
        </div>
        <p class="text-center text-sm text-gray-600 font-thin">Already have an account? <nuxt-link :to="{name: 'auth-login'}"
            class="text-indigo-500 no-underline hover:underline">Sign in</nuxt-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script>

import REGISTER from '@/graphql/register.gql';

  export default {
    layout: "empty",
    data() {
      return {
        data: {
          first_name: '',
          last_name: '',
          email: '',
          password: '',
          password_confirmation: '',
        }
      }
    },
    methods: {
      submit(){
        this.$apollo.mutate({
          mutation: REGISTER,
          variables: {
            input: this.data
          }
        })
        .then(({result}) => {
          this.$router.push('/');
        }).catch((err) => {
          console.log(err);
        });
      }
    },
  }

</script>
