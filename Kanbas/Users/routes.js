// import * as dao from "./dao.js";
// import * as courseDao from "../Courses/dao.js";
// import session from "express-session";
// import * as enrollmentsDao from "../Enrollments/dao.js";

// export default function UserRoutes(app) {
//     const createUser = (req, res) => { };
//     const deleteUser = (req, res) => { };
//     const findAllUsers = (req, res) => { };
//     const findUserById = (req, res) => { };
//     const updateUser = (req, res) => {
//         const userId = req.params.userId;
//         const userUpdates = req.body;
//         dao.updateUser(userId, userUpdates);
//         const currentUser = dao.findUserById(userId);
//         req.session["currentUser"] = currentUser;
//         res.json(currentUser);
//     };

//     const signup = (req, res) => {
//         const user = dao.findUserByUsername(req.body.username);
//         if (user) {
//             res.status(400).json(
//                 { message: "Username already in use" });
//             return;
//         }
//         const currentUser = dao.createUser(req.body);
//         req.session.save(() => {
//             req.session["currentUser"] = currentUser;
//             console.log(req.session.currentUser);
//             res.json(currentUser);
//         })
//     };
//     app.post("/api/users/signup", signup);

//     const signin = (req, res) => {
//         const { username, password } = req.body;
//         const currentUser = dao.findUserByCredentials(username, password);
//         req.session["currentUser"] = currentUser;
//         res.json(currentUser);
    
//         // const { username, password } = req.body;
//         // const currentUser = dao.findUserByCredentials(username, password);

//         // console.log("currentUser", currentUser);
//         // if (currentUser) {
//         //     req.session.save(() => {
//         //         req.session["currentUser"] = currentUser;
//         //         res.json(currentUser);
//         //     })
//         // } else {
//         //     res.status(401).json({ message: "Unable to login. Try again later." });
//         // }

//     };

//     const findCoursesForEnrolledUser = (req, res) => {
//         let { userId } = req.params;
//         if (userId === "current") {
//             console.log("current courses for the user: ",req.session["currentUser"]);
//             const currentUser = req.session["currentUser"];
//             console.log("new current user", currentUser)
//             if (!currentUser) {
//                 res.sendStatus(401);
//                 return;
//             }
//             userId = currentUser._id;
//         }
//         const courses = courseDao.findCoursesForEnrolledUser(userId);
//         res.json(courses);
//     };
//     app.get("/api/users/:userId/courses", findCoursesForEnrolledUser);

    
//     const signout = (req, res) => {
//         req.session.destroy();
//         res.sendStatus(200);
//     };

//     const profile = async (req, res) => {
//         const currentUser = req.session["currentUser"];
//         if (!currentUser) {
//             res.sendStatus(401);
//             return;
//         }
//         res.json(currentUser);
//     };



//     const createCourse = (req, res) => {
//         const currentUser = req.session["currentUser"];
//         const newCourse = courseDao.createCourse(req.body);
//         enrollmentsDao.enrollUserInCourse(currentUser._id, newCourse._id);
//         res.json(newCourse);
//     };
//     app.post("/api/users/current/courses", createCourse);


//     const enrollUserInCourse = (req, res) => {
//         const { userId, courseId } = req.body;
//         enrollmentsDao.enrollUserInCourse(userId, courseId);
//         res.sendStatus(200);
//     };
//     app.post("/api/users/enroll", enrollUserInCourse);

//     const unenrollUserFromCourse = (req, res) => {
//         const { userId, courseId } = req.body;
//         enrollmentsDao.unenrollUserFromCourse(userId, courseId);
//         res.sendStatus(200);
//     };
//     app.post("/api/users/unenroll", unenrollUserFromCourse);

//     const allCourses = (req, res) => {
//         const courses = courseDao.findAllCourses();
//         res.json(courses);
//     };
//     app.get("/api/users/courses", allCourses);

//     const deleteCourse = (req, res) => {
//         const { courseId } = req.body;
//         courseDao.deleteCourse(courseId);
//         res.sendStatus(200);
//     };
//     app.delete("/api/users/courses", deleteCourse);

//     const updateCourse = (req, res) => {
//         const { courseId } = req.body;
//         courseDao.updateCourse(courseId, req.body);
//         res.sendStatus(200);
//     };
//     app.put("/api/users/courses", updateCourse);    

//     const addCourse = (req, res) => {
//         const newCourse = courseDao.createCourse(req.body);
//         res.json(newCourse);
//     };
//     app.post("/api/users/courses", addCourse);


