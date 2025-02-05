import { FormGroup, FormLabel, FormControl, FormSelect, FormCheck, Button } from "react-bootstrap";
import FormCheckInput from "react-bootstrap/esm/FormCheckInput";
import FormCheckLabel from "react-bootstrap/esm/FormCheckLabel";

export default function AssignmentEditor() {
    return (
        <div id="wd-assignments-editor">
            <FormGroup className="mb-3" id="wd-name">
                <FormLabel>Assignment Name</FormLabel>
                <FormControl id="wd-name" defaultValue="A1" />
            </FormGroup>
            <FormGroup className="mb-3" id="wd-description">
                <FormControl id="wd-description" as="textarea" rows={3} defaultValue="The assignment is available online Submit a link to the landing page of your Web application running on Netlify. The landing page should include the following: Your full name and section Links to each of the lab assignments Link to the Kanbas application Links to all relevant source code repositories The Kanbas application should include a link to navigate back to the landing page" />
            </FormGroup>
            <FormGroup className="row mb-3 align-items-center" id="wd-points">
                <FormLabel className="col-sm-4" align="right"> Points</FormLabel>
                <div className="col-sm-4">
                    <FormControl id="wd-points" type="number" defaultValue={100} />
                </div>
            </FormGroup>
            <FormGroup className="row mb-3 align-items-center" id="wd-group">
                <FormLabel className="col-sm-4" align="right"> Assignment Group</FormLabel>
                <div className="col-sm-4">
                    <FormSelect>
                        <option value="ASSIGNMENTS">ASSIGNMENTS</option>
                        <option value="OTHER">OTHER</option>
                    </FormSelect>
                </div>
            </FormGroup>
            <FormGroup className="row mb-3 align-items-center" id="wd-display-grade-as">
                <FormLabel className="col-sm-4" align="right"> Display Grade As</FormLabel>
                <div className="col-sm-4">
                    <FormSelect>
                        <option value="PERCENTAGE">Percentage</option>
                        <option value="POINTS">Points</option>
                    </FormSelect>
                </div>
            </FormGroup>
            <FormGroup className="row mb-3 align-items-center" id="wd-submission-type">
                <FormLabel className="col-sm-4" align="right"> Submission type</FormLabel>
                <div className="col-sm-4">
                    <div className="border-1 border rounded-2 p-2">
                        <div className="mb-3">
                            <FormSelect>
                                <option value="ONLINE">Online</option>
                                <option value="INPERSON">In Person</option>
                            </FormSelect>
                            <FormGroup className="mb-3 pt-2">
                                <FormLabel className="fw-bold">
                                    Online Entry Options
                                </FormLabel>
                                <FormCheck className="mb-3">
                                    <FormCheckLabel id="wd-text-entry">
                                        Text Entry
                                    </FormCheckLabel>
                                    <FormCheckInput id="wd-text-entry" />
                                </FormCheck>
                                <FormCheck className="mb-3">
                                    <FormCheckLabel id="wd-website-url">
                                        Website URL
                                    </FormCheckLabel>
                                    <FormCheckInput id="wd-website-url" />
                                </FormCheck>
                                <FormCheck className="mb-3">
                                    <FormCheckLabel id="wd-media-recordings">
                                        Media Recordings
                                    </FormCheckLabel>
                                    <FormCheckInput id="wd-media-recordings" />
                                </FormCheck>
                                <FormCheck className="mb-3">
                                    <FormCheckLabel id="wd-student-annotation">
                                        Student Annotation
                                    </FormCheckLabel>
                                    <FormCheckInput id="wd-student-annotation" />
                                </FormCheck>
                                <FormCheck className="mb-3">
                                    <FormCheckLabel id="wd-file-uploads">
                                        File Uploads
                                    </FormCheckLabel>
                                    <FormCheckInput id="wd-file-uploads" />
                                </FormCheck>
                            </FormGroup>
                        </div>
                    </div>
                </div>
            </FormGroup>
            <FormGroup className="row mb-3 align-items-center">
                <FormLabel className="col-sm-4" align="right"> Assign</FormLabel>
                <div className="col-sm-4">
                    <div className="border-1 border rounded-2 p-2">
                        <div className="mb-3">
                            <FormGroup className="mb-3 fw-bold" id="wd-assign-to">
                                <FormLabel>Assign to</FormLabel>
                                <FormControl id="wd-assign-to" defaultValue="Everyone" />
                            </FormGroup>
                            <FormGroup className="mb-3 fw-bold" id="wd-due-date">
                                <FormLabel>Due</FormLabel>
                                <FormControl id="wd-due-date" type="date" defaultValue="2024-05-13" />
                            </FormGroup>
                            <div className="row">
                                <div className="col-sm-6 fw-bold">
                                    <FormGroup id="wd-available-from">
                                        <FormLabel>Available from</FormLabel>
                                        <FormControl id="wd-available-from" type="date" defaultValue="2024-05-06" />
                                    </FormGroup>
                                </div>
                                <div className="col-sm-6 fw-bold">
                                    <FormGroup id="wd-available-until">
                                        <FormLabel>Until</FormLabel>
                                        <FormControl id="wd-available-until" type="date" defaultValue="2024-05-20" />
                                    </FormGroup>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </FormGroup>
            <div className="text-end">
                <Button variant="secondary" className="me-1">
                    Cancel
                </Button>
                <Button variant="danger" className="me-1">
                    Save
                </Button>
            </div>
        </div>
    );
}
