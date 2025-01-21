import { Link } from "react-router-dom";
export default function Dashboard() {
    return (
        <div id="wd-dashboard">
            <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
            <h2 id="wd-dashboard-published">Published Courses (7)</h2> <hr />
            <div id="wd-dashboard-courses">
                <div className="wd-dashboard-course"> {/* class 1 */}
                    <Link to="/Kambaz/Courses/1234/Home"
                        className="wd-dashboard-course-link" >
                        <img src="/images/cs1234.jpg" width={200} />
                        <div>
                            <h5> CS1234 React JS </h5>
                            <p className="wd-dashboard-course-title">
                                Full Stack software developer  </p>
                            <button> Go </button>
                        </div>
                    </Link>
                </div>
                <div className="wd-dashboard-course"> {/* class 2 */}
                    <Link to="/Kambaz/Courses/1234/Home"
                        className="wd-dashboard-course-link" >
                        <img src="/images/ds1234.jpg" width={200} />
                        <div>
                            <h5> DS1234 Data </h5>
                            <p className="wd-dashboard-course-title">
                                Data engineering  </p>
                            <button> Go </button>
                        </div>
                    </Link>
                </div>
                <div className="wd-dashboard-course"> {/* class 3 */}
                    <Link to="/Kambaz/Courses/1234/Home"
                        className="wd-dashboard-course-link" >
                        <img src="/images/st1234.jpg" width={200} />
                        <div>
                            <h5> ST1234 S&T </h5>
                            <p className="wd-dashboard-course-title">
                                Sales and Trading  </p>
                            <button> Go </button>
                        </div>
                    </Link>
                </div>
                <div className="wd-dashboard-course"> {/* class 4 */}
                    <Link to="/Kambaz/Courses/1234/Home"
                        className="wd-dashboard-course-link" >
                        <img src="/images/ib1234.jpg" width={200} />
                        <div>
                            <h5> IB1234 IB </h5>
                            <p className="wd-dashboard-course-title">
                                Investment Banking  </p>
                            <button> Go </button>
                        </div>
                    </Link>
                </div>
                <div className="wd-dashboard-course"> {/* class 5 */}
                    <Link to="/Kambaz/Courses/1234/Home"
                        className="wd-dashboard-course-link" >
                        <img src="/images/er1234.jpg" width={200} />
                        <div>
                            <h5> ER1234 ER </h5>
                            <p className="wd-dashboard-course-title">
                                Equity Research  </p>
                            <button> Go </button>
                        </div>
                    </Link>
                </div>
                <div className="wd-dashboard-course"> {/* class 6 */}
                    <Link to="/Kambaz/Courses/1234/Home"
                        className="wd-dashboard-course-link" >
                        <img src="/images/ac1234.jpg" width={200} />
                        <div>
                            <h5> AC1234 Accounting</h5>
                            <p className="wd-dashboard-course-title">
                                Accounting  </p>
                            <button> Go </button>
                        </div>
                    </Link>
                </div>
                <div className="wd-dashboard-course"> {/* class 7 */}
                    <Link to="/Kambaz/Courses/1234/Home"
                        className="wd-dashboard-course-link" >
                        <img src="/images/mk1234.jpg" width={200} />
                        <div>
                            <h5> MK1234 Marketing </h5>
                            <p className="wd-dashboard-course-title">
                                Marketing  </p>
                            <button> Go </button>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
}
