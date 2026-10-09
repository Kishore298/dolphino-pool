import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const WaterBubbles = () => {
    const [bubbles, setBubbles] = useState([]);

    useEffect(() => {
        // Generate random bubbles
        const newBubbles = Array.from({ length: 15 }).map((_, i) => ({
            id: i,
            size: Math.random() * 20 + 5, // 5px to 25px
            left: `${Math.random() * 100}%`,
            animationDuration: Math.random() * 10 + 10, // 10s to 20s
            delay: Math.random() * 5, // 0 to 5s delay
        }));
        setBubbles(newBubbles);
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 opacity-40">
            {bubbles.map((bubble) => (
                <motion.div
                    key={bubble.id}
                    className="absolute bottom-[-50px] rounded-full border border-accent bg-accent/10"
                    style={{
                        width: bubble.size,
                        height: bubble.size,
                        left: bubble.left,
                    }}
                    animate={{
                        y: ['0vh', '-110vh'],
                        x: ['0px', '20px', '-20px', '10px', '0px']
                    }}
                    transition={{
                        y: {
                            duration: bubble.animationDuration,
                            repeat: Infinity,
                            ease: 'linear',
                            delay: bubble.delay
                        },
                        x: {
                            duration: bubble.animationDuration / 2,
                            repeat: Infinity,
                            ease: 'easeInOut',
                            delay: bubble.delay
                        }
                    }}
                />
            ))}
        </div>
    );
};

export default WaterBubbles;
