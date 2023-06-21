<script lang="ts">

import { canUsingThisApp } from '@/composables/db-repo'

export default {
data() {
  return {
    visibleApp: false
  };
},
async mounted() {
  this.visibleApp = canUsingThisApp();
}
};

</script>

<template>

  <v-card class="mx-auto">
    <v-layout>
      <v-app-bar
        color="info"
        :elevation="2"
        density="compact"
      >
        <template v-slot:prepend>
          <v-app-bar-nav-icon class="text-h5" icon="mdi-account-key" to="/account"></v-app-bar-nav-icon>
        </template>

        <v-app-bar-title class="text-h5">Dr Paper</v-app-bar-title>

      </v-app-bar>

      <v-main>
        <v-container fluid align="center" v-if="visibleApp">

        <v-row>
          <v-col>
            <topic></topic>  
          </v-col>
        </v-row>    

        <v-row>
          <v-col>
            <menu-block 
              color="blue"
              title="Pasujące fragmenty" 
              text="Kolejno przeglądamy pasujące fragmenty dla aktualnego tematu" 
              action="Przeglądaj" 
              image="mdi-shuffle" 
              actionTo="/items"
            />
          </v-col>
          <v-col>
            <menu-block 
              color="orange-darken-1"
              title="Opisane fragmenty" 
              text="Przeglądamy wszystkie listy wybranych fragmentów dla aktualnego tematu" 
              action="Analizuj" 
              image="mdi-checkbox-multiple-marked-outline" 
              actionTo="/results"
            />
          </v-col>
          <v-col>
            <menu-block
              color="indigo"
              title="Opracowanie materiałów" 
              text="Przygotuj opracowanie znalezionych materiałów w formie artykułu" 
              action="Opracuj" 
              image="mdi-source-pull" 
              actionTo="/results"
            />
          </v-col>
        </v-row>  

       </v-container>
      </v-main>
    </v-layout>
  </v-card>
</template>