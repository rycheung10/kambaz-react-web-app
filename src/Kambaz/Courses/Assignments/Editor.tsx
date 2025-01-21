export default function AssignmentEditor() {
    return (
        <div id="wd-assignments-editor">
            <label htmlFor="wd-name">Assignment Name</label>
            <input id="wd-name" value="A1 - ENV + HTML" /><br /><br />
            <textarea id="wd-description" cols={45} rows={10}>
                The assignment is available online Submit a link to the landing page of your Web application running on Netlify. The landing page should include the following: Your full name and section Links to each of the lab assignments Link to the Kanbas application Links to all relevant source code repositories The Kanbas application should include a link to navigate back to the landing page
            </textarea>
            <br />
            <table>
                <br />
                <tr>
                    <td align="right" valign="top">
                        <label htmlFor="wd-points">Points</label>
                    </td>
                    <td>
                        <input id="wd-points" value={100} />
                    </td>
                </tr>
                <br />
                <tr>
                    <td>
                        <label htmlFor="wd-select-one-group"> Assignment Group: </label>
                    </td>
                    <td>
                        <select id="wd-group">
                            <option value="ASSIGNMENTS">ASSIGNMENTS</option>
                            <option value="OTHER">OTHER</option>
                        </select>
                    </td>
                </tr>
                <br />
                <tr>
                    <td>
                        <label htmlFor="wd-select-one-display-grade-as"> Display Grade as: </label>
                    </td>
                    <td>
                        <select id="wd-display-grade-as">
                            <option value="PERCENTAGE">Percentage</option>
                            <option value="POINTS">Points</option>
                        </select>
                    </td>
                </tr>
                <br />
                <tr>
                    <td>
                        <label htmlFor="wd-select-one-submission-type"> Submission type: </label>
                    </td>
                    <td>
                        <select id="wd-submission-type">
                            <option value="ONLINE">Online</option>
                            <option value="INPERSON">In Person</option>
                        </select>
                    </td>
                </tr>
                <br />
                <tr>
                    <td>
                    </td>
                    <td>
                        <label>Online Entry Options:</label><br />

                        <input type="checkbox" name="check-online" id="wd-text-entry" />
                        <label htmlFor="wd-text-entry">Text Entry</label><br />

                        <input type="checkbox" name="check-online" id="wd-website-url" />
                        <label htmlFor="wd-website-url">Website URL</label><br />

                        <input type="checkbox" name="check-online" id="wd-media-recordings" />
                        <label htmlFor="wd-media-recordings">Media Recordings</label><br />

                        <input type="checkbox" name="check-online" id="wd-student-annotation" />
                        <label htmlFor="wd-student-annotation">Student Annotation</label><br />

                        <input type="checkbox" name="check-online" id="wd-file-upload" />
                        <label htmlFor="wd-file-upload">File Uploads</label>
                    </td>
                </tr>
                <br />
                <tr>
                    <td valign="top" align="right">
                        Assign
                    </td>
                    <td>
                        Assign to<br></br>
                        <input type="text"
                            value="Everyone"
                            title="The last name"
                            id="wd-assign-to" />
                    </td>
                </tr>
                <br />
                <tr>
                    <td>
                    </td>
                    <td>
                        Due<br></br>
                        <input type="date"
                            value="2024-05-13"
                            id="wd-due-date" /><br />
                    </td>
                </tr>
                <br />
                <tr>
                    <td></td>
                    <td>
                        <td>
                            Available from<br></br>
                            <input type="date"
                                value="2024-05-06"
                                id="wd-available-from" /><br />
                        </td>
                        <td>
                            Until <br></br>
                            <input type="date"
                                value="2024-05-20"
                                id="wd-available-until" /><br />
                        </td>
                    </td>
                </tr>
            </table>
        </div>
    );
}
