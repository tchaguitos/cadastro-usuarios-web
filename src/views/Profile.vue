<template>
  <div class="mt-5">
    <header>
      <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
        <a class="navbar-brand" href="#">Dashboard</a>

        <b-button v-b-modal.modal-1>
          Sair
        </b-button>
      </nav>
    </header>

    <main role="main" class="container">
      <div class="">
        <h1 class="mb-0 text-gray-800 mt-5">Atualização de perfil</h1>

        <b-card v-if="profile" class="mt-5">
          <b-form @submit="updateProfile">
            <b-alert
              class="mb-2"
              :show="error && message"
              variant="warning"
              dismissible
              @dismissed="error=false">
                {{ message }}
            </b-alert>

            <b-alert
              class="mb-2"
              v-for="(item, index) in errorObject"
              v-bind:key="index"
              :show="error && errorObject"
              variant="warning"
              dismissible
              @dismissed="error=false">
                {{ item[0] }}
            </b-alert>

            <h4 class="text-muted light ml-1 mt-4">Informações pessoais</h4>

            <b-input-group id="input-group-2" class="mb-2">
              <b-form-input
                required
                type="text"
                id="nome_completo"
                placeholder="Nome completo"
                v-model="$v.profile.nome_completo.$model"
                :state="validateState('nome_completo')" 
              ></b-form-input>

              <b-form-invalid-feedback :state="validateState('nome_completo')">
                O nome completo é obrigatório para cadastro
              </b-form-invalid-feedback>
            </b-input-group>

            <b-input-group id="input-group-2" class="mb-2">
              <b-form-input
                required
                type="tel"
                id="cpf"
                maxlength="11"
                placeholder="CPF"
                v-model="$v.profile.cpf.$model"
                :state="validateState('cpf')"
              ></b-form-input>

              <b-form-invalid-feedback :state="validateState('cpf')">
                Você deve fornecer um CPF válido para se cadastrar
              </b-form-invalid-feedback>
            </b-input-group>

            <b-input-group id="input-group-2" class="mb-2">
              <b-form-input
                required
                id="pis"
                type="tel"
                maxlength="11"
                placeholder="PIS/PASEP"
                v-model="$v.profile.pis.$model"
                :state="validateState('pis')"
              ></b-form-input>

              <b-form-invalid-feedback :state="validateState('pis')">
                Você deve fornecer um número de PIS/PASEP válido para se cadastrar
              </b-form-invalid-feedback>
            </b-input-group>

            <b-input-group id="input-group-2" class="mb-2">
              <b-form-input
                required
                type="email"
                id="email"
                placeholder="E-mail"
                v-model="$v.profile.email.$model"
                :state="validateState('email')"
              ></b-form-input>

              <b-form-invalid-feedback :state="validateState('email')">
                Por favor, forneça um endereço de e-mail válido
              </b-form-invalid-feedback>
            </b-input-group>

            <h4 class="text-muted light ml-1 mt-4">Endereço</h4>

            <b-input-group id="input-group-2" class="mb-2">
              <b-form-input
                required
                id="logradouro"
                type="text"
                placeholder="Logradouro (rua ou avenida)"
                v-model="$v.profile.logradouro.$model"
                :state="validateState('logradouro')"
              ></b-form-input>

              <b-form-invalid-feedback :state="validateState('logradouro')">
                Você deve informar o logradouro para se cadastrar
              </b-form-invalid-feedback>
            </b-input-group>

            <b-input-group id="input-group-2" class="mb-2">
              <b-form-input
                required
                id="numero"
                type="number"
                placeholder="Número"
                v-model="$v.profile.numero.$model"
                :state="validateState('numero')"
              ></b-form-input>

              <b-form-invalid-feedback :state="validateState('numero')">
                Você deve informar o número para se cadastrar
              </b-form-invalid-feedback>
            </b-input-group>

            <b-input-group id="input-group-2" class="mb-2">
              <b-form-input
                id="complemento"
                type="text"
                placeholder="Complemento"
                v-model="profile.complemento"
              ></b-form-input>
            </b-input-group>

            <b-input-group id="input-group-2" class="mb-2">
              <b-form-input
                required
                id="cep"
                type="tel"
                maxlength="8"
                placeholder="CEP"
                v-model="$v.profile.cep.$model"
                :state="validateState('cep')"
              ></b-form-input>

              <b-form-invalid-feedback :state="validateState('cep')">
                Você deve informar um CEP válido para se cadastrar
              </b-form-invalid-feedback>
            </b-input-group>

            <b-form-group>
              <b-form-select
                required
                id="municipio"
                value-field="id"
                text-field="nome"
                :options="municipioList"
                v-model="$v.profile.municipio.$model"
                :state="validateState('municipio')"
              >
                <b-form-select-option :value="null">Selecione a cidade</b-form-select-option>
              </b-form-select>

              <b-form-invalid-feedback :state="validateState('municipio')">
                Você deve selecionar uma cidade para se cadastrar
              </b-form-invalid-feedback>
            </b-form-group>

            <div class="text-right">
              <button type="button" class="btn btn-secondary mt-4 mr-2" @click="$router.go(-1)">
                Cancelar
              </button>

              <button type="submit" class="btn btn-primary mt-4">
                Atualizar perfil
              </button>
            </div>
          </b-form>
        </b-card>

        <b-card v-if="error" class="mt-5">
          <b-card-text>
            {{ error }}
          </b-card-text>
        </b-card>
      </div>
    </main>

    <b-modal
      id="modal-1"
      title="Você realmente deseja sair?"
      ok-title="Sair"
      cancel-title="Cancelar"
      @ok="logout">

      <p class="my-4">
        Clique em "sair" se realmente deseja sair
      </p>
    </b-modal>
  </div>
