import { createBrowserRouter } from "react-router";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import CoursesPage from "./pages/CoursesPage";
import CourseDetailsPage from "./pages/CourseDetailsPage";
import CareerQuizPage from "./pages/CareerQuizPage";
import NotFoundPage from "./pages/NotFoundPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: HomePage },
      { path: "courses", Component: CoursesPage },
      { path: "courses/:courseId", Component: CourseDetailsPage },
      { path: "quiz", Component: CareerQuizPage },
      { path: "*", Component: NotFoundPage },
    ],
  },
]);
