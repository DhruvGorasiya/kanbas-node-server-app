import mongoose from "mongoose";
const assignmentSchema = new mongoose.Schema(
    {
        title: String,
        course: { type: mongoose.Schema.Types.ObjectId, ref: "CourseModel" },
        modules: String,
        availableDate: String,
        untilDate: String,
        dueDate: String,
        points: Number,
        description: String,
    },
    { collection: "assignments" }
);
export default assignmentSchema;