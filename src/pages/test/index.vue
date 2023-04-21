<script lang="ts">
  export default {
    data () {
      return {
        colors: [
          'blue-grey',
          'blue-grey',
          'blue-grey',
          'blue-grey',
          'blue-grey',
        ],
        slides: [
          'Kolejna',
          'Kolejna',
          'Kolejna',
          'Kolejna',
          'Kolejna',
        ],
      }
    },
  }
</script>

<template>
    <div>
    <v-carousel
      :continuous="false"
      :show-arrows="true"
      hide-delimiter-background
      delimiter-icon="mdi-square"
    >
      <v-carousel-item
        v-for="(slide, i) in slides"
        :key="i"
      >
        <v-sheet
          :color="colors[i]"
          height="100%"
          tile
          class = "mx-auto mt-8 rounded-lg"
          elevation="12"
        >
          <div class="d-flex fill-height justify-center align-center rounded-lg">
            <div class="text-h2">
              {{ slide }} wzmianka
            </div>
          </div>
        </v-sheet>
      </v-carousel-item>
    </v-carousel>
    </div>
</template>

<route lang="yaml">
    name: test
    meta:
        layout: default
</route>
    