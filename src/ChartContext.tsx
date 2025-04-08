import {
  createContext,
  useContext,
  useState,
  useMemo,
  useCallback,
} from 'react';

export const ChartContext = createContext<{
  yDomain: [number, number];
  updateYDomain: (value: number) => void;
}>({
  yDomain: [-100, 100],
  updateYDomain: () => {},
});

export const useChartContext = () => useContext(ChartContext);

export const ChartProvider = ({ children }: { children: React.ReactNode }) => {
  const [yDomain, setYDomain] = useState<[number, number]>([-100, 100]);

  const updateYDomain = useCallback((newValue: number) => {
    setYDomain((prev) => {
      const [min, max] = prev;
      const newMin = Math.min(min, newValue);
      const newMax = Math.max(max, newValue);

      // Only update if the domain has actually changed.
      if (newMin === min && newMax === max) {
        return prev;
      }
      return [newMin, newMax];
    });
  }, []);

  const value = useMemo(
    () => ({ yDomain, updateYDomain }),
    [yDomain, updateYDomain]
  );

  return (
    <ChartContext.Provider value={value}>{children}</ChartContext.Provider>
  );
};
