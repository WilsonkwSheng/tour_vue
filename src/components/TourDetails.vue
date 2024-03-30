<template>
  <div v-if="tour">
    <div v-for="itinerary in tour.itineraries" :key="itinerary.id">
      <div v-if="itinerary.images.length > 0">
        <div class="swiper">
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="image in itinerary.images" :key="image.id">
              <img class="swiper-slide" :src="'http://localhost:3000/' + image.file.url" alt="Itinerary Image">
            </div>
          </div>
          <div class="swiper-pagination"></div>
          <div class="swiper-button-prev"></div>
          <div class="swiper-button-next"></div>
        </div>
      </div>
    </div>
  </div>
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
      </div>
    </div>
    <div v-else>
      <p>Loading...</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/swiper-bundle.css';

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
</style>