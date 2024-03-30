<template>
  <div>
    <error-message :message="errorMessage" :is-visible="showErrorMessage" />
  </div>
  <div>
    <h2>Create Tour</h2>
    <form @submit.prevent="createTour">
      <label for="title">Title:</label>
      <input type="text" id="title" v-model="tour.title" required>

      <label for="description">Description:</label>
      <textarea id="description" v-model="tour.description" required></textarea>

      <label for="region">Region:</label>
      <input type="text" id="region" v-model="tour.region" required>

      <label for="city">City:</label>
      <input type="text" id="city" v-model="tour.city" required>

      <label for="travel_type">Travel Type:</label>
      <input type="text" id="travel_type" v-model="tour.travel_type" required>

      <h3>Itinerary</h3>
      <div v-for="(itinerary, index) in tour.itineraries_attributes" :key="index">
        <h4>Itinerary {{ index + 1 }}</h4>
        <label for="title">Title:</label>
        <input type="text" v-model="itinerary.title" required>
        <label for="description">Description:</label>
        <textarea v-model="itinerary.description" required></textarea>
        <label for="day">Day:</label>
        <input type="text" v-model="itinerary.day" required>
        <label for="date">Date:</label>
        <input type="date" v-model="itinerary.date" required>
        <label for="start_at">Start Time:</label>
        <input type="time" v-model="itinerary.start_at" required>
        <label for="end_at">End Time:</label>
        <input type="time" v-model="itinerary.end_at" required>
        <label for="images">Images:</label>
        <input type="file" id="images" @change="handleFileUpload($event, index)" multiple accept="image/*">
        <button type="button" @click="removeItinerary(index)">Remove Itinerary</button>
      </div>
      <button type="button" @click="addItinerary">Add Itinerary</button>

      <button type="submit">Create Tour</button>
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
      tour: {
        title: '',
        description: '',
        region: '',
        city: '',
        travel_type: '',
        itineraries_attributes: [{
          day: '',
          date: '',
          start_at: '',
          end_at: '',
          title: '',
          description: '',
          images: []
        }]
      },
      errorMessage: '',
      showErrorMessage: false,
    };
  },
  methods: {
    createTour() {
      this.errorMessage = '';
      this.showErrorMessage = false;

      const formData = new FormData();
      formData.append('tour[title]', this.tour.title);
      formData.append('tour[description]', this.tour.description);
      formData.append('tour[region]', this.tour.region);
      formData.append('tour[city]', this.tour.city);
      formData.append('tour[travel_type]', this.tour.travel_type);
      formData.append('tour[day]', this.tour.day);
      formData.append('tour[date]', this.tour.date);
      formData.append('tour[start_at]', this.tour.start_at);
      formData.append('tour[end_at]', this.tour.end_at);

      this.tour.itineraries_attributes.forEach((itinerary, index) => {
        formData.append(`tour[itineraries_attributes][${index}][day]`, itinerary.day);
        formData.append(`tour[itineraries_attributes][${index}][date]`, itinerary.date);
        formData.append(`tour[itineraries_attributes][${index}][start_at]`, itinerary.start_at);
        formData.append(`tour[itineraries_attributes][${index}][end_at]`, itinerary.end_at);
        formData.append(`tour[itineraries_attributes][${index}][title]`, itinerary.title);
        formData.append(`tour[itineraries_attributes][${index}][description]`, itinerary.description);
        itinerary.images.forEach((image, i) => {
          formData.append(`tour[itineraries_attributes][${index}][images_attributes][${i}][file]`, image);
        });
      });

      axios.post('http://localhost:3000/tours', formData)
        .then(response => {
          console.log('Tour created successfully:', response.data);
          this.$router.push('/tour_lists');
        })
        .catch(error => {
          console.error('Error creating tour:', error.response.data);
          this.errorMessage = error.response.data.errors.join(', ');
          this.showErrorMessage = true;
        });
    },
    addItinerary() {
      this.tour.itineraries_attributes.push({
        day: '',
        date: '',
        start_at: '',
        end_at: '',
        title: '',
        description: '',
        images: []
      });
    },
    removeItinerary(index) {
      this.tour.itineraries_attributes.splice(index, 1);
    },
    handleFileUpload(event, index) {
      const fileList = event.target.files;
      const images = Array.from(fileList);
      this.tour.itineraries_attributes[index].images = images;
    }
  }
};
</script>

<style scoped>
</style>