import Vue from "vue";
import VueRouter from "vue-router";

// Components
import AdminSection from "./components/AdminSection.vue";
import EmptyRouterView from "./components/EmptyRouterView.vue";
// Public pages
import Home from "./pages/Home.vue";
import Login from "./pages/Login.vue";
import Error404 from "./pages/Error404.vue";
// Admin pages
import ClientList from "./pages/admin-section/clients/ClientList.vue";
import ClientCreate from "./pages/admin-section/clients/ClientCreate.vue";
import ClientShow from "./pages/admin-section/clients/ClientShow.vue";
import ClientEdit from "./pages/admin-section/clients/ClientEdit.vue";

Vue.use(VueRouter);

// next() if user is authenticated
const ifAuthenticated = (to, from, next) => {
	const token = localStorage.getItem("user-token");
	if (token) {
		next();
	} else {
	  next({name: "login"});
	}
}

// next() if user isn't authenticated
const ifNotAuthenticated = (to, from, next) => {
	const token = localStorage.getItem('user-token');
    if (!token) {
      next();
    } else {
      next({name: "admin"});
    }
}

export const router = new VueRouter({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
			path: "/login",
			name: "login",
      component: Login,
      beforeEnter: ifNotAuthenticated,
    },
    {
      path: "/admin",
      name: "admin",
      redirect: "/admin/clientes",
      component: AdminSection,
      beforeEnter: ifAuthenticated,
			children: [
				{
          path: "clientes",
          component: EmptyRouterView,
					children: [
						{
							path: "",
							name: "client-list",
							component: ClientList
            },
            {
							path: 'cadastrar',
							name: 'client-create',
							component: ClientCreate
            },
            {
							path: ':id',
							name: 'client-show',
							component: ClientShow
            },
            {
							path: ':id/editar',
							name: 'client-edit',
							component: ClientEdit
						}
					]
        }
      ]
    },
    {
			path: '/404',
			name: 'error-404',
			component: Error404
		},
		{
			path: '/*',
			redirect: '404'
		}
  ]
});
