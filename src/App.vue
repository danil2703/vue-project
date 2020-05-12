<template>
  <div id="app">
    <v-app id="inspire">
      <v-navigation-drawer
        v-model="drawer"
        app
      >
        <v-list dense>
          <UserBar />
          <v-list-item link>
            <v-list-item-action>
              <v-icon>mdi-home</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <router-link to="/" class="link">Вход</router-link>
            </v-list-item-content>
          </v-list-item>
          <v-list-item link>
            <v-list-item-action>
              <v-icon>mdi-contact-mail</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <router-link to="/contacts" class="link">Контакты</router-link>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-app-bar
        app
        color="primary"
        dark
      >
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <v-toolbar-title>Личный кабинет</v-toolbar-title>
      </v-app-bar>
      <router-view>
      </router-view>
    </v-app>
  </div>
</template>

<script>
import UserBar from "./components/UserBar"

export default {
  components: {
    UserBar
  },
  props: {
    source: String,
  },
  data: () => ({
    drawer: false,
  }),
  created() {
    let token = localStorage.getItem('token');
    let login = localStorage.getItem('login');
    if(token) {
      this.$store.dispatch('setToken', login, token)
    }
  }
}
</script>

<style scoped>
  .link {
    display: block;
    text-decoration: none;
    padding: 8px 0;
    color: #424242;
  }
  .v-list--dense .v-list-item .v-list-item__content {
    padding: 0;
  }
</style>