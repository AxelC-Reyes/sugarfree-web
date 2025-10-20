import { useState, useEffect, useCallback } from 'react';

const DAILY_LIMIT = 40;

export default function Feed() {
  const [cards, setCards] = useState<number[]>([]);
  const [viewedToday, setViewedToday] = useState(0);
  const [likes, setLikes] = useState<number[]>([]);

  // Leer contador del día
  useEffect(() => {
    const today = new Date().toDateString();
    const saved = localStorage.getItem('viewDate');
    const savedCount = Number(localStorage.getItem('viewCount') || 0);
    if (saved === today) setViewedToday(savedCount);
    else {
      localStorage.setItem('viewDate', today);
      localStorage.setItem('viewCount', '0');
    }
  }, []);

  // Cargar más cards dummy
  const loadMore = useCallback(() => {
    if (viewedToday >= DAILY_LIMIT) return;
    const newBatch = Array.from({ length: 10 }, (_, i) => cards.length + i);
    setCards(prev => [...prev, ...newBatch]);
  }, [cards.length, viewedToday]);

  useEffect(() => {
    loadMore();
  }, [loadMore]);

  // Scroll infinito
  useEffect(() => {
    const onScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 200) {
        loadMore();
      }
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [loadMore]);

  // Like con doble click
  const likeCard = (id: number) => {
    if (likes.includes(id)) return;
    setLikes([...likes, id]);
  };

  // Contador de vista +1 cuando la card entra en pantalla
  const onCardVisible = () => {
    if (viewedToday >= DAILY_LIMIT) return;
    setViewedToday(prev => {
      const next = prev + 1;
      localStorage.setItem('viewCount', String(next));
      return next;
    });
  };

  // Anuncio cada 6 cards
  const showAd = (index: number) => (index + 1) % 6 === 0;

  return (
    <div style={{ maxWidth: 480, margin: '0 auto', padding: 20 }}>
      <h2>Descubre perfiles</h2>
      <p style={{ textAlign: 'center' }}>Vistas hoy: {viewedToday}/{DAILY_LIMIT}</p>

      {cards.map((id, i) => (
        <>
          <div
            key={id}
            style={{
              border: '1px solid #ccc',
              borderRadius: 12,
              marginBottom: 20,
              padding: 16,
              background: likes.includes(id) ? '#ffe5e5' : '#fff'
            }}
            onDoubleClick={() => likeCard(id)}
            ref={el => {
              if (!el) return;
              const observer = new IntersectionObserver(
                () => onCardVisible(),
                { threshold: 0.5 }
              );
              observer.observe(el);
              return () => observer.disconnect();
            }}
          >
            <img
              src={`https://i.pravatar.cc/200?u=${id}`}
              alt="profile"
              style={{ width: '100%', borderRadius: 8 }}
            />
            <h3>Usuario {id}</h3>
            <p>Edad: {18 + (id % 15)} • 2 km</p>
            <p>Fun fact: Me encanta el café</p>
            {likes.includes(id) && <small>❤️ ¡Like!</small>}
          </div>

          {showAd(i) && (
            <div style={{ background: '#f0f0f0', padding: 20, marginBottom: 20, textAlign: 'center' }}>
              <p>Anuncio</p>
            </div>
          )}
        </>
      ))}

      {viewedToday >= DAILY_LIMIT && (
        <div style={{ textAlign: 'center', padding: 40 }}>
          <h3>¡Llegaste al límite diario!</h3>
          <p>Vuelve mañana para ver más perfiles.</p>
        </div>
      )}
    </div>
  );
}