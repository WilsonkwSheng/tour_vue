<template>
  <nav class="bg-gray-800 p-4">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
      <template v-if="isTourHost && isLoggedIn">
        <router-link to="/tour_lists" class="text-white font-bold">Home</router-link>
      </template>
      <template v-else-if="isCustomer && isLoggedIn">
        <router-link to="/customers_tour_lists" class="text-white font-bold">Home</router-link>
      </template>
      <div>
        <template v-if="isLoggedIn">
          <button v-if="isTourHost" @click="signOutTourHost" class="text-white mx-2">Sign Out</button>
          <button v-else @click="signOutCustomer" class="text-white mx-2">Sign Out</button>
        </template>
        <template v-else>
          <router-link to="/sign_in" class="text-white mx-2">Sign In</router-link>
          <router-link to="/sign_up" class="text-white mx-2">Sign Up</router-link>
        </template>
      </div>
    </div>
  </nav>
</template>

<script>

export default {
  computed: {
    isLoggedIn() {
      return localStorage.getItem('token') !== null;
    },
    isTourHost() {
      return localStorage.getItem('user_type') === 'TourHost';
    },
    isCustomer() {
      return localStorage.getItem('user_type') === 'Customer';
    }
  },
  methods: {
    signOutTourHost() {
      // To simplify instead of integrate with endpoint
      localStorage.clear();
      this.$forceUpdate();
      this.$router.push('/sign_in');
    },
    signOutCustomer() {
      // To simplify instead of integrate with endpoint
      localStorage.clear();
      this.$forceUpdate();
      this.$router.push('/customers_sign_in');
    },
  },
};
</script>

<style scoped>
</style>