import axios from "axios";
import { useAuthStore } from "../stores/auth";
import { useSettingsStore } from "@/stores/settings";

const settings = useSettingsStore();
const user = useAuthStore();

const createProtectedApiInterface = () => {
  return axios.create({
    baseURL: settings.$state.settings.apiUrl,
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  });
};

export default createProtectedApiInterface;
