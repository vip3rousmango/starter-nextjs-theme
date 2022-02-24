import { useState, useEffect } from 'react';

declare global {
    interface Stackbit extends EventTarget {
        showPlaceholders: boolean;
    }
    interface Window {
        stackbit: Stackbit
    }
}

export function usePlaceholders(): boolean {
    const stackbit = typeof window === 'undefined' ? undefined : window.stackbit;

    const [showPlaceholders, setShowPlaceholders] = useState(stackbit?.showPlaceholders ?? false);

    useEffect(() => {
        const handlePlaceholders = (event: any) => {
            return setShowPlaceholders(event.detail.showPlaceholders);
        }

        stackbit?.addEventListener("showPlaceholders", handlePlaceholders);

        return () => {
            stackbit?.removeEventListener("showPlaceholders", handlePlaceholders);
        };
    }, []);

    return showPlaceholders;
}
