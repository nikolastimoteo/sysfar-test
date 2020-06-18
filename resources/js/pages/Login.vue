<template>
  <div class="login-box">
    <div class="login-logo">
      <router-link :to="{ name: 'home' }" title="Home">{{ appName }}</router-link>
    </div>
    <!-- /.login-logo -->
    <div class="login-box-body">
      <p class="login-box-msg">Entre para começar</p>

      <div class="callout callout-danger" v-if="errorMessage !== ''">
        <h4>Erro!</h4>

        <p>{{ errorMessage }}</p>
      </div>

      <form autocomplete="off" @submit.prevent="login">
        <div class="form-group has-feedback">
          <input type="email" class="form-control" placeholder="E-mail" v-model="email" required />
          <span class="glyphicon glyphicon-envelope form-control-feedback"></span>
        </div>
        <div class="form-group has-feedback">
          <input type="password" class="form-control" placeholder="Senha" v-model="password" required />
          <span class="glyphicon glyphicon-lock form-control-feedback"></span>
        </div>
        <div class="row">
          <div class="col-xs-12">
            <button type="submit" class="btn btn-primary btn-block btn-flat" :disabled="loading">
              Entrar
            </button>
          </div>
          <!-- /.col -->
        </div>
      </form>
    </div>
    <!-- /.login-box-body -->
  </div>
</template>

<script>
export default {
  data(){
    return {
      appName: process.env.MIX_APP_NAME,
      email: "",
      password: "",
      errorMessage: "",
      loading: false
    }
  },
  methods: {
    login() {
      this.loading = true;
      this.errorMessage = "";

      const { email, password } = this;

      this.$store
        .dispatch("auth/login", { email, password })
        .then(() => {
          this.loading = false;
          this.$router.push({ name: "home" });
        })
        .catch(err => {
          if(err.response && err.response.data.message) {
            this.errorMessage = err.response.data.message;
          }
          this.loading = false;
          console.error(err);
        });
    }
  }
}
</script>