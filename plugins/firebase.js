import firebase from "firebase";
import { MAIN_CONFIG } from "~/common/env-config";

const config = process.env.isDev
  ? { ...MAIN_CONFIG.dev.firebase }
  : { ...MAIN_CONFIG.prod.firebase };

firebase.initializeApp(config);
