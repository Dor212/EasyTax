import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Layout/Header";
import CookieConsentBanner from "./components/Cookies/CookieConsentBanner";
import FloatingActions from "./components/UI/FloatingActions";
import HomePage from "./Pages/HomePage";
import LegalPage from "./Pages/LegalPage/LegalPage";
import Footer from "./components/Layout/Footer";


const ACCENT = "#5BA14D" as const;
const TEXT = "#3A3A4A" as const;

function App() {
    useEffect(() => {
        document.documentElement.style.setProperty("--accent", ACCENT);
        document.documentElement.style.setProperty("--text", TEXT);
    }, []);

    const bgUrl = `${import.meta.env.BASE_URL}BGET1.png`;

    return (
        <Router>
            <div
                dir="rtl"
                className="relative min-h-screen font-[Heebo] text-[15px] text-[color:var(--text)]"
            >
                <style>{`html{scroll-behavior:smooth}`}</style>

                <div
                    aria-hidden
                    className="fixed inset-0 bg-fixed bg-center bg-cover -z-10"
                    style={{ backgroundImage: `url(${bgUrl})` }}
                />
                <Header />
                <CookieConsentBanner />
                <FloatingActions />
                <main id="home">
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/legal" element={<LegalPage />} />
                    </Routes>
                </main>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
