<template>
  <div class="flex justify-center items-center h-full">
    <div class="bg-white shadow-md rounded-lg p-6 md:p-10 w-full max-w-md">
      <error-message :message="errorMessage" :is-visible="showErrorMessage" />

      <div>
        <h2 class="text-2xl font-semibold mb-6">Sign In</h2>
        <form @submit.prevent="signIn">
          <div class="mb-4">
            <label for="email" class="block text-lg font-medium mb-2">Email:</label>
            <input type="email" id="email" v-model="email" required class="w-full border rounded-md py-2 px-3 text-lg">
          </div>
          <div class="mb-6">
            <label for="password" class="block text-lg font-medium mb-2">Password:</label>
            <input type="password" id="password" v-model="password" required class="w-full border rounded-md py-2 px-3 text-lg">
          </div>
          <div class="flex items-center justify-between">
            <button type="submit" class="bg-blue-500 text-white py-2 px-6 rounded-lg text-lg hover:bg-blue-600">Sign In</button>
            <router-link to="/customers_sign_up" class="text-lg text-blue-500 hover:underline">Sign Up</router-link>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import ErrorMessage from './ErrorMessage.vue';

export default {
  components: {
    ErrorMessage,
  },
  data() {
    return {
      email: '',
      password: '',
      errorMessage: '',
      showErrorMessage: false,
    };
  },
  methods: {
    signIn() {
      this.errorMessage = '';
      this.showErrorMessage = false;

      axios.post('http://localhost:3000/customers_auth/login', {
        email: this.email,
        password: this.password
      }).then(response => {
          const token = response.data.token;
          localStorage.setItem('token', token);
          localStorage.setItem('user_type', 'Customer');
          this.$router.push('/customers_tour_lists');
        })
        .catch(error => {
          this.errorMessage = error.response.data.error;
          this.showErrorMessage = true;
        });
    }
  }
};

</script>

<style scoped>

</style>