// import Database from "../Database/index.js";
import courseModel from "./model.js";
import enrollmentModel from "../Enrollments/model.js";
import mongoose from "mongoose";

export function findAllCourses() {
    return courseModel.find();
}

// export function findCoursesForEnrolledUser(userId) {
//     // const { courses, enrollments } = Database;
//     const courses = courseModel.find();
//     const enrollments = enrollmentModel.find();
//     // console.log(courses);
//     // console.log(typeof courses);
//     const enrolledCourses = courses.filter((course) =>
//         enrollments.some((enrollment) => enrollment.user === userId && enrollment.course === course._id));
//     return enrolledCourses;
// }

export function findCourseById(courseId) {
    return courseModel.findById(courseId);
}

export async function findCoursesForEnrolledUser(userId) {
    try {

        console.log("userid", userId);
        const enrollments = await enrollmentModel.find({ user: userId });
        // console.log("enrollments");
        // console.log(enrollments);
        const courseIds = enrollments.map(enrollment => enrollment.course);

        const enrolledCourses = await courseModel.find({ _id: { $in: courseIds } });
        // console.log("enrolledCourses", enrolledCourses);
        return enrolledCourses;
    } catch (error) {
        console.error('Error fetching enrolled courses:', error);
        throw new Error('Unable to fetch enrolled courses');
    }
}


export function createCourse(course) {
    // const newCourse = { ...course, _id: Date.now().toString() };
    // Database.courses = [...Database.courses, newCourse];
    // return newCourse;
    delete course._id;
    return courseModel.create(course);
}


// export function deleteCourse(courseId) {
//     const { courses, enrollments } = Database;
//     Database.courses = courses.filter((course) => course._id !== courseId);
//     Database.enrollments = enrollments.filter(
//         (enrollment) => enrollment.course !== courseId
//     );
// }

export function deleteCourse(courseId) {
    return courseModel.deleteOne({ _id: courseId });
}


// export function updateCourse(courseId, courseUpdates) {
// const { courses } = Database;
// const course = courses.find((course) => course._id === courseId);
// if (course) {
//     Object.assign(course, courseUpdates);
//     return course;
// }
// return null;
export function updateCourse(courseId, courseUpdates) {
    return courseModel.updateOne({ _id: courseId }, { $set: courseUpdates });
}