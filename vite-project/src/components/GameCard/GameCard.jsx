import { Link, useNavigate } from 'react-router-dom'; // ❗️ დაემატა useNavigate
import { useAuth } from '../../context/AuthContext'; // ❗️ დაემატა useAuth (გზა შეასწორე შენი ფოლდერების მიხედვით)
import styles from './GameCard.module.css';

export const GameCard = ({ id, title, image, price, isAdded, onAddToLibrary }) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth(); 

  const handleAddClick = (e) => {
    e.preventDefault(); 
    
    if (!isAuthenticated) {
      alert('თამაშის ბიბლიოთეკაში დასამატებლად გთხოვთ გაიაროთ ავტორიზაცია!');
      navigate('/login');
      return;
    }

    if (onAddToLibrary) {
      onAddToLibrary();
    }
  };

  return (
    <Link 
      to={`/game/${id}`} 
      style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
    >
      <div className={styles.card}>
        <div className={styles.imageContainer}>
          <img src={image} alt={title} className={styles.image} />
        </div>
        <div className={styles.content}>
          <h3 className={styles.title} title={title}>{title}</h3>
          <div className={styles.footer}>
            <span className={styles.price}>{price}</span>
            <button 
              className={styles.addButton} 
              onClick={handleAddClick} 
              disabled={isAdded}
              style={{ backgroundColor: isAdded ? '#2ed573' : undefined }}
            >
              {isAdded ? 'დამატებულია ✓' : '+ დამატება'}
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};