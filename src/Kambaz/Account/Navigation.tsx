import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
export default function AccountNavigation() {
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const links = currentUser ? ["Profile"] : ["Signin", "Signup"];
    const { pathname } = useLocation();
    return (
        <div id="wd-account-navigation" className="wd list-group fs-5 rounded-0">
            {links.map((link) => (
                <Link
                    to={`/Kambaz/Account/${link}`}
                    id={`wd-course-${link.toLowerCase()}-link`}
                    className={`list-group-item ${pathname.includes(link) ? "active" : "text-danger"} border border-0`}>
                    {link}
                </Link>
            ))}
        </div>
    );
}
