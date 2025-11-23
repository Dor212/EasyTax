import { motion } from "framer-motion";
import type { Variants } from "framer-motion";

type WhoIsEligibleSectionProps = {
    id?: string;
    className?: string;
};

const ACCENT = "#7CE86A" as const;
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

const ICON_BASE = `${import.meta.env.BASE_URL}icons/`;

type EligibilityBubble = {
    id: number;
    title: string;
    hint: string;
    detail: string;
    iconSrc: string;
};

const BUBBLES: EligibilityBubble[] = [
    {
        id: 1,
        title: "החלפת מקום עבודה",
        hint: "עבדתם ביותר ממקום אחד בשנים האחרונות?",
        detail:
            "אם עבדת אצל יותר ממעסיק אחד בשנים האחרונות או היו חפיפות בין עבודות.",
        iconSrc: `${ICON_BASE}job.gif`,
    },
    {
        id: 2,
        title: "שינויים בשכר",
        hint: "השכר שלך עלה או ירד משמעותית בין השנים?",
        detail:
            "אם השכר שלך עלה, ירד או השתנה במהלך השנה, במיוחד כשיש יותר ממעסיק אחד.",
        iconSrc: `${ICON_BASE}growing.gif`,
    },
    {
        id: 3,
        title: "ילדים שנולדו",
        hint: "נולדו לך ילדים ב־6 השנים האחרונות?",
        detail:
          "אם השכר שלך עלה, ירד או השתנה במהלך השנה, במיוחד כשיש יותר ממעסיק אחד.",
        iconSrc: `${ICON_BASE}baby-boy.gif`,
    },
    {
        id: 4,
        title: "לימודים אקדמיים",
        hint: "סיימת תואר או לימודים מקצועיים?",
        detail:
            "אם סיימת תואר אקדמי או לימודים מקצועיים שמזכים בנקודות זיכוי.",
        iconSrc: `${ICON_BASE}graduate.gif`,
    },
    {
        id: 5,
        title: "שירות צבאי / לאומי",
        hint: "שירתת בצבא, שירות לאומי או שנת שירות?",
        detail: "אם שירתת בצבא, בשירות לאומי או שנת שירות - ויש הטבות שלא נוצלו.",
        iconSrc: `${ICON_BASE}helmet.gif`,
    },
    {
        id: 6,
        title: "הפקדות לחיסכון וקרנו",
        hint: "הפקדת לקופות גמל, קרנות או ביטוחים?",
        detail: "אם ביצעת הפקדות לקרן השתלמות, קופת גמל או ביטוח מנהלים שלא תואמו מול מס הכנסה.",
        iconSrc: `${ICON_BASE}saving-money.gif`,
    },
    {
        id: 7,
        title: "אבטלה / חל\"ת / הפסקת עבודה",
        hint: "היו תקופות בלי עבודה או עם דמי אבטלה?",
        detail:'אם היית בתקופות של אבטלה, חל"ת, או הפסקות עבודה שלא חושבו נכון במס.',
        iconSrc: `${ICON_BASE}unemployment.gif`,
    },
    {
        id: 8,
        title: "בן/בת זוג לא עובד/ת",
        hint: "בן/בת הזוג לא עובד/ת או עובד/ת מעט?",
        detail:
            "אם לבן/בת הזוג אין הכנסה או הכנסה נמוכה, מצב שמזכה בהטבות מס מסוימות.",
        iconSrc: `${ICON_BASE}couple.gif`,
    },
];

type BubbleLayout = "mobile" | "desktop";

