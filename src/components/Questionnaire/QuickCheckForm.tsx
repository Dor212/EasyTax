import { useState } from "react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";

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

type Step = 1 | 2 | 3 | 4;

const WHATSAPP_NUMBER = "972526134057";

export default function QuickCheckForm() {
    const [step, setStep] = useState<Step>(1);
    const [fullName, setFullName] = useState("");
    const [phone, setPhone] = useState("");
    const [salaryRange, setSalaryRange] = useState<string | null>(null);
    const [changedJob, setChangedJob] = useState<"yes" | "no" | null>(null);
    const [benefits, setBenefits] = useState<string[]>([]);
    const [isSending, setIsSending] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const salaryOptions = [
        { id: "under8", label: "מתחת ל־8,000 ₪" },
        { id: "8to10", label: "8,000–10,000 ₪" },
        { id: "10to15", label: "10,000–15,000 ₪" },
        { id: "15plus", label: "15,000 ₪ ומעלה" },
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

    const sendFormToServer = async () => {
        try {
            setIsSending(true);
            setError(null);

            const apiUrl =
                import.meta.env.VITE_API_URL || "http://localhost:5000";

            const res = await fetch(`${apiUrl}/api/forms`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    site: "EasyTax",
                    formType: "questionnaire-lead",
                    notify: {
                        emailTo: "Easy.tax.il123@gmail.com",
                    },
                    data: {
                        fullName,
                        phone,
                        salaryRange,
                        changedJob,
                        benefits,
                    },
                }),
            });

            const json = await res.json();

            if (!res.ok || !json.ok) {
                throw new Error(json.message || "שגיאה בשליחת הטופס");
            }

            console.log("✅ טופס נשלח בהצלחה:", json);
        } catch (err: unknown) {
            console.error("❌ שגיאה בשליחה:", err);
            const message =
                err instanceof Error
                    ? err.message
                    : typeof err === "string"
                        ? err
                        : "שגיאה בלתי צפויה בשליחת הטופס";
            setError(message);
        } finally {
            setIsSending(false);
        }
    };

    const handleFinish = async () => {
        if (!isStep3Valid) return;
        await sendFormToServer();
        setStep(4);
    };

    const buildWhatsappLink = () => {
        const msg = `שלום, קוראים לי ${fullName || "—"}.
סיימתי עכשיו את שאלון הזכאות באתר EasyTax.
הטלפון שלי: ${phone || "—"}.
אשמח לשיחה עם נציג להמשך טיפול. תודה!`;
        return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
    };

    const openWhatsapp = () => {
        const link = buildWhatsappLink();
        window.open(link, "_blank");
    };

    return (
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

                {error && (
                    <p className="text-xs text-center text-red-500">
                        {error}
                    </p>
                )}

                {step === 1 && (
                    <div className="space-y-4">
                        <h2
                            className="font-[Heebo] text-base sm:text-lg font-semibold text-center"
                            style={{ color: bodyColor }}
                        >
                            בואו נכיר רגע
                        </h2>
                        <p className="text-xs text-center text-gray-600 sm:text-sm">
                            כמה פרטים קצרים, ומשם אנחנו כבר עושים בשבילכם את
                            העבודה.
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
                                        setFullName(e.target.value)
                                    }
                                    className="w-full rounded-xl border border-[#d1d5db] bg-white px-3 py-2.5 text-sm text-center outline-none focus:border-[rgba(124,232,106,0.9)] focus:ring-1 focus:ring-[rgba(124,232,106,0.4)]"
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
                                        setPhone(e.target.value)
                                    }
                                    className="w-full rounded-xl border border-[#d1d5db] bg-white px-3 py-2.5 text-sm text-center outline-none focus:border-[rgba(124,232,106,0.9)] focus:ring-1 focus:ring-[rgba(124,232,106,0.4)]"
                                    placeholder="לדוגמה: 050-1234567"
                                />
                            </div>
                        </div>
                        <button
                            type="button"
                            onClick={() => isStep1Valid && setStep(2)}
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
                                const active = salaryRange === opt.id;
                                return (
                                    <button
                                        key={opt.id}
                                        type="button"
                                        onClick={() =>
                                            setSalaryRange(opt.id)
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
                            onClick={() => isStep2Valid && setStep(3)}
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
                                                    val as "yes" | "no"
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
                                            {val === "yes" ? "כן" : "לא"}
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
                                    const active = benefits.includes(opt.id);
                                    return (
                                        <button
                                            key={opt.id}
                                            type="button"
                                            onClick={() =>
                                                toggleBenefit(opt.id)
                                            }
                                            className={`w-full rounded-xl border px-3 py-2 text-xs sm:text-sm text-center transition ${active
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
                            onClick={handleFinish}
                            disabled={!isStep3Valid || isSending}
                            className="mt-2 inline-flex w-full items-center justify-center rounded-xl px-4 py-2.5 text-sm font-semibold text-white transition disabled:opacity-60 disabled:cursor-not-allowed"
                            style={{
                                background: accentGlow,
                                boxShadow:
                                    "0 0 20px rgba(124, 232, 106, 0.6)",
                            }}
                        >
                            {isSending ? "שולח..." : "סיום הבדיקה"}
                        </button>
                    </div>
                )}

                {step === 4 && (
                    <div className="flex flex-col items-center gap-4 py-2 text-center">
                        <div
                            className="flex items-center justify-center rounded-full h-14 w-14"
                            style={{
                                background: "rgba(124,232,106,0.12)",
                                boxShadow:
                                    "0 0 22px rgba(124,232,106,0.7)",
                            }}
                        >
                            <span className="text-2xl">✅</span>
                        </div>
                        <div className="space-y-1">
                            <p
                                className="font-[Heebo] text-base sm:text-lg font-semibold"
                                style={{ color: bodyColor }}
                            >
                                תודה {fullName || "לך"}!
                            </p>
                            <p className="font-[Heebo] text-sm sm:text-base text-gray-600">
                                נציגינו יחזרו אליך בהקדם להמשך תהליך החזר המס.
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={openWhatsapp}
                            className="mt-1 inline-flex items-center justify-center gap-2 w-full rounded-xl px-4 py-2.5 text-sm font-semibold text-white transition"
                            style={{
                                background: accentGlow,
                                boxShadow:
                                    "0 0 20px rgba(124, 232, 106, 0.6)",
                            }}
                        >
                            <FaWhatsapp className="text-lg" />
                            לשיחה עם נציג בוואטסאפ
                        </button>

                        <p className="text-[11px] sm:text-xs text-gray-500">
                            בלחיצה תיפתח שיחה מוכנה עם נציג EasyTax
                        </p>
                    </div>
                )}
            </div>
        </motion.div>
    );
}
