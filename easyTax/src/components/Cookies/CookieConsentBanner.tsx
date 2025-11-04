import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const COOKIE_KEY = "easytax_cookie_consent";

type ConsentOptions = {
    necessary: boolean;
    statistics: boolean;
    marketing: boolean;
};

const defaultOptions: ConsentOptions = {
    necessary: true,
    statistics: false,
    marketing: false,
};

const CookieConsentBanner: React.FC = () => {
    const [showBanner, setShowBanner] = useState(false);
    const [options, setOptions] = useState<ConsentOptions>(defaultOptions);

    useEffect(() => {
        const stored = localStorage.getItem(COOKIE_KEY);
        if (!stored) {
            setShowBanner(true);
        } else {
            const parsed: ConsentOptions = JSON.parse(stored);
            setOptions(parsed);
        }
    }, []);

    const saveConsent = () => {
        localStorage.setItem(COOKIE_KEY, JSON.stringify(options));
        setShowBanner(false);
    };

    const approveNecessaryOnly = () => {
        setOptions({ necessary: true, statistics: false, marketing: false });
        saveConsent();
    };

    const approveAll = () => {
        setOptions({ necessary: true, statistics: true, marketing: true });
        saveConsent();
    };

    if (!showBanner) return null;

    return (
        <AnimatePresence>
            {showBanner && (
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 24 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="fixed inset-x-0 bottom-0 z-50"
                >
                    <div className="bg-white/80 backdrop-blur-md border-t border-gray-200/70 shadow-[0_-14px_40px_rgba(0,0,0,0.08)] px-4 py-4 sm:px-6 sm:py-5">
                        <div className="flex flex-col max-w-6xl gap-4 mx-auto text-right sm:flex-row sm:items-center sm:justify-between">
                            <div className="text-xs leading-relaxed text-gray-800 sm:text-sm">
                                אנחנו משתמשים בעוגיות (Cookies) כדי לשפר את חוויית הגלישה, למדוד שימוש ולשמור על האתר מאובטח.
                                {" "}
                                <a
                                    href="/legal#cookies"
                                    className="font-medium underline underline-offset-2"
                                    style={{ color: "var(--accent)" }}
                                >
                                    למד/י עוד
                                </a>
                                .
                            </div>

                            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
                                <button
                                    type="button"
                                    onClick={approveNecessaryOnly}
                                    className="px-4 py-2 text-xs font-semibold rounded-full sm:text-sm"
                                    style={{
                                        color: "var(--accent)",
                                        borderColor: "var(--accent)",
                                        borderWidth: 1,
                                        borderStyle: "solid",
                                        backgroundColor: "rgba(91,161,77,0.04)",
                                    }}
                                >
                                    רק עוגיות הכרחיות
                                </button>
                                <button
                                    type="button"
                                    onClick={approveAll}
                                    className="px-4 py-2 text-xs font-semibold text-white rounded-full sm:text-sm shadow-md hover:shadow-lg transition-transform hover:-translate-y-0.5"
                                    style={{ backgroundColor: "var(--accent)" }}
                                >
                                    אישור כל העוגיות
                                </button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default CookieConsentBanner;
