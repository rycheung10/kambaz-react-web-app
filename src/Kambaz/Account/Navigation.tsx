import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";

export default function AccountNavigation() {
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const links = currentUser ? ["Profile"] : ["Signin", "Signup"];
    const { pathname } = useLocation();

    const getLinkClass = (link: string) =>
        `list-group-item ${pathname.includes(link) ? "active" : "text-danger"} border border-0`;

    return (
        <div id="wd-account-navigation" className="wd list-group fs-5 rounded-0">
            {links.map((link) => (
                <Link
                    key={link}
                    to={`/Kambaz/Account/${link}`}
                    id={`wd-course-${link.toLowerCase()}-link`}
                    className={getLinkClass(link)}
                >
                    {link}
                </Link>
            ))}
            {currentUser?.role === "ADMIN" && (
                <Link
                    to={`/Kambaz/Account/Users`}
                    id="wd-course-users-link"
                    className={getLinkClass("Users")}
                >
                    Users
                </Link>
            )}
        </div>
    );
}
