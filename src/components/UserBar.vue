<template>
    <v-list-item v-if="this.$store.getters.token" class="flex justify-space-between">
        <v-avatar color="indigo" size=35>
            <v-icon dark>mdi-account-circle</v-icon>
        </v-avatar>
        <span>{{this.$store.getters.login}}</span>
        <div class="my-2">
            <v-btn @click="logOut" depressed small>Выйти</v-btn>
        </div>
    </v-list-item>
</template>

<script>
export default {
   methods: {
    logOut(){
      this.$store.dispatch('logOut')
      this.$router.push('/')
    }
  }
}
</script>