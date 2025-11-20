import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

export default function MobileIntroVideoSection() {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const wrapRef = useRef<HTMLDivElement | null>(null);

    const [isMobile, setIsMobile] = useState(() => {
        if (typeof window === "undefined") return false;
        return window.matchMedia("(max-width: 639px)").matches;
    });

    const inView = useInView(wrapRef, { amount: 0.35 });

    useEffect(() => {
        if (typeof window === "undefined") return;

        const mql = window.matchMedia("(max-width: 639px)");

        const update = (matches: boolean) => {
            setIsMobile(matches);
            if (!matches && videoRef.current) {
                videoRef.current.pause();
                videoRef.current.currentTime = 0;
                videoRef.current.muted = true;
            }
        };

        update(mql.matches);

        const onChange = (e: MediaQueryListEvent) => update(e.matches);

        const mqlAny = mql as unknown as {
            addEventListener: (type: "change", cb: (e: MediaQueryListEvent) => void) => void;
            removeEventListener: (type: "change", cb: (e: MediaQueryListEvent) => void) => void;
        };

        mqlAny.addEventListener("change", onChange);
        return () => mqlAny.removeEventListener("change", onChange);
    }, []);

    useEffect(() => {
        const v = videoRef.current;
        if (!v) return;

        if (!inView) {
            v.pause();
            v.muted = true;
            return;
        }

        const play = async () => {
            try {
                v.muted = true;
                await v.play();
            } catch { 
                // autoplay failed
            }
        };

        play();
    }, [inView]);

    useEffect(() => {
        const v = videoRef.current;
        if (!v) return;

        const enableSound = () => {
            v.muted = false;
        };

        window.addEventListener("touchstart", enableSound, { once: true });
        window.addEventListener("click", enableSound, { once: true });

        return () => {
            window.removeEventListener("touchstart", enableSound);
            window.removeEventListener("click", enableSound);
        };
    }, []);

    if (!isMobile) return null;

    return (
        <section dir="rtl" className="relative w-full bg-black">
            <div ref={wrapRef} className="relative w-full aspect-[9/16]">
                <motion.video
                    ref={videoRef}
                    className="object-cover w-full h-full"
                    src="/videos/easytax-intro2.mp4"
                    playsInline
                    muted
                    loop
                    autoPlay
                    preload="metadata"
                />
                <div className="absolute inset-0 pointer-events-none bg-[rgba(124,232,106,0.10)] mix-blend-screen" />
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/25 via-transparent to-black/35" />
            </div>
        </section>
    );
}
