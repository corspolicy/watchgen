import { useSettingsStore } from "@/stores/settings";
import axios from "axios";

const configuration = useSettingsStore();

const defaultApiInterface = axios.create({
  baseURL: configuration.$state.settings.apiUrl,
});

export default defaultApiInterface;
