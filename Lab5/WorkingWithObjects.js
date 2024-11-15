const assignment = {
    id: 1, title: "NodeJS Assignment",
    description: "Create a NodeJS server with ExpressJS",
    due: "2021-10-10", completed: false, score: 0,
};

const module = {
    id: "MOD101",
    name: "Web Development Fundamentals",
    description: "Introduction to web development using modern technologies",
    course: "CS430 Web Programming"
};

export default function WorkingWithObjects(app) {
    app.get("/lab5/assignment", (req, res) => {
        res.json(assignment);
    });
    app.get("/lab5/assignment/title", (req, res) => {
        res.json(assignment.title);
    });
    app.get("/lab5/assignment/title/:newTitle", (req, res) => {
        const { newTitle } = req.params;
        assignment.title = newTitle;
        res.json(assignment);
    });

    app.get('/lab5/module', (req, res) => {
        res.json(module);
    });
    
    app.get('/lab5/module/name', (req, res) => {
        res.json(module.name);
    });

    app.get('/lab5/module/name/:newName', (req, res) => {
        const { newName } = req.params;
        module.name = newName;
        res.json(module);
    });

    // Add new route to update score
    app.get("/lab5/assignment/score/:newScore", (req, res) => {
        const { newScore } = req.params;
        assignment.score = parseInt(newScore);
        res.json(assignment);
    });

    // Add new route to toggle completed status
    app.get("/lab5/assignment/completed/:completed", (req, res) => {
        const { completed } = req.params;
        assignment.completed = completed === "true";
        res.json(assignment);
    });

    // Add route to get module description
    app.get('/lab5/module/description', (req, res) => {
        res.json(module.description);
    });

    // Add route to update module description
    app.get('/lab5/module/description/:newDescription', (req, res) => {
        const { newDescription } = req.params;
        module.description = newDescription;
        res.json(module);
    });
};

