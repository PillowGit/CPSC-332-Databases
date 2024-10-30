import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/list_classes.php": "http://localhost:8080",
      "/class_grades.php": "http://localhost:8080",
      "/find_sections.php": "http://localhost:8080",
      "/find_student.php": "http://localhost:8080",
    },
  },
});
