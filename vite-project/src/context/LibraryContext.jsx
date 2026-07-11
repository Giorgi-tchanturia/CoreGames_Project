import { createContext, useContext } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const LibraryContext = createContext();

export const LibraryProvider = ({ children }) => {
  const [library, setLibrary] = useLocalStorage('game_store_library', []);

  // თამაშის დამატება
  const addToLibrary = (game) => {
    const exists = library.some((item) => item.dealID === game.dealID);
    if (!exists) {
      setLibrary([...library, game]);
    }
  };


  const removeFromLibrary = (dealID) => {
    setLibrary(library.filter((item) => item.dealID !== dealID));
  };


  const isInLibrary = (dealID) => {
    return library.some((item) => item.dealID === dealID);
  };

  const clearLibrary = () => {
    setLibrary([]); 
  };

  return (
    
    <LibraryContext.Provider value={{ library, addToLibrary, removeFromLibrary, isInLibrary, clearLibrary }}>
      {children}
    </LibraryContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useLibrary = () => useContext(LibraryContext);