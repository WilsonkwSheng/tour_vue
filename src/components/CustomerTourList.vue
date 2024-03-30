<template>
  <div class="container mx-auto py-8">
    <h2 class="text-3xl font-bold mt-8 mb-4">Tour List</h2>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      <div v-for="tour in tours" :key="tour.id" class="bg-white rounded-lg shadow-md p-6">
        <h3 class="text-xl font-bold mb-2">{{ tour.title }}</h3>
        <p class="text-gray-700 mb-4">{{ tour.description }}</p>
        <router-link :to="'/customer_tours/' + tour.id" class="btn btn-primary">View Details</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import axios from '../util/axios-config';

export default {
  data() {
    return {
      tours: []
    };
  },
  created() {
    this.fetchTours();
  },
  methods: {
    fetchTours() {
      axios.get('http://localhost:3000/customer_tours')
        .then(response => {
          this.tours = response.data;
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }
  }
};
</script>

<style scoped>
.btn {
  display: inline-block;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  background-color: #4a90e2;
  color: #ffffff;
  text-decoration: none;
  text-align: center;
  transition: background-color 0.3s;
}

.btn:hover {
  background-color: #3572b0;
}

.btn-primary {
  background-color: #4a90e2;
}

.btn-primary:hover {
  background-color: #3572b0;
}
</style>