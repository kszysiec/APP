<script lang="ts">

    import { getKey, setKey, getAllTopics } from '@/composables/db-repo'

    export default {
    data: () => ({
      items: getAllTopics(),
      selection: []
    }),
    methods: {
      async change(toggle: () => void) {
            toggle();
            if (this.items[this.selection].id)
            {
              setKey("currentTopic",this.items[this.selection].id);
            }
      }
    },
    created: function() {
       let key = getKey("currentTopic",null);
       if (this.items)
       {
        for (let n = 0; n < this.items.length; n++){
          if (this.items[n].id == key)
            {
              this.selection.push(n); 
              return;
            }
        }
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