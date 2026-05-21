import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface Course {
  id: string;
  title: string;
  platform: string;
  price: number;
  rating: number;
  image: string;
}

interface AppContextType {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  wishlist: Course[];
  addToWishlist: (course: Course) => void;
  removeFromWishlist: (courseId: string) => void;
  isInWishlist: (courseId: string) => boolean;
  compareList: Course[];
  addToCompare: (course: Course) => void;
  removeFromCompare: (courseId: string) => void;
  isInCompare: (courseId: string) => boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });

  const [wishlist, setWishlist] = useState<Course[]>(() => {
    const saved = localStorage.getItem('wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  const [compareList, setCompareList] = useState<Course[]>(() => {
    const saved = localStorage.getItem('compareList');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('compareList', JSON.stringify(compareList));
  }, [compareList]);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  const addToWishlist = (course: Course) => {
    setWishlist((prev) => [...prev, course]);
  };

  const removeFromWishlist = (courseId: string) => {
    setWishlist((prev) => prev.filter((c) => c.id !== courseId));
  };

  const isInWishlist = (courseId: string) => {
    return wishlist.some((c) => c.id === courseId);
  };

  const addToCompare = (course: Course) => {
    if (compareList.length < 3) {
      setCompareList((prev) => [...prev, course]);
    }
  };

  const removeFromCompare = (courseId: string) => {
    setCompareList((prev) => prev.filter((c) => c.id !== courseId));
  };

  const isInCompare = (courseId: string) => {
    return compareList.some((c) => c.id === courseId);
  };

  return (
    <AppContext.Provider
      value={{
        isDarkMode,
        toggleDarkMode,
        wishlist,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        compareList,
        addToCompare,
        removeFromCompare,
        isInCompare,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
