import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";

const ACCENT = "#7CE86A";
const TEXT = "#3A3A4A";
const TARGET_WHATSAPP_NUMBER = "972502018741";

type IncomeRange = "below8" | "8to15" | "15to25" | "25plus";
type MaritalStatus = "single" | "married" | "divorced" | "widowed" | "other";

type QuestionnaireFormValues = {
    fullName: string;
    phone: string;
    incomeRange: IncomeRange | "";
    maritalStatus: MaritalStatus | "";
    criteria: string[];
};

type CriteriaOption = {
    id: string;
    label: string;
    hint: string;
    iconSrc: string;
};

const ICON_BASE = `${import.meta.env.BASE_URL}icons/`;

const CRITERIA_OPTIONS: CriteriaOption[] = [
    {
        id: "job-change",
        label: "החלפת מקום עבודה",
        hint: "עבדת בשני מקומות או יותר באותה שנה / החלפת עבודה?",
        iconSrc: `${ICON_BASE}job.gif`,
    },
    {
        id: "income-change",
        label: "שינוי משמעותי בשכר",
        hint: "עליות או ירידות חדות בשכר בשנים האחרונות",
        iconSrc: `${ICON_BASE}growing.gif`,
    },
    {
        id: "kids",
        label: "ילדים שנולדו",
        hint: "נולדו ילדים ב־6 השנים האחרונות",
        iconSrc: `${ICON_BASE}baby-boy.gif`,
    },
    {
        id: "studies",
        label: "לימודים אקדמיים / מקצועיים",
        hint: "סיימת לימודים שמזכים בנקודות זיכוי",
        iconSrc: `${ICON_BASE}graduate.gif`,
    },
    {
        id: "service",
        label: "שירות צבאי / לאומי",
        hint: "שירות משמעותי שלא תמיד חושב עד הסוף",
        iconSrc: `${ICON_BASE}helmet.gif`,
    },
    {
        id: "savings",
        label: "הפקדות לחיסכון / פנסיה",
        hint: "הפקדות עצמאיות לפנסיה, גמל, קרן השתלמות",
        iconSrc: `${ICON_BASE}saving-money.gif`,
    },
    {
        id: "unemployment",
        label: "אבטלה / חל\"ת",
        hint: "תקופות עבודה לסירוגין, דמי אבטלה או חל\"ת",
        iconSrc: `${ICON_BASE}unemployment.gif`,
    },
    {
        id: "partner",
        label: "בן/בת זוג לא עובד/ת",
        hint: "מצב משפחתי שמזכה בהקלות מס",
        iconSrc: `${ICON_BASE}couple.gif`,
    },
];

const easeCurve = [0.22, 1, 0.36, 1] as const;

const STEPS_LABELS = [
    "פרטים אישיים",
    "טווח הכנסה",
    "מצב משפחתי",
    "מצבים רלוונטיים",
    "סיכום",
];

