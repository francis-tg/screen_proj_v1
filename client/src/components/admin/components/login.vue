<template>
  
  <b-container>
  <b-col md='8'>
  <div class="login">
  <h1 class="text-center ">
   Connexion
  </h1>
    <b-form @submit="onSubmit" v-if="show">
      <div class="mb-3">
      <b-form-group
        id="input-group-1"
        label="Nom d'utilisateur:"
        label-for="input-1"
      >
        <b-form-input
          id="input-1"
          v-model="form.username"
          type="email"
          placeholder="Nom d'utilisateur"
          required
        ></b-form-input>
      </b-form-group>
      </div>

     <div class="mb-3">
      <b-form-group id="input-group-2" label="Mot de passe:" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="form.password"
          placeholder="Mot de passe"
          required
        ></b-form-input>
      </b-form-group>
     </div>

      <b-button type="submit" variant="primary mt-3 w-100">Connexion</b-button>
    </b-form>
    <!-- <b-card class="mt-3" header="Form Data Result">
      <pre class="m-0">{{ form }}</pre>
    </b-card> -->
      </div>
  </b-col>

  </b-container>


</template>

<script>
export default { 
    name: 'Login',
    data() {
      return {
        form: {
          username: '',
          password: '',
        },
        foods: [{ text: 'Select One', value: null }, 'Carrots', 'Beans', 'Tomatoes', 'Corn'],
        show: true
      }
    },
    methods: {
      onSubmit(event) {
        event.preventDefault()
        alert(JSON.stringify(this.form))
      },
      /* onReset(event) {
        event.preventDefault()
        // Reset our form values
        this.form.email = ''
        this.form.name = ''
        this.form.food = null
        this.form.checked = []
        // Trick to reset/clear native browser form validation state
        this.show = false
        this.$nextTick(() => {
          this.show = true
        })
      } */
    }
  

    
}
</script>

<style lang="css" scoped>
    .login{
      margin-left: 20rem;
      padding: 30px;
      background: #14141431;
    }
    @media screen and (max-width:720px) {
        .login{
        margin-left: 0;
        }
    }
</style>