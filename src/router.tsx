import { createBrowserRouter } from "react-router-dom";
import RootLayout from "@/layouts/RootLayout";
import {
  HomePage,
  ProjectsPage,
  GamesPage,
  WebPage,
  SoftwarePage,
  AboutPage,
  ContactPage,
  ResumePage,
  NotFoundPage,
} from "@/pages";
import ProjectDetailPage from "@/pages/ProjectDetailPage";

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "projects", element: <ProjectsPage /> },
      { path: "projects/games", element: <GamesPage /> },
      { path: "projects/web", element: <WebPage /> },
      { path: "projects/software", element: <SoftwarePage /> },
      { path: "projects/:slug", element: <ProjectDetailPage /> },
      { path: "about", element: <AboutPage /> },
      { path: "contact", element: <ContactPage /> },
      { path: "resume", element: <ResumePage /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);