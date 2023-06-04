<script setup lang="ts">
    import { getCurrentTopicFiles } from '@/composables/db-repo'
</script>

<script lang="ts">
    export default {
    data: () => ({
        showFiles: true,
        files: []
    }),
    mounted() {
        var currentFiles = getCurrentTopicFiles();
        currentFiles.forEach(element => {
          this.files.push({
          color: 'blue',
          icon: 'mdi-clipboard-text',
          subtitle: '',
          title: element
        });
        });
    } 
}
</script>

<template>

<v-card class="mx-auto">
  <v-layout>
  <v-main>
        <v-expansion-panels>
           <v-expansion-panel>
           <v-expansion-panel-title class="text-h4">W jakich plikach szukamy treści dla aktualnego tematu ?</v-expansion-panel-title>
        <v-expansion-panel-text>

           <v-container fluid>
            <v-card class="mx-auto">

                  <v-card-text>

                    <v-list lines="two">
                      <v-list-item
                        v-for="file in files"
                        :key="file.title"
                        :title="file.title"
                        :subtitle="file.subtitle"
                        class="text-h6"
                      >
                        <template v-slot:prepend>
                          <v-avatar :color="file.color">
                            <v-icon color="white">{{ file.icon }}</v-icon>
                          </v-avatar>
                        </template>

                        <template v-slot:append>
                          <v-btn
                            color="grey-lighten-1"
                            icon="mdi-information"
                            variant="text"
                            class="text-h5"
                          ></v-btn>
                        </template>
                      </v-list-item>
                    </v-list>
                  
                  </v-card-text>
                  </v-card>
             </v-container>

                  </v-expansion-panel-text>
              </v-expansion-panel> 
              </v-expansion-panels>

  </v-main>
  </v-layout>
</v-card>
  
</template>

<style>
.dialog-bottom-transition-enter-active,
.dialog-bottom-transition-leave-active {
  transition: transform .2s ease-in-out;
}
</style>