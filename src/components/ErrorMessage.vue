<template>
  <div class="error-message" v-if="isVisible">
    Error: {{ message }}
  </div>
</template>

<script>
export default {
  props: ['message', 'isVisible']
};
</script>
