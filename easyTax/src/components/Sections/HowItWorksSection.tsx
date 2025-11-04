import React from "react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";

type HowItWorksSectionProps = {
    id?: string;
    className?: string;
};

const ACCENT = "#5BA14D" as const;
const TEXT = "#3A3A4A" as const;

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

type Step = {
    title: string;
    description: string;
    tag?: string;
};

const STEPS: Step[] = [
    {
        title: "ממלאים פרטים בסיסיים",
        description:
            "כמה שאלות קצרות עליך ועל שנות העבודה האחרונות – בלי מסמכים ובלי התחייבות.",
        tag: "פחות מדקה",
    },
    {
        title: "אלגוריתם הזכאות שלנו נכנס לפעולה",
        description:
            "המערכת מנתחת את הנתונים שלך מול נקודות זיכוי, מדרגות מס והטבות רלוונטיות.",
        tag: "בדיקה חכמה",
    },
    {
        title: "מקבלים הערכת החזר בזמן אמת",
        description:
            "תראה האם יש לך פוטנציאל להחזר מס ובאיזה סדר גודל – לפני שמתחילים תהליך מלא.",
        tag: "שקיפות מלאה",
    },
    {
        title: "אנחנו מגישים בשבילך את הבקשה",
        description:
            "אם יש זכאות, אנחנו מלווים אותך בהגשה מסודרת מול רשות המסים עד שתקבל את הכסף לחשבון.",
        tag: "ליווי עד הסוף",
    },
];

function StepPill({ index }: { index: number }) {
    const stepNumber = index + 1;
    return (
        <div className="relative flex items-center justify-center">
            <div
                className="flex items-center justify-center w-8 h-8 text-xs font-bold border-2 rounded-full"
                style={{ borderColor: ACCENT, color: ACCENT }}
            >
                {stepNumber}
            </div>
        </div>
    );
}

type StepCardProps = {
    step: Step;
    index: number;
    align?: "top" | "right" | "bottom" | "left";
};

function StepCard({ step, index, align = "right" }: StepCardProps) {
    const baseAlign =
        align === "right"
            ? "items-end text-right"
            : align === "left"
                ? "items-start text-right"
                : "items-center text-right";

    return (
        <div
            className={`flex flex-col gap-2 rounded-2xl bg-white/90 backdrop-blur-sm px-4 py-4 shadow-[0_12px_35px_rgba(15,23,42,0.14)] border border-white/70 ${baseAlign}`}
        >
            <div className="flex items-center justify-between w-full gap-3">
                <StepPill index={index} />
                {step.tag && (
                    <span
                        className="rounded-full px-3 py-1 text-[11px] font-[Heebo] font-medium whitespace-nowrap"
                        style={{
                            backgroundColor: "rgba(91,161,77,0.08)",
                            color: ACCENT,
                        }}
                    >
                        {step.tag}
                    </span>
                )}
            </div>

            <h3
                className="mt-1 font-[Heebo] text-[15px] sm:text-[16px] font-semibold leading-snug"
                style={{ color: TEXT }}
            >
                {step.title}
            </h3>

            <p
                className="font-[Heebo] text-[13px] leading-7 opacity-90"
                style={{ color: TEXT }}
            >
                {step.description}
            </p>
        </div>
    );
}

function DesktopRadialLayout() {
    return (
        <div className="relative hidden md:block">
            <div className="relative mx-auto aspect-[4/3] max-w-5xl">
                <motion.div
                    className="absolute inset-0 pointer-events-none"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 0.6 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 1.4, ease: easeCurve }}
                >
                    <div
                        className="absolute w-64 h-64 -translate-x-1/2 -translate-y-1/2 rounded-full left-1/2 top-1/2"
                        style={{
                            background:
                                "radial-gradient(circle at 50% 50%, rgba(91,161,77,0.28), transparent 60%)",
                        }}
                    />
                </motion.div>

                <motion.div
                    className="absolute left-1/2 top-1/2 flex h-40 w-40 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border bg-white/90 shadow-[0_20px_45px_rgba(15,23,42,0.16)] backdrop-blur"
                    style={{ borderColor: "rgba(91,161,77,0.6)" }}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.8, ease: easeCurve }}
                >
                    <motion.div
                        className="absolute inset-0 rounded-full"
                        initial={{ boxShadow: "0 0 0 rgba(91,161,77,0)" }}
                        whileInView={{ boxShadow: "0 0 32px rgba(91,161,77,0.55)" }}
                        viewport={{ once: false, amount: 0.6 }}
                        transition={{
                            duration: 2.2,
                            ease: "easeInOut",
                            repeat: Infinity,
                            repeatType: "reverse",
                        }}
                    />

                    <div className="relative z-10 px-4 text-center">
                        <div
                            className="font-[Heebo] text-sm font-medium tracking-wide"
                            style={{ color: ACCENT }}
                        >
                            תהליך easyTax
                        </div>
                        <div
                            className="mt-1 font-[Heebo] text-lg font-semibold leading-snug"
                            style={{ color: TEXT }}
                        >
                            מהבדיקה
                            <br />
                            להחזר בחשבון
                        </div>
                    </div>
                </motion.div>

                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute left-1/2 top-[14%] h-[22%] w-px -translate-x-1/2 bg-gradient-to-b from-[rgba(91,161,77,0.4)] to-transparent" />
                    <div className="absolute right-[12%] top-1/2 h-px w-[18%] -translate-y-1/2 bg-gradient-to-l from-[rgba(91,161,77,0.4)] to-transparent" />
                    <div className="absolute left-1/2 bottom-[14%] h-[22%] w-px -translate-x-1/2 bg-gradient-to-t from-[rgba(91,161,77,0.4)] to-transparent" />
                    <div className="absolute left-[12%] top-1/2 h-px w-[18%] -translate-y-1/2 bg-gradient-to-r from-[rgba(91,161,77,0.4)] to-transparent" />
                </div>

                <motion.ul
                    className="relative w-full h-full"
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.4 }}
                    variants={fadeUp}
                    custom={2}
                >
                    <motion.li
                        variants={fadeUp}
                        custom={3}
                        className="absolute right-[10%] top-[4%] max-w-xs"
                    >
                        <StepCard step={STEPS[0]} index={0} align="top" />
                    </motion.li>

                    <motion.li
                        variants={fadeUp}
                        custom={4}
                        className="absolute right-[2%] top-1/2 max-w-xs -translate-y-1/2"
                    >
                        <StepCard step={STEPS[1]} index={1} align="right" />
                    </motion.li>

                    <motion.li
                        variants={fadeUp}
                        custom={5}
                        className="absolute left-[10%] bottom-[4%] max-w-xs"
                    >
                        <StepCard step={STEPS[2]} index={2} align="bottom" />
                    </motion.li>

                    <motion.li
                        variants={fadeUp}
                        custom={6}
                        className="absolute left-[2%] top-1/2 max-w-xs -translate-y-1/2"
                    >
                        <StepCard step={STEPS[3]} index={3} align="left" />
                    </motion.li>
                </motion.ul>
            </div>
        </div>
    );
}

