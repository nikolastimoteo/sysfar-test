<template>
  <!-- Site wrapper -->
  <div class="wrapper">
    <header class="main-header">
      <!-- Logo -->
      <router-link :to="{ name: 'home' }" class="logo" title="Home">
        <!-- mini logo for sidebar mini 50x50 pixels -->
        <span class="logo-mini"><b>T</b>SF</span>
        <!-- logo for regular state and mobile devices -->
        <span class="logo-lg">{{ appName }}</span>
      </router-link>
      <!-- Header Navbar: style can be found in header.less -->
      <nav class="navbar navbar-static-top">
        <!-- Sidebar toggle button-->
        <a href="#" class="sidebar-toggle" data-toggle="push-menu" role="button" title="Abrir/Fechar Menu">
          <span class="sr-only">Toggle navigation</span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </a>

        <div class="navbar-custom-menu">
          <ul class="nav navbar-nav">
            <!-- User Account: style can be found in dropdown.less -->
            <li class="dropdown user user-menu">
              <a href="#" title="Meu Perfil">
                <img
                  src="https://adminlte.io/themes/AdminLTE/dist/img/user2-160x160.jpg"
                  class="user-image"
                  alt="User Image"
                />
                <span class="hidden-xs">{{ user.name }}</span>
              </a>
            </li>
            <!-- Control Sidebar Toggle Button -->
            <li>
              <a href="#" title="Sair" @click.prevent="logout">
                <i class="fa fa-sign-out"></i>
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </header>

    <!-- =============================================== -->

    <!-- Left side column. contains the sidebar -->
    <aside class="main-sidebar">
      <!-- sidebar: style can be found in sidebar.less -->
      <section class="sidebar">
        <!-- Sidebar user panel -->
        <div class="user-panel">
          <div class="pull-left image">
            <img
              src="https://adminlte.io/themes/AdminLTE/dist/img/user2-160x160.jpg"
              class="img-circle"
              alt="User Image"
            />
          </div>
          <div class="pull-left info">
            <p>{{ user.name }}</p>
            <a href="#"><i class="fa fa-circle text-success"></i> Online</a>
          </div>
        </div>
        <!-- sidebar menu: : style can be found in sidebar.less -->
        <ul class="sidebar-menu" data-widget="tree">
          <li class="header">MENU</li>
          <li>
            <router-link :to="{ name: 'client-list' }" title="Clientes">
              <i class="fa fa-users"></i> <span>Clientes</span>
            </router-link>
          </li>
        </ul>
      </section>
      <!-- /.sidebar -->
    </aside>

    <router-view />

    <footer class="main-footer">
      <div class="pull-right hidden-xs"><b>Versão</b> 1.0.0</div>
      <strong>
        &copy; 2020
        <router-link to="/" title="Home">{{ appName }}</router-link>.
      </strong>
      Todos os direitos reservados.
    </footer>
  </div>
  <!-- ./wrapper -->
</template>

<script>
export default {
  data(){
    return {
      appName: process.env.MIX_APP_NAME ? process.env.MIX_APP_NAME : "Teste SysFar",
    }
  },
  computed: {
    user() {
      return this.$store.getters["auth/authUser"];
    }
  },
  methods: {
    logout() {
      this.$store
        .dispatch("auth/logout")
        .finally(() => {
          this.$router.push({ name: "login" });
        });
    }
  },
  created() {
    this.$store
      .dispatch("auth/getUser");
  }
};
</script>
<style scoped>
  /** Border active menus */
  .skin-black .sidebar-menu>li>a.router-link-active, .skin-black .sidebar-menu>li.menu-open>a {
    border-left-color: #fff;
  }

  /** Color active menus */
  .skin-black .sidebar-menu>li:hover>a, .skin-black .sidebar-menu>li>a.router-link-active, .skin-black .sidebar-menu>li.menu-open>a {
    color: #fff;
    background: #1e282c;
  }

  /** Color second level menus */
  .skin-black .sidebar-menu .treeview-menu>li>a.router-link-active, .skin-black .sidebar-menu .treeview-menu>li>a:hover {
    color: #fff;
  }
</style>