<template>
  <div>
    <h2>Tour Details</h2>
    <div v-if="tour">
      <h3>{{ tour.title }}</h3>
      <p>{{ tour.description }}</p>
      <p>Region: {{ tour.region }}</p>
      <p>City: {{ tour.city }}</p>
      <p>Travel Type: {{ tour.travel_type }}</p>
      <h4>Itineraries</h4>
      <div v-for="itinerary in tour.itineraries" :key="itinerary.id">
        <h5>{{ itinerary.title }}</h5>
        <p>{{ itinerary.description }}</p>
        <p>Date: {{ itinerary.date }}</p>
        <p>Start Time: {{ itinerary.start_at }}</p>
        <p>End Time: {{ itinerary.end_at }}</p>
        <div v-if="itinerary.images.length > 0">
          <h6>Images</h6>
          <div v-for="image in itinerary.images" :key="image.id">
            <img :src="'http://localhost:3000/' + image.file.url" alt="Itinerary Image">
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <p>Loading...</p>
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
      axios.get(`http://localhost:3000/customer_tours/${tourId}`)
        .then(response => {
          console.log('response', response)
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