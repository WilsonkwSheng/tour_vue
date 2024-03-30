<template>
  <div>
    <h2>Tour Details</h2>
    <div v-if="tour">
      <p>{{ tour.title }}</p>
      <p>{{ tour.description }}</p>
      <p>{{ tour.region }}</p>
      <p>{{ tour.city }}</p>
      <p>{{ tour.travel_type }}</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  props: ['id'],
  data() {
    return {
      tour: null
    };
  },
  mounted() {
    this.fetchTourDetails();
  },
  methods: {
    fetchTourDetails() {
      const tourId = this.id;
      axios.get(`http://localhost:3000/tours/${tourId}`)
        .then(response => {
          this.tour = response.data;
        })
        .catch(error => {
          console.error('Error fetching task details:', error);
        });
    }
  }
};
</script>

<style scoped>
</style>