<template>
  <div class="layout-top-nav">
    <div class="wrapper">
      <header class="main-header">
        <nav class="navbar navbar-static-top">
          <div class="navbar-header">
            <router-link :to="{ name: 'home' }" class="navbar-brand logo" title="Home">{{ appName }}</router-link>
          </div>

          <!-- Navbar Right Menu -->
          <div class="navbar-custom-menu">
            <ul class="nav navbar-nav">
              <li v-if="!isLoggedIn">
                <router-link :to="{ name: 'login' }" title="Login">
                  Login
                </router-link>
              </li>
              <li v-if="isLoggedIn">
                <router-link :to="{ name: 'client-list' }" title="Clientes">
                  Clientes
                </router-link>
              </li>
            </ul>
          </div>
          <!-- /.navbar-custom-menu -->
        </nav>
      </header>
      <!-- Full Width Column -->
      <div class="content-wrapper">
        <div class="container"></div>
        <!-- /.container -->
      </div>
      <!-- /.content-wrapper -->
      <footer class="main-footer">
        <div class="container">
          <div class="pull-right hidden-xs">
            <b>Versão</b> 1.0.0
          </div>
          <strong>
            &copy; 2020
            <router-link :to="{ name: 'home' }" title="Home">
              {{ appName }}
            </router-link>.
          </strong>
          Todos os direitos reservados.
        </div>
        <!-- /.container -->
      </footer>
    </div>
    <!-- ./wrapper -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      appName:  process.env.MIX_APP_NAME ? process.env.MIX_APP_NAME : "Teste SysFar",
    };
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters["auth/isLoggedIn"];
    }
  }
};
</script>

<style scoped>
.sidebar-open .content-wrapper,
.sidebar-open .main-footer {
  transform: none;
}
</style>
