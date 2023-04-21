<template>

<v-card class="mx-auto">
    <v-layout>

      <v-app-bar
        color="info"
        :elevation="2"
        density="compact"
      >
        <template v-slot:prepend>
          <v-app-bar-nav-icon to="/"></v-app-bar-nav-icon>
        </template>

        <v-app-bar-title>Wyszukiwane treści dla aktualnego zapytania</v-app-bar-title>

      </v-app-bar>

      <v-main>  
        <v-container fluid>
        <v-row>
          <v-col>
        <v-card class="mx-auto">

        <v-list lines="three">
    
        <v-list-item>
          <v-list-item-title>Wyszukiwana treść</v-list-item-title>

          <v-list-item-subtitle>
            Pełny tekst zapytania w formie pytania, stwierdzenia lub zbioru haseł, dowolna wyszukiwana treść najlepiej w formie zdań
          </v-list-item-subtitle>
          </v-list-item>

        </v-list>        
       </v-card>
      </v-col>
      </v-row>
    </v-container>
      </v-main>
    </v-layout>
  </v-card></template>