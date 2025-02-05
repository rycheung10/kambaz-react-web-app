import { Button, Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
export default function Dashboard() {
    return (
        <div id="wd-dashboard">
            <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
            <h2 id="wd-dashboard-published">Published Courses (7)</h2> <hr />
            <div id="wd-dashboard-courses">
                <Row xs={1} md={5} className="g-4">
                    <Col className="wd-dashboard-course" style={{ width: "270px" }}> {/* class 1 */}
                        <Card>
                            <Link to="/Kambaz/Courses/1234/Home"
                                className="wd-dashboard-course-link text-decoration-none text-dark">
                                <Card.Img variant="top" src="/images/cs1234.jpg" width="100%" height={150}/>
                                <Card.Body>
                                    <Card.Title className="wd-dashboard-course-title">CS1234 React JS</Card.Title>
                                    <Card.Text className="wd-dashboard-course-description">Full Stack software developer</Card.Text>
                                    <Button variant="primary">Go</Button>
                                </Card.Body>
                            </Link>
                        </Card>
                    </Col>
                    <Col className="wd-dashboard-course" style={{ width: "270px" }}> {/* class 2 */}
                        <Card>
                            <Link to="/Kambaz/Courses/1234/Home"
                                className="wd-dashboard-course-link text-decoration-none text-dark">
                                <Card.Img variant="top" src="/images/ds1234.jpg" width="100%" height={150} />
                                <Card.Body>
                                    <Card.Title className="wd-dashboard-course-title">DS1234 Data</Card.Title>
                                    <Card.Text className="wd-dashboard-course-description">Data engineering</Card.Text>
                                    <Button variant="primary">Go</Button>
                                </Card.Body>
                            </Link>
                        </Card>
                    </Col>
                    <Col className="wd-dashboard-course" style={{ width: "270px" }}> {/* class 3 */}
                        <Card>
                            <Link to="/Kambaz/Courses/1234/Home"
                                className="wd-dashboard-course-link text-decoration-none text-dark">
                                <Card.Img variant="top" src="/images/st1234.jpg" width="100%" height={150} />
                                <Card.Body>
                                    <Card.Title className="wd-dashboard-course-title">ST1234 S&T</Card.Title>
                                    <Card.Text className="wd-dashboard-course-description">Sales and Trading</Card.Text>
                                    <Button variant="primary">Go</Button>
                                </Card.Body>
                            </Link>
                        </Card>
                    </Col>

                    <Col className="wd-dashboard-course" style={{ width: "270px" }}> {/* class 4 */}
                        <Card>
                            <Link to="/Kambaz/Courses/1234/Home"
                                className="wd-dashboard-course-link text-decoration-none text-dark">
                                <Card.Img variant="top" src="/images/ib1234.jpg" width="100%" height={150} />
                                <Card.Body>
                                    <Card.Title className="wd-dashboard-course-title">IB1234 IB</Card.Title>
                                    <Card.Text className="wd-dashboard-course-description">Investment Banking</Card.Text>
                                    <Button variant="primary">Go</Button>
                                </Card.Body>
                            </Link>
                        </Card>
                    </Col>

                    <Col className="wd-dashboard-course" style={{ width: "270px" }}> {/* class 5 */}
                        <Card>
                            <Link to="/Kambaz/Courses/1234/Home"
                                className="wd-dashboard-course-link text-decoration-none text-dark">
                                <Card.Img variant="top" src="/images/er1234.jpg" width="100%" height={150} />
                                <Card.Body>
                                    <Card.Title className="wd-dashboard-course-title">ER1234 ER</Card.Title>
                                    <Card.Text className="wd-dashboard-course-description">Equity Research</Card.Text>
                                    <Button variant="primary">Go</Button>
                                </Card.Body>
                            </Link>
                        </Card>
                    </Col>

                    <Col className="wd-dashboard-course" style={{ width: "270px" }}> {/* class 6 */}
                        <Card>
                            <Link to="/Kambaz/Courses/1234/Home"
                                className="wd-dashboard-course-link text-decoration-none text-dark">
                                <Card.Img variant="top" src="/images/ac1234.jpg" width="100%" height={150} />
                                <Card.Body>
                                    <Card.Title className="wd-dashboard-course-title">AC1234 Accounting</Card.Title>
                                    <Card.Text className="wd-dashboard-course-description">Accounting</Card.Text>
                                    <Button variant="primary">Go</Button>
                                </Card.Body>
                            </Link>
                        </Card>
                    </Col>

                    <Col className="wd-dashboard-course" style={{ width: "270px" }}> {/* class 7 */}
                        <Card>
                            <Link to="/Kambaz/Courses/1234/Home"
                                className="wd-dashboard-course-link text-decoration-none text-dark">
                                <Card.Img variant="top" src="/images/mk1234.jpg" width="100%" height={150} />
                                <Card.Body>
                                    <Card.Title className="wd-dashboard-course-title">MK1234 Marketing</Card.Title>
                                    <Card.Text className="wd-dashboard-course-description">Marketing</Card.Text>
                                    <Button variant="primary">Go</Button>
                                </Card.Body>
                            </Link>
                        </Card>
                    </Col>
                </Row>
            </div>
        </div>
    );
}
