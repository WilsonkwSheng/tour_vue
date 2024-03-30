<template>
  <div>
    <success-message :message="successMessage" :is-visible="showSuccessMessage" />
    <error-message :message="errorMessage" :is-visible="showErrorMessage" />
  </div>
  <div>
    <h2>Sign In</h2>
    <form @submit.prevent="signIn">
      <div>
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="email" required>
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" required>
      </div>
      <button type="submit">Sign In</button>
      <router-link to="/">Sign Up</router-link>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
import SuccessMessage from './SuccessMessage.vue';
import ErrorMessage from './ErrorMessage.vue';

export default {
  components: {
    ErrorMessage,
    SuccessMessage
  },
  data() {
    return {
      email: '',
      password: '',
      errorMessage: '',
      showErrorMessage: false,
      successMessage: '',
      showSuccessMessage: false
    };
  },
  methods: {
    signIn() {
      this.successMessage = '';
      this.showSuccessMessage = false;
      this.errorMessage = '';
      this.showErrorMessage = false;

      axios.post('http://localhost:3000/tour_hosts_auth/login', {
        email: this.email,
        password: this.password
      }).then(response => {
          const token = response.data.token;
          localStorage.setItem('token', token);
          this.successMessage = 'Sign in successful';
          this.showSuccessMessage = true;
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