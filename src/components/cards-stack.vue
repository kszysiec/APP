<template>
  <div class="cards">
    <card
      v-for="(card, index) in cards"
      :key="card.id"
      :id="card.key"
      :color="card.color"
      :filename="card.filename"
      :page="card.page"
      :score="card.score"
      :text="card.text"
      :pre1="card.pre1"
      :pre2="card.pre2"
      :post1="card.post1"
      :post2="card.post2"
      :is-current="index == 0"
      @cardAccepted="$emit('cardAccepted');"
      @cardRejected="$emit('cardRejected');"
      @cardSkipped="$emit('cardSkipped');"
      @hideCard="$emit('hideCard');"
    />
  </div>
</template>

<script setup lang="ts">
    import { CardData } from '@/composables/db-repo'
</script>

<script lang="ts">
export default {
  props: {
    cards: {
      type: Array<CardData>,
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
