import { FormGroup, FormLabel, FormControl, FormSelect, FormCheck, Button } from "react-bootstrap";
import FormCheckInput from "react-bootstrap/esm/FormCheckInput";
import FormCheckLabel from "react-bootstrap/esm/FormCheckLabel";
import { useParams, Link } from "react-router-dom";
import { assignments } from "../../Database";

export default function AssignmentEditor() {
    const { aid, cid } = useParams();
    const assignment = assignments.find((assignment) => assignment._id === aid);

    return (
        <div id="wd-assignments-editor">
            <FormGroup className="mb-3" id="wd-name">
                <FormLabel>Assignment Name</FormLabel>
                <FormControl id="wd-name" defaultValue={assignment && assignment.title} />
            </FormGroup>
            <FormGroup className="mb-3" id="wd-description">
                <FormControl id="wd-description" as="textarea" rows={3} defaultValue={assignment && assignment.description} />
            </FormGroup>
            <FormGroup className="row mb-3 align-items-center" id="wd-points">
                <FormLabel className="col-sm-4" align="right">Points</FormLabel>
                <div className="col-sm-4">
                    <FormControl id="wd-points" type="number" defaultValue={assignment && assignment.points} />
                </div>
            </FormGroup>
            <FormGroup className="row mb-3 align-items-center" id="wd-group">
                <FormLabel className="col-sm-4" align="right">Assignment Group</FormLabel>
                <div className="col-sm-4">
                    <FormSelect>
                        <option value="ASSIGNMENTS">ASSIGNMENTS</option>
                        <option value="OTHER">OTHER</option>
                    </FormSelect>
                </div>
            </FormGroup>
            <FormGroup className="row mb-3 align-items-center" id="wd-display-grade-as">
                <FormLabel className="col-sm-4" align="right">Display Grade As</FormLabel>
                <div className="col-sm-4">
                    <FormSelect>
                        <option value="PERCENTAGE">Percentage</option>
                        <option value="POINTS">Points</option>
                    </FormSelect>
                </div>
            </FormGroup>
            <FormGroup className="row mb-3 align-items-center" id="wd-submission-type">
                <FormLabel className="col-sm-4" align="right">Submission type</FormLabel>
                <div className="col-sm-4">
                    <div className="border-1 border rounded-2 p-2">
                        <div className="mb-3">
                            <FormSelect>
                                <option value="ONLINE">Online</option>
                                <option value="INPERSON">In Person</option>
                            </FormSelect>
                            <FormGroup className="mb-3 pt-2">
                                <FormLabel className="fw-bold">Online Entry Options</FormLabel>
                                {["Text Entry", "Website URL", "Media Recordings", "Student Annotation", "File Uploads"].map((option, index) => (
                                    <FormCheck key={index} className="mb-3">
                                        <FormCheckLabel>{option}</FormCheckLabel>
                                        <FormCheckInput />
                                    </FormCheck>
                                ))}
                            </FormGroup>
                        </div>
                    </div>
                </div>
            </FormGroup>
            <FormGroup className="row mb-3 align-items-center">
                <FormLabel className="col-sm-4" align="right">Assign</FormLabel>
                <div className="col-sm-4">
                    <div className="border-1 border rounded-2 p-2">
                        <div className="mb-3">
                            <FormGroup className="mb-3 fw-bold" id="wd-assign-to">
                                <FormLabel>Assign to</FormLabel>
                                <FormControl id="wd-assign-to" defaultValue="Everyone" />
                            </FormGroup>
                            <FormGroup className="mb-3 fw-bold" id="wd-due-date">
                                <FormLabel>Due</FormLabel>
                                <FormControl id="wd-due-date" type="date" defaultValue={assignment && assignment.due} />
                            </FormGroup>
                            <div className="row">
                                <div className="col-sm-6 fw-bold">
                                    <FormGroup id="wd-available-from">
                                        <FormLabel>Available from</FormLabel>
                                        <FormControl id="wd-available-from" type="date" defaultValue={assignment && assignment.availableFrom} />
                                    </FormGroup>
                                </div>
                                <div className="col-sm-6 fw-bold">
                                    <FormGroup id="wd-available-until">
                                        <FormLabel>Until</FormLabel>
                                        <FormControl id="wd-available-until" type="date" defaultValue={assignment && assignment.availableUntil} />
                                    </FormGroup>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </FormGroup>
            <div className="text-end">
                <Link to={`/Kambaz/Courses/${cid}/Assignments`}>
                    <Button variant="secondary" className="me-1">Cancel</Button>
                </Link>
                <Link to={`/Kambaz/Courses/${cid}/Assignments`}>
                    <Button variant="danger" className="me-1">Save</Button>
                </Link>
            </div>
        </div>
    );
}
