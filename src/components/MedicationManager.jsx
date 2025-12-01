import React, { useState } from 'react';
import { useMedication } from '../context/MedicationContext';
import { Plus, Trash2, Clock, Pill } from 'lucide-react';

export default function MedicationManager() {
    const { state, dispatch } = useMedication();
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        dosage: '',
        frequency: 'daily',
        time: '09:00',
        refillCount: 30,
        totalPills: 30
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validation
        if (!formData.name.trim()) return alert('Please enter a medication name');
        if (parseInt(formData.refillCount) < 0) return alert('Stock cannot be negative');

        const newMed = {
            id: Date.now().toString(),
            ...formData,
            refillCount: parseInt(formData.refillCount) || 0,
            totalPills: parseInt(formData.totalPills) || 0
        };
        dispatch({ type: 'ADD_MEDICATION', payload: newMed });
        setShowForm(false);
        setFormData({
            name: '',
            dosage: '',
            frequency: 'daily',
            time: '09:00',
            refillCount: 30,
            totalPills: 30
        });
    };

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this medication?')) {
            dispatch({ type: 'DELETE_MEDICATION', payload: id });
        }
    };

    return (
        <div className="medication-manager">
            <div className="flex-between" style={{ marginBottom: '1.5rem' }}>
                <h2>My Medications</h2>
                <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
                    <Plus size={20} /> Add New
                </button>
            </div>

            {showForm && (
                <div className="glass-card" style={{ padding: '1.5rem', marginBottom: '2rem' }}>
                    <h3 style={{ marginBottom: '1rem' }}>Add Medication</h3>
                    <form onSubmit={handleSubmit} className="grid-layout" style={{ gap: '1rem' }}>
                        <div>
                            <label className="text-sm">Medication Name</label>
                            <input
                                required
                                value={formData.name}
                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                                placeholder="e.g. Amoxicillin"
                            />
                        </div>
                        <div>
                            <label className="text-sm">Dosage</label>
                            <input
                                required
                                value={formData.dosage}
                                onChange={e => setFormData({ ...formData, dosage: e.target.value })}
                                placeholder="e.g. 500mg"
                            />
                        </div>
                        <div>
                            <label className="text-sm">Frequency</label>
                            <select
                                value={formData.frequency}
                                onChange={e => setFormData({ ...formData, frequency: e.target.value })}
                            >
                                <option value="daily">Daily</option>
                                <option value="twice_daily">Twice Daily</option>
                                <option value="weekly">Weekly</option>
                            </select>
                        </div>
                        <div>
                            <label className="text-sm">Time</label>
                            <input
                                type="time"
                                required
                                value={formData.time}
                                onChange={e => setFormData({ ...formData, time: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="text-sm">Current Stock</label>
                            <input
                                type="number"
                                required
                                min="0"
                                value={formData.refillCount}
                                onChange={e => setFormData({ ...formData, refillCount: e.target.value })}
                            />
                        </div>
                        <div style={{ gridColumn: '1 / -1', marginTop: '1rem' }}>
                            <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                                Save Medication
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className="grid-layout">
                {state.medications.length === 0 ? (
                    <div className="glass-panel" style={{ gridColumn: '1 / -1', padding: '3rem', textAlign: 'center' }}>
                        <Pill size={48} style={{ opacity: 0.5, marginBottom: '1rem' }} />
                        <h3>No medications yet</h3>
                        <p className="text-sm">Add your first medication to get started.</p>
                    </div>
                ) : (
                    state.medications.map(med => (
                        <div key={med.id} className="glass-card" style={{ padding: '1.5rem', position: 'relative' }}>
                            <button
                                onClick={() => handleDelete(med.id)}
                                style={{
                                    position: 'absolute',
                                    top: '1rem',
                                    right: '1rem',
                                    background: 'none',
                                    border: 'none',
                                    color: '#ef4444',
                                    cursor: 'pointer',
                                    opacity: 0.7
                                }}
                            >
                                <Trash2 size={18} />
                            </button>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                                <div style={{
                                    background: 'rgba(99, 102, 241, 0.2)',
                                    padding: '10px',
                                    borderRadius: '12px',
                                    color: '#818cf8'
                                }}>
                                    <Pill size={24} />
                                </div>
                                <div>
                                    <h3 style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>{med.name}</h3>
                                    <p className="text-sm">{med.dosage}</p>
                                </div>
                            </div>

                            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                                <div className="text-sm flex-center gap-2">
                                    <Clock size={14} /> {med.time}
                                </div>
                                <div className="text-sm flex-center gap-2">
                                    <span style={{
                                        width: '8px',
                                        height: '8px',
                                        borderRadius: '50%',
                                        background: med.refillCount < 5 ? '#ef4444' : '#10b981'
                                    }} />
                                    {med.refillCount} left
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
