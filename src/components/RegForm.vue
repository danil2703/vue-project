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
                <v-toolbar-title>Регистрация</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-form ref="form" @submit.prevent lazy-validation v-model="valid">
                  <v-text-field
                    label="Логин"
                    name="login"
                    prepend-icon="mdi-account"
                    type="text"
                    v-model="login"
                    :rules="textFieldRules"
                    required
                  ></v-text-field>
                  <v-text-field
                    id="password"
                    label="Пароль"
                    name="password"
                    prepend-icon="mdi-lock-open"
                    type="password"
                    :rules="textFieldRules"
                    v-model="password"
                    required
                  ></v-text-field>
                  <v-text-field
                    label="E-mail"
                    name="e-mail"
                    prepend-icon="mdi-email"
                    type="email"
                    :rules="emailRules"
                    v-model="email"
                    required
                  ></v-text-field>
                  <v-text-field
                    label="Имя"
                    name="name"
                    prepend-icon="mdi-face"
                    :rules="[v => v.length > 3 || 'Введите полное имя']"
                    type="text"
                    v-model="name"
                    required
                  ></v-text-field>
                  <v-text-field
                    label="Телефон"
                    name="tel"
                    :rules="telRules"
                    prepend-icon="mdi-phone"
                    type="text"
                    v-model="tel"
                    required
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <span><router-link to="/">Уже есть аккаунт?</router-link></span>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="validate">Создать аккаунт</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
</template>

<script>
  export default {
    data() {
      return {
        valid: false,
        textFieldRules: [
          v => !!v || 'Поле обязательно',
          v => (v.length >= 5 && v.length <= 15) || 'Длина от 5 до 15 символов',
        ],
         emailRules: [ 
          v => !v || /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'Неправильный e-mail'
        ],
        telRules: [
          v => !v || (/[1-9,+]/.test(v) && v.length > 9 ) || 'Неправильный телефон'
        ],
        login: '',
        password: '',
        email: '',
        name: '',
        tel: ''
      }
    },
    methods: {
       onSubmit() {
        let login = this.login
        let email = this.email 
        let password = this.password
        let name = this.name
        let tel = this.tel      
        this.$store.dispatch('addUser', {login, email, password, name, tel});
      },
      validate () {
        if(this.$refs.form.validate()) {
          this.onSubmit();
          this.$router.push('/')
        }
      },
    }
  }
</script>
