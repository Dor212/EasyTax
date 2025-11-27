import React from "react";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import AboutSection from "../components/Sections/AboutSection";
import EligibilitySection from "../components/Sections/EligibilitySection";
import HowItWorksSection from "../components/Sections/HowItWorksSection";
import QuestionnaireSection from "../components/Sections/QuestionnaireSectio";
import FaqSection from "../components/Sections/FaqSection";
import WhoIsEligibleSection from "../components/Sections/WhoIsEligibleSection";
import MobileIntroVideoSection from "../components/Sections/MobileIntroVideoSection";

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

export default function HomePage({ logoSrc = "/ETLogo1.png" }: HomePageProps) {
    const SITE_URL = "https://www.easytax.co.il";
    const SITE_NAME = "EasyTax";
    const OG_IMAGE = `${SITE_URL}/og-easytax.jpg`;

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: [
            {
                "@type": "Question",
                name: "מי יכול להגיש בקשת החזר מס אצלנו?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text: "שכירים ששילמו מס במהלך שש השנים האחרונות עשויים להיות זכאים להחזר. אנחנו בודקים עבורכם את התמונה המלאה – בהתאם להכנסות, נקודות הזיכוי והמצב האישי – כדי לוודא שתקבלו את כל הכסף שמגיע לכם.",
                },
            },
            {
                "@type": "Question",
                name: "מה הסיבות הנפוצות לכך שעובדים זכאים להחזר מס?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text: "עובדים רבים זכאים להחזר מס כאשר חויבו במס יתר בעקבות טעויות בחישוב, נקודות זיכוי שלא נוצלו, שינוי במעמד המשפחתי (נישואין, ילדים וכו’), שינוי בהכנסה במהלך השנה או עבודה אצל מספר מעסיקים בלי תיאום מס.",
                },
            },
            {
                "@type": "Question",
                name: "מהי ההשפעה של נקודות זיכוי על החזר המס?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text: "נקודות זיכוי מפחיתות את סכום המס שעליכם לשלם. ככל שיש לכם יותר נקודות זיכוי – כך הסיכוי להחזר מס גדל. לא פעם, אנשים צוברים זכאות לנקודות זיכוי שלא הופעלו בזמן אמת, וכך נוצר כסף שמחכה להם כרטרואקטיבית מהמדינה.",
                },
            },
            {
                "@type": "Question",
                name: "למה מס הכנסה לוקח לי יותר מס ממה שצריך?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text: "במקרים רבים החישוב מתבסס על נתונים חלקיים או על הערכות מוקדמות שאינן מעודכנות. שינוי בשכר, שינוי במעמד המשפחתי, מעבר בין עבודות או ניכויים שלא נלקחו בחשבון – כל אלה עלולים לגרום לכך שתשלמו יותר מס מהנדרש. כאן נכנס תפקידנו – לזהות את הפער ולהחזיר את הכסף לחשבון שלכם.",
                },
            },
            {
                "@type": "Question",
                name: "כמה שנים רטרואקטיבית ניתן לבקש את החזר המס?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text: "אפשר להגיש בקשת החזר מס עבור שש השנים האחרונות, החל ממועד ההגשה. למשל, בשנת 2025 ניתן להגיש בקשות עבור השנים 2019–2024, כל עוד לא התיישנו שנות המס הרלוונטיות.",
                },
            },
            {
                "@type": "Question",
                name: "כמה זמן לוקח לקבל את הכסף והאם אני זכאי לריבית על ההחזר?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text: "הטיפול שלנו בבקשה מתבצע בדרך כלל בתוך מספר ימים בודדים מרגע קבלת כל המסמכים. זמן הטיפול ברשות המסים הוא לרוב בין חודש לחודשיים. החזר המס עצמו כולל ריבית שנתית והצמדה כפי שנקבע על ידי רשות המסים.",
                },
            },
            {
                "@type": "Question",
                name: "לאן הכסף מהחזר המס נכנס?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text: "ההחזר מועבר ישירות לחשבון הבנק של הלקוח, כפי שמופיע באישורי הבנק או בפרטי החשבון שנמסרו במסגרת הבקשה להחזר.",
                },
            },
            {
                "@type": "Question",
                name: "האם צריך להגיע פיזית למס הכנסה או שהכול נעשה מרחוק?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text: "ברוב המקרים ניתן לטפל בכל תהליך החזר המס בצורה דיגיטלית, כולל איסוף המסמכים והגשת הבקשה. אנחנו דואגים לייצג אתכם מול רשות המסים, כך שאתם לא צריכים לעמוד בתורים או להגיע פיזית לסניף.",
                },
            },
            {
                "@type": "Question",
                name: "מה קורה אם יתברר שבכלל לא מגיע לי החזר מס?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text: "אם לאחר בדיקה מעמיקה מתברר שלא נוצר עבורכם החזר מס, תעודכנו בכך בשקיפות מלאה. אין חיוב במס נוסף בגלל עצם הבדיקה, והמטרה שלנו היא לוודא שאתם יודעים בדיוק איפה אתם עומדים מול מס הכנסה.",
                },
            },
            {
                "@type": "Question",
                name: "האם אתם מלווים גם בשנים הבאות או רק בבקשה חד־פעמית?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text: "מעבר לטיפול בבקשה הנוכחית, אנחנו זמינים לייעוץ גם לגבי השנים הבאות – כדי לוודא שהמיסוי שלכם מותאם נכון, ולמנוע מצב שבו שוב מצטבר כסף שמגיע לכם חזרה בלי שתדעו על כך.",
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

                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="EasyTax – בדיקת זכאות להחזר מס" />
                <meta
                    name="twitter:description"
                    content="בדיקת זכאות להחזר מס לשכירים תוך דקות, ללא התחייבות."
                />
                <meta name="twitter:image" content={OG_IMAGE} />

                <link rel="canonical" href={SITE_URL} />

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

                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Organization",
                        name: "EasyTax",
                        url: SITE_URL,
                        logo: OG_IMAGE,
                        sameAs: ["https://www.instagram.com/easy.tax.il/"],
                        contactPoint: {
                            "@type": "ContactPoint",
                            telephone: "+972-50-2018741",
                            contactType: "customer service",
                            areaServed: "IL",
                            availableLanguage: ["Hebrew"],
                        },
                    })}
                </script>

                <script type="application/ld+json">
                    {JSON.stringify(faqSchema)}
                </script>
            </Helmet>

            <MobileIntroVideoSection />

            <Section id="about">
                <AboutSection logoSrc={logoSrc} />
            </Section>

            <Section id="eligibility">
                <EligibilitySection />
            </Section>

            <Section id="who-is-eligible">
                <WhoIsEligibleSection />
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
