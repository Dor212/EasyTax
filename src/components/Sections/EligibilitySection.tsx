import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import type { Variants } from "framer-motion";

const ACCENT = "#7CE86A" as const;
const TEXT = "#3A3A4A" as const;

type EligibilitySectionProps = {
    id?: string;
    className?: string;
};

const easeCurve = [0.22, 1, 0.36, 1] as const;

const fadeUp: Variants = {
    hidden: { opacity: 0, y: 20 },
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

type StatProps = {
    label: string;
    prefix?: string;
    suffix?: string;
    target: number;
    index: number;
    isPercent?: boolean;
    duration?: number;
};

function TimelineCircleStat({
    label,
    prefix,
    suffix,
    target,
    index,
    isPercent,
    duration = 1800,
}: StatProps) {
    const ref = useRef<HTMLDivElement | null>(null);
    const inView = useInView(ref, { amount: 0.4 });
    const value = useCountUp(target, inView, duration);

    return (
        <motion.div
            ref={ref}
            className="relative flex flex-col items-center py-8 text-center"
            variants={fadeUp}
            custom={index}
        >
            <div className="relative grid place-items-center size-36 sm:size-44 md:size-52">
                <motion.svg
                    width="100%"
                    height="100%"
                    viewBox="0 0 120 120"
                    className="absolute inset-0"
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.4, ease: easeCurve }}
                >
                    <motion.circle
                        cx="60"
                        cy="60"
                        r="52"
                        stroke={ACCENT}
                        strokeWidth="5"
                        fill="none"
                        strokeDasharray="326"
                        strokeDashoffset={326}
                        initial={{ strokeDashoffset: 326 }}
                        animate={
                            inView
                                ? { strokeDashoffset: 0 }
                                : { strokeDashoffset: 326 }
                        }
                        transition={{
                            duration: 1.6,
                            ease: "easeInOut",
                        }}
                    />
                </motion.svg>

                <div className="relative size-[78%] rounded-full bg-white/92 backdrop-blur-[4px] shadow-md flex items-center justify-center">
                    <span
                        className="font-mono text-3xl font-extrabold sm:text-4xl md:text-5xl"
                        style={{ color: ACCENT }}
                    >
                        {prefix}
                        {isPercent ? value : formatNumber(value)}
                        {suffix}
                    </span>
                </div>
            </div>

            <motion.div
                className="relative mt-4 font-[Heebo] text-sm sm:text-base font-semibold"
                style={{ color: TEXT }}
                initial={{ opacity: 0, y: 5 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.05 }}
            >
                {label}
                <motion.span
                    className="absolute left-1/2 -translate-x-1/2 bottom-[-4px] h-[2px] rounded-full"
                    style={{ background: ACCENT, width: "50%", opacity: 0.85 }}
                    initial={{ scaleX: 0 }}
                    animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
                    transition={{ duration: 0.7, ease: easeCurve }}
                />
            </motion.div>
        </motion.div>
    );
}

