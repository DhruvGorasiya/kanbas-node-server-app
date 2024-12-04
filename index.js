// import "dotenv/config";
// import express from 'express';
// import Hello from './Hello.js';
// import Lab5 from './Lab5/index.js';
// import cors from 'cors';
// import session from "express-session";
// import "dotenv/config";
// import UserRoutes from "./Kanbas/Users/routes.js";
// import CourseRoutes from "./Kanbas/Courses/routes.js";
// import ModuleRoutes from "./Kanbas/Modules/routes.js";
// import AssignmentRoutes from "./Kanbas/Assignments/routes.js";
// import mongoose from "mongoose";

// const CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING || "mongodb://127.0.0.1:27017/kanbas"
// mongoose.connect(CONNECTION_STRING);

// const app = express()


// app.use(cors({
//     credentials: true,
//     origin: process.env.NETLIFY_URL || "http://localhost:3000",
// }));


// const sessionOptions = {
//     secret: process.env.SESSION_SECRET || "kanbas",
//     resave: false,
//     saveUninitialized: false,
// };

// console.log("NODE_ENV: ", process.env.NODE_ENV);

// if (process.env.NODE_ENV !== "development") {
//     console.log("NODE_SERVER_DOMAIN: ", process.env.NODE_SERVER_DOMAIN);
//     sessionOptions.proxy = true;
//     sessionOptions.cookie = {
//         sameSite: "none",
//         secure: true,
//         httpOnly: true,
//         // domain: process.env.NODE_SERVER_DOMAIN,
//     };
// }

// app.use(session(sessionOptions));

// app.use(express.json());

// UserRoutes(app);
// CourseRoutes(app);
// ModuleRoutes(app);
// AssignmentRoutes(app);
// Hello(app)
// Lab5(app)

// app.listen(process.env.PORT || 4000)

import "dotenv/config";
import express from 'express';
import Hello from './Hello.js';
import Lab5 from './Lab5/index.js';
import cors from 'cors';
import session from "express-session";
import UserRoutes from "./Kanbas/Users/routes.js";
import CourseRoutes from "./Kanbas/Courses/routes.js";
import ModuleRoutes from "./Kanbas/Modules/routes.js";
import AssignmentRoutes from "./Kanbas/Assignments/routes.js";
import mongoose from "mongoose";

const CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING || "mongodb://127.0.0.1:27017/kanbas";
mongoose.connect(CONNECTION_STRING);

const app = express();

app.use(cors({
    credentials: true,
    origin: [
        process.env.NETLIFY_URL || "http://localhost:3000", // Update for frontend domain
    ],
}));

const sessionOptions = {
    secret: process.env.SESSION_SECRET || "kanbas",
    resave: false,
    saveUninitialized: false,
};

if (process.env.NODE_ENV !== "development") {
    sessionOptions.proxy = true;
    sessionOptions.cookie = {
        sameSite: "none",
        secure: true,
        httpOnly: true,
    };
}

app.use(session(sessionOptions));
app.use(express.json());

UserRoutes(app);
CourseRoutes(app);
ModuleRoutes(app);
AssignmentRoutes(app);
Hello(app);
Lab5(app);

app.listen(process.env.PORT || 4000, () => {
    console.log("Server running on port", process.env.PORT || 4000);
});
