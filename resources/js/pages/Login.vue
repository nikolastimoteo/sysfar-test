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

      <ValidationObserver ref="form" v-slot="{ handleSubmit, invalid }">
        <form autocomplete="off" @submit.prevent="handleSubmit(login)">
          <ValidationProvider v-slot="{ errors }" vid="email" name="email" rules="required|email">
            <div class="form-group has-feedback" :class="{ 'has-error': errors[0] }">
              <input
                v-model="email"
                type="email"
                class="form-control"
                placeholder="E-mail"
              />
              <span class="glyphicon glyphicon-envelope form-control-feedback"></span>
              <span v-if="errors" class="help-block">
                {{ errors[0] }}
              </span>
            </div>
          </ValidationProvider>
          <ValidationProvider v-slot="{ errors }" vid="password" name="password" rules="required">
            <div class="form-group has-feedback" :class="{ 'has-error': errors[0] }">
              <input
                v-model="password"
                type="password"
                class="form-control"
                placeholder="Senha"
              />
              <span class="glyphicon glyphicon-lock form-control-feedback"></span>
              <span v-if="errors" class="help-block">
                {{ errors[0] }}
              </span>
            </div>
          </ValidationProvider>
          <div class="row">
            <div class="col-xs-12">
              <button :disabled="invalid || loading" type="submit" class="btn btn-primary btn-block btn-flat">
                Entrar
              </button>
            </div>
            <!-- /.col -->
          </div>
        </form>
      </ValidationObserver>
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
          this.$router.push({ name: "client-list" });
        })
        .catch(err => {
          if (err.response) {
            if (err.response.data.errors) {
              this.$refs.form.setErrors(err.response.data.errors);
            } else if (err.response.data.message) {
              this.errorMessage = err.response.data.message;
            }
          }
          this.loading = false;
          console.error(err);
        });
    }
  }
}
</script>