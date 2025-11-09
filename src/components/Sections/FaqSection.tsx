import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ACCENT = "#7CE86A";
const TEXT = "#3A3A4A";

type FaqItem = {
    id: number;
    question: string;
    answer: string;
    groupId: "eligibility" | "process" | "timing";
};

const GROUPS = [
    {
        id: "eligibility" as const,
        title: "מי זכאי להחזר מס?",
        subtitle: "האם בכלל יש סיכוי שמגיע לכם כסף חזרה?",
    },
    {
        id: "process" as const,
        title: "איך מגישים ומה צריך?",
        subtitle: "מסמכים, הגשה ושירותים חיצוניים.",
    },
    {
        id: "timing" as const,
        title: "מתי וכמה זמן זה לוקח?",
        subtitle: "שנים אחורה ולוחות זמנים לקבלת ההחזר.",
    },
];

const FAQS: FaqItem[] = [
    {
        id: 1,
        groupId: "eligibility",
        question: "מי זכאי להגיש בקשת החזר מס?",
        answer:
            "עובדים שכירים, עצמאיים או מי ששילמו מס עודף במהלך השנה יכולים להיות זכאים להחזר. למשל אם עבדת רק חלק מהשנה, עברת בין משרות או שהניכוי שלך בביטוחי חיים או קופות גמל לא נלקח בחשבון.",
    },
    {
        id: 2,
        groupId: "timing",
        question: "עד כמה שנים אחורה אפשר לדרוש החזר מס?",
        answer: "ניתן להגיש בקשת החזר מס עד שש שנים אחורה ממועד סיום שנת המס הרלוונטית.",
    },
    {
        id: 3,
        groupId: "process",
        question: "מה דרוש כדי להגיש בקשת החזר?",
        answer:
            "יש למלא טופס בקשה מתאים (למשל טופס 135), לצרף טפסי 106 מהמעסיקים, אישור ניהול חשבון בנק, וטפסים רלוונטיים נוספים לפי סוג ההכנסה והזיכוי.",
    },
    {
        id: 4,
        groupId: "process",
        question: "האם החזר המס נעשה אוטומטית?",
        answer:
            "לא. ברוב המקרים ההחזר לא מתבצע אוטומטית, אלא רק לאחר הגשת בקשה פעילה לרשות המסים ובדיקת הנתונים בפועל.",
    },
    {
        id: 5,
        groupId: "eligibility",
        question: "מה הסיבות הנפוצות לכך שעובדים זכאים להחזר מס?",
        answer:
            "סיבות נפוצות כוללות עבודה חלקית בשנה, מעבר בין עבודות, עבודה אצל שני מעסיקים ללא תיאום מס, זכויות שלא נוצלו כמו נקודות זיכוי בגין ילדים, והשקעות או ביטוחים שלא דווחו.",
    },
    {
        id: 6,
        groupId: "eligibility",
        question: "האם עצמאים או בעלי הכנסות נוספות זכאים להחזר מס?",
        answer:
            "כן. גם עצמאים ובעלי הכנסות נוספות יכולים להיות זכאים להחזר, אך בדרך כלל יש צורך בחישוב מורכב יותר ולכן כדאי להיעזר באיש מקצוע.",
    },
    {
        id: 7,
        groupId: "eligibility",
        question: "מהי ההשפעה של נקודות זיכוי על החזר המס?",
        answer:
            "נקודות זיכוי הן הטבה שמפחיתה את סכום המס לתשלום. אם במהלך השנה לא נוצלו כל נקודות הזיכוי שלך, למשל עקב שינוי במצב משפחתי או עבודה חדשה, ייתכן שאתה זכאי להחזר.",
    },
    {
        id: 8,
        groupId: "timing",
        question: "כמה זמן לוקח עד שמקבלים את ההחזר לאחר ההגשה?",
        answer:
            "לרוב ההחזר מתקבל תוך מספר שבועות עד חודשים מרגע הגשת הבקשה והשלמת כל המסמכים הנדרשים, ישירות לחשבון הבנק שצוין בטפסים.",
    },
    {
        id: 9,
        groupId: "process",
        question: "האם קיימות עלויות או סיכונים בהגשת בקשה?",
        answer:
            "אין סיכון משמעותי בהגשת בקשה, אך חשוב להקפיד על הגשה נכונה ומדויקת. טעויות עלולות לגרום לעיכוב, לבקשות הבהרה מרשות המסים או לחיוב בהשלמת מס אם נמצאו נתונים חסרים.",
    },
    {
        id: 10,
        groupId: "process",
        question: "מה כדאי לבדוק לפני שמגישים בקשה באמצעות שירות חיצוני?",
        answer:
            "כדאי לוודא שהחברה המטפלת מוסמכת, מנוסה ובעלת המלצות, שיש הסכם ברור הכולל את גובה העמלה, אופן התשלום, וזמינות עדכונים שוטפים על מצב הבקשה עד לקבלת ההחזר בפועל.",
    },
];

