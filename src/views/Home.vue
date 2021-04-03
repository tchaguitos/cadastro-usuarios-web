<template>
  <div class="mt-5">
    <header>
      <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
        <a class="navbar-brand" href="#">Dashboard</a>
      </nav>
    </header>

    <main role="main" class="container">
      <div class="">
        <h1 class="mb-0 text-gray-800 mt-5">Home</h1>

        <b-card v-if="profile" class="mt-5">
          <div class="row ml-2">
            <div class="mt-2">
              <h4 class="text-muted light mb-0">{{ profile.nome_completo }}</h4>
              <p class="text-muted ml-1">{{ profile.email }}</p>
            </div>
          </div>

          <div class="mt-4 ml-2">
            <p class="text-muted ml-1 mb-0">
              <b>CPF:</b> {{ profile.cpf }}
            </p>
            
            <p class="text-muted ml-1">
              <b>PIS/PASEP:</b> {{ profile.pis }}
            </p>

            <p class="text-muted ml-1 mb-0">{{ profile.logradouro }}, {{ profile.numero }}, {{ profile.complemento }}</p>
            <p class="text-muted ml-1">{{ profile.municipio.nome }}. {{ profile.cep }}</p>
          </div>

          <div class="mt-5">
            <a href="#" class="card-link ml-3">
              Editar perfil <b-icon icon="pencil-square" class="ml-2"></b-icon>
            </a>
          </div>
        </b-card>

        <b-card v-if="error" class="mt-5">
          <b-card-text>
            {{ error }}
          </b-card-text>
        </b-card>
      </div>
    </main>
  </div>
</template>

<script>
import { getProfile } from '../services/profile'

export default {
  name: 'Home',
  data() {
      return {
        profile: null,
        error: false
      }
    },
    methods: {
      getUser: async function() {
        try {
          let profile = await getProfile()
          this.profile = profile.data

        } catch (e) {
          this.error = 'Ocorreu um erro ao buscar o perfil. Por favor, tente novamente mais tarde'
        }
      },
      logout: async function() {
        localStorage.removeItem('token')
        localStorage.removeItem('refreshToken')

        this.$router.replace({ name: 'login' })
      }
    },
    created: function() {
      this.getUser()
    },
}
</script>

<style scoped>
main {
  margin-top: 94px !important;
}
</style>
