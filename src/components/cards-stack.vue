<template>
  <div class="cards">
    <card
      v-for="(card, index) in cards"
      :key="card"
      :card="card"
      :is-current="index === 0"
      @cardAccepted="$emit('cardAccepted');"
      @cardRejected="$emit('cardRejected');"
      @cardSkipped="$emit('cardSkipped');"
      @hideCard="$emit('hideCard');"
    />
  </div>
</template>

<script lang="ts">

export default {
  props: {
    cards: {
      type: Array,
      required: true
    }
  }
};
</script>

<style lang="scss" scoped>
.cards {
  position: relative;
  display: flex;
  margin: 100px;
  width: 900px;
}
</style>
