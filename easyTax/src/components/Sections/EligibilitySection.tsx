import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import type { Variants } from "framer-motion";

const ACCENT = "#5BA14D" as const;
const TEXT = "#3A3A4A" as const;

type EligibilitySectionProps = {
    id?: string;
    className?: string;
};

const easeCurve = [0.22, 1, 0.36, 1] as const;

const fadeUp: Variants = {
    hidden: { opacity: 0, y: 24 },
    show: (i = 0) => ({
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            delay: 0.12 * i,
            ease: easeCurve,
        },
    }),
};

function useCountUp(target: number, inView: boolean, duration = 1500) {
    const [value, setValue] = useState(0);

    useEffect(() => {
        let frame: number;

        if (!inView) {
            setValue(0);
            return () => {
                if (frame) cancelAnimationFrame(frame);
            };
        }

        let start: number | null = null;

        const step = (timestamp: number) => {
            if (start === null) start = timestamp;
            const progress = Math.min((timestamp - start) / duration, 1);
            setValue(Math.round(progress * target));
            if (progress < 1) {
                frame = requestAnimationFrame(step);
            }
        };

        frame = requestAnimationFrame(step);

        return () => {
            if (frame) cancelAnimationFrame(frame);
        };
    }, [target, duration, inView]);

    return value;
}

function formatNumber(n: number) {
    return n.toLocaleString("he-IL");
}

type StatCardProps = {
    label: string;
    suffix?: string;
    prefix?: string;
    target: number;
    index: number;
    isPercent?: boolean;
    duration?: number;
};

function StatCard({ label, suffix, prefix, target, index, isPercent, duration = 1600 }: StatCardProps) {
    const ref = useRef<HTMLDivElement | null>(null);
    const inView = useInView(ref, { amount: 0.5 });
    const value = useCountUp(target, inView, duration);

    return (
        <motion.div
            ref={ref}
            className="flex flex-col items-center gap-3 text-center"
            variants={fadeUp}
            custom={index}
        >
            <motion.div
                className="relative flex items-center justify-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0.7, scale: 0.95 }}
                transition={{ duration: 0.7, ease: easeCurve }}
            >
                <div
                    className="relative flex items-center justify-center border-2 rounded-full shadow-sm size-28 sm:size-32 md:size-36"
                    style={{ borderColor: ACCENT }}
                >
                    <div
                        className="absolute w-2 h-2 -translate-x-1/2 rounded-full -top-1 left-1/2"
                        style={{ backgroundColor: ACCENT }}
                    />

                    <motion.div
                        className="absolute rounded-full inset-4"
                        initial={{ boxShadow: "0 0 0 rgba(91,161,77,0)" }}
                        animate={
                            inView
                                ? { boxShadow: "0 0 24px rgba(91,161,77,0.45)" }
                                : { boxShadow: "0 0 0 rgba(91,161,77,0)" }
                        }
                        transition={{
                            duration: 1.8,
                            ease: "easeInOut",
                            repeat: inView ? Infinity : 0,
                            repeatType: "reverse",
                        }}
                    />

                    <span
                        className="relative z-10 font-[Heebo] text-xl sm:text-2xl font-semibold"
                        style={{ color: TEXT }}
                    >
                        {prefix && <span className="ml-1">{prefix}</span>}
                        {isPercent ? value : formatNumber(value)}
                        {suffix && <span className="mr-1">{suffix}</span>}
                    </span>
                </div>
            </motion.div>

            <p
                className="font-[Heebo] text-[13px] sm:text-[14px] leading-6 max-w-[14rem]"
                style={{ color: TEXT }}
            >
                {label}
            </p>
        </motion.div>
    );
}

export default function EligibilitySection({ id = "eligibility", className = "" }: EligibilitySectionProps) {
    return (
        <section id={id} dir="rtl" className={`w-full py-16 md:py-24 ${className}`}>
            <div className="max-w-6xl px-4 mx-auto sm:px-6 lg:px-8">
                <motion.div
                    className="flex flex-col items-center gap-4 text-center"
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.4 }}
                    variants={fadeUp}
                    custom={0}
                >
                    <span
                        className="inline-flex items-center px-4 py-1 text-xs font-medium tracking-wide rounded-full"
                        style={{ backgroundColor: "rgba(91,161,77,0.12)", color: ACCENT }}
                    >
                        המספרים שמדברים בעד עצמם
                    </span>

                    <motion.h2
                        className="font-[Heebo] text-2xl sm:text-3xl md:text-4xl font-semibold leading-tight"
                        style={{ color: TEXT }}
                        variants={fadeUp}
                        custom={1}
                    >
                        בודקים זכאות להחזר מס – במהירות ובשקיפות
                    </motion.h2>

                    <motion.p
                        className="font-[Heebo] text-[15px] sm:text-base leading-8 max-w-2xl"
                        style={{ color: TEXT }}
                        variants={fadeUp}
                        custom={2}
                    >
                        הנתונים למטה מתעדכנים בזמן אמת ומבוססים על אלפי בדיקות שביצענו. ככה תוכל להבין כבר עכשיו
                        אם שווה לך להתחיל תהליך.
                    </motion.p>
                </motion.div>

                <motion.div
                    className="grid grid-cols-1 gap-8 mt-10 sm:grid-cols-3 sm:gap-6 md:gap-10 justify-items-center"
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.4 }}
                    variants={fadeUp}
                    custom={3}
                >
                    <StatCard
                        index={0}
                        target={92}
                        isPercent
                        suffix="%"
                        label="אחוזי הצלחה בבדיקת זכאות"
                        duration={1200}
                    />
                    <StatCard
                        index={1}
                        target={75000}
                        label="ישראלים שקיבלו זכאות להחזרי מס"
                        duration={1800}
                    />
                    <StatCard
                        index={2}
                        target={9870}
                        prefix="₪"
                        label="ממוצע החזר מס ללקוח"
                        duration={2100}
                    />
                </motion.div>

                <motion.div
                    className="flex justify-center mt-10"
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.4 }}
                    variants={fadeUp}
                    custom={6}
                >
                    <a
                        href="#questionnaire"
                        className="inline-flex items-center justify-center rounded-2xl px-6 py-3 text-sm sm:text-base font-[Heebo] font-semibold shadow-md hover:shadow-lg transition active:scale-[0.98]"
                        style={{ backgroundColor: ACCENT, color: "#ffffff" }}
                    >
                        בדוק זכאות
                    </a>
                </motion.div>
            </div>
        </section>
    );
}
