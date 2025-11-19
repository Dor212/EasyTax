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
        title: "למי בכלל מגיע החזר מס?",
        subtitle: "זכאות, נקודות זיכוי ולמה גבו ממך יותר מדי.",
    },
    {
        id: "process" as const,
        title: "איך זה עובד בפועל דרכנו?",
        subtitle: "הגשה, תהליך הליווי ומה קורה אחרי שמשאירים פרטים.",
    },
    {
        id: "timing" as const,
        title: "מתי מקבלים את הכסף לחשבון?",
        subtitle: "שנים רטרואקטיביות, לוחות זמנים וריבית על ההחזר.",
    },
];

const FAQS: FaqItem[] = [
    {
        id: 1,
        groupId: "eligibility",
        question: "מי יכול להגיש בקשת החזר מס אצלנו?",
        answer:
            "שכירים ששילמו מס במהלך שש השנים האחרונות עשויים להיות זכאים להחזר. אנחנו בודקים עבורכם את התמונה המלאה – בהתאם להכנסות, נקודות הזיכוי והמצב האישי – כדי לוודא שתקבלו את כל הכסף שמגיע לכם.",
    },
    {
        id: 2,
        groupId: "eligibility",
        question: "מה הסיבות הנפוצות לכך שעובדים זכאים להחזר מס?",
        answer:
            "עובדים רבים זכאים להחזר מס כאשר חויבו במס יתר בעקבות טעויות בחישוב, נקודות זיכוי שלא נוצלו, שינוי במעמד המשפחתי (נישואין, ילדים וכו’), שינוי בהכנסה במהלך השנה או עבודה אצל מספר מעסיקים בלי תיאום מס.",
    },
    {
        id: 3,
        groupId: "eligibility",
        question: "מהי ההשפעה של נקודות זיכוי על החזר המס?",
        answer:
            "נקודות זיכוי מפחיתות את סכום המס שעליכם לשלם. ככל שיש לכם יותר נקודות זיכוי – כך הסיכוי להחזר מס גדל. לא פעם, אנשים צוברים זכאות לנקודות זיכוי שלא הופעלו בזמן אמת, וכך נוצר כסף שמחכה להם כרטרואקטיבית מהמדינה.",
    },
    {
        id: 4,
        groupId: "eligibility",
        question: "למה מס הכנסה לוקח לי יותר מס ממה שצריך?",
        answer:
            "במקרים רבים החישוב מתבסס על נתונים חלקיים או על הערכות מוקדמות שאינן מעודכנות. שינוי בשכר, שינוי במעמד המשפחתי, מעבר בין עבודות או ניכויים שלא נלקחו בחשבון – כל אלה עלולים לגרום לכך שתשלמו יותר מס מהנדרש. כאן נכנס תפקידנו – לזהות את הפער ולהחזיר את הכסף לחשבון שלכם.",
    },
    {
        id: 5,
        groupId: "timing",
        question: "כמה שנים רטרואקטיבית ניתן לבקש את החזר המס?",
        answer:
            "אפשר להגיש בקשת החזר מס עבור שש השנים האחרונות, החל ממועד ההגשה. למשל, בשנת 2025 ניתן להגיש בקשות עבור השנים 2019–2024, כל עוד לא התיישנו שנות המס הרלוונטיות.",
    },
    {
        id: 6,
        groupId: "timing",
        question: "כמה זמן לוקח לקבל את הכסף והאם אני זכאי לריבית על ההחזר?",
        answer:
            "הטיפול שלנו בבקשה מתבצע בדרך כלל בתוך מספר ימים בודדים מרגע קבלת כל המסמכים. זמן הטיפול ברשות המסים הוא לרוב בין חודש לחודשיים. החזר המס עצמו כולל ריבית שנתית והצמדה כפי שנקבע על ידי רשות המסים.",
    },
    {
        id: 7,
        groupId: "timing",
        question: "לאן הכסף מהחזר המס נכנס?",
        answer:
            "ההחזר מועבר ישירות לחשבון הבנק של הלקוח, כפי שמופיע באישורי הבנק או בפרטי החשבון שנמסרו במסגרת הבקשה להחזר.",
    },
    {
        id: 8,
        groupId: "process",
        question: "האם צריך להגיע פיזית למס הכנסה או שהכול נעשה מרחוק?",
        answer:
            "ברוב המקרים ניתן לטפל בכל תהליך החזר המס בצורה דיגיטלית, כולל איסוף המסמכים והגשת הבקשה. אנחנו דואגים לייצג אתכם מול רשות המסים, כך שאתם לא צריכים לעמוד בתורים או להגיע פיזית לסניף.",
    },
    {
        id: 9,
        groupId: "process",
        question: "מה קורה אם יתברר שבכלל לא מגיע לי החזר מס?",
        answer:
            "אם לאחר בדיקה מעמיקה מתברר שלא נוצר עבורכם החזר מס, תעודכנו בכך בשקיפות מלאה. אין חיוב במס נוסף בגלל עצם הבדיקה, והמטרה שלנו היא לוודא שאתם יודעים בדיוק איפה אתם עומדים מול מס הכנסה.",
    },
    {
        id: 10,
        groupId: "process",
        question: "האם אתם מלווים גם בשנים הבאות או רק בבקשה חד־פעמית?",
        answer:
            "מעבר לטיפול בבקשה הנוכחית, אנחנו זמינים לייעוץ גם לגבי השנים הבאות – כדי לוודא שהמיסוי שלכם מותאם נכון, ולמנוע מצב שבו שוב מצטבר כסף שמגיע לכם חזרה בלי שתדעו על כך.",
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
                        כדי שתקבלו החלטה בראש שקט
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