export default function QuestionnaireSection() {
    const [currentStep, setCurrentStep] = useState(0);
    const [sentToWhatsApp, setSentToWhatsApp] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        trigger,
        watch,
        setValue,
        getValues,
    } = useForm<QuestionnaireFormValues>({
        defaultValues: {
            fullName: "",
            phone: "",
            incomeRange: "",
            maritalStatus: "",
            criteria: [],
        },
    });

    const fullNameValue = watch("fullName");
    const incomeRangeValue = watch("incomeRange");
    const maritalStatusValue = watch("maritalStatus");
    const criteriaValue = (watch("criteria") || []) as string[];

    const firstName = useMemo(() => {
        const trimmed = fullNameValue?.trim();
        if (!trimmed) return "";
        return trimmed.split(" ")[0];
    }, [fullNameValue]);

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

    const handleNext = async () => {
        if (currentStep === 0) {
            const valid = await trigger(["fullName", "phone"]);
            if (!valid) return;
        } else if (currentStep === 1) {
            const valid = await trigger("incomeRange");
            if (!valid) return;
        } else if (currentStep === 2) {
            const valid = await trigger("maritalStatus");
            if (!valid) return;
        }
        setCurrentStep((s) => Math.min(s + 1, 4));
    };

    const handlePrev = () => {
        setCurrentStep((s) => Math.max(0, s - 1));
    };

    const toggleCriteria = (id: string) => {
        const current = (getValues("criteria") || []) as string[];
        const exists = current.includes(id);
        const next = exists ? current.filter((c) => c !== id) : [...current, id];
        setValue("criteria", next, { shouldValidate: false });
    };

    const onSubmit = (data: QuestionnaireFormValues) => {
        const criteriaTitles = CRITERIA_OPTIONS.filter((opt) =>
            data.criteria.includes(opt.id)
        )
            .map((opt) => `• ${opt.label}`)
            .join("\n");

        const incomeText =
            data.incomeRange && incomeLabelMap[data.incomeRange as IncomeRange]
                ? incomeLabelMap[data.incomeRange as IncomeRange]
                : "לא צוין";

        const maritalText =
            data.maritalStatus &&
                maritalLabelMap[data.maritalStatus as MaritalStatus]
                ? maritalLabelMap[data.maritalStatus as MaritalStatus]
                : "לא צוין";

        const message = encodeURIComponent(
            `שלום, שמי ${data.fullName}.\nטלפון: ${data.phone}\n\nמילאתי את שאלון הזכאות המעמיק באתר EasyTax.\n\nטווח הכנסה משוער: ${incomeText}\nמצב משפחתי: ${maritalText}\n\nקריטריונים שסימנתי:\n${criteriaTitles || "לא סומנו קריטריונים ספציפיים."}\n\nאשמח שנציג מטעמכם יעבור על הנתונים ויבדוק עבורי זכאות להחזר מס.`
        );

        window.open(`https://wa.me/${TARGET_WHATSAPP_NUMBER}?text=${message}`, "_blank");
        setSentToWhatsApp(true);
    };

    const incomeOptions: { value: IncomeRange; title: string; desc: string }[] = [
        {
            value: "below8",
            title: "עד 8,000 ₪",
            desc: "עבודה חלקית / שכר התחלתי",
        },
        {
            value: "8to15",
            title: "8,000–15,000 ₪",
            desc: "סביב השכר הממוצע במשק",
        },
        {
            value: "15to25",
            title: "15,000–25,000 ₪",
            desc: "שכר גבוה מהממוצע",
        },
        {
            value: "25plus",
            title: "מעל 25,000 ₪",
            desc: "שכר גבוה מאוד",
        },
    ];

    const maritalOptions: { value: MaritalStatus; title: string; desc: string }[] = [
        {
            value: "single",
            title: "רווק/ה",
            desc: "ללא בן/בת זוג רשומים",
        },
        {
            value: "married",
            title: "נשוי/אה",
            desc: "כולל ידועים בציבור",
        },
        {
            value: "divorced",
            title: "גרוש/ה",
            desc: "כולל הורים גרושים",
        },
        {
            value: "widowed",
            title: "אלמן/ה",
            desc: "מצב משפחתי מיוחד",
        },
        {
            value: "other",
            title: "אחר",
            desc: "נשמח להבין ביחד",
        },
    ];

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
                        אחרי שבדקתם באופן כללי מי זכאי להחזר.
                        <br />
                        כאן אנחנו צוללים קצת יותר עמוק.
                        <br />
                        כמה שאלות ממוקדות שיעזרו לצוות EasyTax להבין את התמונה המלאה.
                        <br />
                        ולבחון זכאות להחזר מס בצורה אישית.
                    </p>
                </motion.div>

                <div className="mb-5">
                    <div className="flex items-center justify-center gap-2 sm:gap-3">
                        {STEPS_LABELS.map((label, idx) => {
                            const active = idx === currentStep;
                            const done = idx < currentStep;
                            return (
                                <div
                                    key={idx}
                                    className="flex items-center gap-1 sm:gap-1.5"
                                >
                                    <div
                                        className={`flex items-center justify-center rounded-full border text-xs sm:text-[13px] font-[Heebo] px-2.5 py-1.5 min-w-[42px] ${active
                                                ? "border-[rgba(124,232,106,1)] bg-[rgba(124,232,106,0.12)] text-[rgba(58,58,74,0.95)] shadow-[0_0_16px_rgba(124,232,106,0.55)]"
                                                : done
                                                    ? "border-[rgba(124,232,106,0.7)] bg-white text-[rgba(58,58,74,0.9)]"
                                                    : "border-gray-200 bg-white text-gray-500"
                                            }`}
                                    >
                                        <span className="font-semibold">{idx + 1}</span>
                                    </div>
                                    <span
                                        className="hidden text-[11px] sm:inline font-[Heebo]"
                                        style={{ color: active || done ? TEXT : "#9CA3AF" }}
                                    >
                                        {label}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="rounded-3xl p-6 sm:p-8 bg-white/95 backdrop-blur-sm border border-[rgba(124,232,106,0.25)] shadow-[0_18px_45px_rgba(15,23,42,0.16)]">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentStep}
                                initial={{ opacity: 0, x: 40 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -40 }}
                                transition={{ duration: 0.35, ease: easeCurve }}
                                className="space-y-6"
                            >
                                {currentStep === 0 && (
                                    <div className="space-y-6 text-center">
                                        <h3
                                            className="font-[Heebo] text-lg sm:text-xl font-semibold"
                                            style={{ color: TEXT }}
                                        >
                                            נתחיל בהיכרות קצרה 👋
                                        </h3>
                                        <p
                                            className="text-sm sm:text-[15px] font-[Heebo] opacity-80 leading-7"
                                            style={{ color: TEXT }}
                                        >
                                            מלא פרטים כדי שנוכל לפנות אליך אישית.
                                            <br />
                                            ולחזור אליך עם תשובה מסודרת לגבי הזכאות שלך.
                                        </p>

                                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                                            <div>
                                                <label className="block mb-1 text-sm font-[Heebo] font-medium text-gray-700">
                                                    שם מלא
                                                </label>
                                                <input
                                                    type="text"
                                                    {...register("fullName", {
                                                        required: "נא להזין שם מלא.",
                                                        minLength: {
                                                            value: 2,
                                                            message: "שם קצר מדי.",
                                                        },
                                                    })}
                                                    placeholder="שם פרטי ומשפחה"
                                                    className="w-full border border-gray-300 rounded-xl px-3 py-2.5 text-sm text-center font-[Heebo] focus:outline-none focus:ring-2 focus:ring-[rgba(124,232,106,0.7)] bg-white"
                                                />
                                                {errors.fullName && (
                                                    <p className="mt-1 text-xs text-red-500">
                                                        {errors.fullName.message}
                                                    </p>
                                                )}
                                            </div>
                                            <div>
                                                <label className="block mb-1 text-sm font-[Heebo] font-medium text-gray-700">
                                                    טלפון נייד
                                                </label>
                                                <input
                                                    type="tel"
                                                    {...register("phone", {
                                                        required: "נא להזין מספר טלפון.",
                                                        minLength: {
                                                            value: 9,
                                                            message: "מספר קצר מדי.",
                                                        },
                                                    })}
                                                    placeholder="05X-XXXXXXX"
                                                    className="w-full border border-gray-300 rounded-xl px-3 py-2.5 text-sm text-center font-[Heebo] focus:outline-none focus:ring-2 focus:ring-[rgba(124,232,106,0.7)] bg-white"
                                                />
                                                {errors.phone && (
                                                    <p className="mt-1 text-xs text-red-500">
                                                        {errors.phone.message}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {currentStep === 1 && (
                                    <div className="space-y-6 text-center">
                                        <h3
                                            className="font-[Heebo] text-lg sm:text-xl font-semibold"
                                            style={{ color: TEXT }}
                                        >
                                            {firstName
                                                ? `מעולה, ${firstName} – מה טווח ההכנסה החודשית שלך?`
                                                : "מעולה, מה טווח ההכנסה החודשית שלך?"}
                                        </h3>
                                        <p
                                            className="text-sm sm:text-[15px] font-[Heebo] opacity-80 leading-7"
                                            style={{ color: TEXT }}
                                        >
                                            לא חייב להיות מדויק עד השקל.
                                            <br />
                                            מספיק שתבחר את הטווח שהכי משקף את השכר שלך בשנים האחרונות.
                                        </p>

                                        <input
                                            type="hidden"
                                            {...register("incomeRange", {
                                                required: "נא לבחור טווח הכנסה.",
                                            })}
                                        />
                                        {errors.incomeRange && (
                                            <p className="mt-1 text-xs text-red-500">
                                                {errors.incomeRange.message as string}
                                            </p>
                                        )}

                                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                                            {incomeOptions.map((opt) => {
                                                const selected = incomeRangeValue === opt.value;
                                                return (
                                                    <button
                                                        key={opt.value}
                                                        type="button"
                                                        onClick={() =>
                                                            setValue("incomeRange", opt.value, {
                                                                shouldValidate: true,
                                                            })
                                                        }
                                                        className={`flex flex-col items-center rounded-2xl px-4 py-3 border text-sm font-[Heebo] transition transform ${selected
                                                                ? "border-[rgba(124,232,106,0.9)] bg-[rgba(124,232,106,0.08)] shadow-[0_0_25px_rgba(124,232,106,0.45)] scale-[1.02]"
                                                                : "border-gray-200 bg-white hover:bg-gray-50"
                                                            }`}
                                                    >
                                                        <span
                                                            className="mb-1 text-base font-semibold"
                                                            style={{ color: TEXT }}
                                                        >
                                                            {opt.title}
                                                        </span>
                                                        <span className="text-[11px] opacity-80">
                                                            {opt.desc}
                                                        </span>
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>
                                )}

                                {currentStep === 2 && (
                                    <div className="space-y-6 text-center">
                                        <h3
                                            className="font-[Heebo] text-lg sm:text-xl font-semibold"
                                            style={{ color: TEXT }}
                                        >
                                            ומה המצב המשפחתי שלך?
                                        </h3>
                                        <p
                                            className="text-sm sm:text-[15px] font-[Heebo] opacity-80 leading-7"
                                            style={{ color: TEXT }}
                                        >
                                            למצב המשפחתי יש השפעה ישירה על נקודות הזיכוי שלך.
                                            <br />
                                            וגם על החישוב הסופי של המס שאתה משלם.
                                        </p>

                                        <input
                                            type="hidden"
                                            {...register("maritalStatus", {
                                                required: "נא לבחור מצב משפחתי.",
                                            })}
                                        />
                                        {errors.maritalStatus && (
                                            <p className="mt-1 text-xs text-red-500">
                                                {errors.maritalStatus.message as string}
                                            </p>
                                        )}

                                        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                                            {maritalOptions.map((opt) => {
                                                const selected = maritalStatusValue === opt.value;
                                                return (
                                                    <button
                                                        key={opt.value}
                                                        type="button"
                                                        onClick={() =>
                                                            setValue(
                                                                "maritalStatus",
                                                                opt.value,
                                                                { shouldValidate: true }
                                                            )
                                                        }
                                                        className={`flex flex-col items-center rounded-2xl px-3 py-3 border text-xs sm:text-sm font-[Heebo] transition transform ${selected
                                                                ? "border-[rgba(124,232,106,0.9)] bg-[rgba(124,232,106,0.08)] shadow-[0_0_25px_rgba(124,232,106,0.45)] scale-[1.02]"
                                                                : "border-gray-200 bg-white hover:bg-gray-50"
                                                            }`}
                                                    >
                                                        <span
                                                            className="mb-1 text-[13px] font-semibold"
                                                            style={{ color: TEXT }}
                                                        >
                                                            {opt.title}
                                                        </span>
                                                        <span className="text-[10px] opacity-75">
                                                            {opt.desc}
                                                        </span>
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>
                                )}

                                {currentStep === 3 && (
                                    <div className="space-y-6 text-center">
                                        <h3
                                            className="font-[Heebo] text-lg sm:text-xl font-semibold"
                                            style={{ color: TEXT }}
                                        >
                                            {firstName
                                                ? `${firstName}, אילו מהמצבים האלה קרו אצלך ב־6 השנים האחרונות?`
                                                : "אילו מהמצבים האלה קרו אצלך ב־6 השנים האחרונות?"}
                                        </h3>
                                        <p
                                            className="text-sm sm:text-[15px] font-[Heebo] opacity-80 leading-7"
                                            style={{ color: TEXT }}
                                        >
                                            אפשר לסמן כמה שרוצים.
                                            <br />
                                            כל אחד מהמצבים האלו עשוי להעלות משמעותית את הסיכוי שמגיע לך החזר מס.
                                        </p>

                                        <input type="hidden" {...register("criteria")} />

                                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                                            {CRITERIA_OPTIONS.map((opt) => {
                                                const selected = criteriaValue.includes(opt.id);
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
                                                        <img
                                                            src={opt.iconSrc}
                                                            alt={opt.label}
                                                            className="object-contain mb-2 w-9 h-9 sm:w-10 sm:h-10"
                                                            loading="lazy"
                                                        />
                                                        <span
                                                            className="text-[13px] font-semibold mb-1"
                                                            style={{ color: TEXT }}
                                                        >
                                                            {opt.label}
                                                        </span>
                                                        <span className="text-[11px] opacity-75">
                                                            {opt.hint}
                                                        </span>
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>
                                )}

                                {currentStep === 4 && (
                                    <div className="space-y-8 text-center">
                                        <motion.div
                                            initial={{ scale: 0.7, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            transition={{ duration: 0.5 }}
                                            className="flex justify-center"
                                        >
                                            <div className="w-20 h-20 rounded-full flex items-center justify-center border border-[rgba(124,232,106,0.6)] bg-white shadow-[0_0_30px_rgba(124,232,106,0.4)]">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke={ACCENT}
                                                    strokeWidth="2.4"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    className="w-10 h-10"
                                                >
                                                    <path d="M20 6L9 17l-5-5" />
                                                </svg>
                                            </div>
                                        </motion.div>

                                        <div className="space-y-4">
                                            <h3
                                                className="text-xl font-[Heebo] font-bold"
                                                style={{ color: TEXT }}
                                            >
                                                {firstName
                                                    ? `תודה, ${firstName}. השאלון שלך התקבל בהצלחה.`
                                                    : "תודה, השאלון שלך התקבל בהצלחה."}
                                            </h3>

                                            <p
                                                className="text-sm sm:text-[15px] font-[Heebo] opacity-90 leading-7"
                                                style={{ color: TEXT }}
                                            >
                                                יש כמה אינדיקציות טובות לזכאות להחזר מס.
                                                <br />
                                                בדיקה אישית של הנתונים שלך יכולה לגלות כמה כסף מחכה לך בחזרה.
                                            </p>

                                            <p
                                                className="text-[15px] sm:text-base font-[Heebo] font-semibold mt-2 leading-8"
                                                style={{
                                                    color: TEXT,
                                                    background: "rgba(124,232,106,0.15)",
                                                    padding: "10px 14px",
                                                    borderRadius: "12px",
                                                    display: "inline-block",
                                                }}
                                            >
                                                נציג מטעם EasyTax יעבור על המידע שמילאת.
                                                <br />
                                                ויחזור אליך בהודעה או בשיחה טלפונית עם ממצאים ראשוניים והמלצות להמשך.
                                            </p>
                                        </div>

                                        <div className="flex justify-center mt-4">
                                            <button
                                                type="submit"
                                                disabled={isSubmitting}
                                                className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-2xl text-sm sm:text-base font-[Heebo] font-semibold text-white transition-transform hover:-translate-y-0.5 disabled:opacity-60"
                                                style={{
                                                    backgroundColor: ACCENT,
                                                    boxShadow: "0 0 24px rgba(124,232,106,0.7)",
                                                }}
                                            >
                                                <FaWhatsapp className="w-5 h-5 text-white" />
                                                {isSubmitting
                                                    ? "שולח..."
                                                    : "יש לך עוד שאלות? נשמח לתת מענה בוואטסאפ"}
                                            </button>
                                        </div>

                                        <AnimatePresence>
                                            {sentToWhatsApp && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: 10 }}
                                                    transition={{ duration: 0.35 }}
                                                    className="mt-3 text-xs sm:text-sm font-[Heebo] leading-6"
                                                    style={{ color: TEXT }}
                                                >
                                                    ✅ פתחנו עבורך שיחה בוואטסאפ עם צוות EasyTax.
                                                    <br />
                                                    אפשר לשאול שם כל שאלה.
                                                    <br />
                                                    לשלוח מסמכים.
                                                    <br />
                                                    ולקבל מענה אנושי ומקצועי במהירות.
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                )}
                            </motion.div>
                        </AnimatePresence>

                        {currentStep < 4 && (
                            <div className="flex justify-center gap-4 pt-2">
                                {currentStep > 0 && (
                                    <button
                                        type="button"
                                        onClick={handlePrev}
                                        className="px-5 py-2 text-sm font-[Heebo] text-gray-700 border border-gray-300 rounded-full hover:bg-gray-50"
                                    >
                                        הקודם
                                    </button>
                                )}
                                <button
                                    type="button"
                                    onClick={handleNext}
                                    className="px-6 py-2.5 rounded-full text-sm font-[Heebo] font-semibold text-white hover:scale-[1.02] transition-transform"
                                    style={{ backgroundColor: ACCENT }}
                                >
                                    הבא
                                </button>
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </section>
    );
}
