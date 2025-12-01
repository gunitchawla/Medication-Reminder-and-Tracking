import React from 'react';
import { useMedication } from '../context/MedicationContext';
import { format } from 'date-fns';
import { Check, X, Calendar, Trash2 } from 'lucide-react';

export default function HistoryLog() {
    const { state, dispatch } = useMedication();

    const handleDeleteLog = (logId) => {
        if (confirm('Undo this action?')) {
            dispatch({ type: 'DELETE_LOG', payload: logId });
        }
    };

    // Group logs by date
    const groupedLogs = state.logs.reduce((acc, log) => {
        const date = format(new Date(log.timestamp), 'yyyy-MM-dd');
        if (!acc[date]) acc[date] = [];
        acc[date].push(log);
        return acc;
    }, {});

    const sortedDates = Object.keys(groupedLogs).sort((a, b) => b.localeCompare(a));

    return (
        <div className="history-log">
            <h2 style={{ marginBottom: '2rem' }}>History Log</h2>

            {sortedDates.length === 0 ? (
                <div className="glass-panel" style={{ padding: '3rem', textAlign: 'center' }}>
                    <Calendar size={48} style={{ opacity: 0.5, marginBottom: '1rem' }} />
                    <p className="text-sm">No history available yet.</p>
                </div>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    {sortedDates.map(date => (
                        <div key={date}>
                            <h3 style={{ fontSize: '1rem', color: '#94a3b8', marginBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.5rem' }}>
                                {format(new Date(date), 'EEEE, MMMM do, yyyy')}
                            </h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                {groupedLogs[date].map(log => {
                                    const med = state.medications.find(m => m.id === log.medicationId);
                                    return (
                                        <div key={log.id} className="glass-card" style={{
                                            padding: '1rem',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between'
                                        }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                                <div style={{
                                                    background: log.action === 'taken' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)',
                                                    color: log.action === 'taken' ? '#10b981' : '#ef4444',
                                                    padding: '8px',
                                                    borderRadius: '50%'
                                                }}>
                                                    {log.action === 'taken' ? <Check size={16} /> : <X size={16} />}
                                                </div>
                                                <div>
                                                    <p style={{ fontWeight: '500' }}>{med ? med.name : 'Unknown Medication'}</p>
                                                    <p className="text-sm">{format(new Date(log.timestamp), 'h:mm a')}</p>
                                                </div>
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                                <div className="text-sm" style={{ opacity: 0.7 }}>
                                                    {log.action === 'taken' ? 'Taken' : 'Skipped'}
                                                </div>
                                                <button
                                                    onClick={() => handleDeleteLog(log.id)}
                                                    style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}
                                                    title="Undo"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
