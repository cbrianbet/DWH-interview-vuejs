<template>
  <div style="height: 100%;">
    <h1 class="text-center">Push Monthly Data</h1>
    <section class="content">
      <div class="row">
        <div class="col-md-12">
          <div class="box box-info">
            <!-- Input Addons -->
            <div class="box-header with-border">
              <form @submit.prevent="PushData">
                <div class="input">
                  <input class="form-control" placeholder="Full Name" type="text" v-model="form.name">
                </div>
                <br/>
                <div class="input">
                  <input class="form-control" placeholder="Patient Age*" type="number" v-model="form.age" required>
                </div>
                <br/>
                <button type="submit" v-bind:class="'btn btn-primary btn-lg ' + loading">Submit</button>
              </form>
              <br/>
              <!-- errors -->
              <div v-if=response class="text-red"><p class="vertical-5p lead">{{response}}</p></div>

            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'PushData',
  data(router) {
    return {
      form: {
        name: '',
        age: null
      },
      loading: '',
      response: ''
    }
  },
  methods: {
    PushData() {
      this.toggleLoading()
      this.resetResponse()
      this.$store.commit('TOGGLE_LOADING')

      /* Making API call to authenticate a user */
      axios.post('http://localhost:5000/api/data/add/patient', this.form)
        .then(response => {
          this.toggleLoading()

          var data = response.data
          this.$router.push(data.redirect ? data.redirect : '/')
        })
        .catch(error => {
          this.response = error.message
          this.toggleLoading()
        })
    },
    toggleLoading() {
      this.loading = this.loading === '' ? 'loading' : ''
    },
    resetResponse() {
      this.response = ''
    }
  }
}
</script>

<style scoped>

</style>