export default function EligibilitySection({
    id = "eligibility",
    className = "",
}: EligibilitySectionProps) {
    return (
        <section
            id={id}
            dir="rtl"
            className={`w-full py-20 md:py-28 ${className}`}
        >
            <div className="max-w-5xl px-4 mx-auto">
                <motion.div
                    className="flex flex-col items-center mb-10 text-center"
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.4 }}
                    variants={fadeUp}
                    custom={0}
                >
                    <span
                        className="inline-flex items-center px-4 py-1 text-xs font-medium tracking-wide rounded-full"
                        style={{
                            backgroundColor: "rgba(124,232,106,0.12)",
                            color: ACCENT,
                        }}
                    >
                        המספרים שמדברים בעד עצמם
                    </span>
                </motion.div>

                <motion.div
                    className="relative max-w-3xl mx-auto"
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.4 }}
                    variants={fadeUp}
                    custom={1}
                >
                    <motion.div
                        className="absolute left-1/2 -translate-x-1/2 top-0 w-[2px] h-full rounded-full"
                        style={{
                            background: "rgba(124,232,106,0.45)",
                            transformOrigin: "center top",
                        }}
                        initial={{ scaleY: 0 }}
                        whileInView={{ scaleY: 1 }}
                        viewport={{ once: true, amount: 0.6 }}
                        transition={{ duration: 1, ease: easeCurve }}
                    />
                    <div className="space-y-4">
                        <TimelineCircleStat
                            index={0}
                            target={92}
                            isPercent
                            suffix="%"
                            label="אחוזי הצלחה בבדיקת זכאות"
                            duration={1200}
                        />
                        <TimelineCircleStat
                            index={1}
                            target={75000}
                            label="ישראלים שכבר גילו שמגיע להם כסף"
                            duration={1800}
                        />
                        <TimelineCircleStat
                            index={2}
                            target={9870}
                            prefix="₪"
                            label="ממוצע החזר מס ללקוח"
                            duration={2100}
                        />
                    </div>
                </motion.div>

                <motion.div
                    className="flex justify-center mt-16"
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.4 }}
                    variants={fadeUp}
                    custom={2}
                >
                    <div className="w-full max-w-3xl rounded-2xl border border-[rgba(124,232,106,0.35)] bg-white/90 backdrop-blur-[4px] px-5 py-6 sm:px-7 sm:py-7 shadow-sm text-center">
                        <motion.h3
                            className="font-[Heebo] text-lg sm:text-xl md:text-2xl font-extrabold mb-3"
                            style={{ color: TEXT }}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.7 }}
                            transition={{ duration: 0.6, ease: easeCurve }}
                        >
                            למה בעצם הקמנו את{" "}
                            <motion.span
                                className="relative inline-block px-1"
                                initial={{ scale: 0.95 }}
                                whileInView={{ scale: 1 }}
                                viewport={{ once: true, amount: 0.8 }}
                                transition={{
                                    duration: 0.5,
                                    ease: easeCurve,
                                    delay: 0.15,
                                }}
                            >
                                <span
                                    className="absolute inset-0 rounded-xl"
                                    style={{
                                        background: "rgba(124,232,106,0.18)",
                                    }}
                                />
                                <span className="relative z-10">EasyTax</span>
                            </motion.span>
                            ?
                        </motion.h3>

                        <motion.p
                            className="font-[Heebo] text-[14px] sm:text-[15px] leading-7 mb-2"
                            style={{ color: TEXT }}
                            variants={fadeUp}
                            custom={3}
                        >
                            ראינו יותר מדי שכירים שמוותרים על אלפי שקלים שמגיעים להם
                            כי התהליך מול מס הכנסה מרגיש מסובך, מבלבל ומפחיד.
                        </motion.p>

                        <motion.p
                            className="font-[Heebo] text-[14px] sm:text-[15px] leading-7 mb-2"
                            style={{ color: TEXT }}
                            variants={fadeUp}
                            custom={4}
                        >
                            EasyTax נולדה כדי לקחת את כל הבירוקרטיה אלינו ולהשאיר אצלך
                            רק כמה לחיצות. הכל דיגיטלי, מסודר וברור בלי טפסים מיותרים.
                        </motion.p>

                        <motion.p
                            className="font-[Heebo] text-[14px] sm:text-[15px] leading-7 font-semibold"
                            style={{ color: TEXT }}
                            variants={fadeUp}
                            custom={5}
                        >
                            המטרה שלנו פשוטה להחזיר לך את מה שמגיע לך במקום שישאר אצל המדינה.
                        </motion.p>
                    </div>
                </motion.div>

                <motion.div
                    className="flex justify-center mt-10"
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.4 }}
                    variants={fadeUp}
                    custom={3}
                >
                    <a
                        href="#quick-check"
                        className="inline-flex items-center justify-center rounded-2xl px-6 py-3 text-sm sm:text-base font-[Heebo] font-semibold shadow-md hover:shadow-lg transition active:scale-[0.98]"
                        style={{
                            backgroundColor: ACCENT,
                            color: "#ffffff",
                            boxShadow: "0 0 20px rgba(124,232,106,0.6)",
                        }}
                    >
                        בודקים זכאות תוך דקות
                    </a>
                </motion.div>
            </div>
        </section>
    );
}
