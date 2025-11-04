import React from "react";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import AboutSection from "../components/Sections/AboutSection";
import EligibilitySection from "../components/Sections/EligibilitySection";
import HowItWorksSection from "../components/Sections/HowItWorksSection";
import QuestionnaireSection from "../components/Sections/QuestionnaireSectio";
import FaqSection from "../components/Sections/FaqSection";

type SectionProps = {
    id: string;
    children: React.ReactNode;
    className?: string;
};

function Section({ id, children, className = "" }: SectionProps) {
    return (
        <section id={id} className={`relative ${className}`}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="max-w-6xl px-4 mx-auto sm:px-6 lg:px-8"
            >
                {children}
            </motion.div>
        </section>
    );
}

export type HomePageProps = {
    logoSrc?: string;
};

export default function HomePage({ logoSrc = "/ETLogo.png" }: HomePageProps) {
    const SITE_URL = "https://www.easytax.co.il"; // 🔹 עדכן כשתהיה כתובת דומיין
    const SITE_NAME = "EasyTax";
    const OG_IMAGE = `${SITE_URL}/og-easytax.jpg`; // 🔹 עדכן/העלה תמונה מתאימה ל-public

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: [
            {
                "@type": "Question",
                name: "מי זכאי להגיש בקשת החזר מס?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text: "עובדים שכירים, עצמאים או מי ששילמו מס עודף במהלך השנה יכולים להיות זכאים להחזר. למשל אם עבדת רק חלק מהשנה, עברת בין משרות או שהניכוי שלך בביטוחי חיים או קופות גמל לא נלקח בחשבון.",
                },
            },
            {
                "@type": "Question",
                name: "עד כמה שנים אחורה אפשר לדרוש החזר מס?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text: "ניתן להגיש בקשת החזר מס עד שש שנים אחורה ממועד סיום שנת המס הרלוונטית.",
                },
            },
            {
                "@type": "Question",
                name: "מה דרוש כדי להגיש בקשת החזר?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text: "יש למלא טופס בקשה מתאים (למשל טופס 135), לצרף טפסי 106 מהמעסיקים, אישור ניהול חשבון בנק, וטפסים רלוונטיים נוספים לפי סוג ההכנסה והזיכוי.",
                },
            },
            {
                "@type": "Question",
                name: "האם החזר המס נעשה אוטומטית?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text: "לא. ברוב המקרים ההחזר לא מתבצע אוטומטית, אלא רק לאחר הגשת בקשה פעילה לרשות המסים ובדיקת הנתונים בפועל.",
                },
            },
            {
                "@type": "Question",
                name: "מה הסיבות הנפוצות לכך שעובדים זכאים להחזר מס?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text: "סיבות נפוצות כוללות עבודה חלקית בשנה, מעבר בין עבודות, עבודה אצל שני מעסיקים ללא תיאום מס, זכויות שלא נוצלו כמו נקודות זיכוי בגין ילדים, והשקעות או ביטוחים שלא דווחו.",
                },
            },
            {
                "@type": "Question",
                name: "האם עצמאים או בעלי הכנסות נוספות זכאים להחזר מס?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text: "כן. גם עצמאים ובעלי הכנסות נוספות יכולים להיות זכאים להחזר, אך בדרך כלל יש צורך בחישוב מורכב יותר ולכן כדאי להיעזר באיש מקצוע.",
                },
            },
            {
                "@type": "Question",
                name: "מהי ההשפעה של נקודות זיכוי על החזר המס?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text: "נקודות זיכוי הן הטבה שמפחיתה את סכום המס לתשלום. אם במהלך השנה לא נוצלו כל נקודות הזיכוי שלך, למשל עקב שינוי במצב משפחתי או עבודה חדשה, ייתכן שאתה זכאי להחזר.",
                },
            },
            {
                "@type": "Question",
                name: "כמה זמן לוקח עד שמקבלים את ההחזר לאחר ההגשה?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text: "לרוב ההחזר מתקבל תוך מספר שבועות עד חודשים מרגע הגשת הבקשה והשלמת כל המסמכים הנדרשים, ישירות לחשבון הבנק שצוין בטפסים.",
                },
            },
            {
                "@type": "Question",
                name: "האם קיימות עלויות או סיכונים בהגשת בקשה?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text: "אין סיכון משמעותי בהגשת בקשה, אך חשוב להקפיד על הגשה נכונה ומדויקת. טעויות עלולות לגרום לעיכוב, לבקשות הבהרה מרשות המסים או לחיוב בהשלמת מס אם נמצאו נתונים חסרים.",
                },
            },
            {
                "@type": "Question",
                name: "מה כדאי לבדוק לפני שמגישים בקשה באמצעות שירות חיצוני?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text: "כדאי לוודא שהחברה המטפלת מוסמכת, מנוסה ובעלת המלצות, שיש הסכם ברור הכולל את גובה העמלה, אופן התשלום, וזמינות עדכונים שוטפים על מצב הבקשה עד לקבלת ההחזר בפועל.",
                },
            },
        ],
    };

    return (
        <>
            <Helmet>
                <html lang="he" dir="rtl" />

                <title>EasyTax – בדיקת זכאות להחזר מס לשכירים תוך דקות</title>
                <meta
                    name="description"
                    content="EasyTax מאפשרת לכם לבדוק אונליין תוך דקות האם מגיע לכם החזר מס, ללא התחייבות. מילוי שאלון קצר, בדיקה מקצועית, וליווי עד לקבלת ההחזר לחשבון הבנק."
                />
                <meta name="robots" content="index,follow" />
                <meta name="author" content="EasyTax" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />

                {/* Open Graph */}
                <meta property="og:type" content="website" />
                <meta property="og:locale" content="he_IL" />
                <meta property="og:site_name" content={SITE_NAME} />
                <meta
                    property="og:title"
                    content="EasyTax – בדיקת זכאות להחזר מס לשכירים"
                />
                <meta
                    property="og:description"
                    content="בדיקת זכאות להחזר מס לשכירים תוך דקות, ללא התחייבות. מילוי שאלון קצר והמשך טיפול בצוות מקצועי."
                />
                <meta property="og:url" content={SITE_URL} />
                <meta property="og:image" content={OG_IMAGE} />
                <meta property="og:image:alt" content="EasyTax - בדיקת זכאות להחזר מס" />

                {/* Twitter Card */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="EasyTax – בדיקת זכאות להחזר מס" />
                <meta
                    name="twitter:description"
                    content="בדיקת זכאות להחזר מס לשכירים תוך דקות, ללא התחייבות."
                />
                <meta name="twitter:image" content={OG_IMAGE} />

                {/* Canonical */}
                <link rel="canonical" href={SITE_URL} />

                {/* JSON-LD – Website */}
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "WebSite",
                        name: "EasyTax – החזרי מס לשכירים",
                        url: SITE_URL,
                        potentialAction: {
                            "@type": "SearchAction",
                            target: `${SITE_URL}/?q={search_term_string}`,
                            "query-input": "required name=search_term_string",
                        },
                    })}
                </script>

                {/* JSON-LD – Organization */}
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Organization",
                        name: "EasyTax",
                        url: SITE_URL,
                        logo: OG_IMAGE,
                        sameAs: [
                            "https://www.instagram.com/YOUR_PROFILE", // 🔹 עדכן לפרופיל אינסטגרם
                        ],
                        contactPoint: {
                            "@type": "ContactPoint",
                            telephone: "+972-5X-XXXXXXX", // 🔹 עדכן טלפון אמיתי
                            contactType: "customer service",
                            areaServed: "IL",
                            availableLanguage: ["Hebrew"],
                        },
                    })}
                </script>

                {/* JSON-LD – FAQPage */}
                <script type="application/ld+json">
                    {JSON.stringify(faqSchema)}
                </script>
            </Helmet>

            <Section id="about">
                <AboutSection logoSrc={logoSrc} />
            </Section>

            <Section id="eligibility">
                <EligibilitySection />
            </Section>

            <Section id="how-it-works">
                <HowItWorksSection />
            </Section>

            <Section id="questionnaire">
                <QuestionnaireSection />
            </Section>

            <Section id="faq">
                <FaqSection />
            </Section>
        </>
    );
}
