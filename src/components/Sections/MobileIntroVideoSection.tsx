import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function MobileIntroVideoSection() {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const sectionRef = useRef<HTMLElement | null>(null);
    const inView = useInView(sectionRef, { amount: 0.4 });

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        video.muted = true;
        video.volume = 0;

        const tryAutoplay = () => {
            video.play().catch(() => { });
        };

        tryAutoplay();

        const enableSound = () => {
            const v = videoRef.current;
            if (!v) return;
            v.muted = false;
            v.volume = 0.35;
            v.play().catch(() => { });
            window.removeEventListener("touchstart", enableSound);
            window.removeEventListener("click", enableSound);
        };

        window.addEventListener("touchstart", enableSound, { passive: true });
        window.addEventListener("click", enableSound);

        return () => {
            window.removeEventListener("touchstart", enableSound);
            window.removeEventListener("click", enableSound);
        };
    }, []);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        if (!inView) {
            video.muted = true;
            video.pause();
        } else {
            if (video.paused) {
                video.play().catch(() => { });
            }
        }
    }, [inView]);

    return (
        <section
            ref={sectionRef}
            id="mobile-intro-video"
            dir="rtl"
            className="md:hidden w-full min-h-screen pt-16 pb-10 px-4 flex items-center justify-center bg-[rgba(124,232,106,0.10)] backdrop-blur-md"
        >
            <div className="w-full max-w-sm mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="relative w-full aspect-[9/16]"
                >
                    <div
                        className="absolute pointer-events-none -inset-x-8 -inset-y-6 opacity-60 blur-3xl"
                        style={{
                            background:
                                "radial-gradient(circle at top, rgba(124,232,106,0.45), transparent 60%)",
                        }}
                    />

                    <div className="relative w-full h-full overflow-hidden rounded-[28px] bg-white/90 border border-[rgba(124,232,106,0.4)] shadow-[0_20px_60px_rgba(15,23,42,0.16)]">
                        <div className="pointer-events-none absolute inset-0 bg-[rgba(124,232,106,0.10)] mix-blend-soft-light" />
                        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/18 via-transparent to-white/5" />

                        <video
                            ref={videoRef}
                            className="relative z-10 object-cover w-full h-full"
                            src="/videos/easytax-intro1.mp4"
                            autoPlay
                            playsInline
                            controls
                        />
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
