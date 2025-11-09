import { useState } from "react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";

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
    const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
    const [fullName, setFullName] = useState("");
    const [phone, setPhone] = useState("");
    const [salaryRange, setSalaryRange] = useState<string | null>(null);
    const [changedJob, setChangedJob] = useState<"yes" | "no" | null>(null);
    const [benefits, setBenefits] = useState<string[]>([]);

    const salaryOptions = [
        { id: "under8", label: 'מתחת ל־8,000 ₪' },
        { id: "8to10", label: '8,000–10,000 ₪' },
        { id: "10to15", label: '10,000–15,000 ₪' },
        { id: "15plus", label: '15,000 ₪ ומעלה' },
    ];

    const benefitOptions = [
        { id: "unemployment", label: "דמי אבטלה" },
        { id: "maternity", label: "דמי לידה" },
        { id: "military", label: "מילואים" },
        { id: "halat", label: 'חל"ת' },
    ];

    const toggleBenefit = (id: string) => {
        setBenefits((prev) =>
            prev.includes(id) ? prev.filter((b) => b !== id) : [...prev, id]
        );
    };

    const isStep1Valid = fullName.trim().length > 1 && phone.trim().length >= 7;
    const isStep2Valid = !!salaryRange;
    const isStep3Valid = !!changedJob;

    return (
        <section
            id={id}
            dir="rtl"
            className={`w-full pt-28 md:pt-32 pb-16 md:pb-24 ${className}`}
        >
            <div className="max-w-6xl px-4 mx-auto sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-16 place-items-center">
                    {/* לוגו + עיגול מצויר */}
                    <motion.div
                        className="relative grid size-56 sm:size-64 md:size-72 place-items-center"
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, amount: 0.4 }}
                        variants={fadeUp}
                        custom={0}
                    >
                        <motion.svg
                            width="100%"
                            height="100%"
                            viewBox="0 0 100 100"
                            className="absolute inset-0"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true, amount: 0.6 }}
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
                                whileInView={{ strokeDashoffset: 0 }}
                                viewport={{ once: true, amount: 0.7 }}
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
                            viewport={{ once: true, amount: 0.4 }}
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
                                        transformOrigin: "100% 50%", // מתחיל מהצד הימני
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

                        <motion.div
                            id="quick-check"
                            className="mt-8"
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true, amount: 0.4 }}
                            variants={fadeUp}
                            custom={3}
                        >
                            <div className="w-full rounded-2xl border border-[#e5e7eb] bg-white/90 backdrop-blur-[4px] shadow-sm px-4 py-5 sm:px-5 sm:py-6 space-y-4">
                                {step <= 3 && (
                                    <div className="flex items-center justify-between mb-1 text-xs text-gray-500 sm:text-sm">
                                        <span>בדיקת זכאות ראשונית</span>
                                        <span>שלב {step} מתוך 3</span>
                                    </div>
                                )}

                                {/* שלב 1 */}
                                {step === 1 && (
                                    <div className="space-y-4">
                                        <h2
                                            className="font-[Heebo] text-base sm:text-lg font-semibold text-center"
                                            style={{ color: bodyColor }}
                                        >
                                            בואו נכיר רגע 
                                        </h2>
                                        <p className="text-xs text-center text-gray-600 sm:text-sm">
                                            כמה פרטים קצרים, ומשם אנחנו כבר
                                            עושים בשבילכם את העבודה.
                                        </p>
                                        <div className="space-y-3">
                                            <div className="space-y-1">
                                                <label className="block text-xs text-center text-gray-600 sm:text-sm">
                                                    איך קוראים לך?
                                                </label>
                                                <input
                                                    type="text"
                                                    value={fullName}
                                                    onChange={(e) =>
                                                        setFullName(
                                                            e.target.value
                                                        )
                                                    }
                                                    className="w-full rounded-xl border border-[#d1d5db] bg:white px-3 py-2.5 text-sm text-center outline-none focus:border-[rgba(124,232,106,0.9)] focus:ring-1 focus:ring-[rgba(124,232,106,0.4)]"
                                                    placeholder="לדוגמה: נטע ישראלי"
                                                />
                                            </div>
                                            <div className="space-y-1">
                                                <label className="block text-xs text-center text-gray-600 sm:text-sm">
                                                    מספר נייד לחזרה
                                                </label>
                                                <input
                                                    type="tel"
                                                    value={phone}
                                                    onChange={(e) =>
                                                        setPhone(
                                                            e.target.value
                                                        )
                                                    }
                                                    className="w-full rounded-xl border border-[#d1d5db] bg:white px-3 py-2.5 text-sm text-center outline-none focus:border-[rgba(124,232,106,0.9)] focus:ring-1 focus:ring-[rgba(124,232,106,0.4)]"
                                                    placeholder="לדוגמה: 050-1234567"
                                                />
                                            </div>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() =>
                                                isStep1Valid && setStep(2)
                                            }
                                            disabled={!isStep1Valid}
                                            className="mt-2 inline-flex w-full items-center justify-center rounded-xl px-4 py-2.5 text-sm font-semibold text-white transition disabled:opacity-60 disabled:cursor-not-allowed"
                                            style={{
                                                background: accentGlow,
                                                boxShadow:
                                                    "0 0 20px rgba(124, 232, 106, 0.6)",
                                            }}
                                        >
                                            יאללה, נבדוק אם מגיע לכם כסף
                                        </button>
                                    </div>
                                )}

                                {/* שלב 2 */}
                                {step === 2 && (
                                    <div className="space-y-4">
                                        <h2
                                            className="font-[Heebo] text-base sm:text-lg font-semibold text-center"
                                            style={{ color: bodyColor }}
                                        >
                                            אנא בחר/י את גובה המשכורת שלך
                                        </h2>
                                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                                            {salaryOptions.map((opt) => {
                                                const active =
                                                    salaryRange === opt.id;
                                                return (
                                                    <button
                                                        key={opt.id}
                                                        type="button"
                                                        onClick={() =>
                                                            setSalaryRange(
                                                                opt.id
                                                            )
                                                        }
                                                        className={`w-full rounded-xl border px-3 py-2.5 text-sm text-center transition ${active
                                                                ? "text-white"
                                                                : "text-gray-800 bg-white hover:bg-[rgba(124,232,106,0.06)]"
                                                            }`}
                                                        style={{
                                                            borderColor: active
                                                                ? accentGlow
                                                                : `${accentGlow}33`,
                                                            backgroundColor: active
                                                                ? accentGlow
                                                                : undefined,
                                                            boxShadow: active
                                                                ? "0 0 16px rgba(124,232,106,0.6)"
                                                                : "none",
                                                        }}
                                                    >
                                                        {opt.label}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() =>
                                                isStep2Valid && setStep(3)
                                            }
                                            disabled={!isStep2Valid}
                                            className="mt-2 inline-flex w-full items-center justify-center rounded-xl px-4 py-2.5 text-sm font-semibold text-white transition disabled:opacity-60 disabled:cursor-not-allowed"
                                            style={{
                                                background: accentGlow,
                                                boxShadow:
                                                    "0 0 20px rgba(124, 232, 106, 0.6)",
                                            }}
                                        >
                                            המשך
                                        </button>
                                    </div>
                                )}

                                {/* שלב 3 */}
                                {step === 3 && (
                                    <div className="space-y-5">
                                        <div className="space-y-3">
                                            <h2
                                                className="font-[Heebo] text-base sm:text-lg font-semibold text-center"
                                                style={{ color: bodyColor }}
                                            >
                                                האם בשש השנים האחרונות החלפת עבודה?
                                            </h2>
                                            <div className="grid grid-cols-2 gap-3">
                                                {["yes", "no"].map((val) => {
                                                    const active =
                                                        changedJob ===
                                                        (val as "yes" | "no");
                                                    return (
                                                        <button
                                                            key={val}
                                                            type="button"
                                                            onClick={() =>
                                                                setChangedJob(
                                                                    val as
                                                                    | "yes"
                                                                    | "no"
                                                                )
                                                            }
                                                            className={`w-full rounded-xl border px-3 py-2.5 text-sm text-center transition ${active
                                                                    ? "text-white"
                                                                    : "text-gray-800 bg-white hover:bg-[rgba(124,232,106,0.06)]"
                                                                }`}
                                                            style={{
                                                                borderColor:
                                                                    active
                                                                        ? accentGlow
                                                                        : `${accentGlow}33`,
                                                                backgroundColor:
                                                                    active
                                                                        ? accentGlow
                                                                        : undefined,
                                                                boxShadow:
                                                                    active
                                                                        ? "0 0 16px rgba(124,232,106,0.6)"
                                                                        : "none",
                                                            }}
                                                        >
                                                            {val === "yes"
                                                                ? "כן"
                                                                : "לא"}
                                                        </button>
                                                    );
                                                })}
                                            </div>
                                        </div>

                                        <div className="space-y-3">
                                            <h3
                                                className="font-[Heebo] text-sm sm:text-base font-semibold text-center"
                                                style={{ color: bodyColor }}
                                            >
                                                האם קיבלת באחת מהשנים האחרונות:
                                            </h3>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                                                {benefitOptions.map((opt) => {
                                                    const active =
                                                        benefits.includes(
                                                            opt.id
                                                        );
                                                    return (
                                                        <button
                                                            key={opt.id}
                                                            type="button"
                                                            onClick={() =>
                                                                toggleBenefit(
                                                                    opt.id
                                                                )
                                                            }
                                                            className={`w-full rounded-xl border px-3 py-2 text-xs sm:text-sm text-center transition ${active
                                                                    ? "text-white"
                                                                    : "text-gray-800 bg-white hover:bg-[rgba(124,232,106,0.06)]"
                                                                }`}
                                                            style={{
                                                                borderColor:
                                                                    active
                                                                        ? accentGlow
                                                                        : `${accentGlow}33`,
                                                                backgroundColor:
                                                                    active
                                                                        ? accentGlow
                                                                        : undefined,
                                                            }}
                                                        >
                                                            {opt.label}
                                                        </button>
                                                    );
                                                })}
                                            </div>
                                            <p className="text-[11px] sm:text-xs text-center text-gray-500">
                                                ניתן לבחור יותר מאפשרות אחת
                                            </p>
                                        </div>

                                        <button
                                            type="button"
                                            onClick={() =>
                                                isStep3Valid && setStep(4)
                                            }
                                            disabled={!isStep3Valid}
                                            className="mt-2 inline-flex w-full items-center justify-center rounded-xl px-4 py-2.5 text-sm font-semibold text-white transition disabled:opacity-60 disabled:cursor-not-allowed"
                                            style={{
                                                background: accentGlow,
                                                boxShadow:
                                                    "0 0 20px rgba(124, 232, 106, 0.6)",
                                            }}
                                        >
                                            סיום הבדיקה
                                        </button>
                                    </div>
                                )}

                                {/* מסך הצלחה */}
                                {step === 4 && (
                                    <div className="flex flex-col items-center gap-3 py-2 text-center">
                                        <div
                                            className="flex items-center justify-center rounded-full h-14 w-14"
                                            style={{
                                                background:
                                                    "rgba(124,232,106,0.12)",
                                                boxShadow:
                                                    "0 0 22px rgba(124,232,106,0.7)",
                                            }}
                                        >
                                            <span className="text-2xl">
                                                ✅
                                            </span>
                                        </div>
                                        <div className="space-y-1">
                                            <p
                                                className="font-[Heebo] text-base sm:text-lg font-semibold"
                                                style={{ color: bodyColor }}
                                            >
                                                תודה {fullName || "לך"}!
                                            </p>
                                            <p className="font-[Heebo] text-sm sm:text-base text-gray-600">
                                                נציגינו יצרו איתך קשר בהקדם
                                                להמשך תהליך החזר המס.
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
