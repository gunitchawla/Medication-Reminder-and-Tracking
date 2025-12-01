import React, { useState } from 'react';
import { useMedication } from '../context/MedicationContext';
import { AlertTriangle, PlusCircle, Package } from 'lucide-react';

export default function RefillAlerts() {
    const { state, dispatch } = useMedication();
    const [refillAmount, setRefillAmount] = useState({});

    const lowStockMeds = state.medications.filter(med => med.refillCount <= 5);
    const otherMeds = state.medications.filter(med => med.refillCount > 5);

    const handleRefill = (id) => {
        const amount = parseInt(refillAmount[id] || 30);
        dispatch({
            type: 'REFILL_MEDICATION',
            payload: { id, amount }
        });
        setRefillAmount({ ...refillAmount, [id]: '' });
    };

    return (
        <div className="refill-alerts">
            <h2 style={{ marginBottom: '2rem' }}>Inventory & Refills</h2>

            {lowStockMeds.length > 0 && (
                <div style={{ marginBottom: '3rem' }}>
                    <h3 style={{ color: '#ef4444', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <AlertTriangle size={24} /> Low Stock Alerts
                    </h3>
                    <div className="grid-layout mt-4">
                        {lowStockMeds.map(med => (
                            <RefillCard
                                key={med.id}
                                med={med}
                                isLow={true}
                                refillAmount={refillAmount}
                                setRefillAmount={setRefillAmount}
                                onRefill={handleRefill}
                            />
                        ))}
                    </div>
                </div>
            )}

            <h3>All Medications</h3>
            <div className="grid-layout mt-4">
                {otherMeds.length === 0 && lowStockMeds.length === 0 ? (
                    <p className="text-sm">No medications found.</p>
                ) : (
                    otherMeds.map(med => (
                        <RefillCard
                            key={med.id}
                            med={med}
                            isLow={false}
                            refillAmount={refillAmount}
                            setRefillAmount={setRefillAmount}
                            onRefill={handleRefill}
                        />
                    ))
                )}
            </div>
        </div>
    );
}

function RefillCard({ med, isLow, refillAmount, setRefillAmount, onRefill }) {
    return (
        <div className="glass-card" style={{
            padding: '1.5rem',
            border: isLow ? '1px solid rgba(239, 68, 68, 0.5)' : '1px solid var(--glass-border)'
        }}>
            <div className="flex-between" style={{ marginBottom: '1rem' }}>
                <div>
                    <h4 style={{ fontSize: '1.1rem' }}>{med.name}</h4>
                    <p className="text-sm">{med.dosage}</p>
                </div>
                <div style={{
                    background: isLow ? 'rgba(239, 68, 68, 0.1)' : 'rgba(16, 185, 129, 0.1)',
                    color: isLow ? '#ef4444' : '#10b981',
                    padding: '0.25rem 0.75rem',
                    borderRadius: '20px',
                    fontSize: '0.875rem',
                    fontWeight: '500'
                }}>
                    {med.refillCount} left
                </div>
            </div>

            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
                <input
                    type="number"
                    placeholder="+30"
                    value={refillAmount[med.id] || ''}
                    onChange={e => setRefillAmount({ ...refillAmount, [med.id]: e.target.value })}
                    style={{ width: '80px', padding: '0.5rem' }}
                />
                <button
                    className="btn btn-primary"
                    style={{ flex: 1, justifyContent: 'center', fontSize: '0.875rem' }}
                    onClick={() => onRefill(med.id)}
                >
                    <PlusCircle size={16} /> Refill
                </button>
            </div>
        </div>
    );
}