function MobileTimeline() {
    return (
        <div className="mt-8 md:hidden">
            <motion.ul
                className="relative grid grid-cols-1 gap-5"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.4 }}
                variants={fadeUp}
                custom={2}
            >
                {STEPS.map((step, index) => (
                    <motion.li
                        key={index}
                        variants={fadeUp}
                        custom={index + 3}
                        className="relative flex gap-3 rounded-2xl bg-white/90 backdrop-blur-sm px-4 py-4 shadow-[0_10px_30px_rgba(15,23,42,0.12)] border border-white/70"
                    >
                        <div className="mt-1 shrink-0">
                            <StepPill index={index} />
                        </div>
                        <div className="flex flex-col gap-1 text-right">
                            <div className="flex items-center justify-between gap-2">
                                <h3
                                    className="font-[Heebo] text-[15px] sm:text-[16px] font-semibold leading-snug"
                                    style={{ color: TEXT }}
                                >
                                    {step.title}
                                </h3>
                                {step.tag && (
                                    <span
                                        className="whitespace-nowrap rounded-full px-2 py-1 text-[10px] font-[Heebo] font-medium"
                                        style={{
                                            backgroundColor: "rgba(91,161,77,0.08)",
                                            color: ACCENT,
                                        }}
                                    >
                                        {step.tag}
                                    </span>
                                )}
                            </div>
                            <p
                                className="font-[Heebo] text-[12px] leading-6 opacity-90"
                                style={{ color: TEXT }}
                            >
                                {step.description}
                            </p>
                        </div>
                    </motion.li>
                ))}
            </motion.ul>
        </div>
    );
}

export default function HowItWorksSection({
    id = "how-it-works",
    className = "",
}: HowItWorksSectionProps) {
    const bgUrl = "/BGET2.png";

    return (
        <section
            id={id}
            dir="rtl"
            className={`relative w-full py-16 md:py-24 ${className}`}
        >
            <div
                aria-hidden
                className="absolute inset-0 bg-center bg-cover pointer-events-none -z-20"
                style={{ backgroundImage: `url(${bgUrl})` }}
            />
            <div className="absolute inset-0 -z-10 bg-white/55 backdrop-blur-sm" />

            <div className="relative max-w-6xl px-4 mx-auto sm:px-6 lg:px-8">
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
                        איך עובד התהליך?
                    </span>

                    <motion.h2
                        className="font-[Heebo] text-2xl sm:text-3xl md:text-4xl font-semibold leading-tight"
                        style={{ color: TEXT }}
                        variants={fadeUp}
                        custom={1}
                    >
                        תהליך אחד ברור – מהבדיקה ועד הכסף בחשבון
                    </motion.h2>

                    <motion.p
                        className="font-[Heebo] text-[15px] sm:text-base leading-8 max-w-2xl"
                        style={{ color: TEXT }}
                        variants={fadeUp}
                        custom={2}
                    >
                        בנינו מסלול ברור וקצר: אתה ממלא פרטים, אנחנו מנתחים, מציגים את הפוטנציאל להחזר,
                        ואם יש זכאות – מטפלים בשבילך עד הסוף מול רשות המסים.
                    </motion.p>
                </motion.div>

                <div className="mt-10">
                    <DesktopRadialLayout />
                    <MobileTimeline />
                </div>

                <motion.div
                    className="flex justify-center mt-10"
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={fadeUp}
                    custom={8}
                >
                    <a
                        href="#questionnaire"
                        className="inline-flex items-center justify-center rounded-2xl px-6 py-3 text-sm sm:text-base font-[Heebo] font-semibold shadow-md hover:shadow-lg transition active:scale-[0.98]"
                        style={{ backgroundColor: ACCENT, color: "#ffffff" }}
                    >
                        מתחילים בבדיקת זכאות
                    </a>
                </motion.div>
            </div>
        </section>
    );
}

