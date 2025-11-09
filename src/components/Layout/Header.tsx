import React, { useState, useEffect } from "react";

const ACCENT = "#5BA14D";

const navLinkBase =
    "px-1 pb-0.5 text-xs sm:text-sm font-medium border-b-2 border-transparent transition-colors";

const Header: React.FC = () => {
    const [scrolled, setScrolled] = useState(false);
    const [openMobile, setOpenMobile] = useState(false);

    useEffect(() => {
        const onScroll = () => {
            setScrolled(window.scrollY > 10);
        };
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const handleNavClick = (href: string) => {
        setOpenMobile(false);
        window.location.href = href;
    };

    return (
        <header
            className={`fixed inset-x-0 top-0 z-30 transition-all ${scrolled
                    ? "bg-white/90 border-b border-black/5 shadow-[0_6px_24px_rgba(0,0,0,0.04)]"
                    : "bg-white/70 border-b border-white/60 shadow-none"
                } backdrop-blur-md`}
        >
            <div className="flex items-center justify-between max-w-6xl gap-3 px-4 py-2.5 mx-auto">
                <button
                    type="button"
                    onClick={() => handleNavClick("/#home")}
                    className="flex items-center gap-2 text-right"
                >
                    <img
                        src="/ETLogo1.png"
                        alt="EasyTax Logo"
                        className="object-contain w-auto h-8"
                    />
                
                </button>

                <nav className="items-center hidden gap-6 md:flex">
                    <button
                        type="button"
                        onClick={() => handleNavClick("/#who-is-eligible")}
                        className={`${navLinkBase} text-[color:var(--text)]/80 hover:text-[color:var(--text)] hover:border-[rgba(91,161,77,0.9)]`}
                    >
                        מי זכאי 
                    </button>
                    <button
                        type="button"
                        onClick={() => handleNavClick("/#how-it-works")}
                        className={`${navLinkBase} text-[color:var(--text)]/80 hover:text-[color:var(--text)] hover:border-[rgba(91,161,77,0.9)]`}
                    >
                        מה התהליך
                    </button>
                    <button
                        type="button"
                        onClick={() => handleNavClick("/#faq")}
                        className={`${navLinkBase} text-[color:var(--text)]/80 hover:text-[color:var(--text)] hover:border-[rgba(91,161,77,0.9)]`}
                    >
                        שאלות ותשובות
                    </button>
                </nav>

                <div className="flex items-center gap-3">
                    <button
                        type="button"
                        onClick={() => handleNavClick("/#questionnaire")}
                        className="hidden px-4 py-1.5 text-xs font-semibold text-white rounded-full shadow-sm sm:text-sm md:inline-flex hover:shadow-md transition-transform hover:-translate-y-0.5"
                        style={{ backgroundColor: ACCENT }}
                    >
                        בדיקת זכאות מהירה
                    </button>

                    <button
                        type="button"
                        className="inline-flex items-center justify-center w-8 h-8 rounded-full border border-[rgba(58,58,74,0.25)] bg-white/70 md:hidden"
                        onClick={() => setOpenMobile((v) => !v)}
                    >
                        <span className="sr-only">תפריט</span>
                        <div className="flex flex-col justify-center w-4 h-4 gap-1">
                            <span
                                className={`h-[2px] w-full rounded-full bg-[rgba(58,58,74,0.9)] transition-transform ${openMobile ? "translate-y-[3px] rotate-45" : ""
                                    }`}
                            />
                            <span
                                className={`h-[2px] w-full rounded-full bg-[rgba(58,58,74,0.9)] transition-opacity ${openMobile ? "opacity-0" : "opacity-100"
                                    }`}
                            />
                            <span
                                className={`h-[2px] w-full rounded-full bg-[rgba(58,58,74,0.9)] transition-transform ${openMobile ? "-translate-y-[3px] -rotate-45" : ""
                                    }`}
                            />
                        </div>
                    </button>
                </div>
            </div>

            {openMobile && (
                <div className="md:hidden border-t border-[rgba(58,58,74,0.12)] bg-white/95 backdrop-blur-sm">
                    <div className="flex flex-col max-w-6xl px-4 py-2 mx-auto text-right">
                        <button
                            type="button"
                            onClick={() => handleNavClick("/#eligibility")}
                            className="py-2 text-sm text-[color:var(--text)]/85"
                        >
                            בדיקת זכאות
                        </button>
                        <button
                            type="button"
                            onClick={() => handleNavClick("/#how-it-works")}
                            className="py-2 text-sm text-[color:var(--text)]/85"
                        >
                            מה התהליך
                        </button>
                        <button
                            type="button"
                            onClick={() => handleNavClick("/#faq")}
                            className="py-2 text-sm text-[color:var(--text)]/85"
                        >
                            שאלות ותשובות
                        </button>
                        <button
                            type="button"
                            onClick={() => handleNavClick("/#questionnaire")}
                            className="py-2 mt-1 text-sm font-semibold text-white rounded-full"
                            style={{ backgroundColor: ACCENT }}
                        >
                            בדיקת זכאות מהירה
                        </button>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;
