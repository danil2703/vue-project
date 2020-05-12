<template>
  <v-content class="table-content">
        <v-col
            cols="12"
            sm="12"
            md="8"
          >
            <v-data-table
                :headers="headers"
                :items="allUsers"
                sort-by="id"
                class="elevation-1"
                :search="search"
            >
                <template v-slot:top>
                <v-toolbar flat color="white">
                    <v-toolbar-title>Контакты</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-text-field
                        v-model="search"
                        append-icon="mdi-magnify"
                        label="Search"
                        single-line
                        hide-details
                    ></v-text-field>
                    <v-spacer></v-spacer>
                    <v-dialog v-model="dialog" max-width="500px">
                        <template v-slot:activator="{ on }">
                            <v-btn color="primary" dark class="mb-2" v-on="on">New Item</v-btn>
                        </template>
                    <v-card>
                        <v-card-title>
                        <span class="headline">{{ formTitle }}</span>
                        </v-card-title>

                        <v-card-text>
                        <v-container>
                            <v-row>
                            <v-col cols="12" sm="6" md="4">
                                <v-text-field v-model="editedItem.login" label="Login"></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                                <v-text-field v-model="editedItem.email" label="E-mail"></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                                <v-text-field v-model="editedItem.name" label="Имя"></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                                <v-text-field v-model="editedItem.tel" label="Телефон"></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                                <v-text-field v-model="editedItem.password" label="Пароль"></v-text-field>
                            </v-col>
                            </v-row>
                        </v-container>
                        </v-card-text>
                        <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                        <v-btn color="blue darken-1" text @click="save">Save</v-btn>
                        </v-card-actions>
                    </v-card>
                    </v-dialog>
                </v-toolbar>
                </template>
                <template v-slot:item.actions="{ item }">
                <v-icon
                    small
                    class="mr-2"
                    @click="editItem(item)"
                >
                    mdi-pencil
                </v-icon>
                <v-icon
                    small
                    @click="deleteItem(item)"
                >
                    mdi-delete
                </v-icon>
                </template>
                <template v-slot:no-data>
                <v-btn color="primary" @click="initialize">Reset</v-btn>
                </template>
            </v-data-table>
        </v-col>
  </v-content>
</template>

<script>
  export default {
    data: () => ({
      dialog: false,
      search: '',
      headers: [
        { text: 'id', value: 'id'},
        { text: 'Логин', value: 'login' },
        { text: 'E-mail', value: 'email' },
        { text: 'Имя', value: 'name' },
        { text: 'Телефон', value: 'tel' },
        { text: 'Пароль', value: 'password', sortable: false },
        { text: 'Действия', value: 'actions', sortable: false },
      ],
      editedIndex: -1,
      editedItem: {
        id: 0,
        login: '',
        email: '',
        name: '',
        tel: '',
        password: '',
      },
      defaultItem: {
        id: 0,
        login: '',
        email: '',
        name: '',
        tel: '',
        password: '',
      },
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      },
      allUsers () {
          return this.$store.getters.allUsers
      }
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
    },

    created () {
      this.initialize()
    },

    methods: {
      initialize () {
          console.log(localStorage.getItem('token'));
        if(!localStorage.getItem('token')) {
            this.$router.push('/block')
        } 
        this.$store.dispatch('axiosUsers');
      },

      editItem (item) {
        this.editedIndex = this.$store.getters.allUsers.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        this.editedIndex = this.$store.getters.allUsers.indexOf(item)
        if(confirm('Are you sure you want to delete this item?')) {
            this.$store.dispatch('deleteUser', item);
        }
      },

      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      save () {
        if (this.editedIndex > -1) {
          this.$store.dispatch('updateUser', this.editedItem, this.editedIndex);
        } else {
          this.$store.dispatch('addUser', this.editedItem);
        }
        this.close()
      },
    },
  }
</script>

<style>
.v-content__wrap {
    display: flex;
    justify-content: center;
}

::-webkit-scrollbar {
    display: none;
}
</style>