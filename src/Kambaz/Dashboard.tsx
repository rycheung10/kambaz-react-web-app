import { Link } from "react-router-dom";
import { Row, Col, Card, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { unEnroll, enroll } from "./reducer";

export default function Dashboard(
    { courses, course, setCourse, addNewCourse,
        deleteCourse, updateCourse }: {
            courses: any[]; course: any; setCourse: (course: any) => void;
            addNewCourse: () => void; deleteCourse: (course: any) => void;
            updateCourse: () => void;
        }) {

    const dispatch = useDispatch();
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const { enrollments } = useSelector((state: any) => state.enrollmentsReducer);
    const [allCourses, setAllCourses] = useState(false);

    const checkEnrollmentStatus = (courseId: string) =>
        enrollments.some((enrollment: any) =>
            enrollment.user === currentUser._id && enrollment.course === courseId
        );

    const toggleEnrollment = (course: any) => {
        checkEnrollmentStatus(course._id)
            ? dispatch(unEnroll({
                enrollmentId: enrollments.find(
                    (e: any) => e.user === currentUser._id && e.course === course._id
                )?._id
            }))
            : dispatch(enroll({ _id: uuidv4(), user: currentUser._id, course: course._id }));
    };

    const courseList = allCourses ? courses : courses.filter((course) => checkEnrollmentStatus(course._id));

    return (
        <div id="wd-dashboard">
            <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
            {currentUser.role === "FACULTY" && (
                <div>
                    <h5>
                        New Course
                        <button className="btn btn-primary float-end" id="wd-add-new-course-click" onClick={addNewCourse}>
                            Add
                        </button>
                        <button className="btn btn-warning float-end me-2" onClick={updateCourse} id="wd-update-course-click">
                            Update
                        </button>
                        <br /><br />
                        <input value={course.name} className="form-control mb-2" onChange={(e) => setCourse({ ...course, name: e.target.value })} />
                        <textarea value={course.description} className="form-control" onChange={(e) => setCourse({ ...course, description: e.target.value })} />
                    </h5>
                    <hr />
                </div>
            )}
            {currentUser.role === "STUDENT" && (
                <div className="d-flex justify-content-end">
                    <Button onClick={() => setAllCourses(!allCourses)}>
                        Enrollments
                    </Button>
                </div>
            )}
            <h2 id="wd-dashboard-published">Published Courses ({courseList.length})</h2>
            <hr />
            <div id="wd-dashboard-courses">
                <Row xs={1} md={5} className="g-4">
                    {courseList.map((course) => (
                        <Col className="wd-dashboard-course" style={{ width: "300px" }}>
                            <Card>
                                <Link to={`/Kambaz/Courses/${course._id}/Home`}
                                    className="wd-dashboard-course-link text-decoration-none text-dark" >
                                    <Card.Img src={course.imagePath} variant="top" width="100%" height={160} />
                                    <Card.Body className="card-body">
                                        <Card.Title className="wd-dashboard-course-title text-nowrap overflow-hidden"> {course.name} </Card.Title>
                                        <Card.Text className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}> {course.description} </Card.Text>
                                        <Button variant="primary"> Go </Button>
                                        {currentUser.role === "FACULTY" && (
                                            <>
                                                <Button onClick={(event) => { event.preventDefault(); deleteCourse(course._id); }}
                                                    className="btn btn-danger float-end"
                                                    id="wd-delete-course-click">
                                                    Delete
                                                </Button>
                                                <Button id="wd-edit-course-click" onClick={(event) => { event.preventDefault(); setCourse(course); }}
                                                    className="btn btn-warning me-2 float-end">
                                                    Edit
                                                </Button>
                                            </>
                                        )}
                                        {currentUser.role === "STUDENT" && (
                                            <Button className={`btn-${checkEnrollmentStatus(course._id) ? "danger" : "success"} btn float-end`}
                                                onClick={(e) => { e.preventDefault(); toggleEnrollment(course); }}>
                                                {checkEnrollmentStatus(course._id) ? "Unenroll" : "Enroll"}
                                            </Button>
                                        )}
                                    </Card.Body>
                                </Link>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </div>
        </div>
    );
}