//     app.post("/api/users", createUser);
//     app.get("/api/users", findAllUsers);
//     app.get("/api/users/:userId", findUserById);
//     app.put("/api/users/:userId", updateUser);
//     app.delete("/api/users/:userId", deleteUser);
//     app.post("/api/users/signin", signin);
//     app.post("/api/users/signout", signout);
//     app.post("/api/users/profile", profile);
// }


import * as dao from "./dao.js";
import * as courseDao from "../Courses/dao.js";
import * as enrollmentsDao from "../Enrollments/dao.js";
export default function UserRoutes(app) {
    const createUser = (req, res) => { };
    const deleteUser = (req, res) => {
        const { userId } = req.params;
        dao.deleteUser(userId);
        res.sendStatus(204);
    };
    const findAllUsers = (req, res) => {
        const users = dao.findAllUsers();
        res.json(users);
    };
    const findUserById = (req, res) => { };
    const updateUser = (req, res) => {
        const userId = req.params.userId;
        const userUpdates = req.body;
        dao.updateUser(userId, userUpdates);
        const currentUser = dao.findUserById(userId);
        req.session["currentUser"] = currentUser;
        res.json(currentUser);
    };

    const signup = (req, res) => {
        const user = dao.findUserByUsername(req.body.username);
        if (user) {
            res.status(400).json(
                { message: "Username already in use" });
            return;
        }
        const currentUser = dao.createUser(req.body);
        req.session["currentUser"] = currentUser;
        res.json(currentUser);

    };
    const signin = (req, res) => {
        const { username, password } = req.body;
        const currentUser = dao.findUserByCredentials(username, password);
        if (currentUser) {
            req.session["currentUser"] = currentUser;
            res.json(currentUser);
        } else {
            res.status(401).json({ message: "Unable to login. Try again later." });
        }

    };
    const signout = (req, res) => {
        req.session.destroy();
        res.sendStatus(200);
    };

    const profile = (req, res) => {
        const currentUser = req.session["currentUser"];
        if (!currentUser) {
            res.sendStatus(401);
            return;
        }
        res.json(currentUser);
    };

    const findCoursesForEnrolledUser = (req, res) => {
        let { userId } = req.params;
        if (userId === "current") {
            const currentUser = req.session["currentUser"];
            if (!currentUser) {
                res.sendStatus(401);
                return;
            }
            userId = currentUser._id;
        }
        const courses = courseDao.findCoursesForEnrolledUser(userId);
        res.json(courses);
    };

    const createCourse = (req, res) => {
        const currentUser = req.session["currentUser"];
        if (!currentUser) {
            res.sendStatus(401);
            return;
        }
        const newCourse = courseDao.createCourse(req.body);
        enrollmentsDao.enrollUserInCourse(currentUser._id, newCourse._id);
        res.json(newCourse);
    };
    app.post("/api/users/current/courses", createCourse);


    app.post("/api/users", createUser);
    app.get("/api/users", findAllUsers);
    app.get("/api/users/:userId", findUserById);
    app.put("/api/users/:userId", updateUser);
    app.delete("/api/users/:userId", deleteUser);
    app.post("/api/users/signup", signup);
    app.post("/api/users/signin", signin);
    app.post("/api/users/signout", signout);
    app.post("/api/users/profile", profile);

    app.get("/api/users/:userId/courses", findCoursesForEnrolledUser);

    const findEnrollmentsForUser = (req, res) => {
        let { userId } = req.params;
        if (userId === "current") {
            const currentUser = req.session["currentUser"];
            if (!currentUser) {
                res.sendStatus(401);
                return;
            }
            userId = currentUser._id;
        }
        const enrollments = enrollmentsDao.findEnrollmentsByUser(userId);
        res.json(enrollments);
    };

    app.get("/api/users/:userId/enrollments", findEnrollmentsForUser);

    const deleteEnrollment = (req, res) => {
        let { userId, courseId } = req.params;
        if (userId === "current") {
            const currentUser = req.session["currentUser"];
            if (!currentUser) {
                res.sendStatus(401);
                return;
            }
            userId = currentUser._id;
        }
        enrollmentsDao.unEnrollUserFromCourse(userId, courseId);
    };
    app.delete("/api/users/:userId/:courseId/enrollments", deleteEnrollment);

    const addEnrollment = (req, res) => {
        let { userId, courseId } = req.params;
        if (userId === "current") {
            const currentUser = req.session["currentUser"];
            if (!currentUser) {
                res.sendStatus(401);
                return;
            }
            userId = currentUser._id;
        }
        const enrollments = enrollmentsDao.enrollUserInCourse(userId, courseId);
        res.json(enrollments);
    };

    app.post("/api/users/:userId/:courseId/enrollments", addEnrollment);
}