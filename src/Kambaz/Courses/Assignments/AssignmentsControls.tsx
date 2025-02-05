import { Row, Col, Form, InputGroup, Button } from 'react-bootstrap';
import { BsSearch } from 'react-icons/bs';
import { FaPlus } from 'react-icons/fa6';

export default function AssignmentsControls() {
    return (
        <Form>
            <Row className="mb-3 g-3 align-items-center">
                <Col sm={5}>
                    <InputGroup className="mb-2">
                        <InputGroup.Text className="pe-2">
                            <BsSearch />
                        </InputGroup.Text>
                        <Form.Control placeholder="Search..." className="ps-2" />
                    </InputGroup>
                </Col>
                <Col sm>
                    <Button variant="danger" size="lg" className="me-2 float-end mb-2">
                        <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
                        Assignment
                    </Button>
                    <Button variant="secondary" size="lg" className="me-2 float-end mb-2">
                        <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
                        Group
                    </Button>
                </Col>
            </Row>
        </Form>
    );
}
