<template>
  <div class="login-box">
    <!-- Main content -->
    <section class="content">
      <div class="error-page flex">
        <h2 class="headline text-yellow">404</h2>

        <div class="error-content">
          <h3>
            <i class="fa fa-warning text-yellow"></i> Oops! Página não encontrada.
          </h3>

          <p>A página que você solicitou não foi encontrada.</p>
          <router-link v-if="isLoggedIn" :to="{ name: 'client-list' }" class="btn btn-warning btn-flat" title="Voltar para Clientes">Voltar para Clientes</router-link>
          <router-link v-else :to="{ name: 'home' }" class="btn btn-warning btn-flat" title="Voltar para Home">Voltar para Home</router-link>
        </div>
        <!-- /.error-content -->
      </div>
      <!-- /.error-page -->
    </section>
    <!-- /.content -->
  </div>
</template>

<script>
export default {
  computed: {
    isLoggedIn() {
      return this.$store.getters["auth/isLoggedIn"];
    }
  }
};
</script>

<style>
.error-page > .headline {
  float: none;
  text-align: center;
}

.error-page .error-content {
  margin: 0;
  display: block;
  text-align: center;
}

.error-page.flex {
  display: flex;
  flex-direction: column;
  margin: 0;
  width: auto;
}
</style>