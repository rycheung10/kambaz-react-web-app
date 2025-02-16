import { ListGroup } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import AssignmentsControls from "./AssignmentsControls";
import AssignmentControlButtons from "./AssignmentControlButtons";
import HomeworkControlButtons from "./HomeworkControlButtons";
import { MdOutlineAssignment } from "react-icons/md";
import { useParams } from "react-router";
import { assignments } from "../../Database";

export default function Assignments() {
  const { cid } = useParams();
  return (
    <div>
      <AssignmentsControls /><br />

      <ListGroup className="rounded-0" id="wd-assignments">
        <ListGroup.Item className="wd-module p-0 mb-5 fs-5 border-gray">
          <div className="wd-assignments-title p-3 ps-2 bg-secondary d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center">
              <BsGripVertical className="me-2 fs-3" /> Assignments
            </div>
            <AssignmentControlButtons />
          </div>
          {assignments
            .filter((assignment) => assignment.course === cid)
            .map((assignment) => (
              <ListGroup key={assignment._id} className="wd-assignment-list rounded-0">
                <ListGroup.Item className="wd-assignment-list-item p-3 d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center">
                    <BsGripVertical className="me-3 fs-3" />
                    <MdOutlineAssignment className="me-4 fs-3" />
                  </div>
                  <div className="flex-grow-1">
                    <a href={`#/Kambaz/Courses/${cid}/Assignments/${assignment._id}`} className="wd-assignment-link d-block">
                      {assignment.title}
                    </a>
                    <div className="fs-6">
                      <span className="text-danger">Multiple Modules</span> |{" "}
                      <strong>Not available until</strong> {new Date(assignment.availableFrom).toDateString()} |<br />
                      <strong>Due</strong> {new Date(assignment.due).toDateString()} | {assignment.points} pts
                    </div>
                  </div>
                  <div className="d-flex align-items-center">
                    <HomeworkControlButtons />
                  </div>
                </ListGroup.Item>
              </ListGroup>
            ))}
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
}
