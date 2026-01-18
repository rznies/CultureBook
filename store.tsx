import React, { createContext, useContext, useState, ReactNode } from 'react';
import { TimelineEntry, Employee, Value, CompanyProfile } from './types';
import { TIMELINE_DATA, EMPLOYEES, VALUES } from './data';

interface AppContextType {
  entries: TimelineEntry[];
  employees: Employee[];
  values: Value[];
  company: CompanyProfile;
  addEntry: (entry: TimelineEntry) => void;
  updateCompany: (data: Partial<CompanyProfile>) => void;
  togglePortal: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Initialize with seed data, but in a real app this would start empty or fetch from API
  const [entries, setEntries] = useState<TimelineEntry[]>(TIMELINE_DATA);
  const [employees, setEmployees] = useState<Employee[]>(EMPLOYEES);
  const [values, setValues] = useState<Value[]>(VALUES);
  const [company, setCompany] = useState<CompanyProfile>({
    name: 'Acme Corp',
    foundedDate: '2021-01-15',
    missionStatement: 'To organize the world\'s information.',
    candidatePortalEnabled: true,
  });

  const addEntry = (entry: TimelineEntry) => {
    setEntries(prev => [entry, ...prev]);
    // Also update value drift logic here in a real app
  };

  const updateCompany = (data: Partial<CompanyProfile>) => {
    setCompany(prev => ({ ...prev, ...data }));
  };

  const togglePortal = () => {
    setCompany(prev => ({ ...prev, candidatePortalEnabled: !prev.candidatePortalEnabled }));
  };

  return (
    <AppContext.Provider value={{ entries, employees, values, company, addEntry, updateCompany, togglePortal }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppStore = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppStore must be used within AppProvider');
  return context;
};