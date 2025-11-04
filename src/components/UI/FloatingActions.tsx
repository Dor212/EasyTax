import React from "react";
import { FaWhatsapp, FaPhoneAlt, FaInstagram } from "react-icons/fa";

const ACCENT = "#5BA14D"; // צבע ירוק של האתר

const FloatingActions: React.FC = () => {
    const whatsappNumber = "9725XXXXXXXX"; // 🔹 עדכן כאן את מספר הוואטסאפ שלך (בלי 0 בתחילת המספר)
    const phoneNumber = "03-XXXXXXX"; // 🔹 עדכן כאן את המספר לטלפון הקווי שלך
    const instagramLink = "https://www.instagram.com/easy.tax.il/"; // 🔹 עדכן כאן את קישור האינסטגרם שלך

    return (
        <div className="fixed flex flex-col gap-3 right-4 sm:right-6 top-[100px] z-40">
            {/* וואטסאפ */}
            <a
                href={`https://wa.me/${whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center transition-transform border rounded-full shadow-md w-11 h-11 hover:scale-110 bg-white/80 backdrop-blur-sm"
                style={{
                    borderColor: "rgba(91,161,77,0.3)",
                }}
            >
                <FaWhatsapp size={22} color={ACCENT} />
            </a>

            {/* שיחה טלפונית */}
            <a
                href={`tel:${phoneNumber}`}
                className="flex items-center justify-center transition-transform border rounded-full shadow-md w-11 h-11 hover:scale-110 bg-white/80 backdrop-blur-sm"
                style={{
                    borderColor: "rgba(91,161,77,0.3)",
                }}
            >
                <FaPhoneAlt size={20} color="#3A3A4A" />
            </a>

            {/* אינסטגרם */}
            <a
                href={instagramLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center transition-transform border rounded-full shadow-md w-11 h-11 hover:scale-110 bg-white/80 backdrop-blur-sm"
                style={{
                    borderColor: "rgba(193,53,132,0.3)",
                }}
            >
                <FaInstagram size={21} color="#E1306C" />
            </a>
        </div>
    );
};

export default FloatingActions;
