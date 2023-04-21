<template>
          <v-hover
            v-slot="{ isHovering, props }"
            close-delay="200"
          >
          <!--
          <v-card
            border
            class="mx-auto"
            density="compact"
            variant="text"
            :elevation="isHovering ? 16 : 2"
            :class="{ 'on-hover': isHovering }"
            v-bind="props"
            >
            <v-img :src="image" :src="image" cover width="256"></v-img>
            
            <v-card-item>
              <v-icon
                class="mb-5"
                color="success"
                icon="mdi-check-circle"
                size="56"
              ></v-icon>
              <v-card-title class="text-h5">{{title}}</v-card-title>
            </v-card-item>

            <v-card-text class="text-h7">
              {{ text }}
            </v-card-text>

            <div class="d-flex justify-space-between ma-2">
              <v-btn size="x-large" color="success" block :to="actionTo">{{ action }}</v-btn>
            </div>  

          </v-card>
        -->
      <v-card
            class="mx-auto"
            max-width="400"
            max-height="600"
            :elevation="isHovering ? 16 : 2"
            :class="{ 'on-hover': isHovering }"
            v-bind="props"
         >
           <v-card-item>
              <v-card-title class="text-h5">{{title}}</v-card-title>
            </v-card-item>

         <v-divider></v-divider>

         <div class="py-12 text-center">
          
          <v-icon
            class="mb-6"
            :color="color"
            :icon="image"
            size="128"
          ></v-icon>

          <div class="text-h6 font-weight-bold">{{text}}</div>
        </div>

        <v-divider></v-divider>

        <div class="pa-4 text-end">
          <v-btn
            class="text-none"
            :color="color"
            min-width="92"
            rounded="lg"
            variant="elevated"
            size="x-large"
            :to="actionTo"
          >
          {{ action }}
          </v-btn>
        </div>
      </v-card>
    </v-hover>

</template>

<script lang="ts">
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    text: {
      type: String,
      required: true
    },
    action: {
      type: String,
      required: true
    },
    actionTo: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true
    },
    color: {
      type: String,
      required: true
    }
  }
}
</script>