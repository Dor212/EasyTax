import { motion } from "framer-motion";
import DeepEligibilityForm from "../Questionnaire/DeepEligibilityForm";


const TEXT = "#3A3A4A";

export default function QuestionnaireSection() {
    return (
        <section id="questionnaire" className="flex justify-center w-full px-4 py-16 sm:px-6 bg-[rgba(124,232,106,0.06)]" dir="rtl">
            <div className="w-full max-w-4xl">
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-6 text-center">
                    <h2 className="mb-3 text-2xl sm:text-3xl md:text-4xl font-[Heebo] leading-tight" style={{ color: TEXT }}>
                        <span className="relative inline-block px-1">
                            <span className="relative z-10">שאלון זכאות מעמיק</span>
                            <span className="absolute left-0 right-0 -bottom-1 h-[3px] rounded-full" style={{ background: "rgba(124,232,106,0.7)" }} />
                        </span>
                    </h2>
                    <p className="text-sm sm:text-[15px] font-[Heebo] max-w-2xl mx-auto leading-7" style={{ color: TEXT }}>
                        אחרי שבדקתם באופן כללי מי זכאי להחזר.
                        <br />
                        כאן אנחנו צוללים קצת יותר עמוק.
                        <br />
                        כמה שאלות ממוקדות שיעזרו לצוות EasyTax להבין את התמונה המלאה.
                        <br />
                        ולבחון זכאות להחזר מס בצורה אישית.
                    </p>
                </motion.div>

                <DeepEligibilityForm />
            </div>
        </section>
    );
}
