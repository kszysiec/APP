<template>
    <v-card class="mx-auto">
      <v-img
        src="/src/assets/btn-logo.png"
        height="128px"
        cover
      ></v-img>
  
      <v-card-title  class="text-h5">
        Tekst wyszukiwany dla aktualnego tematu, może składać się z wielu zdań i zajmować nawet kilka linijek, tutaj jednak będzie skrócony
      </v-card-title>
  
      <v-card-subtitle>
        Informacje o tym gdzie szukamy i jakich treści szukamy
      </v-card-subtitle>
  
      <v-card-actions>
        
            <v-dialog
                v-model="dialog_details"
                fullscreen
                :scrim="false"
                transition="dialog-bottom-transition"
                >
                <template v-slot:activator="{ props }">
                    <v-btn
                        color="indigo"
                        v-bind="props"
                        variant="elevated"
                        size="x-large"
                        rounded="lg"
                        class="text-none"
                        >
                        Bieżący temat
                        </v-btn>
                </template>

                <v-card class="mx-auto">
                    <v-toolbar
                    dark
                    color="info"
                    >
                    <v-toolbar-title>Szczegóły bieżącego tematu</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-btn
                        icon
                        dark
                        @click="dialog_details = false"
                    >
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                    </v-toolbar>

                    <v-main>
                    <v-container fluid align="center">    
                    <v-card max-width="900px">

                        <v-img
                            src="/src/assets/btn-logo.png"
                            height="128px"
                            cover
                        ></v-img>

                        <v-banner
                        lines="three"
                        class="mb-10"
                        :stacked="true"
                        >
                        <v-banner-text class="text-h5">
                            <div class="text-h4 mb-5">Jakich treści szukamy w danym temacie ?</div>  
                            <v-divider></v-divider>
                            <div class="text-h5 ma-5">Tutaj jest treść wyszukiwana dla aktualnego tematu, może składać się z wielu zdań i zajmować nawet kilka linijek</div>
                        </v-banner-text>
                        <template v-slot:prepend>
                            <v-icon size="80" icon="mdi-message-text-outline" color="success"></v-icon>
                        </template>
                        </v-banner>

                    <v-row>
                        <v-col>
                            <files-list></files-list>   
                        </v-col>    
                    </v-row>        

                    <v-row>
                        <v-col>
                            <categories></categories>   
                        </v-col>    
                    </v-row>        

                    <v-row>
                        <v-col>
                            <tags></tags>   
                        </v-col>    
                    </v-row>        

                    </v-card>    
                    </v-container>
                    </v-main> 

                </v-card> 

            </v-dialog>

            <v-dialog
                v-model="dialog_selection"
                fullscreen
                :scrim="false"
                transition="dialog-bottom-transition"
                >
                <template v-slot:activator="{ props }">
                    <v-btn
                        color="success"
                        v-bind="props"
                        variant="elevated"
                        size="x-large"
                        rounded="lg"
                        class="text-none"
                        >
                        Zmień temat
                        </v-btn>
                </template>

                <v-card class="mx-auto">
                    <v-toolbar
                    dark
                    color="info"
                    >
                    <v-toolbar-title>Możesz tutaj zmienić temat którym się aktualnie zajmujesz</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-btn
                        icon
                        dark
                        @click="dialog_selection = false"
                    >
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                    </v-toolbar>

                    <v-main>
                    <v-container fluid align="center">    
                    <v-card max-width="800px">
                        <topics></topics>
                    </v-card>    
                    </v-container>
                    </v-main> 

                </v-card> 

            </v-dialog>

            <v-dialog
                v-model="dialog_new"
                fullscreen
                :scrim="false"
                transition="dialog-bottom-transition"
                >
                <template v-slot:activator="{ props }">
                    <v-btn
                        color="warning"
                        v-bind="props"
                        variant="elevated"
                        size="x-large"
                        rounded="lg"
                        class="text-none"
                        >
                        Utwórz nowy temat
                        </v-btn>
                </template>

                <v-card class="mx-auto">
                    <v-toolbar
                    dark
                    color="info"
                    >
                    <v-toolbar-title>Możesz tutaj dodać nowy temat którym się aktualnie zajmujesz</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-btn
                        icon
                        dark
                        @click="dialog_new = false"
                    >
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                    </v-toolbar>

                    <v-main>
                    <v-container fluid align="center">    
                    <v-card max-width="800px">
                        <start-form></start-form>
                    </v-card>    
                    </v-container>
                    </v-main> 

                </v-card> 

            </v-dialog>

        <v-spacer></v-spacer>
  
        <v-btn
          :icon="show ? 'mdi-chevron-up' : 'mdi-chevron-down'"
          @click="show = !show"
        ></v-btn>

      </v-card-actions>
  
      <v-expand-transition>
        <div v-show="show">
          <v-divider></v-divider>
            <v-card-text>
                Tekst wyszukiwany dla aktualnego tematu, może składać się z wielu zdań i zajmować nawet kilka linijek, tutaj jednak nie będzie skrócony jak w nagłówku, będzie pokazana cała treść
            </v-card-text>
        </div>
      </v-expand-transition>

    </v-card>
  </template>

<script lang="ts">

import StartForm from './start-form.vue'
import FilesList from './files-list.vue'

export default {
    components: { StartForm, FilesList },
    data: () => ({
        show: false,
        dialog_details: false,
        dialog_selection: false,
        dialog_new: false
    }),
}
</script>

<style>
.dialog-bottom-transition-enter-active,
.dialog-bottom-transition-leave-active {
  transition: transform .2s ease-in-out;
}
</style>