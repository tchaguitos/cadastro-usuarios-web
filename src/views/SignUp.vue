<template>
  <div id="main" class="container mt-5">
    <b-img class="mb-4" src="@/assets/rocket.svg" alt="" width="94" height="94" center/>

    <h4 class="h3 mt-4 mb-5 text-center font-weight-normal">
      Formulário de cadastro
    </h4>

    <form class="form-signup container col-md-8 offset-md-2 mb-5 border shadow-sm" @submit="signUp">
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
        :show="error"
        variant="warning"
        dismissible
        @dismissed="error=false">
          {{ item[0] }}
      </b-alert>

      <h4 class="text-muted light ml-1">Informações pessoais</h4>

      <b-input-group id="input-group-2" class="mb-2">
        <b-form-input
          required
          type="text"
          id="nome_completo"
          placeholder="Nome completo"
          v-model="$v.nome_completo.$model"
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
          v-model="$v.cpf.$model"
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
          v-model="$v.pis.$model"
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
          v-model="$v.email.$model"
          :state="validateState('email')"
        ></b-form-input>

        <b-form-invalid-feedback :state="validateState('email')">
          Por favor, forneça um endereço de e-mail válido
        </b-form-invalid-feedback>
      </b-input-group>

      <b-input-group id="input-group-2" class="mb-2">
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

      <b-input-group id="input-group-2" class="mb-2">
        <b-form-input
          required
          type="password"
          id="password2"
          placeholder="Confirme a senha"
          v-model="$v.password2.$model"
          :state="validateState('password2')"
        ></b-form-input>

        <b-form-invalid-feedback :state="validateState('password2')">
          As senhas não conferem
        </b-form-invalid-feedback>
      </b-input-group>

      <h4 class="text-muted light ml-1 mt-4">Endereço</h4>

      <b-input-group id="input-group-2" class="mb-2">
        <b-form-input
          required
          id="logradouro"
          type="text"
          placeholder="Logradouro (rua ou avenida)"
          v-model="$v.logradouro.$model"
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
          v-model="$v.numero.$model"
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
          v-model="complemento"
        ></b-form-input>
      </b-input-group>

      <b-input-group id="input-group-2" class="mb-2">
        <b-form-input
          required
          id="cep"
          type="tel"
          maxlength="8"
          placeholder="CEP"
          v-model="$v.cep.$model"
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
          v-model="$v.municipio.$model"
          :state="validateState('municipio')"
        >
          <b-form-select-option :value="null">Selecione a cidade</b-form-select-option>
        </b-form-select>

        <b-form-invalid-feedback :state="validateState('municipio')">
          Você deve selecionar uma cidade para se cadastrar
        </b-form-invalid-feedback>
      </b-form-group>


      <div class="text-right">
        <router-link to="/login">
          Voltar para o login
        </router-link>

        <br>

        <button type="submit" class="btn btn-primary mt-4">Criar conta</button>
      </div>
    </form>

    <footer class="mt-5">
      Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>
    </footer>
  </div>
</template>

<script>
import { signUp } from '../services/signUp'
import { getAllCities } from '../services/city'

import { validationMixin } from 'vuelidate'
import { required, email, minLength, numeric, sameAs } from 'vuelidate/lib/validators'

export default {
    name: 'SignUp',
    mixins: [validationMixin],
    data() {
      return {
        email: '',
        cpf: '',
        pis: '',
        password: '',
        password2: '',
        nome_completo: '',
        logradouro: '',
        numero: '',
        complemento: '',
        cep: '',
        municipio: null,
        municipioList: [],
        error: false,
        errorObject: null,
        message: null,
      }
    },
    methods: {
      validateState(field) {
        if (this.$v[field].$model) {
          return this.$v[field].$dirty ? !this.$v[field].$invalid : null
        }
      },
      getCities: async function() {
        let allCities = await getAllCities()
        this.municipioList = allCities.data
      },
      signUp: async function(e) {
        e.preventDefault()

        try {
          let data = {
            email: this.email,
            cpf: this.cpf,
            pis: this.pis,
            password: this.password,
            password2: this.password2,
            nome_completo: this.nome_completo,
            logradouro: this.logradouro,
            numero: this.numero,
            complemento: this.complemento,
            cep: this.cep,
            municipio: this.municipio
          }

          let response = await signUp(data)

          if (response.status == 201) {
            this.$router.replace({ name: 'login' })

          } else if (response.status == 400) {
            this.error = true
            this.errorObject = response.data
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
      password: {
        required,
        minLength: minLength(8)
      },
      password2: {
        required,
        sameAsPassword: sameAs('password')
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
    },
    created: function() {
      this.getCities()
    }
}
</script>

<style scoped>
#main {
  margin-top: 164px !important;
}

.form-signup {
  padding-top: 48px;
  padding-bottom: 74px;
}

footer {
  padding: 24px 0;
  left: 0;
  bottom: 0;
  width: 100%;
  text-align: center;
}
</style>