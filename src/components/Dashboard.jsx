import React from 'react';
import { useMedication } from '../context/MedicationContext';
import { Check, X, Clock, AlertCircle } from 'lucide-react';
import { format } from 'date-fns';

export default function Dashboard() {
    const { state, dispatch } = useMedication();
    const today = new Date();
    const todayStr = format(today, 'yyyy-MM-dd');

    // Filter logs for today to see what's already taken
    const todaysLogs = state.logs.filter(log =>
        format(new Date(log.timestamp), 'yyyy-MM-dd') === todayStr
    );

    const handleAction = (medId, action) => {
        // Log the action
        dispatch({
            type: 'LOG_ACTION',
            payload: {
                id: Date.now().toString(),
                medicationId: medId,
                action,
                timestamp: new Date().toISOString()
            }
        });

        // If taken, decrement inventory
        if (action === 'taken') {
            dispatch({ type: 'DECREMENT_INVENTORY', payload: medId });
        }
    };

    // Sort medications by time
    const sortedMeds = [...state.medications].sort((a, b) =>
        a.time.localeCompare(b.time)
    );

    return (
        <div className="dashboard">
            <div className="flex-between" style={{ marginBottom: '2rem' }}>
                <div>
                    <h2>Today's Timeline</h2>
                    <p className="text-sm">{format(today, 'EEEE, MMMM do')}</p>
                </div>
                <div className="glass-panel" style={{ padding: '0.5rem 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981' }}></div>
                    <span className="text-sm">Active</span>
                </div>
            </div>

            <div className="timeline" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {sortedMeds.length === 0 ? (
                    <div className="glass-panel" style={{ padding: '3rem', textAlign: 'center' }}>
                        <p className="text-sm">No medications scheduled for today.</p>
                    </div>
                ) : (
                    sortedMeds.map(med => {
                        const isDone = todaysLogs.some(log => log.medicationId === med.id);
                        const log = todaysLogs.find(log => log.medicationId === med.id);

                        return (
                            <div key={med.id} className={`glass-card ${isDone ? 'done' : ''}`} style={{
                                padding: '1.5rem',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                opacity: isDone ? 0.7 : 1,
                                borderLeft: isDone
                                    ? `4px solid ${log.action === 'taken' ? '#10b981' : '#ef4444'}`
                                    : '4px solid #6366f1'
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                                    <div style={{
                                        background: 'rgba(15, 23, 42, 0.4)',
                                        padding: '0.75rem',
                                        borderRadius: '12px',
                                        minWidth: '80px',
                                        textAlign: 'center'
                                    }}>
                                        <span style={{ display: 'block', fontSize: '1.1rem', fontWeight: '600' }}>{med.time}</span>
                                        <span className="text-sm" style={{ fontSize: '0.75rem' }}>{med.frequency}</span>
                                    </div>

                                    <div>
                                        <h3 style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>{med.name}</h3>
                                        <p className="text-sm">{med.dosage} • {med.refillCount} left</p>
                                    </div>
                                </div>

                                {isDone ? (
                                    <div className="flex-center" style={{
                                        background: log.action === 'taken' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)',
                                        color: log.action === 'taken' ? '#10b981' : '#ef4444',
                                        padding: '0.5rem 1rem',
                                        borderRadius: '8px',
                                        fontWeight: '500',
                                        gap: '0.5rem'
                                    }}>
                                        {log.action === 'taken' ? <Check size={18} /> : <X size={18} />}
                                        {log.action === 'taken' ? 'Taken' : 'Skipped'}
                                    </div>
                                ) : (
                                    <div style={{ display: 'flex', gap: '1rem' }}>
                                        <button
                                            className="btn btn-secondary"
                                            onClick={() => handleAction(med.id, 'skipped')}
                                            title="Skip Dose"
                                        >
                                            <X size={20} />
                                        </button>
                                        <button
                                            className="btn btn-primary"
                                            onClick={() => handleAction(med.id, 'taken')}
                                            title="Take Dose"
                                        >
                                            <Check size={20} /> Take
                                        </button>
                                    </div>
                                )}
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
}
