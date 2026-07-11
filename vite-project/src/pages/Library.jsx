import { useLibrary } from '../context/LibraryContext';
import styles from './Library.module.css';

export const Library = () => {
  const { library, removeFromLibrary } = useLibrary();

  if (library.length === 0) {
    return (
      <div className={styles.emptyContainer}>
        <h2>შენი ბიბლიოთეკა ცარიელია 🎮</h2>
        <p>გადადი მთავარ გვერდზე და დაამატე სასურველი თამაშები!</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>ჩემი თამაშების ბიბლიოთეკა ({library.length})</h2>
      
      <div className={styles.grid}>
        {library.map((game) => (
          <div key={game.dealID} className={styles.card}>
            <img src={game.thumb} alt={game.title} className={styles.image} />
            <div className={styles.info}>
              <h3>{game.title}</h3>
              <p className={styles.price}>${game.salePrice}</p>
            </div>
            <button 
              className={styles.removeBtn}
              onClick={() => removeFromLibrary(game.dealID)}
            >
              წაშლა 🗑️
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};