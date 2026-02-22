import { useEffect } from 'react';

/**
 * Custom hook to add instant scroll-triggered animations
 */
const useScrollAnimation = () => {
    useEffect(() => {
        const options = {
            threshold: 0.1,
            rootMargin: '50px'
        };

        const callback = (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                }
            });
        };

        const observer = new IntersectionObserver(callback, options);

        // Delay to ensure DOM is ready
        const timer = setTimeout(() => {
            const targets = document.querySelectorAll(
                '.scroll-reveal, .scroll-reveal-left, .scroll-reveal-right, .scroll-scale'
            );

            targets.forEach(target => observer.observe(target));
        }, 200);

        return () => {
            clearTimeout(timer);
            observer.disconnect();
        };
    }, []);
};

export default useScrollAnimation;
