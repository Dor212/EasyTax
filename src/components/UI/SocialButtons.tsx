import React from "react";
import { FaWhatsapp, FaPhoneAlt, FaInstagram } from "react-icons/fa";

const ACCENT = "#5BA14D";

const FloatingActions: React.FC = () => {
    const whatsappNumber = "972526134057";
    const phoneNumber = "972526134057";
    const instagramLink = "https://www.instagram.com/easy.tax.il/";

    const whatsappMessage =
        "היי, הגעתי דרך אתר EasyTax ואני רוצה לבדוק זכאות להחזר מס 🙂";

    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
        whatsappMessage
    )}`;

    return (
        <div className="fixed flex flex-col gap-3 right-4 sm:right-6 top-[100px] z-40">
            <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center transition-transform border rounded-full shadow-md w-11 h-11 hover:scale-110 bg-white/80 backdrop-blur-sm"
                style={{
                    borderColor: "rgba(91,161,77,0.3)",
                }}
            >
                <FaWhatsapp size={22} color={ACCENT} />
            </a>

            <a
                href={`tel:${phoneNumber}`}
                className="flex items-center justify-center transition-transform border rounded-full shadow-md w-11 h-11 hover:scale-110 bg-white/80 backdrop-blur-sm"
                style={{
                    borderColor: "rgba(91,161,77,0.3)",
                }}
            >
                <FaPhoneAlt size={20} color="#3A3A4A" />
            </a>

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
