import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";

const ACCENT = "#7CE86A";
const TEXT = "#3A3A4A";
const easeCurve = [0.22, 1, 0.36, 1] as const;

type Step = 1 | 2 | 3 | 4 | 5;
type IncomeRange = "below8" | "8to15" | "15to25" | "25plus";
type MaritalStatus = "single" | "married" | "divorced" | "widowed" | "other";

type CriteriaOption = { id: string; label: string; hint: string; iconSrc: string };

const ICON_BASE = `${import.meta.env.BASE_URL}icons/`;
const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";
const ENDPOINT = `${String(API_BASE).replace(/\/$/, "")}/api/forms`;

const WHATSAPP_NUMBER = "972526134057";

const CRITERIA_OPTIONS: CriteriaOption[] = [
    { id: "job-change", label: "החלפת מקום עבודה", hint: "עבדת בשני מקומות או יותר באותה שנה / החלפת עבודה?", iconSrc: `${ICON_BASE}job.gif` },
    { id: "income-change", label: "שינוי משמעותי בשכר", hint: "עליות או ירידות חדות בשכר בשנים האחרונות", iconSrc: `${ICON_BASE}growing.gif` },
    { id: "kids", label: "ילדים שנולדו", hint: "נולדו ילדים ב־6 השנים האחרונות", iconSrc: `${ICON_BASE}baby-boy.gif` },
    { id: "studies", label: "לימודים אקדמיים / מקצועיים", hint: "סיימת לימודים שמזכים בנקודות זיכוי", iconSrc: `${ICON_BASE}graduate.gif` },
    { id: "service", label: "שירות צבאי / לאומי", hint: "שירות משמעותי שלא תמיד חושב עד הסוף", iconSrc: `${ICON_BASE}helmet.gif` },
    { id: "savings", label: "הפקדות לחיסכון / פנסיה", hint: "הפקדות עצמאיות לפנסיה, גמל, קרן השתלמות", iconSrc: `${ICON_BASE}saving-money.gif` },
    { id: "unemployment", label: "אבטלה / חל\"ת", hint: "תקופות עבודה לסירוגין, דמי אבטלה או חל\"ת", iconSrc: `${ICON_BASE}unemployment.gif` },
    { id: "partner", label: "בן/בת זוג לא עובד/ת", hint: "מצב משפחתי שמזכה בהקלות מס", iconSrc: `${ICON_BASE}couple.gif` },
];

const STEPS_LABELS = ["פרטים אישיים", "טווח הכנסה", "מצב משפחתי", "מצבים רלוונטיים", "סיום"];

