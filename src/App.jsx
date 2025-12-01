import React, { useState } from 'react';
import { LayoutDashboard, Pill, History, AlertCircle } from 'lucide-react';
import Dashboard from './components/Dashboard';
import MedicationManager from './components/MedicationManager';
import HistoryLog from './components/HistoryLog';
import RefillAlerts from './components/RefillAlerts';
import { useNotifications } from './hooks/useNotifications';

function App() {
  useNotifications();
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <Dashboard />;
      case 'medications': return <MedicationManager />;
      case 'history': return <HistoryLog />;
      case 'refills': return <RefillAlerts />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="app-container">
      <nav className="glass-panel" style={{
        position: 'fixed',
        bottom: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 100,
        padding: '10px 20px',
        display: 'flex',
        gap: '20px'
      }}>
        <NavButton
          active={activeTab === 'dashboard'}
          onClick={() => setActiveTab('dashboard')}
          icon={<LayoutDashboard size={24} />}
          label="Dashboard"
        />
        <NavButton
          active={activeTab === 'medications'}
          onClick={() => setActiveTab('medications')}
          icon={<Pill size={24} />}
          label="Meds"
        />
        <NavButton
          active={activeTab === 'refills'}
          onClick={() => setActiveTab('refills')}
          icon={<AlertCircle size={24} />}
          label="Refills"
        />
        <NavButton
          active={activeTab === 'history'}
          onClick={() => setActiveTab('history')}
          icon={<History size={24} />}
          label="History"
        />
      </nav>

      <main className="container" style={{ paddingBottom: '100px' }}>
        <header style={{ marginBottom: '2rem', textAlign: 'center', paddingTop: '2rem' }}>
          <h1>MedTracker</h1>
          <p className="text-sm">Stay healthy, stay on track.</p>
        </header>
        {renderContent()}
      </main>
    </div>
  );
}

function NavButton({ active, onClick, icon, label }) {
  return (
    <button
      onClick={onClick}
      style={{
        background: active ? 'rgba(99, 102, 241, 0.2)' : 'transparent',
        border: 'none',
        color: active ? '#818cf8' : '#94a3b8',
        padding: '10px',
        borderRadius: '12px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '4px',
        cursor: 'pointer',
        transition: 'all 0.2s'
      }}
    >
      {icon}
      <span style={{ fontSize: '0.75rem', fontWeight: 500 }}>{label}</span>
    </button>
  );
}

export default App;
