import React, { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";

const ACCENT = "#5BA14D";
const TEXT = "#3A3A4A";
const TARGET_WHATSAPP_NUMBER = "9725XXXXXXXX";

type QuestionnaireFormValues = {
    q1: "yes" | "no" | "";
    q2: "yes" | "no" | "";
    q3: "yes" | "no" | "";
    q4: "yes" | "no" | "";
    q5: "yes" | "no" | "";
    q6: "yes" | "no" | "";
    fullName: string;
    phone: string;
};

export default function QuestionnaireSection() {
    const [currentStep, setCurrentStep] = useState(0);
    const [score, setScore] = useState<number | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        trigger,
        getValues,
    } = useForm<QuestionnaireFormValues>({
        defaultValues: {
            q1: "",
            q2: "",
            q3: "",
            q4: "",
            q5: "",
            q6: "",
            fullName: "",
            phone: "",
        },
    });

    const positivityText = useMemo(() => {
        if (score === null) return "";
        if (score >= 4)
            return "על פי התשובות שלך, יש סיכוי גבוה מאוד שמגיע לך החזר מס. שווה לבדוק את זה!";
        if (score >= 2)
            return "על פי התשובות שלך, יש כמה סימנים טובים לזכאות להחזר מס, ומומלץ להשלים בדיקה עם מומחה.";
        if (score === 1)
            return 'סימנת "כן" פעם אחת בלבד – זה לא תמיד מספיק כדי להבטיח החזר, אבל בהחלט שווה לתת לצוות המומחים לבדוק את התמונה המלאה שלך.';
        return "על פי התשובות שלך לא זוהו סימנים ברורים לזכאות, אבל ייתכן שיש נתונים נוספים שלא הופיעו בשאלון, ולכן עדיין כדאי להשאיר פרטים לבדיקה.";
    }, [score]);

    const isLowScore = score !== null && score <= 1;

    const questionSteps = [
        ["q1", "q2"],
        ["q3", "q4"],
        ["q5", "q6"],
    ];

    const questions: Record<string, string> = {
        q1: "עבדת בשני מקומות עבודה או יותר באותה שנת מס?",
        q2: "שינית מקום עבודה או הפסקת לעבוד במהלך אחת מ־6 השנים האחרונות?",
        q3: "יש לך ילדים עד גיל 18?",
        q4: "למדת לימודים אקדמיים או מקצועיים באחת מ־6 השנים האחרונות?",
        q5: "קיבלת דמי אבטלה, לידה או מחלה באחת מ־6 השנים האחרונות?",
        q6: "הפקדת באופן עצמאי לפנסיה, קופת גמל או קרן השתלמות באחת מ־6 השנים האחרונות?",
    };

    const handleNext = async () => {
        if (currentStep <= 2) {
            const valid = await trigger(questionSteps[currentStep] as any);
            if (!valid) return;

            if (currentStep === 2) {
                const vals = getValues();
                const yesCount = (["q1", "q2", "q3", "q4", "q5", "q6"] as const).reduce(
                    (acc, key) => (vals[key] === "yes" ? acc + 1 : acc),
                    0
                );
                setScore(yesCount);
            }
        }
        setCurrentStep((s) => s + 1);
    };

    const handlePrev = () => setCurrentStep((s) => Math.max(0, s - 1));

    const onSubmit = (data: QuestionnaireFormValues) => {
        const yesCount = (["q1", "q2", "q3", "q4", "q5", "q6"] as const).reduce(
            (acc, key) => (data[key] === "yes" ? acc + 1 : acc),
            0
        );
        const message = encodeURIComponent(
            `שלום, שמי ${data.fullName}.\nטלפון: ${data.phone}\n\nמילאתי את שאלון הזכאות באתר EasyTax.\nסימנתי ${yesCount} תשובות "כן" מתוך 6.\nאשמח שתבדקו עבורי זכאות להחזר מס.`
        );
        window.open(`https://wa.me/${TARGET_WHATSAPP_NUMBER}?text=${message}`, "_blank");
    };

    return (
        <section
            id="questionnaire"
            className="flex justify-center w-full px-4 py-16 bg-transparent sm:px-6"
            dir="rtl"
        >
            <div className="w-full max-w-3xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-8 text-center"
                >
                    <h2
                        className="mb-3 text-2xl font-bold sm:text-3xl"
                        style={{ color: TEXT }}
                    >
                        שאלון זכאות להחזר מס
                    </h2>
                    <p className="text-sm text-gray-700 sm:text-base">
                        ענו על מספר שאלות קצרות ונבדוק האם מגיע לכם החזר מס.
                    </p>
                </motion.div>

                <div className="bg-white border border-[rgba(91,161,77,0.25)] rounded-2xl p-6 sm:p-8 text-center">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentStep}
                                initial={{ opacity: 0, x: 40 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -40 }}
                                transition={{ duration: 0.35 }}
                                className="space-y-6"
                            >
                                {currentStep <= 2 && (
                                    <div className="space-y-6">
                                        {questionSteps[currentStep].map((key) => (
                                            <div
                                                key={key}
                                                className="pb-4 border-b border-gray-200 last:border-b-0"
                                            >
                                                <p
                                                    className="mb-4 text-base font-medium sm:text-lg"
                                                    style={{ color: TEXT }}
                                                >
                                                    {questions[key]}
                                                </p>
                                                <div className="flex justify-center gap-6 text-base text-gray-800">
                                                    <label className="flex items-center gap-2 cursor-pointer">
                                                        <input
                                                            type="radio"
                                                            value="yes"
                                                            {...register(key as any, { required: true })}
                                                            className="accent-[#5BA14D]"
                                                        />
                                                        <span>כן</span>
                                                    </label>
                                                    <label className="flex items-center gap-2 cursor-pointer">
                                                        <input
                                                            type="radio"
                                                            value="no"
                                                            {...register(key as any, { required: true })}
                                                            className="accent-[#5BA14D]"
                                                        />
                                                        <span>לא</span>
                                                    </label>
                                                </div>
                                                {errors[key] && (
                                                    <p className="mt-2 text-xs text-red-500">
                                                        חובה לענות על שאלה זו.
                                                    </p>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {currentStep === 3 && (
                                    <div className="space-y-8 text-center">
                                        <motion.div
                                            initial={{ scale: 0.6, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            transition={{ duration: 0.5 }}
                                            className="flex justify-center"
                                        >
                                            <div className="w-20 h-20 rounded-full flex items-center justify-center border border-[rgba(91,161,77,0.4)]">
                                                {isLowScore ? (
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        stroke={ACCENT}
                                                        strokeWidth="2.2"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        className="w-10 h-10"
                                                    >
                                                        <circle cx="12" cy="12" r="9" />
                                                        <line x1="12" y1="10" x2="12" y2="16" />
                                                        <line x1="12" y1="8" x2="12.01" y2="8" />
                                                    </svg>
                                                ) : (
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
                                                )}
                                            </div>
                                        </motion.div>

                                        <div className="space-y-2">
                                            <h3
                                                className="text-xl font-bold"
                                                style={{ color: TEXT }}
                                            >
                                                {isLowScore
                                                    ? "ייתכן שמגיע לך החזר – נדרשת בדיקה אישית"
                                                    : "נראה שמגיע לך החזר מס 🎉"}
                                            </h3>
                                            <p className="text-sm text-gray-700">{positivityText}</p>
                                            <p className="text-xs text-gray-500">
                                                מלא את פרטיך ונעביר את הנתונים ישירות לצוות EasyTax –
                                                הבדיקה הראשונית מתבצעת ללא התחייבות.
                                            </p>
                                        </div>

                                        <div className="grid grid-cols-1 gap-5 text-center sm:grid-cols-2">
                                            <div>
                                                <label className="block mb-1 text-sm font-medium text-gray-700">
                                                    שם מלא
                                                </label>
                                                <input
                                                    type="text"
                                                    {...register("fullName", { required: true })}
                                                    placeholder="שם פרטי ומשפחה"
                                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-center focus:outline-none focus:ring-2 focus:ring-[rgba(91,161,77,0.7)] bg-transparent"
                                                />
                                                {errors.fullName && (
                                                    <p className="mt-1 text-xs text-red-500">
                                                        נא להזין שם מלא.
                                                    </p>
                                                )}
                                            </div>
                                            <div>
                                                <label className="block mb-1 text-sm font-medium text-gray-700">
                                                    טלפון נייד
                                                </label>
                                                <input
                                                    type="tel"
                                                    {...register("phone", {
                                                        required: true,
                                                        minLength: 9,
                                                    })}
                                                    placeholder="05X-XXXXXXX"
                                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-center focus:outline-none focus:ring-2 focus:ring-[rgba(91,161,77,0.7)] bg-transparent"
                                                />
                                                {errors.phone && (
                                                    <p className="mt-1 text-xs text-red-500">
                                                        נא להזין מספר טלפון תקין.
                                                    </p>
                                                )}
                                            </div>
                                        </div>

                                        <div className="flex justify-center">
                                            <button
                                                type="submit"
                                                disabled={isSubmitting}
                                                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-sm sm:text-base font-semibold text-white transition-transform hover:-translate-y-0.5 disabled:opacity-60"
                                                style={{ backgroundColor: ACCENT }}
                                            >
                                                <FaWhatsapp className="w-5 h-5 text-white" />
                                                {isSubmitting
                                                    ? "שולח..."
                                                    : "שלח וקבל תשובה מצוות EasyTax"}
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        </AnimatePresence>

                        {currentStep < 3 && (
                            <div className="flex justify-center gap-4 pt-4">
                                {currentStep > 0 && (
                                    <button
                                        type="button"
                                        onClick={handlePrev}
                                        className="px-5 py-2 text-sm text-gray-700 border border-gray-300 rounded-full hover:bg-gray-50"
                                    >
                                        הקודם
                                    </button>
                                )}
                                <button
                                    type="button"
                                    onClick={handleNext}
                                    className="px-6 py-2.5 rounded-full text-sm font-semibold text-white hover:scale-[1.02] transition-transform"
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
