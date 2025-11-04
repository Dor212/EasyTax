import { Link } from "react-router-dom";

const Footer = () => {
    const year = new Date().getFullYear();

    return (
        <footer className="w-full mt-12 border-t border-[rgba(58,58,74,0.16)] bg-transparent">
            <div className="flex flex-col items-center justify-between max-w-6xl gap-2 px-4 py-3 mx-auto text-center sm:flex-row sm:text-right">
                <p className="text-xs sm:text-sm" style={{ color: "#3A3A4A" }}>
                    © {year} EasyTax. כל הזכויות שמורות.
                </p>
                <Link
                    to="/legal"
                    className="text-xs sm:text-sm underline-offset-4 hover:underline"
                    style={{ color: "rgba(58,58,74,0.85)" }}
                >
                    הצהרת נגישות · פרטיות · תנאי שימוש · קוקיז
                </Link>
            </div>
        </footer>
    );
};

export default Footer;
