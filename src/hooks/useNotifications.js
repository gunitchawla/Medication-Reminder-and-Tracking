import { useEffect, useRef } from 'react';
import { useMedication } from '../context/MedicationContext';
import { format } from 'date-fns';

export function useNotifications() {
    const { state } = useMedication();
    const notifiedRef = useRef(new Set()); // Track notified meds to avoid spam
    const lastCheckedRef = useRef(new Date());

    useEffect(() => {
        // Request permission on mount
        if (Notification.permission === 'default') {
            Notification.requestPermission();
        }
    }, []);

    useEffect(() => {
        const sendNotification = (med, isMissed = false) => {
            const title = isMissed ? `Missed Dose: ${med.name}` : `Time to take ${med.name}`;
            const body = isMissed
                ? `You missed your ${med.time} dose of ${med.dosage}. Take it now?`
                : `Dosage: ${med.dosage}. You have ${med.refillCount} left.`;

            new Notification(title, {
                body,
                icon: '/vite.svg',
                requireInteraction: true // Keep it visible until clicked
            });
        };

        const checkSchedule = () => {
            if (Notification.permission !== 'granted') return;

            const now = new Date();
            const currentTime = now.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' });
            const todayStr = format(now, 'yyyy-MM-dd');

            state.medications.forEach(med => {
                const todayKey = `${med.id}-${todayStr}`;

                // 1. Check Exact Time Match (for when app is open)
                if (med.time === currentTime) {
                    if (!notifiedRef.current.has(todayKey)) {
                        sendNotification(med);
                        notifiedRef.current.add(todayKey);
                    }
                }

                // 2. Check Missed Doses (e.g. app was closed)
                // Only check if we haven't already notified/logged it today
                // And if the med time is in the past
                if (!notifiedRef.current.has(todayKey)) {
                    const [medHour, medMinute] = med.time.split(':').map(Number);
                    const medDate = new Date();
                    medDate.setHours(medHour, medMinute, 0, 0);

                    // If med time is in the past (but today) and we haven't notified
                    // Tolerance: 1 hour window to avoid annoying old notifications? 
                    // For now, let's just notify if it's past due today.
                    if (now > medDate) {
                        // Check if already taken in logs
                        const isTaken = state.logs.some(log =>
                            log.medicationId === med.id &&
                            format(new Date(log.timestamp), 'yyyy-MM-dd') === todayStr
                        );

                        if (!isTaken) {
                            sendNotification(med, true); // true = isMissed
                            notifiedRef.current.add(todayKey);
                        }
                    }
                }
            });

            lastCheckedRef.current = now;
        };

        // Check every 30 seconds
        const interval = setInterval(checkSchedule, 30000);

        // Initial check (delay slightly to ensure data is loaded)
        const timer = setTimeout(checkSchedule, 1000);

        return () => {
            clearInterval(interval);
            clearTimeout(timer);
        };
    }, [state.medications, state.logs]); // Re-run if meds or logs change

    return {};
}
