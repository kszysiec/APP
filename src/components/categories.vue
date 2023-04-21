<template>

  <v-card class="mx-auto">
    <v-layout>

      <v-main>  

        <v-expansion-panels>
          <v-expansion-panel>
            <v-expansion-panel-title class="text-h4">
               Jakie są kategorie do których przyporządkowywane są wyszukiwane fragmenty ?</v-expansion-panel-title>
            <v-expansion-panel-text class="text-h6">

               Każdy fragment otrzymuje tylko jedną wybraną kategorię i tę kategorię nadaje automatycznie system podczas analizy źródeł a nie użytkownik

              <v-container fluid align="center">

                  <v-row><v-col>
                    <v-card  
                      color="success"
                      class="text-h5 mx-auto"
                      prepend-icon="mdi-account-star"
                      >
                    <template v-slot:title>
                      <div class="text-h4">Pasuje !</div>
                    </template>   
                    <v-card-subtitle class="text-h6">
                      Super, pasuje, zgodność w 100%
                    </v-card-subtitle>   
                    <v-card-text class="text-h5">
                      Taką kategorię dostają wzmianki, fragmenty tekstu w przypadku bardzo dobrego dopasowania do zapytania
                    </v-card-text>
                  </v-card>
                  </v-col></v-row>  
              
                  <v-row><v-col>
                    <v-card
                      color="orange-darken-1"
                      class="text-h5 mx-auto"
                      prepend-icon="mdi-account-star"
                      >
                    <template v-slot:title>
                      <div class="text-h4">Pomocne !</div>
                    </template>   
                    <v-card-subtitle class="text-h6">
                      Wygląda na bardzo pomocne, zgodność w 75%
                    </v-card-subtitle>   
                    <v-card-text class="text-h5">
                      Taką kategorię dostają wzmianki, fragmenty tekstu w przypadku wystarczająco dobrego dopasowania do zapytania
                    </v-card-text>
                  </v-card>
                  </v-col></v-row> 

                  <v-row><v-col>
                  <v-card
                      color="blue"
                      class="text-h5 mx-auto"
                      prepend-icon="mdi-account-star"
                      >
                    <template v-slot:title>
                      <div class="text-h4">Przyda się !</div>
                    </template>   
                    <v-card-subtitle class="text-h6">
                      Na pewno się przyda, zgodność w 50%
                    </v-card-subtitle>   
                    <v-card-text class="text-h5">
                      Taką kategorię dostają wzmianki, fragmenty tekstu w przypadku dość dobrego dopasowania do zapytania
                    </v-card-text>
                  </v-card>
                  </v-col></v-row> 

                  <v-row><v-col>
                  <v-card
                      color="grey"
                      class="text-h5 mx-auto"
                      prepend-icon="mdi-account-star"
                    >
                    <template v-slot:title>
                      <div class="text-h4">Szkoda aby umknęło !</div>
                    </template>   
                    <v-card-subtitle class="text-h6">
                      Nie wiadomo, zgodność tylko w 25%
                    </v-card-subtitle>   
                    <v-card-text class="text-h5">
                      Taką kategorię dostają wzmianki, fragmenty tekstu w przypadku słabego dopasowania do zapytania, które jednak nie powinny być pominięte
                    </v-card-text>
                  </v-card>
                  </v-col></v-row> 

              </v-container>

            </v-expansion-panel-text>
          </v-expansion-panel> 
        </v-expansion-panels>
      </v-main>

    </v-layout>
  </v-card>

</template>