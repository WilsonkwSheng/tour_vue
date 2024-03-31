<template>
  <div class="bg-white shadow-md rounded-lg p-6 md:p-10 mt-8">
    <div class="flex justify-between mb-4">
      <div>
        <success-message :message="successMessage" :is-visible="showSuccessMessage" />
        <error-message :message="errorMessage" :is-visible="showErrorMessage" />
      </div>
      <div>
        <button v-if="!isBooked" @click="bookTour" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Book Tour
        </button>
        <button v-else @click="cancelTour" class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
          Cancel Tour
        </button>
      </div>
    </div>
    <div v-if="tour">
      <div class="swiper">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="image in tour.images" :key="image.id">
            <img class="swiper-slide w-full" :src="'http://localhost:3000/' + image.file.url" alt="Itinerary Image">
          </div>
        </div>
        <div class="swiper-pagination"></div>
        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>
      </div>
      <p class="text-lg font-semibold">Region: {{ tour.region }}</p>
      <p class="text-lg font-semibold">City: {{ tour.city }}</p>
      <p class="text-lg font-semibold">Travel Type: {{ tour.travel_type }}</p>
    </div>
    <div>
      <div v-if="tour">
        <h1 class="text-3xl font-bold mt-8 mb-4">{{ tour.title }}</h1>
        <p class="text-lg">{{ tour.description }}</p>
        <h4 class="text-xl font-semibold mt-6 mb-2">Itinerary</h4>
        <div v-for="itinerary in tour.itineraries" :key="itinerary.id" class="mb-8 flex flex-col md:flex-row items-center">
          <div v-if="itinerary.images.length > 0" class="mr-4 md:w-1/2">
            <div class="swiper itinerary-swiper">
              <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="image in itinerary.images" :key="image.id">
                  <img class="swiper-slide w-full" :src="'http://localhost:3000/' + image.file.url" alt="Itinerary Image">
                </div>
              </div>
              <div class="swiper-pagination"></div>
              <div class="swiper-button-prev"></div>
              <div class="swiper-button-next"></div>
            </div>
          </div>
          <div class="md:w-1/2">
            <h5 class="text-lg font-semibold">{{ itinerary.title }}</h5>
            <p class="text-lg">{{ itinerary.description }}</p>
            <p class="text-lg">Date: {{ itinerary.date }}</p>
            <p class="text-lg">Start Time: {{ itinerary.start_at }}</p>
            <p class="text-lg">End Time: {{ itinerary.end_at }}</p>
          </div>
        </div>
      </div>
      <div v-else>
        <p class="text-lg">Loading...</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/swiper-bundle.css';
import SuccessMessage from './SuccessMessage.vue';
import ErrorMessage from './ErrorMessage.vue';
import '../index.css'

export default {
  props: ['id'],
  components: {
    SuccessMessage,
    ErrorMessage
  },
  data() {
    return {
      tour: null,
      successMessage: '',
      showSuccessMessage: false,
      errorMessage: '',
      showErrorMessage: false,
      isBooked: false,
      customerId: null,
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
          const customerId = localStorage.getItem('customerId')
          const bookings = response.data.bookings.filter(item => item.customer_id.toString() === customerId)
          const isBooked = bookings.length > 0;
          this.tour = response.data;
          this.isBooked = isBooked
          this.customerId = customerId
        }).then(() => {
          this.initializeSwiper();
        })
        .catch(error => {
          console.error('Error fetching task details:', error);
        });
    },
    bookTour() {
      this.successMessage = '';
      this.showSuccessMessage = false;
      this.errorMessage = '';
      this.showErrorMessage = false;

      const tourId = this.tour.id;
      axios.post('http://localhost:3000/bookings', { tour_id: tourId })
        .then(() => {
          this.successMessage = 'You have successfully book this tour!';
          this.showSuccessMessage = true;
        })
        .catch(error => {
          this.errorMessage = error.response.data.error;
          this.showErrorMessage = true;
        });
    },
    cancelTour() {
      this.successMessage = '';
      this.showSuccessMessage = false;
      this.errorMessage = '';
      this.showErrorMessage = false;

      const tourId = this.tour.id;
      axios.delete(`http://localhost:3000/bookings/${tourId}`)
        .then(() => {
          this.successMessage = 'You have successfully cancel this tour!';
          this.showSuccessMessage = true;
        })
        .catch(error => {
          this.errorMessage = error.response.data.error;
          this.showErrorMessage = true;
        });
    },
    initializeSwiper() {
      new Swiper('.swiper', {
        modules: [Navigation, Pagination],
        direction: 'horizontal',
        loop: true,
        pagination: {
          el: '.swiper-pagination',
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        scrollbar: {
          el: '.swiper-scrollbar',
        },
      });
    },
  }
};
</script>

<style scoped>
.itinerary-swiper {
  max-width: 300px;
}
</style>