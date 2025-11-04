import React from "react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";

type AboutSectionProps = {
    id?: string;
    className?: string;
    logoSrc?: string;
    taxIconSrc?: string;
    blIconSrc?: string;
};

const accent = "#5BA14D" as const;
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
    taxIconSrc = `${import.meta.env.BASE_URL}icons/tax-authority.png`,
    blIconSrc = `${import.meta.env.BASE_URL}icons/bituach-leumi.png`,
}: AboutSectionProps) {
    return (
        <section id={id} dir="rtl" className={`w-full py-16 md:py-24 ${className}`}>
            <div className="max-w-6xl px-4 mx-auto sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-16 place-items-center">
                    <motion.div
                        className="relative"
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, amount: 0.4 }}
                        variants={fadeUp}
                        custom={0}
                    >
                        <div className="relative grid size-56 sm:size-64 md:size-72 place-items-center">
                            <motion.span
                                className="absolute inset-0 border-2 rounded-full"
                                style={{ borderColor: accent }}
                                initial={{ opacity: 0, scale: 0.8, rotate: -8 }}
                                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                                viewport={{ once: true, amount: 0.4 }}
                                transition={{ duration: 0.7, ease: easeCurve }}
                            />
                            <motion.div
                                className="relative size-[86%] rounded-full overflow-hidden bg-transparent backdrop-blur-[2px]"
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true, amount: 0.4 }}
                                transition={{ duration: 0.7, ease: easeCurve, delay: 0.06 }}
                            >
                                <img
                                    src={logoSrc}
                                    alt="EasyTax logo"
                                    className="object-cover w-full h-full"
                                    onError={(e) => {
                                        const fallback = `${import.meta.env.BASE_URL}ETLogo1.png`;
                                        if ((e.currentTarget as HTMLImageElement).src !== fallback) {
                                            (e.currentTarget as HTMLImageElement).src = fallback;
                                        }
                                    }}
                                />
                            </motion.div>
                        </div>
                    </motion.div>

                    <div className="w-full max-w-xl">
                        <motion.h1
                            className="font-[Heebo] text-2xl sm:text-3xl md:text-4xl font-semibold leading-tight text-center"
                            style={{ color: bodyColor }}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true, amount: 0.4 }}
                            variants={fadeUp}
                            custom={1}
                        >
                            בדיקת זכאות להחזר מס לשכירים - חינם ובתוך דקות
                        </motion.h1>

                        <motion.p
                            className="font-[Heebo] mt-4 text-[15px] sm:text-base leading-8 text-center"
                            style={{ color: bodyColor }}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true, amount: 0.4 }}
                            variants={fadeUp}
                            custom={2}
                        >
                            אנחנו ב־easyTax עוזרים לשכירים לבדוק האם מגיע להם החזר מס, בלי כאבי ראש ובלי למלא
                            טפסים מיותרים. ממלאים שאלון קצר, אנחנו בודקים עבורכם את הזכאות מול הרשויות
                            ומלווים אתכם עד לקבלת ההחזר לחשבון הבנק – ללא התחייבות ובתהליך שקוף ופשוט.
                        </motion.p>

                        <div className="grid grid-cols-2 gap-6 mt-8">
                            <motion.div
                                className="flex flex-col items-center text-center"
                                initial="hidden"
                                whileInView="show"
                                viewport={{ once: true, amount: 0.4 }}
                                variants={fadeUp}
                                custom={3}
                            >
                                <span
                                    className="inline-flex items-center justify-center px-4 py-3 border rounded-xl"
                                    style={{ borderColor: accent }}
                                >
                                    <img
                                        src={taxIconSrc}
                                        alt="רשות המיסים"
                                        className="object-contain w-10 h-10"
                                        onError={(e) => {
                                            const fallback = `${import.meta.env.BASE_URL}icons/tax-authority.png`;
                                            if ((e.currentTarget as HTMLImageElement).src !== fallback) {
                                                (e.currentTarget as HTMLImageElement).src = fallback;
                                            }
                                        }}
                                    />
                                </span>
                                <span
                                    className="font-[Heebo] mt-2 text-sm font-semibold"
                                    style={{ color: bodyColor }}
                                >
                                    מורשים במס הכנסה
                                </span>
                            </motion.div>

                            <motion.div
                                className="flex flex-col items-center text-center"
                                initial="hidden"
                                whileInView="show"
                                viewport={{ once: true, amount: 0.4 }}
                                variants={fadeUp}
                                custom={4}
                            >
                                <span
                                    className="inline-flex items-center justify-center px-4 py-3 border rounded-xl"
                                    style={{ borderColor: accent }}
                                >
                                    <img
                                        src={blIconSrc}
                                        alt="ביטוח לאומי"
                                        className="object-contain w-10 h-10"
                                        onError={(e) => {
                                            const fallback = `${import.meta.env.BASE_URL}icons/bituach-leumi.png`;
                                            if ((e.currentTarget as HTMLImageElement).src !== fallback) {
                                                (e.currentTarget as HTMLImageElement).src = fallback;
                                            }
                                        }}
                                    />
                                </span>
                                <span
                                    className="font-[Heebo] mt-2 text-sm font-semibold"
                                    style={{ color: bodyColor }}
                                >
                                    מורשים בביטוח לאומי
                                </span>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