</template>

<script>
import { updateProfile } from '../services/profile'

import { validationMixin } from 'vuelidate'
import { required, email, minLength, numeric } from 'vuelidate/lib/validators'

export default {
  name: 'Profile',
  mixins: [validationMixin],
  data() {
      return {
        profile: null,
        municipioList: [],
        error: false,
        errorObject: null,
        message: null,
      }
    },
    methods: {
      getUser: async function() {
        try {
          let profile = await localStorage.getItem('profile')
          this.profile = JSON.parse(profile)

        } catch (e) {
          this.error = 'Ocorreu um erro ao buscar o perfil. Por favor, tente novamente mais tarde'
        }
      },
      validateState(field) {
        if (this.$v.profile[field].$model) {
          return this.$v.profile[field].$dirty ? !this.$v.profile[field].$invalid : null
        }
      },
      updateProfile: async function(e) {
        e.preventDefault()

        try {
          let data = {
            email: this.profile.email,
            cpf: this.profile.cpf,
            pis: this.profile.pis,
            nome_completo: this.profile.nome_completo,
            logradouro: this.profile.logradouro,
            numero: this.profile.numero,
            complemento: this.profile.complemento,
            cep: this.profile.cep,
            municipio: this.profile.municipio
          }

          let response = await updateProfile(data)

          if (response.status == 200) {
            this.$router.replace({ name: 'home' })

          } else if (response.status == 400) {
            this.error = true
            this.errorObject = response.data
          }
        
        } catch (e) {
          this.error = true
          this.message = 'Ocorreu um erro interno. Por favor, tente novamente mais tarde'
        }
      },
      logout: async function() {
        localStorage.removeItem('token')
        localStorage.removeItem('refreshToken')

        this.$router.replace({ name: 'login' })
      }
    },
    validations: {
      profile: {
        email: {
          required,
          email
        },
        cpf: {
          required,
          numeric,
          minLength: minLength(11)
        },
        pis: {
          required,
          numeric,
          minLength: minLength(11)
        },
        nome_completo: {
          required,
          minLength: minLength(8),
        },
        logradouro: {
          required,
        },
        numero: {
          required,
          numeric
        },
        cep: {
          required,
          numeric
        },
        municipio: {
          required,
        }
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
