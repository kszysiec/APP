<script lang="ts">

import { getKey, setKey } from '@/composables/db-repo'

export default {
    data: () => ({
      accessKey : getKey("accessKey",""),
      apiKey : getKey("apiKey",""),
      apiModel : getKey("apiModel","gpt-3.5-turbo"),
      successScore : getKey("successScore","0.85"),
      orangeScore : getKey("orangeScore","0.80"),
      blueScore : getKey("blueScore","0.70"),
      greyScore : getKey("greyScore","0.60"),
      apiTimeout : getKey("apiTimeout","20000"),
      similarityLevel : getKey("similarityLevel","0.60"),
      pageLimit : getKey("pageLimit","1"),
      requestType : getKey("requestType","A+B"),
      requestA : getKey("requestA","Given the text below, find sentences which deal with the subject: [query]. Show only a list of sentences from text below. Do not generate any additional text."),
      requestB : getKey("requestB","Create a listing of the sentences from the text below that answer [query]. Show only a list of sentences from text below. Do not generate any additional text."),
      temperatureA : getKey("temperatureA","0.9"),
      temperatureB : getKey("temperatureB","0.9")
    }),
    methods:
    {
      onClick(e) {
        if (!e) {
          return;
        }
        setKey("apiKey",this.apiKey);
        setKey("apiModel",this.apiModel);
        setKey("accessKey",this.accessKey);
        setKey("successScore",this.successScore);
        setKey("orangeScore",this.orangeScore);
        setKey("blueScore",this.blueScore);
        setKey("greyScore",this.greyScore);
        setKey("apiTimeout",this.apiTimeout);
        setKey("similarityLevel",this.similarityLevel);
        setKey("pageLimit",this.pageLimit);
        setKey("requestType",this.requestType);
        setKey("requestA",this.requestA);
        setKey("requestB",this.requestB);
        setKey("temperatureA",this.temperatureA);
        setKey("temperatureB",this.temperatureB);
      }
    }
    }
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
          <v-app-bar-nav-icon class="text-h4" icon="mdi-close" to="/"></v-app-bar-nav-icon>
        </template>

        <v-app-bar-title class="text-h5">Konfiguracja</v-app-bar-title>

      </v-app-bar>

      <v-main>  
        <v-container fluid align="center">
          
          <v-textarea
            v-model="accessKey"
            label="Wpisz klucz dostępowy"
            auto-grow
            variant="outlined"
            rows="1"
            row-height="10"
            shaped
            class="text-h5"
          ></v-textarea>

          <v-textarea
            v-model="apiKey"
            label="Wpisz klucz API do wyszukiwania"
            auto-grow
            variant="outlined"
            rows="1"
            row-height="10"
            shaped
            class="text-h5"
          ></v-textarea>

          <v-textarea
            v-model="apiModel"
            label="Wpisz model API do wyszukiwania"
            auto-grow
            variant="outlined"
            rows="1"
            row-height="10"
            shaped
            class="text-h5"
          ></v-textarea>

          <v-textarea
            v-model="apiTimeout"
            label="Wpisz opóźnienie API między wywołaniami (ms)"
            auto-grow
            variant="outlined"
            rows="1"
            row-height="10"
            shaped
            class="text-h5"
           ></v-textarea>

           <v-textarea
            v-model="similarityLevel"
            label="Poziom similarity przy rozpoznawaniu zdań"
            auto-grow
            variant="outlined"
            rows="1"
            row-height="10"
            shaped
            class="text-h5"
           ></v-textarea>

           <v-textarea
            v-model="pageLimit"
            label="Ile stron w dokumencie ma być przeszukiwanych"
            auto-grow
            variant="outlined"
            rows="1"
            row-height="10"
            shaped
            class="text-h5"
           ></v-textarea>

           <v-textarea
            v-model="requestType"
            label="Tryb kombinacji zapytań A oraz B : A+B, A, B, A-B"
            auto-grow
            variant="outlined"
            rows="1"
            row-height="10"
            shaped
            class="text-h5"
           ></v-textarea>

           <v-textarea
            v-model="requestA"
            label="Zapytanie A"
            auto-grow
            variant="outlined"
            rows="1"
            row-height="10"
            shaped
            class="text-h5"
           ></v-textarea>

           <v-textarea
            v-model="temperatureA"
            label="Temperatura dla zapytania A"
            auto-grow
            variant="outlined"
            rows="1"
            row-height="10"
            shaped
            class="text-h5"
           ></v-textarea>

           <v-textarea
            v-model="requestB"
            label="Zapytanie B"
            auto-grow
            variant="outlined"
            rows="1"
            row-height="10"
            shaped
            class="text-h5"
           ></v-textarea>

           <v-textarea
            v-model="temperatureB"
            label="Temperatura dla zapytania B"
            auto-grow
            variant="outlined"
            rows="1"
            row-height="10"
            shaped
            class="text-h5"
           ></v-textarea>

          <v-textarea
            v-model="successScore"
            label="Wpisz próg dla kategorii Pasuje!"
            auto-grow
            variant="outlined"
            rows="1"
            row-height="10"
            shaped
            class="text-h5"
          ></v-textarea>

          <v-textarea
            v-model="orangeScore"
            label="Wpisz próg dla kategorii Pomocne !"
            auto-grow
            variant="outlined"
            rows="1"
            row-height="10"
            shaped
            class="text-h5"
          ></v-textarea>

          <v-textarea
            v-model="blueScore"
            label="Wpisz próg dla kategorii Przyda się !"
            auto-grow
            variant="outlined"
            rows="1"
            row-height="10"
            shaped
            class="text-h5"
          ></v-textarea>

          <v-textarea
            v-model="greyScore"
            label="Wpisz próg dla kategorii Szkoda aby umknęło !"
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
    
       </v-container>
      </v-main>
    </v-layout>
</v-card>

</template>