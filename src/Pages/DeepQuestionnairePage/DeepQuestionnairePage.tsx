import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import DeepEligibilityForm from "../../components/Questionnaire/DeepEligibilityForm";
/* 
const ACCENT = "#7CE86A"; */
const TEXT = "#3A3A4A";

export default function DeepQuestionnairePage() {
    const videoRef = useRef<HTMLDivElement | null>(null);

    const { scrollYProgress } = useScroll({
        target: videoRef,
        offset: ["start start", "end center"],
    });

    const videoOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.4]);

    return (
        <section
            dir="rtl"
            className="min-h-screen w-full bg-[rgba(124,232,106,0.04)]"
        >
            <div className="max-w-6xl px-4 py-16 mx-auto sm:px-6">
                <header className="mb-10 text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="font-[Heebo] text-2xl sm:text-3xl md:text-4xl font-extrabold leading-tight"
                        style={{ color: TEXT }}
                    >
                        <span className="relative inline-block px-1">
                            <span className="relative z-10">
                                בדיקת זכאות מעמיקה{" "}
                                <span className="block sm:inline">להחזר מס</span>
                            </span>
                            <span
                                className="absolute left-0 right-0 -bottom-1 h-[3px] rounded-full"
                                style={{ background: "rgba(124,232,106,0.7)" }}
                            />
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="mt-3 text-sm sm:text-[15px] font-[Heebo] max-w-2xl mx-auto leading-7"
                        style={{ color: TEXT }}
                    >
                        הסרטון מסביר בקצרה את התהליך, והשאלון המעמיק יעזור לנו לבדוק לעומק
                        אם מגיע לכם כסף חזרה ממס הכנסה.
                    </motion.p>
                </header>

                <div className="grid gap-8 mt-8 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] lg:items-start">

                    <motion.div
                        ref={videoRef}
                        style={{ opacity: videoOpacity }}
                        className="relative w-full max-w-[420px] mx-auto lg:mx-0 aspect-[9/16]"
                    >
                        <div
                            className="absolute pointer-events-none -inset-x-6 -inset-y-4 opacity-60 blur-3xl"
                            style={{
                                background:
                                    "radial-gradient(circle at top, rgba(124,232,106,0.45), transparent 60%)",
                            }}
                        />
                        <div className="relative w-full h-full overflow-hidden rounded-2xl bg-white/95 border border-[rgba(124,232,106,0.35)] shadow-[0_12px_40px_rgba(15,23,42,0.12)]">
                            <video
                                className="object-cover w-full h-full"
                                src="/videos/easytax-intro2.mp4"
                                controls
                                playsInline
                            />
                            <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/15 via-transparent to-transparent" />
                        </div>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.45, delay: 0.1 }}
                        className="w-full bg-white/95 backdrop-blur-sm border border-[rgba(124,232,106,0.25)] rounded-2xl p-4 sm:p-6 shadow-[0_18px_60px_rgba(15,23,42,0.12)]"
                    >
                        <DeepEligibilityForm />
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
