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

        <v-app-bar-title>Rozmawiaj z dokumentami</v-app-bar-title>

      </v-app-bar>

      <v-main>
        <v-container fluid align="center"> 

          <span class="text-grey-darken-1 text-h5">
                  Wskaż pliki, na temat których chcesz rozmawiać
                </span>

          <v-file-input
                  multiple
                  label="Kliknij aby wskazać pliki"
                  show-size
                  counter
                  chips
                  class="mb-10 ma-10"
                ></v-file-input>

            <vue-advanced-chat
            :height="screenHeight"
            :current-user-id="currentUserId"
            :rooms="JSON.stringify(rooms)"
            :room-id="3"
            :messages="JSON.stringify(messages)"
            :room-actions="JSON.stringify(roomActions)"
            :rooms-loaded="roomsLoaded"
            :messages-loaded="messagesLoaded"
            @fetch-messages="fetchMessages($event.detail[0])"
            @send-message="sendMessage($event.detail[0])"
            class="text-h6"
            />
        </v-container>  
      </v-main>
     </v-layout>
     </v-card>        
  </template>
  
  <script lang="ts">
    import { register } from 'vue-advanced-chat'
    register()
  
    export default {
      data() {
        return {
		  currentUserId: '1234',
          roomsLoaded: true,
          messagesLoaded: false,
          rooms: [
          {
                roomId: '1',
                roomName: 'Rozmowa 1',
                avatar: '/src/assets/robot-finding-data.png',
                unreadCount: 0,
                index: 1,
                users: [
                {
                    _id: '1234',
                    username: 'Użytkownik',
                    avatar: '/src/assets/robot-finding-data.png',
                    status: {
                    state: 'online',
                    lastChanged: 'today, 14:30'
                    }
                },
                {
                    _id: '4321',
                    username: 'Brainiverse Assistant',
                    avatar: '/src/assets/robot-finding-data.png',
                    status: {
                    state: 'online',
                    lastChanged: '14 kwietnia, 20:00'
                    }
                }
                ],
                typingUsers: [ 4321 ]
            },
            {
                roomId: '2',
                roomName: 'Rozmowa 2',
                avatar: '/src/assets/robot-finding-data.png',
                unreadCount: 0,
                index: 2,
                users: [
                {
                    _id: '1234',
                    username: 'Użytkownik',
                    avatar: '/src/assets/robot-finding-data.png',
                    status: {
                    state: 'online',
                    lastChanged: 'today, 14:30'
                    }
                },
                {
                    _id: '4321',
                    username: 'Brainiverse Assistant',
                    avatar: '/src/assets/robot-finding-data.png',
                    status: {
                    state: 'online',
                    lastChanged: '14 kwietnia, 20:00'
                    }
                }
                ],
                typingUsers: [ 4321 ]
            },
            {
                roomId: '3',
                roomName: 'Rozmowa 3',
                avatar: '/src/assets/robot-finding-data.png',
                unreadCount: 0,
                index: 3,
                lastMessage: {
                _id: '7890',
                content: 'Nowa odpowiedź',
                senderId: '4321',
                username: 'Brainiverse Assistant',
                timestamp: '10:20',
                saved: false,
                distributed: false,
                seen: true,
                new: true
                },
                users: [
                {
                    _id: '1234',
                    username: 'Użytkownik',
                    avatar: '/src/assets/robot-finding-data.png',
                    status: {
                    state: 'online',
                    lastChanged: 'today, 14:30'
                    }
                },
                {
                    _id: '4321',
                    username: 'Brainiverse Assistant',
                    avatar: '/src/assets/robot-finding-data.png',
                    status: {
                    state: 'online',
                    lastChanged: '14 kwietnia, 20:00'
                    }
                }
                ],
                typingUsers: [ 1234 ]
            }
          ],
          messages: [],
          roomActions: [
            { name: 'deleteChat', title: 'Usuń rozmowę' }
          ]
        }
      },
      computed: {
		screenHeight() {
			return this.isDevice ? window.innerHeight + 'px' : 'calc(100vh - 300px)'
		}
	  },
    methods: {
        fetchMessages({ room, options = {} }) {
			this.messagesLoaded = true
            return
        },
        async sendMessage({ content, roomId, files, replyMessage }) {
			const message = {
				sender_id: this.currentUserId,
				content,
				timestamp: new Date()
			}
            var msg = {
                _id: '7891',
                indexId: 12093,
                senderId: '1234',
                content: content,
                username: 'Brainiverse Assistant',
                avatar: '/src/assets/robot-finding-data.png',
                date: '13 Listopada',
                timestamp: '10:20',
                system: false,
                saved: true,
                distributed: true,
                seen: true,
                deleted: false,
                failure: false,
                disableActions: false,
                disableReactions: false,
                files: []
            }
            this.messages = [...this.messages, msg]
            this.messagesLoaded = false
            var odpowiedz = {
                _id: '7892',
                indexId: 12094,
                senderId: '1234',
                content: 'Kolejna odpowiedź na zadane pytanie, związana z treścią dokumentów i zadanym pytaniem',
                username: 'Brainiverse Assistant',
                avatar: '/src/assets/robot-finding-data.png',
                date: '13 Listopada',
                timestamp: '10:20',
                system: false,
                saved: true,
                distributed: true,
                seen: true,
                deleted: false,
                failure: false,
                disableActions: false,
                disableReactions: false,
                files: [],
                replyMessage: {
                content: content,
                senderId: '1234',
                files: []
                }
            }
            setTimeout(() => {
							this.messagesLoaded = true
                            this.messages = [...this.messages, odpowiedz]
						}, 2000)
        }
      }
    }
  </script>