export default function FaqSection() {
    const [activeGroupId, setActiveGroupId] = useState<"eligibility" | "process" | "timing">(
        "eligibility"
    );
    const [openQuestionId, setOpenQuestionId] = useState<number | null>(FAQS[0].id);

    const activeFaqs = useMemo(
        () => FAQS.filter((item) => item.groupId === activeGroupId),
        [activeGroupId]
    );

    const handleToggleQuestion = (id: number) => {
        setOpenQuestionId((prev) => (prev === id ? null : id));
    };

    return (
        <section
            id="faq"
            className="w-full px-4 py-16 sm:px-6 bg-[rgba(124,232,106,0.06)]"
            dir="rtl"
        >
            <div className="max-w-5xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-8 text-center"
                >
                    <h2
                        className="mb-3 text-2xl sm:text-3xl md:text-4xl font-[Heebo] leading-tight"
                        style={{ color: TEXT }}
                    >
                        <span className="relative inline-block px-1">
                            <span className="relative z-10">שאלות נפוצות על החזרי מס</span>
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
                        כדי שתקבלו החלטה בראש שקט.
                        <br />
                        ריכזנו את השאלות שהכי הרבה ישראלים שואלים לפני הגשת בקשה להחזר מס.
                    </p>
                </motion.div>

                <div className="grid gap-10 mt-8 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] items-start">
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="relative"
                    >
                        <div className="absolute hidden right-5 top-3 bottom-3 md:block">
                            <div className="w-px h-full bg-[rgba(124,232,106,0.25)]" />
                        </div>
                        <div className="space-y-5">
                            {GROUPS.map((group, index) => {
                                const isActive = group.id === activeGroupId;
                                return (
                                    <button
                                        key={group.id}
                                        type="button"
                                        onClick={() => setActiveGroupId(group.id)}
                                        className={`relative flex w-full items-center gap-4 text-right transition-transform ${isActive ? "scale-[1.01]" : "hover:scale-[1.01]"
                                            }`}
                                    >
                                        <div className="relative flex flex-col items-center flex-shrink-0 md:items-end">
                                            <div className="hidden h-2 md:block" />
                                            <motion.div
                                                className="flex items-center justify-center border rounded-full shadow-sm"
                                                style={{
                                                    borderColor: isActive
                                                        ? ACCENT
                                                        : "rgba(124,232,106,0.4)",
                                                    backgroundColor: isActive
                                                        ? "rgba(124,232,106,0.12)"
                                                        : "#ffffff",
                                                    width: isActive ? 30 : 24,
                                                    height: isActive ? 30 : 24,
                                                    boxShadow: isActive
                                                        ? "0 0 16px rgba(124,232,106,0.6)"
                                                        : "0 4px 10px rgba(15,23,42,0.08)",
                                                }}
                                                layout
                                                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                                            >
                                                <span
                                                    className="text-xs font-[Heebo] font-semibold"
                                                    style={{ color: TEXT }}
                                                >
                                                    {index + 1}
                                                </span>
                                            </motion.div>
                                        </div>
                                        <div className="flex-1 text-right">
                                            <p
                                                className="text-sm sm:text-base font-[Heebo] font-semibold"
                                                style={{ color: TEXT }}
                                            >
                                                {group.title}
                                            </p>
                                            <p className="mt-1 text-xs sm:text-sm font-[Heebo] text-gray-600">
                                                {group.subtitle}
                                            </p>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </motion.div>

                    <motion.div
                        key={activeGroupId}
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        className="bg-white/95 backdrop-blur-sm border border-[rgba(124,232,106,0.3)] rounded-2xl p-5 sm:p-7 shadow-[0_18px_60px_rgba(15,23,42,0.10)]"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className="text-right">
                                <p className="text-[11px] font-[Heebo] font-semibold tracking-wide text-[rgba(124,232,106,0.95)]">
                                    תחנה במסלול החזר המס
                                </p>
                                <h3
                                    className="mt-1 text-lg sm:text-xl font-[Heebo] font-bold"
                                    style={{ color: TEXT }}
                                >
                                    {GROUPS.find((g) => g.id === activeGroupId)?.title}
                                </h3>
                                <p className="mt-1 text-xs sm:text-sm font-[Heebo] text-gray-600">
                                    {GROUPS.find((g) => g.id === activeGroupId)?.subtitle}
                                </p>
                            </div>
                        </div>

                        <div className="mt-4 space-y-3">
                            <AnimatePresence initial={false}>
                                {activeFaqs.map((item) => {
                                    const isOpen = item.id === openQuestionId;
                                    return (
                                        <motion.div
                                            key={item.id}
                                            layout
                                            initial={{ opacity: 0, y: 8 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -8 }}
                                            transition={{ duration: 0.2 }}
                                            className={`rounded-2xl border text-right ${isOpen
                                                    ? "border-[rgba(124,232,106,0.6)] bg-[rgba(124,232,106,0.03)] shadow-[0_10px_30px_rgba(15,23,42,0.08)]"
                                                    : "border-gray-200 bg-white"
                                                }`}
                                        >
                                            <button
                                                type="button"
                                                onClick={() => handleToggleQuestion(item.id)}
                                                className="flex w-full items-center justify-between px-4 py-3 sm:px-5 sm:py-3.5"
                                            >
                                                <span
                                                    className="text-sm sm:text-base font-[Heebo] font-medium"
                                                    style={{ color: TEXT }}
                                                >
                                                    {item.question}
                                                </span>
                                                <span
                                                    className={`ml-3 inline-flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold transition-transform ${isOpen
                                                            ? "bg-[rgba(124,232,106,0.16)] text-[rgba(124,232,106,0.95)] rotate-180"
                                                            : "bg-gray-100 text-gray-600"
                                                        }`}
                                                >
                                                    ˇ
                                                </span>
                                            </button>
                                            <AnimatePresence initial={false}>
                                                {isOpen && (
                                                    <motion.div
                                                        key="content"
                                                        initial={{ opacity: 0, height: 0 }}
                                                        animate={{ opacity: 1, height: "auto" }}
                                                        exit={{ opacity: 0, height: 0 }}
                                                        transition={{ duration: 0.22 }}
                                                    >
                                                        <div className="px-4 pb-4 sm:px-5 sm:pb-5">
                                                            <p className="text-xs sm:text-sm font-[Heebo] leading-relaxed text-gray-700">
                                                                {item.answer}
                                                            </p>
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </motion.div>
                                    );
                                })}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
