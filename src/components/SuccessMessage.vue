<template>
  <div class="success-message" v-if="isVisible">
    Success: {{ message }}
  </div>
</template>

<script>
export default {
  props: ['message', 'isVisible']
};
</script>
