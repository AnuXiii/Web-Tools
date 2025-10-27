import {
  Contact,
  Database,
  FileCode,
  FileType,
  Github,
  Globe,
  HomeIcon,
  Instagram,
  UploadCloud,
} from "lucide-react";
import { lazy } from "react";

const routes = [
  {
    name: "Home",
    path: "/",
    component: lazy(() => import("../components/Hero")),
  },
  {
    name: "Text editor",
    path: "/text-editor",
    component: lazy(() => import("../pages/TextEditor")),
  },
  {
    name: "File encoder",
    path: "/file-encoder",
    // content : FileEncoder,
  },
  {
    name: "File uploader",
    path: "/file-uploader",
    // content : FileUploader,
  },
  {
    name: "Data viewer",
    path: "/data-viewer",
    // content : DataViewer
  },
  {
    name: "Contact",
    path: "/contact",
    // content : Contact
  },
];

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
    name: "File encoder",
    path: "/file-encoder",
    icon: FileCode,
    colors: {
      textColor: "var(--color-success)",
      borderColor: "var(--color-success-content)",
    },
  },
  {
    name: "File uploader",
    path: "/file-uploader",
    icon: UploadCloud,
    colors: {
      textColor: "var(--color-accent)",
      borderColor: "var(--color-accent-content)",
    },
  },
  {
    name: "Data viewer",
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

export { routes, features, socials };
