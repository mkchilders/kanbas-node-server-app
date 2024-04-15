import * as dao from "./dao.js";
export default function CourseRoutes(app) {
  const createCourse = async (req, res) => {
    const course = await dao.createCourse(req.body);
    res.json(course);
  };
  const deleteCourse = async (req, res) => {
    const status = await dao.deleteCourse(req.params.courseId);
    res.json(status);
  };
  const findAllCourses = async (req, res) => {
    const courses = await dao.findAllCourses();
    res.json(courses);
  };
  const findCourseByCid = async (req, res) => {
    const course = await dao.findCourseByCid(req.params.courseId);
    res.json(course);
  };
  const findCourseById = async (req, res) => {
    const course = await dao.findCourseById(req.params.courseId);
    res.json(course);
  };
  const updateCourse = async (req, res) => {
    const { courseId } = req.params;
    const status = await dao.updateCourse(courseId, req.body);
    const currentCourse = await dao.findCourseById(courseId);
    req.session["currentCourse"] = currentCourse;
    res.json(status);
  };

  app.get("/api/courses/:courseId", findCourseByCid);
  app.get("/api/courses/:courseId/course", findCourseById);
  app.put("/api/courses/:courseId", updateCourse);
  app.delete("/api/courses/:courseId", deleteCourse);
  app.post("/api/courses", createCourse);
  app.get("/api/courses", findAllCourses);
}
