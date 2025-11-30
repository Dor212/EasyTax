import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaArrowUp } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

const ACCENT = "#7CE86A";
const TEXT = "#3A3A4A";

export default function FloatingButtons() {
    const [showAuthorized, setShowAuthorized] = useState(true);
    const [showScroll, setShowScroll] = useState(false);

    useEffect(() => {
        const handleScroll = () => setShowScroll(window.scrollY > 300);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

    return (
        <div className="fixed bottom-6 right-4 sm:bottom-8 sm:right-6 z-[60] flex flex-col items-end gap-3">
            {/* כפתור חזור למעלה */}
            <AnimatePresence>
                {showScroll && (
                    <motion.button
                        onClick={scrollToTop}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ duration: 0.3 }}
                        className="rounded-full p-3 shadow-[0_12px_30px_rgba(124,232,106,0.5)] backdrop-blur-md"
                        style={{ backgroundColor: ACCENT, color: "white" }}
                        aria-label="חזור לראש הדף"
                    >
                        <FaArrowUp className="w-4 h-4" />
                    </motion.button>
                )}
            </AnimatePresence>

            {/* חלון המייצגים */}
            <AnimatePresence>
                {showAuthorized && (
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 40 }}
                        transition={{ duration: 0.4 }}
                        // כאן הדגש – מוודאים position לא סטטי
                        style={{ position: "relative" }}
                        className="bg-white rounded-2xl shadow-[0_18px_50px_rgba(0,0,0,0.15)] border border-[rgba(124,232,106,0.4)] px-4 py-3 flex flex-col items-center text-center w-72 sm:w-80"
                    >
                        <button
                            onClick={() => setShowAuthorized(false)}
                            className="absolute text-gray-400 top-2 left-2 hover:text-gray-600"
                            aria-label="סגירת חלון מייצגים"
                        >
                            <IoMdClose size={20} />
                        </button>

                        <p
                            className="mb-3 text-sm font-semibold"
                            style={{ color: TEXT }}
                        >
                            מייצגים מורשים
                            <br />
                            במס הכנסה ובביטוח הלאומי
                        </p>

                        <div className="flex items-center justify-center gap-4 mb-2">
                            <img
                                src={`${import.meta.env.BASE_URL}icons/tax-authority.png`}
                                alt="מס הכנסה"
                                className="w-8 h-8"
                            />
                            <img
                                src={`${import.meta.env.BASE_URL}icons/bituach-leumi.png`}
                                alt="ביטוח לאומי"
                                className="w-8 h-8"
                            />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {!showAuthorized && (
                <motion.button
                    onClick={() => setShowAuthorized(true)}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="rounded-full px-4 py-2 sm:px-5 sm:py-2.5 text-sm font-semibold shadow-[0_12px_30px_rgba(124,232,106,0.5)] backdrop-blur-md"
                    style={{ backgroundColor: ACCENT, color: "white" }}
                >
                    מייצגים מורשים של מס הכנסה
                </motion.button>
            )}
        </div>
    );
}
