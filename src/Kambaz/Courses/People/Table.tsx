import { Table } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";
export default function PeopleTable() {
    return (
        <div id="wd-people-table">
            <Table striped>
                <thead>
                    <tr><th>Name</th><th>Login ID</th><th>Section</th><th>Role</th><th>Last Activity</th><th>Total Activity</th></tr>
                </thead>
                <tbody>
                    <tr><td className="wd-full-name text-nowrap">
                        <FaUserCircle className="me-2 fs-1 text-secondary" />
                        <span className="wd-first-name">Tony</span>{" "}
                        <span className="wd-last-name">Stark</span></td>
                        <td className="wd-login-id">001234561S</td>
                        <td className="wd-section">S101</td>
                        <td className="wd-role">STUDENT</td>
                        <td className="wd-last-activity">2020-10-01</td>
                        <td className="wd-total-activity">10:21:32</td></tr>
                    <tr><td className="wd-full-name text-nowrap">
                        <FaUserCircle className="me-2 fs-1 text-secondary" />
                        <span className="wd-first-name">Bruce</span>{" "}
                        <span className="wd-last-name">Wayne</span></td>
                        <td className="wd-login-id">001234562S</td>
                        <td className="wd-section">S101</td>
                        <td className="wd-role">STUDENT</td>
                        <td className="wd-last-activity">2020-10-05</td>
                        <td className="wd-total-activity">1:54:26</td></tr>
                    <tr><td className="wd-full-name text-nowrap">
                        <FaUserCircle className="me-2 fs-1 text-secondary" />
                        <span className="wd-first-name">Steve</span>{" "}
                        <span className="wd-last-name">Rogers</span></td>
                        <td className="wd-login-id">001234563S</td>
                        <td className="wd-section">S101</td>
                        <td className="wd-role">STUDENT</td>
                        <td className="wd-last-activity">2020-10-02</td>
                        <td className="wd-total-activity">5:43:34</td></tr>
                    <tr><td className="wd-full-name text-nowrap">
                        <FaUserCircle className="me-2 fs-1 text-secondary" />
                        <span className="wd-first-name">LeBron</span>{" "}
                        <span className="wd-last-name">James</span></td>
                        <td className="wd-login-id">001234564S</td>
                        <td className="wd-section">S101</td>
                        <td className="wd-role">TA</td>
                        <td className="wd-last-activity">2020-10-23</td>
                        <td className="wd-total-activity">6:23:23</td></tr>
                </tbody>
            </Table>
        </div>);
}