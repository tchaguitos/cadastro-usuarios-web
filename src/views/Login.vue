<template>
  <div id="main" class="container mt-5">
    <form class="form-signin container col-md-6 offset-md-3 mb-5 border shadow-sm" @submit="login" >
      
      <b-img class="mb-4" src="@/assets/rocket.svg" alt="" width="94" height="94" center/>

      <h4 class="mt-4 text-center font-weight-normal">
        Faça login para continuar
      </h4>

      <p class="text-center text-muted mb-5">
        Olá, visitante! Por favor, faça login para continuar
      </p>

      <b-alert
        :show="error"
        variant="warning"
        dismissible
        @dismissed="error=false">
          {{ message }}
      </b-alert>

      <b-input-group id="input-group-2" class="mb-2">
        <b-form-input
          required
          type="email"
          id="email"
          placeholder="E-mail"
          v-model="$v.email.$model"
          :state="validateState('email')"
        ></b-form-input>

        <b-form-invalid-feedback :state="validateState('email')">
          Por favor, forneça um endereço de e-mail válido
        </b-form-invalid-feedback>
      </b-input-group>

      <b-input-group id="input-group-2" class="mb-3">
        <b-form-input
          required
          type="password"
          id="password"
          placeholder="Senha"
          v-model="$v.password.$model"
          :state="validateState('password')"
        ></b-form-input>

        <b-form-invalid-feedback :state="validateState('password')">
          Por favor, você deve fornecer uma senha válida para continuar
        </b-form-invalid-feedback>
      </b-input-group>

      <div class="text-right">
        <router-link to="/cadastro">
          Ainda não tem uma conta? Cadastre-se
        </router-link>

        <br>

        <button type="submit" class="btn btn-primary mt-4">Acessar</button>
      </div>
    </form>

    <footer class="mt-5">
      Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>
    </footer>
  </div>
</template>

<script>
import { login } from '../services/login'

import { validationMixin } from 'vuelidate'
import { required, email, minLength } from 'vuelidate/lib/validators'

export default {
    name: 'Login',
    mixins: [validationMixin],
    data() {
      return {
        email: '',
        password: '',
        error: false,
        message: null,
      }
    },
    methods: {
      validateState(field) {
        if (this.$v[field].$model) {
          return this.$v[field].$dirty ? !this.$v[field].$invalid : null
        }
      },
      login: async function(e) {
        e.preventDefault()

        try {
          let data = {
            'email': this.email,
            'password': this.password
          }

          let response = await login(data)

          if (response.status == 200) {

            localStorage.setItem('token', response.data.access)
            localStorage.setItem('refreshToken', response.data.refresh)

            this.$router.replace({ name: 'home' })

          } else if (response.status == 401) {
            this.error = true
            this.message = 'Usuário ou senha incorretos'
          }
        
        } catch (e) {
          this.error = true
          this.message = 'Ocorreu um erro interno. Por favor, tente novamente mais tarde'
        }
      }
    },
    validations: {
      email: {
        required,
        email
      },
      password: {
        required,
        minLength: minLength(8)
      }
    }
}
</script>

<style scoped>
#main {
  margin-top: 164px !important;
}

.form-signin {
  padding-top: 74px;
  padding-bottom: 94px;
}

footer {
  position: fixed;
  padding: 24px 0;
  left: 0;
  bottom: 0;
  width: 100%;
  text-align: center;
}
</style>