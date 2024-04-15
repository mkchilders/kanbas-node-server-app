import * as dao from "./dao.js";
function ModuleRoutes(app) {
  const createModule = async (req, res) => {
    const module = await dao.createModule(req.body);
    res.json(module);
  };
  const deleteModule = async (req, res) => {
    const status = await dao.deleteModule(req.params.mid);
    res.json(status);
  };
  const findAllModules = async (req, res) => {
    const modules = await dao.findAllModules();
    res.json(modules);
  };
  const findModuleById = async (req, res) => {
    const module = await dao.findModuleById(req.params.mid);
    res.json(module);
  };
  const findModulesForCourse = async (req, res) => {
    const modules = await dao.findModulesForCourse(req.params.cid);
    res.json(modules);
  }
  const updateModule = async (req, res) => {
    const { mid } = req.params;
    const status = await dao.updateModule(mid, req.body);
    const currentModule = await dao.findModuleById(mid);
    req.session["currentModule"] = currentModule;
    res.json(status);
  };

  app.put("/api/modules/:mid", updateModule);
  app.delete("/api/modules/:mid", deleteModule);
  app.post("/api/courses/:cid/modules", createModule);
  app.get("/api/courses/modules", findAllModules);
  app.get("/api/courses/:cid/modules", findModulesForCourse);
  app.get("/api/modules/:mid", findModuleById);
}
export default ModuleRoutes;
