<template>
  <div>
    <success-message :message="successMessage" :is-visible="showSuccessMessage" />
    <error-message :message="errorMessage" :is-visible="showErrorMessage" />
  </div>
  <div>
    <h2>Sign Up</h2>
    <form @submit.prevent="signUp">
      <div>
        <label for="name">Name:</label>
        <input type="text" id="name" v-model="name" required>
      </div>
      <div>
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="email" required>
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" required>
      </div>
      <button type="submit">Sign Up</button>
    </form>
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

      axios.post('http://localhost:3000/tour_hosts', {
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