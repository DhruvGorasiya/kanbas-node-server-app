import * as modulesDao from "./dao.js";
export default function ModuleRoutes(app) {
    app.put("/api/modules/:moduleId", async (req, res) => {
        // const { moduleId } = req.params;
        // const moduleUpdates = req.body;
        // modulesDao.updateModule(moduleId, moduleUpdates);
        // res.sendStatus(204);
        const { moduleId } = req.params;
        const moduleUpdates = req.body;
        const status = await modulesDao.updateModule(moduleId, moduleUpdates);
        res.send(status);

    });
    // app.delete("/api/modules/:moduleId", async (req, res) => {
    //     const { moduleId } = req.params;
    //     modulesDao.deleteModule(moduleId);
    //     res.sendStatus(204);
    // });
    app.delete("/api/modules/:moduleId", async (req, res) => {
        const { moduleId } = req.params;
        const status = await modulesDao.deleteModule(moduleId);
        res.send(status);
    });

}

