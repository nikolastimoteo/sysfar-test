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
			component: Login
    },
    {
			path: "/admin",
      redirect: "/admin/clientes",
      component: AdminSection,
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

// redirect to login page if unauthenticated user
// is trying to access a restricted page
router.beforeEach((to, from, next) => {
  const publicPages = ["/", "/login"];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem("user-token");

  if (authRequired && !loggedIn) {
    next({ name: "login" });
  } else {
    next();
  }
});