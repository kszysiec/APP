<script setup lang="ts">
    import { getCurrentTopicTitle, getCurrentTopicQuery, getKey, setCurrentTopicQuery } from '@/composables/db-repo'
    import logo from "../assets/bg.png"
</script>

<script lang="ts">
    import StartForm from './start-form.vue'
    import FilesList from './files-list.vue'

    export default {
    components: { StartForm, FilesList },
    data: () => ({
        show: false,
        dialog_details: false,
        dialog_selection: false,
        dialog_new: false,
        currentTopicTitle:"brak bieżącego tematu",
        currentTopicQuery:"brak bieżącego tematu"
    }),
    async mounted() {
        this.currentTopicTitle = await getCurrentTopicTitle();
        this.currentTopicQuery = await getCurrentTopicQuery();
    },
    methods:
    {
      async onCloseClick(e) {
        if (!e) {
          return;
        }
        this.dialog_selection = false; 
        this.currentTopicTitle = await getCurrentTopicTitle(); 
        this.currentTopicQuery = await getCurrentTopicQuery();
      },
      onClick(e) {
        if (!e) {
          return;
        }
        setCurrentTopicQuery(this.currentTopicQuery);
      }
    }
    }
</script>

<template>
    <v-card class="mx-auto">
      <v-img
        :src="logo"
        height="128px"
        cover
      ></v-img>
  
      <v-card-title class="text-h5">
        {{ this.currentTopicTitle }}
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
                        v-if="getKey('currentTopic',null)"
                        >
                        Bieżący temat
                        </v-btn>
                </template>

                <v-card class="mx-auto">
                    <v-toolbar
                    dark
                    color="info"
                    >
                    <v-toolbar-title class="text-h5">Szczegóły bieżącego tematu</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-btn
                        icon
                        dark
                        @click="dialog_details = false"
                    >
                        <v-icon class="text-h3">mdi-close</v-icon>
                    </v-btn>
                    </v-toolbar>

                    <v-main>
                    <v-container fluid align="center">    
                    <v-card max-width="900px">

                        <v-img
                            :src="logo"
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
                            <v-textarea
                                v-model="currentTopicQuery"
                                label="Możesz zmienić treść i zapisać"
                                auto-grow
                                variant="outlined"
                                rows="1"
                                row-height="10"
                                shaped
                                class="text-h5"
                            ></v-textarea>
                            <v-btn
                                color="indigo"
                                variant="elevated"
                                size="x-large"
                                rounded="lg"
                                class="text-none"
                                @click="onClick"
                            >
                                Zapisz
                            </v-btn>
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
                        v-if="getKey('currentTopic',null)"
                        >
                        Zmień temat
                    </v-btn>
                </template>

                <v-card class="mx-auto">
                    <v-toolbar
                    dark
                    color="info"
                    >
                    <v-toolbar-title class="text-h5">Możesz tutaj zmienić temat którym się aktualnie zajmujesz</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-btn
                        icon
                        dark
                        @click="onCloseClick"
                    >
                        <v-icon class="text-h3">mdi-close</v-icon>
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
                    <v-toolbar-title class="text-h5">Możesz tutaj dodać nowy temat którym się aktualnie zajmujesz</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-btn
                        icon
                        dark
                        @click="dialog_new = false"
                    >
                        <v-icon class="text-h3">mdi-close</v-icon>
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
                {{ this.currentTopicQuery }}
            </v-card-text>
        </div>
      </v-expand-transition>

    </v-card>
</template>

<style>
.dialog-bottom-transition-enter-active,
.dialog-bottom-transition-leave-active {
  transition: transform .2s ease-in-out;
}
</style>