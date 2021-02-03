<template>
  <div class="bg-gray-100">
    <div class="min-h-screen w-full p-6 flex justify-center items-center">
      <div class="w-full max-w-sm">
        <div class="bg-white border p-8 shadow rounded w-full mb-6">
          <h1 class="mb-6 text-lg text-gray-900 font-thin">Login to your account</h1>
          <fieldset class="mb-4">
            <label class="block text-sm text-gray-900 mb-2">Email address</label>
            <input id="email" type="email" v-model="data.username" class="block w-full rounded-sm border bg-white py-2 px-3 text-sm"
              name="email" required autofocus>
          </fieldset>
          <fieldset class="mb-4">
            <div class="w-full flex justify-between items-center">
              <label for="password" class="block text-sm text-gray-900 mb-2">Password</label>
              <a class="text-xs font-thin text-blue no-underline hover:underline" href="#">
                Forgotten password?
              </a>
            </div>
            <input id="password" type="password" v-model="data.password" class="block w-full rounded-sm border bg-white py-2 px-3 text-sm"
              name="password" required>
          </fieldset>
          <div class="pt-1 pb-5 text-sm text-gray-darker font-thin">
            <label><input class="mr-1" type="checkbox" name="remember" id="remember"> Remember me</label>
          </div>
          <button @click="submit()" type="submit" class="block w-full bg-indigo-500 text-white rounded-sm py-3 text-sm tracking-wide">
            Sign in
          </button>
        </div>
        <p class="text-center text-sm text-gray-600 font-thin">Don't have an account yet? <nuxt-link :to="{name: 'auth-register'}"
            class="text-indigo-500 no-underline hover:underline">Sign up</nuxt-link></p>
      </div>
    </div>
  </div>
</template>

<script>


import LOGIN from '@/graphql/login.gql';

  export default {
    layout: "empty",
    data() {
      return {
        data: {
          username: '',
          password: ''
        }
      }
    },
    methods: {
      submit(){
        this.$apollo.mutate({
          mutation: LOGIN,
          variables: {
            input: this.data
          }
        })
        .then(({data}) => {
          this.$apolloHelpers.onLogin(data.login.access_token);
          this.$store.commit('auth/setUser',data.login.user);
          this.$router.go(-1);
        })
        .catch((err) => {
          console.log(err);
        });
      }
    },
  }

</script>
