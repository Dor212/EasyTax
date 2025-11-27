import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import DeepEligibilityForm from "../../components/Questionnaire/DeepEligibilityForm";

const TEXT = "#3A3A4A";

export default function DeepQuestionnairePage() {
    const videoRef = useRef<HTMLDivElement | null>(null);
    const videoElementRef = useRef<HTMLVideoElement | null>(null);
    const [hasInteracted, setHasInteracted] = useState(false);

    const { scrollYProgress } = useScroll({
        target: videoRef,
        offset: ["start start", "end center"],
    });

    const videoOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.4]);

    useEffect(() => {
        const video = videoElementRef.current;
        if (!video) return;

        video.muted = true;
        const playPromise = video.play();
        if (playPromise && typeof playPromise.catch === "function") {
            playPromise.catch(() => { });
        }
    }, []);

    useEffect(() => {
        const video = videoElementRef.current;
        if (!video) return;

        const unsubscribe = scrollYProgress.on("change", (v) => {
            if (v > 0.9) {
                video.muted = true;
                video.pause();
                setHasInteracted(false);
            }
        });

        return () => {
            unsubscribe();
        };
    }, [scrollYProgress]);

    const handleUserInteract = () => {
        const video = videoElementRef.current;
        if (!video) return;

        if (!hasInteracted) {
            setHasInteracted(true);
            video.muted = false;
            const playPromise = video.play();
            if (playPromise && typeof playPromise.catch === "function") {
                playPromise.catch(() => { });
            }
        }
    };

    return (
        <section
            dir="rtl"
            className="min-h-screen w-full bg-[rgba(124,232,106,0.04)] overflow-x-hidden"
        >
            <div className="max-w-6xl px-4 py-16 mx-auto sm:px-6">
                <header className="mb-10 text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="font-[Heebo] text-2xl sm:text-3xl md:text-4xl font-extrabold leading-tight"
                        style={{ color: TEXT }}
                    >
                        <span className="relative inline-block px-1">
                            <span className="relative z-10">
                                בדיקת זכאות מעמיקה{" "}
                                <span className="block sm:inline">להחזר מס</span>
                            </span>
                            <span
                                className="absolute left-0 right-0 -bottom-1 h-[3px] rounded-full"
                                style={{ background: "rgba(124,232,106,0.7)" }}
                            />
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="mt-3 text-sm sm:text-[15px] font-[Heebo] max-w-2xl mx-auto leading-7"
                        style={{ color: TEXT }}
                    >
                        הסרטון מסביר בקצרה את התהליך, והשאלון המעמיק יעזור לנו לבדוק לעומק
                        אם מגיע לכם כסף חזרה ממס הכנסה.
                    </motion.p>
                </header>

                <div className="grid gap-8 mt-8 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] lg:items-start">
                    <motion.div
                        ref={videoRef}
                        style={{ opacity: videoOpacity }}
                        className="relative w-full max-w-[420px] mx-auto lg:mx-0 aspect-[9/16] overflow-hidden"
                    >
                        <div
                            className="absolute pointer-events-none -inset-x-6 -inset-y-4 opacity-60 blur-3xl"
                            style={{
                                background:
                                    "radial-gradient(circle at top, rgba(124,232,106,0.45), transparent 60%)",
                            }}
                        />
                        <motion.div
                            className="relative w-full h-full rounded-2xl p-[8px] shadow-[0_12px_40px_rgba(15,23,42,0.12)]"
                            style={{
                                background:
                                    "linear-gradient(90deg, #5BA14D, #7CE86A, #5BA14D)",
                                backgroundSize: "200% 200%",
                            }}
                            animate={{
                                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                            }}
                            transition={{
                                duration: 4,
                                repeat: Infinity,
                                ease: "linear",
                            }}
                        >
                            <div className="relative w-full h-full overflow-hidden rounded-2xl bg-white/95">
                                <video
                                    ref={videoElementRef}
                                    className="object-cover w-full h-full"
                                    src="/videos/easytax-intro1.mp4"
                                    autoPlay
                                    muted={!hasInteracted}
                                    playsInline
                                    controls
                                    onClick={handleUserInteract}
                                    onTouchStart={handleUserInteract}
                                    onVolumeChange={handleUserInteract}
                                    onPlay={handleUserInteract}
                                />
                                <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/15 via-transparent to-transparent" />
                            </div>
                        </motion.div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.45, delay: 0.1 }}
                        className="w-full bg-white/95 backdrop-blur-sm border border-[rgba(124,232,106,0.25)] rounded-2xl p-4 sm:p-6 shadow-[0_18px_60px_rgba(15,23,42,0.12)] lg:self-center"
                    >
                        <DeepEligibilityForm />
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
