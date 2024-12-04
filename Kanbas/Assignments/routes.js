import Database from "../Database/index.js";
import assignmentModel from "./model.js";

export default function AssignmentRoutes(app){

    app.get("/api/courses/:courseId/assignments", async(req,res)=>{
        const {courseId}= req.params;
        const assignments= await assignmentModel.find({course:courseId});
        res.send(assignments);
    });

    app.post("/api/courses/:courseId/assignments", async (req,res)=>{
        const {courseId}=req.params;
        
        // const assignment={...req.body, 
        //     course:courseId,
        //     _id: new Date().getTime().toString()};
        // Database.assignments.push(assignment);

        // const assignment= new assignmentModel({ ...req.body, course:courseId});

        const assignment = await assignmentModel.create({ ...req.body, course:courseId});
        console.log(assignment);
        res.send(assignment);
    });

    app.put("/api/assignments/:assignId", async (req,res)=>{
        const {assignId}=req.params;
        const assignmentUpdates=req.body;
        console.log(assignmentUpdates);
        return await assignmentModel.updateOne({ _id: assignId }, { $set: assignmentUpdates });
        // const assignIndex = Database.assignments.findIndex((a)=>a._id===assignId);
        // const assignment=Database.assignments[assignIndex];

        
        // Database.assignments[assignIndex]={
        //     ...Database.assignments[assignIndex],
        //     ...assignmentUpdates
        // };
        // Object.assign(assignment, assignmentUpdates);
        // return assignment;
    });
    

    app.delete("/api/assignments/:assignId", async (req,res)=>{
        const {assignId}=req.params;
        // Database.assignments=Database.assignments.filter((a)=>a._id!==assignId);
        await assignmentModel.deleteOne({_id:assignId});
        // console.log(Database.assignments);
        res.sendStatus(204);
    });

    app.get("/api/courses/:courseId/assignments/:assignmentId", async (req,res)=>{
        const {courseId, assignmentId}=req.params;
        // const assignment=Database.assignments.find((a)=>a._id===assignmentId && a.course===courseId);
        const assignment= await assignmentModel.findOne({_id:assignmentId, course:courseId});
        res.send(assignment);
    });
}