function EligibilityBubbleCard({
    bubble,
    index,
    layout,
}: {
    bubble: EligibilityBubble;
    index: number;
    layout: BubbleLayout;
}) {
    const isMobile = layout === "mobile";

    return (
        <motion.div
            className={
                isMobile
                    ? "group relative flex flex-col justify-start min-w-[78%] max-w-[78%] overflow-hidden rounded-3xl px-5 py-6 sm:py-7 cursor-default snap-center"
                    : "group relative flex min-w-[220px] max-w-[270px] flex-col overflow-hidden rounded-full px-6 py-5 cursor-default"
            }
            style={{
                background: "#ffffff",
                boxShadow: isMobile
                    ? "none"
                    : "0 18px 40px rgba(15,23,42,0.18)",
                minHeight: isMobile ? 260 : undefined,
            }}
            variants={fadeUp}
            custom={index + 2}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            whileHover={
                isMobile
                    ? undefined
                    : {
                        scale: 1.06,
                        boxShadow: "0 0 30px rgba(124,232,106,0.7)",
                    }
            }
            transition={{
                layout: { duration: 0.3, ease: easeCurve },
            }}
        >
            {!isMobile && (
                <motion.div
                    className="absolute inset-0 rounded-[inherit] pointer-events-none"
                    animate={{ y: [0, -6, 0] }}
                    transition={{
                        duration: 5 + index * 0.4,
                        repeat: Infinity,
                        repeatType: "mirror",
                        ease: easeCurve,
                    }}
                    style={{ mixBlendMode: "soft-light" }}
                />
            )}

            <div className="relative z-10 flex flex-col items-center justify-start h-full text-center gap-1.5">
                <img
                    src={bubble.iconSrc}
                    alt={bubble.title}
                    className={
                        isMobile
                            ? "w-11 h-11 sm:w-12 sm:h-12 object-contain mb-1"
                            : "w-9 h-9 sm:w-11 sm:h-11 object-contain mb-1"
                    }
                    loading="lazy"
                />

                <h3
                    className="font-[Heebo] text-sm sm:text-[15px] font-semibold leading-snug"
                    style={{ color: TEXT }}
                >
                    {bubble.title}
                </h3>

                {isMobile ? (
                    <p
                        className="font-[Heebo] text-[11px] sm:text-[12px] leading-relaxed mt-2"
                        style={{ color: TEXT }}
                    >
                        <span className="block mb-1">{bubble.hint}</span>
                        <span className="font-semibold" style={{ color: ACCENT }}>
                            כן, גם אתה יכול להיות זכאי אם{" "}
                        </span>
                        {bubble.detail}
                    </p>
                ) : (
                    <>
                        <p
                            className="font-[Heebo] text-[11px] sm:text-[12px] leading-relaxed opacity-80 transition-opacity duration-250 group-hover:opacity-0 mt-1"
                            style={{ color: TEXT }}
                        >
                            {bubble.hint}
                        </p>

                        <p
                            className="font-[Heebo] text-[11px] sm:text-[12px] leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-250 mt-1"
                            style={{ color: TEXT }}
                        >
                            <span className="font-semibold" style={{ color: ACCENT }}>
                                    כן, גם אתה יכול להיות זכאי להחזר מס {" "}
                            </span>
                            {bubble.detail}
                        </p>
                    </>
                )}
            </div>
        </motion.div>
    );
}

export default function WhoIsEligibleSection({
    id = "who-is-eligible",
    className = "",
}: WhoIsEligibleSectionProps) {
    return (
        <section
            id={id}
            dir="rtl"
            className={`w-full py-16 md:py-24 ${className}`}
        >
            <div className="max-w-6xl px-4 mx-auto sm:px-6 lg:px-8">
                <motion.div
                    className="flex flex-col items-center gap-3 text-center"
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.35 }}
                    variants={fadeUp}
                    custom={0}
                >
                    <motion.h2
                        className="font-[Heebo] text-2xl sm:text-3xl md:text-4xl leading-tight"
                        style={{ color: TEXT }}
                        variants={fadeUp}
                        custom={1}
                    >
                        <span className="relative inline-block px-1">
                            <span className="relative z-10">
                                מי בכלל זכאי להחזרי מס?
                            </span>
                            <span
                                className="absolute left-0 right-0 -bottom-1 h-[3px] rounded-full"
                                style={{ background: "rgba(124,232,106,0.7)" }}
                            />
                        </span>
                    </motion.h2>

                    <motion.p
                        className="font-[Heebo] text-[15px] sm:text:base leading-8 max-w-2xl font-semibold"
                        style={{ color: TEXT }}
                        variants={fadeUp}
                        custom={2}
                    >
                        ברוב המקרים זה לא עניין של "מגיע לי או לא"
                        <br />
                        אלא בפועל רוב הזכויות נקבעות לפי שינויים קטנים שמצטברים לאורך השנים.

                        <br />
                        ריכזנו עבורכם את המצבים הנפוצים שבהם כדאי לבדוק זכאות להחזר מס.
                    </motion.p>

                    <motion.span
                        className="inline-flex items-center px-4 py-1 text-[11px] sm:text-xs font-[Heebo] font-medium tracking-wide rounded-full"
                        style={{
                            backgroundColor: "rgba(124,232,106,0.12)",
                            color: ACCENT,
                        }}
                        variants={fadeUp}
                        custom={3}
                    >
                        רמז: אם אתם מזהים את עצמכם אפילו בבועה אחת – שווה לבדוק זכאות.
                    </motion.span>
                </motion.div>

                <div className="mt-8 -mx-4 sm:hidden">
                    <div className="relative px-4">
                        <div
                            className="flex gap-4 pb-4 overflow-x-auto overflow-y-hidden snap-x snap-mandatory"
                            style={{ touchAction: "pan-x" }}
                        >
                            {BUBBLES.map((bubble, index) => (
                                <EligibilityBubbleCard
                                    key={bubble.id}
                                    bubble={bubble}
                                    index={index}
                                    layout="mobile"
                                />
                            ))}
                        </div>
                    </div>
                </div>

                <div className="flex-wrap justify-center hidden gap-4 mt-10 sm:flex sm:gap-5">
                    {BUBBLES.map((bubble, index) => (
                        <EligibilityBubbleCard
                            key={bubble.id}
                            bubble={bubble}
                            index={index}
                            layout="desktop"
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
