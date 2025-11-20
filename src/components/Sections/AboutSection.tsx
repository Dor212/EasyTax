import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import type { Variants } from "framer-motion";
import QuickCheckForm from "../Questionnaire/QuickCheckForm";

type AboutSectionProps = {
    id?: string;
    className?: string;
    logoSrc?: string;
};

const accentGlow = "#7CE86A" as const;
const bodyColor = "#3A3A4A" as const;
const easeCurve = [0.22, 1, 0.36, 1] as const;

const fadeUp: Variants = {
    hidden: { opacity: 0, y: 24 },
    show: (i = 0) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, delay: 0.12 * i, ease: easeCurve },
    }),
};

export default function AboutSection({
    id = "about",
    className = "",
    logoSrc = `${import.meta.env.BASE_URL}ETLogo1.png`,
}: AboutSectionProps) {
    const circleWrapperRef = useRef<HTMLDivElement | null>(null);
    const circleInView = useInView(circleWrapperRef, { amount: 0.6 });

    return (
        <section
            id={id}
            dir="rtl"
            className={`w-full pt-28 md:pt-32 pb-16 md:pb-24 ${className}`}
        >
            <div className="max-w-6xl px-4 mx-auto sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-16 place-items-center">
                    <motion.div
                        ref={circleWrapperRef}
                        className="relative grid size-56 sm:size-64 md:size-72 place-items-center"
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: false, amount: 0.4 }}
                        variants={fadeUp}
                        custom={0}
                    >
                        <motion.svg
                            width="100%"
                            height="100%"
                            viewBox="0 0 100 100"
                            className="absolute inset-0"
                            initial={{ opacity: 0 }}
                            animate={circleInView ? { opacity: 1 } : { opacity: 0 }}
                            transition={{ duration: 0.4 }}
                        >
                            <motion.circle
                                cx="50"
                                cy="50"
                                r="48"
                                stroke={accentGlow}
                                strokeWidth="4"
                                fill="none"
                                strokeDasharray="302"
                                strokeDashoffset={302}
                                initial={{ strokeDashoffset: 302 }}
                                animate={
                                    circleInView
                                        ? { strokeDashoffset: 0 }
                                        : { strokeDashoffset: 302 }
                                }
                                transition={{
                                    duration: 1.4,
                                    ease: "easeInOut",
                                }}
                            />
                        </motion.svg>

                        <motion.div
                            className="relative size-[86%] rounded-full overflow-hidden bg-white/80 backdrop-blur-[4px]"
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: false, amount: 0.4 }}
                            transition={{
                                duration: 0.7,
                                ease: easeCurve,
                                delay: 0.06,
                            }}
                        >
                            <img
                                src={logoSrc}
                                alt="EasyTax logo"
                                className="object-cover w-full h-full"
                                onError={(e) => {
                                    const fallback = `${import.meta.env.BASE_URL}ETLogo1.png`;
                                    if (
                                        (e.currentTarget as HTMLImageElement)
                                            .src !== fallback
                                    ) {
                                        (e.currentTarget as HTMLImageElement).src =
                                            fallback;
                                    }
                                }}
                            />
                        </motion.div>
                    </motion.div>

                    <div className="w-full max-w-xl">
                        <motion.h1
                            className="font-[Heebo] text-2xl sm:text-3xl md:text-4xl leading-tight text-center"
                            style={{ color: bodyColor }}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true, amount: 0.4 }}
                            variants={fadeUp}
                            custom={1}
                        >
                            <span className="block mb-1 font-extrabold">
                                שכירים?
                            </span>

                            <span className="relative block px-1 mb-2 font-normal">
                                <span
                                    className="absolute inset-0 rounded-xl"
                                    style={{
                                        background:
                                            "rgba(124, 232, 106, 0.18)",
                                    }}
                                />
                                <span className="relative z-10">
                                    אל תשאירו את הכסף אצל המדינה!
                                </span>
                            </span>

                            <motion.span
                                className="relative inline-block mt-1 text-[0.9em] font-normal"
                                style={{ color: bodyColor }}
                                initial={{ opacity: 0, y: 6 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.9 }}
                                transition={{ duration: 0.6, ease: easeCurve }}
                            >
                                <span className="relative z-10">
                                    החזר מס דיגיטלי פשוט ומהיר
                                </span>

                                <motion.div
                                    className="absolute -bottom-1 right-0 left-0 h-[3px] rounded-full"
                                    style={{
                                        backgroundColor: accentGlow,
                                        transformOrigin: "100% 50%",
                                    }}
                                    initial={{ scaleX: 0, opacity: 0 }}
                                    whileInView={{ scaleX: 1, opacity: 1 }}
                                    viewport={{ once: true, amount: 1 }}
                                    transition={{
                                        duration: 0.8,
                                        ease: easeCurve,
                                        delay: 0.25,
                                    }}
                                />
                            </motion.span>
                        </motion.h1>

                        <motion.p
                            className="font-[Heebo] mt-4 text-[15px] sm:text-base leading-8 text-center font-medium"
                            style={{ color: bodyColor }}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true, amount: 0.4 }}
                            variants={fadeUp}
                            custom={2}
                        >
                            בדקו כמה כסף מגיע לכם ממס הכנסה – אנחנו נלווה אתכם
                            עד לקבלת ההחזר בפועל!
                        </motion.p>
                        <QuickCheckForm />
                    </div>
                </div>
            </div>
        </section>
    );
}