export default function DeepEligibilityForm() {
    const [step, setStep] = useState<Step>(1);

    const [fullName, setFullName] = useState("");
    const [phone, setPhone] = useState("");
    const [incomeRange, setIncomeRange] = useState<IncomeRange | null>(null);
    const [maritalStatus, setMaritalStatus] = useState<MaritalStatus | null>(null);
    const [criteria, setCriteria] = useState<string[]>([]);

    const [isSending, setIsSending] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const firstName = useMemo(() => {
        const t = fullName.trim();
        return t ? t.split(" ")[0] : "";
    }, [fullName]);

    const incomeLabelMap: Record<IncomeRange, string> = {
        below8: "עד 8,000 ₪ לחודש",
        "8to15": "8,000–15,000 ₪ לחודש",
        "15to25": "15,000–25,000 ₪ לחודש",
        "25plus": "מעל 25,000 ₪ לחודש",
    };

    const maritalLabelMap: Record<MaritalStatus, string> = {
        single: "רווק/ה",
        married: "נשוי/אה",
        divorced: "גרוש/ה",
        widowed: "אלמן/ה",
        other: "אחר",
    };

    const isStep1Valid = fullName.trim().length > 1 && phone.trim().replace(/\D/g, "").length >= 7;
    const isStep2Valid = !!incomeRange;
    const isStep3Valid = !!maritalStatus;

    const toggleCriteria = (id: string) => {
        setCriteria(prev => prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]);
    };

    const sendFormToServer = async () => {
        try {
            setIsSending(true);
            setError(null);

            const readable = {
                income: incomeRange ? incomeLabelMap[incomeRange] : "לא צוין",
                marital: maritalStatus ? maritalLabelMap[maritalStatus] : "לא צוין",
            };

            const res = await fetch(ENDPOINT, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    site: "EasyTax",
                    formType: "questionnaire-deep",
                    notify: { emailTo: "Easy.tax.il123@gmail.com" },
                    data: {
                        fullName,
                        phone,
                        incomeRange,
                        maritalStatus,
                        criteria: CRITERIA_OPTIONS.filter(o => criteria.includes(o.id)).map(o => o.label),
                        readable,
                    },
                }),
            });

            const json = await res.json().catch(() => ({}));
            if (!res.ok || (json && json.ok === false)) {
                throw new Error((json && json.message) || `Server responded ${res.status}`);
            }
        } catch (err: any) {
            console.error("❌ Deep form submit error:", err);
            setError(err?.message || "אירעה תקלה בשליחה. נסה שוב בעוד רגע.");
            return false;
        } finally {
            setIsSending(false);
        }
        return true;
    };

    const goNext = () => {
        if (step === 1 && !isStep1Valid) return;
        if (step === 2 && !isStep2Valid) return;
        if (step === 3 && !isStep3Valid) return;
        setStep((s) => (s < 4 ? ((s + 1) as Step) : s));
    };

    const goPrev = () => setStep((s) => (s > 1 ? ((s - 1) as Step) : s));

    const handleFinish = async () => {
        const ok = await sendFormToServer();
        if (ok) setStep(5);
    };

    const buildWhatsappLink = () => {
        const msg = `שלום, קוראים לי ${fullName || "—"}.
סיימתי עכשיו את השאלון המעמיק באתר EasyTax.
הטלפון שלי: ${phone || "—"}.
אשמח לשיחה עם נציג להמשך טיפול. תודה!`;
        return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
    };

    const openWhatsapp = () => {
        const link = buildWhatsappLink();
        window.open(link, "_blank");
    };

    return (
        <section id="questionnaire" className="flex justify-center w-full px-4 py-16 sm:px-6 bg-[rgba(124,232,106,0.06)]" dir="rtl">
            <div className="w-full max-w-4xl">
                {step <= 4 && (
                    <div className="mb-5">
                        <div className="flex items-center justify-center gap-2 sm:gap-3">
                            {STEPS_LABELS.slice(0, 4).map((label, idx) => {
                                const index = idx + 1;
                                const active = index === step;
                                const done = index < step;
                                return (
                                    <div key={idx} className="flex items-center gap-1 sm:gap-1.5">
                                        <div
                                            className={`flex items-center justify-center rounded-full border text-xs sm:text-[13px] font-[Heebo] px-2.5 py-1.5 min-w-[42px] ${active
                                                ? "border-[rgba(124,232,106,1)] bg-[rgba(124,232,106,0.12)] text-[rgba(58,58,74,0.95)] shadow-[0_0_16px_rgba(124,232,106,0.55)]"
                                                : done
                                                    ? "border-[rgba(124,232,106,0.7)] bg-white text-[rgba(58,58,74,0.9)]"
                                                    : "border-gray-200 bg-white text-gray-500"
                                                }`}
                                        >
                                            <span className="font-semibold">{index}</span>
                                        </div>
                                        <span className="hidden text-[11px] sm:inline font-[Heebo]" style={{ color: active || done ? TEXT : "#9CA3AF" }}>
                                            {label}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                <div className="rounded-3xl p-6 sm:p-8 bg-white/95 backdrop-blur-sm border border-[rgba(124,232,106,0.25)] shadow-[0_18px_45px_rgba(15,23,42,0.16)]">
                    {error && <p className="text-center text-xs sm:text-sm font-[Heebo] text-red-600 mb-4">{error}</p>}

                    {step === 1 && (
                        <div className="space-y-6 text-center">
                            <h3 className="font-[Heebo] text-lg sm:text-xl font-semibold" style={{ color: TEXT }}>נתחיל בהיכרות קצרה 👋</h3>
                            <p className="text-sm sm:text-[15px] font-[Heebo] opacity-80 leading-7" style={{ color: TEXT }}>
                                מלא פרטים כדי שנוכל לפנות אליך אישית.
                                <br />
                                ולחזור אליך עם תשובה מסודרת לגבי הזכאות שלך.
                            </p>

                            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                                <div>
                                    <label className="block mb-1 text-sm font-[Heebo] font-medium text-gray-700">שם מלא</label>
                                    <input
                                        type="text"
                                        value={fullName}
                                        onChange={(e) => setFullName(e.target.value)}
                                        placeholder="שם פרטי ומשפחה"
                                        className="w-full border border-gray-300 rounded-xl px-3 py-2.5 text-sm text-center font-[Heebo] focus:outline-none focus:ring-2 focus:ring-[rgba(124,232,106,0.7)] bg-white"
                                    />
                                </div>
                                <div>
                                    <label className="block mb-1 text-sm font-[Heebo] font-medium text-gray-700">טלפון נייד</label>
                                    <input
                                        type="tel"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        placeholder="05X-XXXXXXX"
                                        className="w-full border border-gray-300 rounded-xl px-3 py-2.5 text-sm text-center font-[Heebo] focus:outline-none focus:ring-2 focus:ring-[rgba(124,232,106,0.7)] bg-white"
                                    />
                                </div>
                            </div>

                            <div className="flex justify-center gap-4 pt-2">
                                <button
                                    type="button"
                                    onClick={goNext}
                                    disabled={!isStep1Valid}
                                    className="px-6 py-2.5 rounded-full text-sm font-[Heebo] font-semibold text-white hover:scale-[1.02] transition-transform disabled:opacity-60"
                                    style={{ backgroundColor: ACCENT }}
                                >
                                    הבא
                                </button>
                            </div>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="space-y-6 text-center">
                            <h3 className="font-[Heebo] text-lg sm:text-xl font-semibold" style={{ color: TEXT }}>
                                {firstName ? `מעולה, ${firstName} – מה טווח ההכנסה החודשית שלך?` : "מעולה, מה טווח ההכנסה החודשית שלך?"}
                            </h3>
                            <p className="text-sm sm:text-[15px] font-[Heebo] opacity-80 leading-7" style={{ color: TEXT }}>
                                לא חייב להיות מדויק עד השקל.
                                <br />
                                מספיק שתבחר את הטווח שהכי משקף את השכר שלך בשנים האחרונות.
                            </p>

                            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                                {([
                                    { value: "below8" as IncomeRange, title: "עד 8,000 ₪", desc: "עבודה חלקית / שכר התחלתי" },
                                    { value: "8to15" as IncomeRange, title: "8,000–15,000 ₪", desc: "סביב השכר הממוצע במשק" },
                                    { value: "15to25" as IncomeRange, title: "15,000–25,000 ₪", desc: "שכר גבוה מהממוצע" },
                                    { value: "25plus" as IncomeRange, title: "מעל 25,000 ₪", desc: "שכר גבוה מאוד" },
                                ]).map((opt) => {
                                    const selected = incomeRange === opt.value;
                                    return (
                                        <button
                                            key={opt.value}
                                            type="button"
                                            onClick={() => setIncomeRange(opt.value)}
                                            className={`flex flex-col items-center rounded-2xl px-4 py-3 border text-sm font-[Heebo] transition transform ${selected
                                                ? "border-[rgba(124,232,106,0.9)] bg-[rgba(124,232,106,0.08)] shadow-[0_0_25px_rgba(124,232,106,0.45)] scale-[1.02]"
                                                : "border-gray-200 bg-white hover:bg-gray-50"
                                                }`}
                                        >
                                            <span className="mb-1 text-base font-semibold" style={{ color: TEXT }}>{opt.title}</span>
                                            <span className="text-[11px] opacity-80">{opt.desc}</span>
                                        </button>
                                    );
                                })}
                            </div>

                            <div className="flex justify-center gap-4 pt-2">
                                <button
                                    type="button"
                                    onClick={goPrev}
                                    className="px-5 py-2 text-sm font-[Heebo] text-gray-700 border border-gray-300 rounded-full hover:bg-gray-50"
                                >
                                    הקודם
                                </button>
                                <button
                                    type="button"
                                    onClick={goNext}
                                    disabled={!isStep2Valid}
                                    className="px-6 py-2.5 rounded-full text-sm font-[Heebo] font-semibold text-white hover:scale-[1.02] transition-transform disabled:opacity-60"
                                    style={{ backgroundColor: ACCENT }}
                                >
                                    הבא
                                </button>
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="space-y-6 text-center">
                            <h3 className="font-[Heebo] text-lg sm:text-xl font-semibold" style={{ color: TEXT }}>ומה המצב המשפחתי שלך?</h3>
                            <p className="text-sm sm:text-[15px] font-[Heebo] opacity-80 leading-7" style={{ color: TEXT }}>
                                למצב המשפחתי יש השפעה ישירה על נקודות הזיכוי שלך.
                                <br />
                                וגם על החישוב הסופי של המס שאתה משלם.
                            </p>

                            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                                {([
                                    { value: "single" as MaritalStatus, title: "רווק/ה", desc: "ללא בן/בת זוג רשומים" },
                                    { value: "married" as MaritalStatus, title: "נשוי/אה", desc: "כולל ידועים בציבור" },
                                    { value: "divorced" as MaritalStatus, title: "גרוש/ה", desc: "כולל הורים גרושים" },
                                    { value: "widowed" as MaritalStatus, title: "אלמן/ה", desc: "מצב משפחתי מיוחד" },
                                    { value: "other" as MaritalStatus, title: "אחר", desc: "נשמח להבין ביחד" },
                                ]).map((opt) => {
                                    const selected = maritalStatus === opt.value;
                                    return (
                                        <button
                                            key={opt.value}
                                            type="button"
                                            onClick={() => setMaritalStatus(opt.value)}
                                            className={`flex flex-col items-center rounded-2xl px-3 py-3 border text-xs sm:text-sm font-[Heebo] transition transform ${selected
                                                ? "border-[rgba(124,232,106,0.9)] bg-[rgba(124,232,106,0.08)] shadow-[0_0_25px_rgba(124,232,106,0.45)] scale-[1.02]"
                                                : "border-gray-200 bg-white hover:bg-gray-50"
                                                }`}
                                        >
                                            <span className="mb-1 text-[13px] font-semibold" style={{ color: TEXT }}>{opt.title}</span>
                                            <span className="text-[10px] opacity-75">{opt.desc}</span>
                                        </button>
                                    );
                                })}
                            </div>

                            <div className="flex justify-center gap-4 pt-2">
                                <button
                                    type="button"
                                    onClick={goPrev}
                                    className="px-5 py-2 text-sm font-[Heebo] text-gray-700 border border-gray-300 rounded-full hover:bg-gray-50"
                                >
                                    הקודם
                                </button>
                                <button
                                    type="button"
                                    onClick={goNext}
                                    disabled={!isStep3Valid}
                                    className="px-6 py-2.5 rounded-full text-sm font-[Heebo] font-semibold text-white hover:scale-[1.02] transition-transform disabled:opacity-60"
                                    style={{ backgroundColor: ACCENT }}
                                >
                                    הבא
                                </button>
                            </div>
                        </div>
                    )}

                    {step === 4 && (
                        <div className="space-y-6 text-center">
                            <h3 className="font-[Heebo] text-lg sm:text-xl font-semibold" style={{ color: TEXT }}>
                                {firstName ? `${firstName}, אילו מהמצבים האלה קרו אצלך ב־6 השנים האחרונות?` : "אילו מהמצבים האלה קרו אצלך ב־6 השנים האחרונות?"}
                            </h3>
                            <p className="text-sm sm:text-[15px] font-[Heebo] opacity-80 leading-7" style={{ color: TEXT }}>
                                אפשר לסמן כמה שרוצים.
                                <br />
                                כל אחד מהמצבים האלו עשוי להעלות משמעותית את הסיכוי שמגיע לך החזר מס.
                            </p>

                            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                                {CRITERIA_OPTIONS.map((opt) => {
                                    const selected = criteria.includes(opt.id);
                                    return (
                                        <button
                                            key={opt.id}
                                            type="button"
                                            onClick={() => toggleCriteria(opt.id)}
                                            className={`flex flex-col items-center text-center rounded-2xl px-4 py-4 border text-xs sm:text-sm font-[Heebo] transition transform ${selected
                                                ? "border-[rgba(124,232,106,0.9)] bg-[rgba(124,232,106,0.08)] shadow-[0_0_25px_rgba(124,232,106,0.45)] scale-[1.02]"
                                                : "border-gray-200 bg-white hover:bg-gray-50"
                                                }`}
                                        >
                                            <img src={opt.iconSrc} alt={opt.label} className="object-contain mb-2 w-9 h-9 sm:w-10 sm:h-10" loading="lazy" />
                                            <span className="text-[13px] font-semibold mb-1" style={{ color: TEXT }}>{opt.label}</span>
                                            <span className="text-[11px] opacity-75">{opt.hint}</span>
                                        </button>
                                    );
                                })}
                            </div>

                            <div className="flex justify-center gap-4 pt-2">
                                <button
                                    type="button"
                                    onClick={goPrev}
                                    className="px-5 py-2 text-sm font-[Heebo] text-gray-700 border border-gray-300 rounded-full hover:bg-gray-50"
                                >
                                    הקודם
                                </button>
                                <button
                                    type="button"
                                    onClick={handleFinish}
                                    disabled={isSending}
                                    className="px-6 py-2.5 rounded-full text-sm font-[Heebo] font-semibold text-white hover:scale-[1.02] transition-transform disabled:opacity-60"
                                    style={{ backgroundColor: ACCENT }}
                                >
                                    {isSending ? "שולח..." : "שליחה"}
                                </button>
                            </div>
                        </div>
                    )}

                    {step === 5 && (
                        <div className="space-y-8 text-center">
                            <motion.div
                                initial={{ scale: 0.7, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ duration: 0.5, ease: easeCurve }}
                                className="flex justify-center"
                            >
                                <div className="w-20 h-20 rounded-full flex items-center justify-center border border-[rgba(124,232,106,0.6)] bg-white shadow-[0_0_30px_rgba(124,232,106,0.4)]">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10">
                                        <path d="M20 6L9 17l-5-5" />
                                    </svg>
                                </div>
                            </motion.div>

                            <div className="space-y-4">
                                <h3 className="text-xl font-[Heebo] font-bold" style={{ color: TEXT }}>
                                    {firstName ? `תודה, ${firstName}. השאלון נשלח בהצלחה.` : "תודה! השאלון נשלח בהצלחה."}
                                </h3>

                                <p className="text-sm sm:text-[15px] font-[Heebo] opacity-90 leading-7" style={{ color: TEXT }}>
                                    הפרטים שלך הועברו לבדיקה אצל צוות EasyTax.
                                    <br />
                                    אם תרצה לדבר עם נציג כבר עכשיו — אפשר לפתוח שיחה בוואטסאפ בלחיצה אחת.
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={openWhatsapp}
                                className="mt-1 inline-flex items-center justify-center gap-2 w-full rounded-xl px-4 py-2.5 text-sm font-semibold text-white transition"
                                style={{
                                    background: ACCENT,
                                    boxShadow: "0 0 20px rgba(124, 232, 106, 0.6)",
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
            </div>
        </section>
    );
}
