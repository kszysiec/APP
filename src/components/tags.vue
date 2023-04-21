<template>

<v-card class="mx-auto">
    <v-layout>

      <v-main>  

        <v-expansion-panels>
          <v-expansion-panel>
            <v-expansion-panel-title class="text-h4">
              Jakie są oznaczenia do których możesz przyporządkować wyszukane fragmenty w trakcie przegladania ?</v-expansion-panel-title>
            <v-expansion-panel-text class="text-h6">

              Każdy wynik może być opatrzony wieloma oznaczeniami i te oznaczenia nadaje użytkownik a nie system

            <v-container fluid align="center">

              <v-row><v-col>
              <v-card
                color="red"
                variant="outlined"
                class="text-h5 mx-auto"
                prepend-icon="mdi-alert-circle"
                >
                <template v-slot:title>
                  <div class="text-h4">Pilne !</div>
                </template>   
             <v-card-subtitle class="text-h6">
              Trzeba przejrzeć w pierwszej kolejności
             </v-card-subtitle>   
             <v-card-text class="text-h5">
              Taką kategorię dostają wzmianki, fragmenty tekstu w przypadku ...
             </v-card-text>
             <v-card-actions>
              <v-row><v-col align="right">
              <v-btn size="x-large" color="orange-darken-1" variant="tonal">Usuń</v-btn>
            </v-col>
              </v-row>
            </v-card-actions></v-card> 
            </v-col></v-row>  

            <v-row><v-col>
              <v-card
                color="success"
                variant="outlined"
                class="text-h5 mx-auto"
                prepend-icon="mdi-message-text"
                >
                <template v-slot:title>
                  <div class="text-h4">Metodyka !</div>
                </template>   
             <v-card-subtitle class="text-h6">
              Dotyczy zastosowanej metodyki
             </v-card-subtitle>   
             <v-card-text class="text-h5">
              Taką kategorię dostają wzmianki, fragmenty tekstu w przypadku ...
             </v-card-text>
             <v-card-actions>
              <v-row><v-col align="right">
              <v-btn size="x-large" color="orange-darken-1" variant="tonal">Usuń</v-btn>
            </v-col>
              </v-row>
            </v-card-actions></v-card> 
            </v-col></v-row>  

            <v-row><v-col>
              <v-card
                color="blue"
                variant="outlined"
                class="text-h5 mx-auto"
                prepend-icon="mdi-chart-line"
              >
              <template v-slot:title>
                  <div class="text-h4">Wyniki badań !</div>
                </template>   
             <v-card-subtitle class="text-h6">
              Dotyczy wyników, zestawień, porównania
             </v-card-subtitle>   
             <v-card-text class="text-h5">
              Taką kategorię dostają wzmianki, fragmenty tekstu w przypadku ...
             </v-card-text>
             <v-card-actions>
              <v-row><v-col align="right">
              <v-btn size="x-large" color="orange-darken-1" variant="tonal">Usuń</v-btn>
            </v-col>
              </v-row>
            </v-card-actions></v-card> 
            </v-col></v-row>  

         <v-row><v-col align="right">
          <v-btn size="x-large" color="success" variant="elevated">
            Dodaj nowe oznaczenie
          </v-btn></v-col>
        </v-row>

            </v-container>

            </v-expansion-panel-text>
          </v-expansion-panel> 
        </v-expansion-panels>

      </v-main>
    </v-layout>
  </v-card>
  </template>