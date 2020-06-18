import Vue from "vue";
import VueRouter from "vue-router";

// Components
import AdminSection from "./components/AdminSection.vue";
import EmptyRouterView from "./components/EmptyRouterView.vue";
// Public pages
import Home from "./pages/Home.vue";
import Login from "./pages/Login.vue";
// Admin pages
import ClientList from "./pages/admin-section/clients/ClientList.vue";

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
						}
					]
        }
      ]
    }
  ]
});
