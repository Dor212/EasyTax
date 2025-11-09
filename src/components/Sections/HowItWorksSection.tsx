import { motion } from "framer-motion";
import type { Variants } from "framer-motion";

type HowItWorksSectionProps = {
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

type Step = {
    title: string;
    description: string;
    tag?: string;
    iconSrc: string;
};

const STEPS: Step[] = [
    {
        title: "ממלאים כמה פרטים",
        description:
            "עונים על כמה שאלות קצרות עליך ועל שנות העבודה האחרונות. בלי מסמכים, בלי התחייבות.",
        tag: "פחות מדקה",
        iconSrc: `${import.meta.env.BASE_URL}icons/step1.gif`,
    },
    {
        title: "המערכת של EasyTax מנתחת עבורך",
        description:
            "האלגוריתם בודק את הנתונים שלך מול מדרגות מס, נקודות זיכוי וכל ההטבות הרלוונטיות.",
        tag: "בדיקה חכמה",
        iconSrc: `${import.meta.env.BASE_URL}icons/step2.gif`,
    },
    {
        title: "מקבלים תמונת מצב ראשונית",
        description:
            "אתה רואה אם יש לך פוטנציאל להחזר מס ובאיזה סדר גודל עוד לפני שמתחייבים על תהליך מלא.",
        tag: "שקיפות מלאה",
        iconSrc: `${import.meta.env.BASE_URL}icons/step3.gif`,
    },
    {
        title: "אנחנו מגישים בשבילך את הבקשה",
        description:
            "אם יש זכאות, אנחנו מטפלים בכל הבירוקרטיה מול רשות המסים עד שהכסף נכנס לחשבון הבנק שלך.",
        tag: "ליווי עד הכסף",
        iconSrc: `${import.meta.env.BASE_URL}icons/step4.gif`,
    },
];

type StepCardProps = {
    step: Step;
    index: number;
};

function StepCard({ step, index }: StepCardProps) {
    return (
        <motion.li
            variants={fadeUp}
            custom={index + 2}
            className="relative rounded-2xl backdrop-blur-sm px-5 py-6 shadow-[0_16px_40px_rgba(15,23,42,0.12)] border border-white/40 overflow-hidden"
            style={{
                background: "rgba(124, 232, 106, 0.18)",
            }}
        >
            {/* בורדר מסתובב */}
            <motion.div
                className="absolute inset-0 pointer-events-none rounded-2xl"
                style={{
                    padding: "3px",
                    background: `conic-gradient(
                        from 180deg,
                        rgba(124,232,106,0),
                        rgba(124,232,106,0.9),
                        rgba(124,232,106,0)
                    )`,
                    WebkitMask:
                        "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
                    WebkitMaskComposite: "xor",
                    maskComposite: "exclude",
                }}
                animate={{ rotate: index % 2 === 0 ? 360 : -360 }}
                transition={{
                    duration: 6 + index * 0.7,
                    ease: "linear",
                    repeat: Infinity,
                }}
            />

            {/* הבהוב Glow פנימי דינמי */}
            <motion.div
                className="absolute inset-0 pointer-events-none rounded-2xl"
                style={{
                    boxShadow: `0 0 25px 3px rgba(124,232,106,0.45) inset`,
                }}
                animate={{
                    opacity: [0.4, 0.8, 0.4],
                    scale: [1, 1.02, 1],
                }}
                transition={{
                    duration: 3.5 + index * 0.4,
                    ease: "easeInOut",
                    repeat: Infinity,
                }}
            />

            <div className="relative z-10 flex flex-col items-center text-center">
                <div className="mb-4">
                    <div className="relative grid place-items-center size-20 sm:size-22 md:size-24">
                        <div className="relative size-[78%] rounded-full bg-white/95 backdrop-blur-[4px] shadow-md flex items-center justify-center">
                            <img
                                src={step.iconSrc}
                                alt={step.title}
                                className="object-contain w-10 h-10 sm:w-11 sm:h-11"
                                loading="lazy"
                            />
                        </div>
                        <div
                            className="absolute -bottom-2 left-1/2 -translate-x-1/2 rounded-full px-2 py-[2px] text-[10px] font-[Heebo] font-semibold bg-white shadow-sm"
                            style={{ color: ACCENT }}
                        >
                            שלב {index + 1}
                        </div>
                    </div>
                </div>

                <h3
                    className="font-[Heebo] text-[15px] sm:text-[16px] font-semibold leading-snug mb-1"
                    style={{ color: TEXT }}
                >
                    <span className="relative inline-block px-1">
                        <span className="relative z-10">{step.title}</span>
                        <span
                            className="absolute inset-x-1 -bottom-0.5 h-[2px] rounded-full"
                            style={{ background: "rgba(124,232,106,0.5)" }}
                        />
                    </span>
                </h3>

                <p
                    className="font-[Heebo] text-[13px] sm:text-[14px] leading-7 opacity-90 mb-3"
                    style={{ color: TEXT }}
                >
                    {step.description}
                </p>

                {step.tag && (
                    <span
                        className="rounded-full px-3 py-1 text-[11px] font-[Heebo] font-medium"
                        style={{
                            backgroundColor: "rgba(124,232,106,0.12)",
                            color: ACCENT,
                        }}
                    >
                        {step.tag}
                    </span>
                )}
            </div>
        </motion.li>
    );
}

export default function HowItWorksSection({
    id = "how-it-works",
    className = "",
}: HowItWorksSectionProps) {
    return (
        <section
            id={id}
            dir="rtl"
            className={`w-full py-16 md:py-24 ${className}`}
        >
            <div className="max-w-6xl px-4 mx-auto sm:px-6 lg:px-8">
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
                        style={{
                            backgroundColor: "rgba(124,232,106,0.12)",
                            color: ACCENT,
                        }}
                    >
                        תהליך EasyTax בקצרה
                    </span>

                    <motion.h2
                        className="font-[Heebo] text-2xl sm:text-3xl md:text-4xl leading-tight"
                        style={{ color: TEXT }}
                        variants={fadeUp}
                        custom={1}
                    >
                        <span className="font-extrabold">4 צעדים פשוטים </span>
                        <br />
                        <span className="relative inline-block font-normal">
                            <span className="relative z-10">
                                מהבדיקה ועד שהכסף בחשבון
                            </span>
                            <span
                                className="absolute left-0 right-0 -bottom-1 h-[3px] rounded-full"
                                style={{ background: "rgba(124,232,106,0.7)" }}
                            />
                        </span>
                    </motion.h2>

                    <motion.p
                        className="font-[Heebo] text-[15px] sm:text-base leading-8 max-w-2xl"
                        style={{ color: TEXT }}
                        variants={fadeUp}
                        custom={2}
                    >
                        ממלאים כמה פרטים, מקבלים תמונת מצב ראשונית על הזכאות שלכם,
                        ואם יש החזר פוטנציאלי אנחנו מטפלים בשבילכם בכל מה שצריך מול
                        רשות המסים.
                    </motion.p>
                </motion.div>

                <motion.ul
                    className="grid grid-cols-1 gap-6 mt-10 sm:grid-cols-2"
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.35 }}
                    variants={fadeUp}
                    custom={2}
                >
                    {STEPS.map((step, index) => (
                        <StepCard key={index} step={step} index={index} />
                    ))}
                </motion.ul>

                <motion.div
                    className="flex justify-center mt-10"
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={fadeUp}
                    custom={7}
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
                        מתחילים בבדיקת זכאות
                    </a>
                </motion.div>
            </div>
        </section>
    );
}
