import { motion } from "framer-motion";


const TEXT = "#3A3A4A";
const ACCENT = "#7CE86A";

export default function QuestionnaireSection() {
    return (
        <section
            id="questionnaire"
            className="flex justify-center w-full px-4 py-16 sm:px-6 bg-[rgba(124,232,106,0.06)]"
            dir="rtl"
        >
            <div className="w-full max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-6 text-center"
                >
                    <h2
                        className="mb-3 text-2xl sm:text-3xl md:text-4xl font-[Heebo] leading-tight"
                        style={{ color: TEXT }}
                    >
                        <span className="relative inline-block px-1">
                            <span className="relative z-10">שאלון זכאות מעמיק</span>
                            <span
                                className="absolute left-0 right-0 -bottom-1 h-[3px] rounded-full"
                                style={{ background: "rgba(124,232,106,0.7)" }}
                            />
                        </span>
                    </h2>
                    <p
                        className="text-sm sm:text-[15px] font-[Heebo] max-w-2xl mx-auto leading-7"
                        style={{ color: TEXT }}
                    >
                        השאלון נותן לנו תמונה ראשונית על סטטוס הזכאות שלכם, אך זה רק השלב הראשון.
                        <br />
                        לאחר מילוי הפרטים, נציג מומחה מטעמנו יעבור איתכם בשיחה על כל הפרטים הדרושים
                        <br />
                        כדי לוודא שאתם לא מפספסים אף החזר כספי שמגיע לכם
                    </p>

                    <motion.div
                        className="flex justify-center mt-6"
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.05 }}
                    >
                        <a
                            href="/questionnaire-deep"
                            className="inline-flex items-center justify-center rounded-2xl px-6 sm:px-8 py-3 text-sm sm:text-base font-[Heebo] font-semibold shadow-md hover:shadow-lg transition-transform active:scale-[0.98]"
                            style={{
                                backgroundColor: ACCENT,
                                color: "#ffffff",
                                boxShadow: "0 0 20px rgba(124,232,106,0.6)",
                            }}
                        >
                            למעבר לשאלון המעמיק המלא
                        </a>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
