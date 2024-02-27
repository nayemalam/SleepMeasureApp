import { ReactNode, createContext, useMemo, useState } from 'react';

interface SelectedDateContextType {
  selectedDate: string;
  setSelectedDate: (date: string) => void;
}

const SelectedDateContext = createContext<SelectedDateContextType>({
  selectedDate: new Date().toISOString().split('T')[0],
  setSelectedDate: () => {},
});

export const SelectedDateProvider = ({ children }: { children: ReactNode }) => {
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split('T')[0],
  );

  const value: SelectedDateContextType = useMemo(
    () => ({ selectedDate, setSelectedDate }),
    [selectedDate],
  );

  return (
    <SelectedDateContext.Provider value={value}>
      {children}
    </SelectedDateContext.Provider>
  );
};

export default SelectedDateContext;
