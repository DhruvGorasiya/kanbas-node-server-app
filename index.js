import express from 'express';
import Hello from './Hello.js';
import Lab5 from './Lab5/index.js';
import cors from 'cors';
import session from "express-session";
import "dotenv/config";
import UserRoutes from "./Kanbas/Users/routes.js";
import CourseRoutes from "./Kanbas/Courses/routes.js";
import ModuleRoutes from "./Kanbas/Modules/routes.js";
import AssignmentRoutes from "./Kanbas/Assignments/routes.js";

const app = express()

app.use(cors({
    credentials: true,
    origin: process.env.NETLIFY_URL || "http://localhost:3000",
}));


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

const sessionOptions = {
    secret: process.env.SESSION_SECRET || "kanbas",
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV !== "development",
        sameSite: "none",
        httpOnly: true,
    },
};

if (process.env.NODE_ENV !== "development") {
    sessionOptions.proxy = true;
}

if (process.env.NODE_ENV !== "development") {
    app.set("trust proxy", 1);
}


app.use(session(sessionOptions));

app.use((req, res, next) => {
    console.log("Session ID: ", req.sessionID);
    console.log("Session Data: ", req.session);
    next();
});

app.use(express.json());

UserRoutes(app);
CourseRoutes(app);
ModuleRoutes(app);
AssignmentRoutes(app);
Hello(app)
Lab5(app)

app.listen(process.env.PORT || 4000)