<template>
  <div class="container mx-auto py-8">
    <error-message :message="errorMessage" :is-visible="showErrorMessage" />
    <div>
      <h2 class="text-3xl font-bold mb-8">Create Tour</h2>
      <form @submit.prevent="createTour" class="max-w-md mx-auto">
        <div class="mb-4">
          <label for="title" class="block text-sm font-semibold">Title:</label>
          <input type="text" id="title" v-model="tour.title" required class="input" placeholder="Enter title">
        </div>
        <div class="mb-4">
          <label for="description" class="block text-sm font-semibold">Description:</label>
          <textarea id="description" v-model="tour.description" required class="input" placeholder="Enter description"></textarea>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="mb-4">
            <label for="region" class="block text-sm font-semibold">Region:</label>
            <input type="text" id="region" v-model="tour.region" required class="input" placeholder="Enter region">
          </div>
          <div class="mb-4">
            <label for="city" class="block text-sm font-semibold">City:</label>
            <input type="text" id="city" v-model="tour.city" required class="input" placeholder="Enter city">
          </div>
        </div>
        <div class="mb-4">
          <label for="travel_type" class="block text-sm font-semibold">Travel Type:</label>
          <input type="text" id="travel_type" v-model="tour.travel_type" required class="input" placeholder="Enter travel type">
        </div>
        <div>
          <label for="images" class="block text-sm font-semibold">Images:</label>
          <input type="file" id="images" @change="handleTourImagesUpload($event)" multiple accept="image/*">
        </div>
        <div class="mb-3"></div>
        <h3 class="text-xl font-semibold mb-4">Itinerary</h3>
        <div v-for="(itinerary, index) in tour.itineraries_attributes" :key="index" class="border border-gray-200 p-4 rounded-lg mb-4">
          <h4 class="text-lg font-semibold mb-2">Itinerary {{ index + 1 }}</h4>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label for="title" class="block text-sm font-semibold">Title:</label>
              <input type="text" v-model="itinerary.title" required class="input" placeholder="Enter title">
            </div>
            <div>
              <label for="description" class="block text-sm font-semibold">Description:</label>
              <textarea v-model="itinerary.description" required class="input" placeholder="Enter description"></textarea>
            </div>
            <div>
              <label for="day" class="block text-sm font-semibold">Day:</label>
              <input type="text" v-model="itinerary.day" required class="input" placeholder="Enter day">
            </div>
            <div>
              <label for="date" class="block text-sm font-semibold">Date:</label>
              <input type="date" v-model="itinerary.date" required class="input">
            </div>
            <div>
              <label for="start_at" class="block text-sm font-semibold">Start Time:</label>
              <input type="time" v-model="itinerary.start_at" required class="input">
            </div>
            <div>
              <label for="end_at" class="block text-sm font-semibold">End Time:</label>
              <input type="time" v-model="itinerary.end_at" required class="input">
            </div>
            <div>
              <label for="images" class="block text-sm font-semibold">Images:</label>
              <input type="file" id="images" @change="handleFileUpload($event, index)" multiple accept="image/*">
            </div>
            <div class="flex items-center justify-between">
              <button type="button" @click="removeItinerary(index)" class="btn btn-danger">Remove Itinerary</button>
            </div>
          </div>
        </div>
        <button type="button" @click="addItinerary" class="btn btn-secondary">Add Itinerary</button>
        <div class="mb-3"></div>
        <button type="submit" class="btn btn-primary">Create Tour</button>
      </form>
    </div>
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
        images: [],
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
      this.tour.images.forEach((image, i) => {
        formData.append(`tour[images_attributes][${i}][file]`, image);
      });

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
    },
    handleTourImagesUpload(event) {
      const fileList = event.target.files;
      const images = Array.from(fileList);
      this.tour.images = images;
    },
  }
};
</script>

<style scoped>
.input {
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  padding: 0.5rem;
  width: 100%;
  font-size: 0.875rem;
}

.btn {
  padding: 0.75rem 1.5rem;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn-primary {
  background-color: #4a90e2;
  color: #fff;
}

.btn-secondary {
  background-color: #6b7280;
  color: #fff;
}

.btn-danger {
  background-color: #dc2626;
  color: #fff;
}

.btn:hover {
  background-color: #3b82f6;
}

.btn-secondary:hover {
  background-color: #4b5563;
}

.btn-danger:hover {
  background-color: #c53030;
}
</style>