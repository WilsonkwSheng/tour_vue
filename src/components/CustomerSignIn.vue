<template>
  <div>
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
      <router-link to="/customers_sign_up">Sign Up</router-link>
    </form>
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