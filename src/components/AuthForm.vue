<template>
  <v-content>
      <v-container
        class="fill-height"
        fluid
      >
        <v-row
          align="center"
          justify="center"
        >
          <v-col
            cols="12"
            sm="8"
            md="4"
          >
            <v-card class="elevation-12">
              <v-toolbar
                color="primary"
                dark
                flat
              >
                <v-toolbar-title>Войти</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-tooltip bottom>
                </v-tooltip>
              </v-toolbar>
              <v-card-text>
                <v-form ref="form" @submit.prevent lazy-validation v-model="valid">
                  <v-text-field
                    label="Логин"
                    name="login"
                    prepend-icon="mdi-account"
                    type="text"
                    :rules="loginRules"
                    v-model="login"
                    required
                  ></v-text-field>
                  <v-text-field
                    id="password"
                    label="Пароль"
                    name="password"
                    prepend-icon="mdi-lock-open"
                    type="password"
                    :rules="passwordRules"
                    v-model="password"
                    required
                  ></v-text-field>
                      <v-alert
                      dense
                      outlined
                      type="error"
                      v-if="error != ''"
                    >
                    {{this.error}}
                    </v-alert>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <span><router-link to="/reg">Создать аккаунт</router-link></span>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="validate">Войти</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
</template>

<script>
  import axios from 'axios'

  export default {
    data(){
      return {
        error: "",
        valid: true,
        loginRules: [
          v => !!v || 'Name is required',
          v => (v.length >= 5 && v.length <= 15) || 'Name must be from 5 to 15 letters',
        ],
        passwordRules: [
          v => !!v || 'Password is required',
          v => (v.length >= 5 && v.length <= 15) || 'Password is invalid length',
        ],
        login: '',
        password: ''
      }
    },
    methods: {
        onSubmit() {
          let login = this.login
          let password = this.password
          axios.get(`http://localhost:3000/users?login=${login}&password=${password}`).
          then(response => {
            if(response.data.length > 0) {
              this.$store.dispatch('setToken', login);
              this.$router.push('/contacts')
            }
            else {
              this.error = "Неверный логин или пароль!";
            }
        });
      },
      validate () {
        console.log('hello')
        if(this.$refs.form.validate()) {
          this.onSubmit();
        }
      },
    },
  }
</script>
