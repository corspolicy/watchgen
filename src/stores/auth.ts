import { defineStore } from "pinia";
import axios from "axios";
import { User } from "@prisma/client";

export const useAuthStore = defineStore("user", {
  state: () => ({
    user: null as User | null,
    token: "",
  }),

  actions: {
    async save() {
      localStorage.setItem("user", JSON.stringify(this.$state));
    },

    async load() {
      const user = localStorage.getItem("user");
      if (user) {
        this.$patch(JSON.parse(user));
      }
    },
  },
});

// export const useAuthStore = defineStore("auth", {
//   state: () => ({
//     user: null as User | null,
//     token: localStorage.getItem("token") || null,
//     loading: false,
//     error: null as string | null,
//     initialized: false,
//   }),

//   getters: {
//     isAuthenticated: (state) => !!state.token && !!state.user,
//     isAdmin: (state) => state.user?.role === "admin",
//   },

//   actions: {
//     setToken(token: string) {
//       this.token = token;
//       localStorage.setItem("token", token);
//       axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
//     },

//     setUser(user: User) {
//       this.user = user;
//     },

//     async getCurrentUser() {
//       try {
//         const response = await axios.get("/api/auth/me");
//         this.setUser(response.data);
//         return response.data;
//       } catch (error) {
//         this.logout();
//         throw error;
//       }
//     },

//     async login(email: string, password: string) {
//       try {
//         this.loading = true;
//         const response = await axios.post("/api/auth/login", {
//           email,
//           password,
//         });

//         const { token, user } = response.data;
//         this.setToken(token);
//         this.setUser(user);

//         return true;
//       } catch (error: any) {
//         this.error =
//           error.response?.data?.message || "Giriş yapılırken bir hata oluştu";
//         throw new Error(this.error);
//       } finally {
//         this.loading = false;
//       }
//     },

//     logout() {
//       this.user = null;
//       this.token = null;
//       localStorage.removeItem("token");
//       delete axios.defaults.headers.common["Authorization"];
//     },

//     async initializeAuth() {
//       try {
//         const token = localStorage.getItem("token");
//         if (token) {
//           this.token = token;
//           axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
//           await this.getCurrentUser();
//         }
//       } catch (error) {
//         console.error("Token geçersiz:", error);
//         this.logout();
//       } finally {
//         this.initialized = true;
//       }
//     },
//   },
// });
