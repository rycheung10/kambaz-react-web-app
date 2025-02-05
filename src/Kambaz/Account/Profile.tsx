import { Link } from "react-router-dom";
import { Form } from "react-bootstrap";
export default function Profile() {
    return (
        <div id="wd-profile-screen">
            <h3>Profile</h3>
            <Form.Control defaultValue="alice" className="wd-username mb-2" placeholder="username"/>
            <Form.Control defaultValue="123" className="wd-password mb-2" placeholder="password"/>
            <Form.Control defaultValue="Alice" className="mb-2" id="wd-firstname" placeholder="First Name"/>
            <Form.Control defaultValue="Wonderland" className="mb-2" id="wd-lastname" placeholder="Last Name"/>
            <Form.Control type="date" className="mb-2" id="wd-dob"/>
            <Form.Control defaultValue="alice@wonderland.com" className="mb-2" type="email" id="wd-email" />
            <Form.Select defaultValue="FACULTY" className="mb-2" id="wd-role">
                <option value="USER">User</option> 
                <option value="ADMIN">Admin</option>
                <option value="FACULTY">Faculty</option>
                <option value="STUDENT">Student</option>
            </Form.Select>
            <Link to="/Kambaz/Account/Signin" className="btn btn-danger w-100"> Sign out </Link>
        </div>
    );
}