<template>
  <div>
    <router-link to="/create_tours" class="button">Create Tour</router-link>
    <h2>Tour List</h2>
    <ul>
      <li v-for="tour in tours" :key="tour.id">
        <p>{{ tour.title }}</p>
        <p>{{ tour.description }}</p>
        <p>{{ tour.region }}</p>
        <p>{{ tour.city }}</p>
        <p>{{ tour.travel_type }}</p>
        <router-link :to="'/tours/' + tour.id">View Details</router-link>
      </li>
    </ul>
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
      axios.get('http://localhost:3000/tours')
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
</style>