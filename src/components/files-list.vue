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
                      <v-list-subheader inset class="text-h6">Foldery</v-list-subheader>
                      <v-list-item
                        v-for="folder in folders"
                        :key="folder.title"
                        :title="folder.title"
                        :subtitle="folder.subtitle"
                        class="text-h6"
                      >
                        <template v-slot:prepend>
                          <v-avatar color="grey-lighten-1">
                            <v-icon color="white">mdi-folder</v-icon>
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
                      <v-divider inset></v-divider>
                      <v-list-subheader inset class="text-h6">Pliki</v-list-subheader>
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

<script lang="ts">
    export default {
    data: () => ({
        showFiles: true,
        files: [
        {
          color: 'blue',
          icon: 'mdi-clipboard-text',
          subtitle: 'Jan 20, 2014',
          title: 'Metodyka badań',
        },
        {
          color: 'amber',
          icon: 'mdi-gesture-tap-button',
          subtitle: 'Jan 10, 2014',
          title: 'Parametry badań',
        }
      ],
      folders: [
        {
          subtitle: 'Jan 9, 2014',
          title: 'Dokumenty',
        },
        {
          subtitle: 'Jan 17, 2014',
          title: 'Publikacje',
        }
      ]
    })
}
</script>

<style>
.dialog-bottom-transition-enter-active,
.dialog-bottom-transition-leave-active {
  transition: transform .2s ease-in-out;
}
</style>