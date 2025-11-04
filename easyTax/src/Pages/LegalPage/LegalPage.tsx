import React from "react";
import { Helmet } from "react-helmet";

const ACCENT = "#5BA14D";
const TEXT = "#3A3A4A";

const Section = ({
    id,
    title,
    children,
}: {
    id: string;
    title: string;
    children: React.ReactNode;
}) => (
    <section id={id} className="max-w-4xl px-4 py-8 mx-auto text-right">
        <h2
            className="mb-2 text-2xl font-bold"
            style={{ color: TEXT }}
        >
            {title}
        </h2>
        <div
            className="mb-4 h-0.5 w-10 rounded-full"
            style={{ backgroundColor: ACCENT }}
        />
        <div className="space-y-4 text-sm leading-relaxed text-gray-800">
            {children}
        </div>
        <hr className="my-8 border-gray-200" />
    </section>
);

export default function LegalPage() {
    return (
        <main
            className="hebrew-content pt-24 pb-16 min-h-screen bg-[#F5F7F9]"
            dir="rtl"
        >
            <Helmet>
                <title>הצהרת נגישות, פרטיות, תנאי שימוש וקוקיז | EasyTax</title>
                <html lang="he" dir="rtl" />
            </Helmet>

            <div className="max-w-5xl px-4 mx-auto">
                <header className="mb-8">
                    <div className="px-4 py-5 border shadow-sm rounded-2xl border-white/60 bg-white/60 backdrop-blur-sm sm:px-6 sm:py-6">
                        <h1
                            className="text-2xl font-extrabold text-center sm:text-3xl sm:text-right"
                            style={{ color: TEXT }}
                        >
                            הצהרת נגישות, מדיניות פרטיות, תנאי שימוש וקוקיז
                        </h1>
                        <p className="mt-2 text-xs text-center text-gray-600 sm:text-sm sm:text-right">
                            עודכן לאחרונה: {new Date().toLocaleDateString("he-IL")}
                        </p>

                        <nav className="flex flex-wrap justify-center gap-3 mt-4 text-xs sm:text-sm sm:justify-start">
                            <a
                                href="#accessibility"
                                className="px-3 py-1 transition border rounded-full hover:bg-white/70"
                                style={{
                                    borderColor: "rgba(91,161,77,0.55)",
                                    color: ACCENT,
                                    backgroundColor: "rgba(255,255,255,0.7)",
                                }}
                            >
                                נגישות
                            </a>
                            <a
                                href="#privacy"
                                className="px-3 py-1 rounded-full border border-[rgba(91,161,77,0.25)] text-[color:var(--text)] bg-white/60 transition hover:bg-white/80"
                            >
                                פרטיות
                            </a>
                            <a
                                href="#terms"
                                className="px-3 py-1 rounded-full border border-[rgba(91,161,77,0.25)] text-[color:var(--text)] bg-white/60 transition hover:bg-white/80"
                            >
                                תנאי שימוש
                            </a>
                            <a
                                href="#cookies"
                                className="px-3 py-1 rounded-full border border-[rgba(91,161,77,0.25)] text-[color:var(--text)] bg-white/60 transition hover:bg-white/80"
                            >
                                קוקיז
                            </a>
                        </nav>
                    </div>
                </header>
            </div>

            <Section id="accessibility" title="הצהרת נגישות">
                <p>
                    אנו פועלים להנגיש את האתר לכלל המשתמשים, לרבות אנשים עם מוגבלות, בהתאם
                    להנחיות WCAG 2.2 רמה AA. אם נתקלתם בליקוי נגישות, אנא פנו אלינו ונפעל לתיקון
                    בהקדם.
                </p>
                <ul className="pr-6 text-sm text-gray-800 list-disc">
                    <li>ניווט מקלדת, ניגודיות מספקת וטקסט חלופי לתמונות משמעותיות.</li>
                    <li>תצוגה רספונסיבית, היררכיית כותרות ושפה סמנטית תקינה.</li>
                </ul>
                <p>
                    קשר לנגישות:{" "}
                    <a className="underline" href="mailto:custwebyma@gmail.com">
                        custwebyma@gmail.com
                    </a>
                </p>
            </Section>

            <Section id="privacy" title="מדיניות פרטיות">
                <p>
                    אנו מכבדים את פרטיותכם. אנו עשויים לאסוף פרטים שמסרתם מרצון (כגון טופס קשר)
                    ונתוני שימוש אנונימיים (כגון קוקיז וסטטיסטיקות). השימוש במידע נעשה לשיפור
                    השירות, מענה לפניות ואבטחה.
                </p>
                <p>
                    לא נעביר פרטים לצד ג&apos; אלא אם נדרש לפי דין או לצורך הפעלה תקינה של
                    השירות, ובהתאם להסכמים מתאימים עם ספקים חיצוניים.
                </p>
                <p>
                    לבקשות גישה, עדכון או מחיקה של מידע אישי – ניתן לפנות אלינו בדוא&quot;ל
                    לעיל.
                </p>
            </Section>

            <Section id="terms" title="תנאי שימוש">
                <ul className="pr-6 text-sm text-gray-800 list-disc">
                    <li>השימוש באתר באחריות המשתמש, והתכנים עשויים להשתנות ללא הודעה מוקדמת.</li>
                    <li>חל איסור שימוש לרעה, פגיעה, הטעיה או הפרת כל דין באמצעות האתר.</li>
                    <li>זכויות הקניין הרוחני בתכנים שייכות לבעל האתר, אלא אם צוין אחרת.</li>
                    <li>אין לראות במידע באתר ייעוץ מס או ייעוץ מקצועי מחייב, אלא מידע כללי בלבד.</li>
                </ul>
            </Section>

            <Section id="cookies" title="מדיניות קוקיז">
                <p>
                    אנו עושים שימוש בעוגיות (Cookies) לצורך תפעול האתר, מדידת תעבורה, התאמת
                    חוויית הגלישה ושיפור השירות. ניתן להתאים העדפות בבאנר הקוקיז המופיע בביקור
                    הראשון או דרך הגדרות הדפדפן.
                </p>
                <p>
                    המשך שימוש באתר מהווה הסכמה לשימוש בעוגיות בהתאם למדיניות זו, אלא אם שיניתם
                    את הגדרות הדפדפן.
                </p>
            </Section>
        </main>
    );
}
