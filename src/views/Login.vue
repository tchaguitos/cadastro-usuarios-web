<template>
  <div id="main" class="container text-center mt-5">
    <div class="form-signin container border col-md-6 offset-md-3 mb-5">
      <img class="mb-4" src="@/assets/rocket.svg" alt="" width="94" height="94">

      <h3 class="h3 mt-4 mb-5 font-weight-normal">Faça login para continuar</h3>

      <div v-if="error" class="alert alert-warning">{{ error }}</div>

      <div class="form-group">
        <input
          type="email"
          class="form-control"
          placeholder="E-mail"
          v-model="email"
          required autofocus>

        <input
          type="password"
          class="form-control mt-2"
          placeholder="Senha"
          v-model="senha"
          required>
      </div>

      <div class="text-right">
        <button class="btn btn-primary" @click="login">Acessar</button>
      </div>
    </div>

    <footer class="mt-5">
      Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>
    </footer>
  </div>
</template>

<script>
import { login } from '../services/login'

export default {
    name: 'Login',
    data() {
      return {
        email: '',
        senha: '',
        error: null
      }
    },
    methods: {
      login: async function(e) {
        e.preventDefault()

        let data = {
          'email': this.email,
          'password': this.senha
        }

        let response = await login(data)

        if (response.status == 200) {

          localStorage.setItem('token', response.data.access)
          localStorage.setItem('refreshToken', response.data.refresh)

          this.$router.replace({ name: 'home' })

        } else if (response.status == 401) {
          this.error = 'Usuário ou senha incorretos'
        }
      },
    }
}
</script>

<style scoped>
#main {
  margin-top: 164px !important;
}

.form-signin {
  padding-top: 48px;
  padding-bottom: 48px;
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