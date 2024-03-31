<template>
  <div class="bg-white shadow-md rounded-lg p-6 md:p-10">
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
        <div v-for="itinerary in tour.itineraries" :key="itinerary.id" class="mb-8 flex items-center">
          <div v-if="itinerary.images.length > 0" class="mr-4">
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
          <div>
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
import '../index.css'

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
        }).then(() => {
          this.initializeSwiper();
        })
        .catch(error => {
          console.error('Error fetching task details:', error);
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
    }  
  }
};
</script>

<style scoped>
.itinerary-swiper {
  max-width: 300px;
}

</style>