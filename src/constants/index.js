import {
  Contact,
  Database,
  FileCode,
  FileType,
  Github,
  Globe,
  HomeIcon,
  Instagram,
  ListTodo,
} from "lucide-react";

const features = [
  {
    name: "Home",
    path: "/",
    icon: HomeIcon,
    colors: {
      textColor: "var(--color-primary)",
      borderColor: "var(--color-base-primary)",
    },
  },
  {
    name: "Text editor",
    path: "/text-editor",
    icon: FileType,
    colors: {
      textColor: "var(--color-error)",
      borderColor: "var(--color-error-content)",
    },
  },
  {
    name: "Base64 Tool",
    path: "/base64-tool",
    icon: FileCode,
    colors: {
      textColor: "var(--color-success)",
      borderColor: "var(--color-success-content)",
    },
  },
  {
    name: "Todo App",
    path: "/todo-app",
    icon: ListTodo,
    colors: {
      textColor: "var(--color-accent)",
      borderColor: "var(--color-accent-content)",
    },
  },
  {
    name: "Data Viewer",
    path: "/data-viewer",
    icon: Database,
    colors: {
      textColor: "var(--color-info)",
      borderColor: "var(--color-info-content)",
    },
  },
  {
    name: "Contact",
    path: "/contact",
    icon: Contact,
    colors: {
      textColor: "var(--color-warning)",
      borderColor: "var(--color-warning-content)",
    },
  },
];

const socials = [
  {
    name: "github",
    icon: Github,
    link: "https://github.com/AnuXiii",
  },
  {
    name: "instagram",
    icon: Instagram,
    link: "https://instagram.com/mahdi.anuxi",
  },
  {
    name: "website",
    icon: Globe,
    link: "https://mahdirostami.ir",
  },
];

export { features, socials };
