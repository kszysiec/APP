<script lang="ts">

    import { getKey, setKey, getAllTopics } from '@/composables/db-repo'

    export default {
    data: () => ({
      items: getAllTopics(),
      selection: [getKey("currentTopic")]
    }),
    methods: {
      async change(toggle: () => void) {
            toggle();
            setKey("currentTopic",this.selection[0]);
      }
    }
  }

</script>

<template>
    <v-item-group mandatory v-model="selection">
      <v-container align="center">
        <v-card class="mx-auto">
        <v-row>
          <v-col
            v-for="n in items"
            :key="n.id"
            cols="12"
            md="4"
          >
            <v-item v-slot="{ isSelected, toggle }">
              <v-card
                :color="isSelected ? 'deep-orange' : 'green'"
                class="d-flex align-center"
                dark
                height="300"
                @click="change(toggle)"
              >
                <v-scroll-y-transition>
                  <div
                    class="text-h5 flex-grow-1 text-center"
                  >
                    {{ isSelected ? 'Wybrano ! Aktualnym tematem jest : ' + n.title : n.title }}
                  </div>
                </v-scroll-y-transition>
              </v-card>
            </v-item>
          </v-col>
        </v-row>
        </v-card>
      </v-container>
    </v-item-group>
  </template>