import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { createRoot } from "react-dom/client";
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import Blog from "./components/Blog";
import PitfallsOfRedis from "./components/blogs/PitfallsOfRedis";
import EventBridgeVsSQS from "./components/blogs/EventBridgeVsSQS";

const router = createBrowserRouter([
    {
        path: "/",
        element: App(),
    },
    {
        path: "blogs",
        element: Blog(),
    },
    {
        path:"blogs/pitfalls-of-redis",
        element: PitfallsOfRedis(),
    },
    {
        path:"blogs/event-bridge-sqs",
        element: EventBridgeVsSQS()
    }
]);

createRoot(document.getElementById("root")!).render(
    <RouterProvider router={router} />
);