<template>
  <div class="flex justify-center items-center h-full">
    <div class="bg-white shadow-md rounded-lg p-6 md:p-10 w-full max-w-md">
      <success-message :message="successMessage" :is-visible="showSuccessMessage" />
      <error-message :message="errorMessage" :is-visible="showErrorMessage" />
      
      <div>
        <h2 class="text-2xl font-semibold mb-6">Sign Up</h2>
        <form @submit.prevent="signUp">
          <div class="mb-4">
            <label for="name" class="block text-lg font-medium mb-2">Name:</label>
            <input type="text" id="name" v-model="name" required class="w-full border rounded-md py-2 px-3 text-lg">
          </div>
          <div class="mb-4">
            <label for="email" class="block text-lg font-medium mb-2">Email:</label>
            <input type="email" id="email" v-model="email" required class="w-full border rounded-md py-2 px-3 text-lg">
          </div>
          <div class="mb-6">
            <label for="password" class="block text-lg font-medium mb-2">Password:</label>
            <input type="password" id="password" v-model="password" required class="w-full border rounded-md py-2 px-3 text-lg">
          </div>
          <div class="flex items-center justify-between">
            <button type="submit" class="bg-blue-500 text-white py-2 px-6 rounded-lg text-lg hover:bg-blue-600">Sign Up</button>
            <router-link to="/customers_sign_in" class="text-lg text-blue-500 hover:underline">Sign In</router-link>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import SuccessMessage from './SuccessMessage.vue';
import ErrorMessage from './ErrorMessage.vue';

export default {
  components: {
    SuccessMessage,
    ErrorMessage
  },
  data() {
    return {
      successMessage: '',
      showSuccessMessage: false,
      errorMessage: '',
      showErrorMessage: false,
      name: '',
      email: '',
      password: ''
    };
  },
  methods: {
    signUp() {
      this.successMessage = '';
      this.showSuccessMessage = false;
      this.errorMessage = '';
      this.showErrorMessage = false;

      axios.post('http://localhost:3000/customers', {
        name: this.name,
        email: this.email,
        password: this.password
      })
      .then(() => {
        this.successMessage = 'You have successfully signed up';
        this.showSuccessMessage = true;
      })
      .catch(error => {
        this.errorMessage = error.response.data.errors.join(', ');
        this.showErrorMessage = true;
      });
    }
  }
};
</script>

<style scoped>

</style>