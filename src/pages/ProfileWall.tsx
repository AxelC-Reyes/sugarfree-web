import { useState, useEffect } from 'react';

type Profile = {
  id: number;
  name: string;
  age: number;
  bio: string;
  avatar: string;
  photos: string[]; // galería completa
};

export default function ProfileWall() {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [likes, setLikes] = useState<Set<number>>(new Set());
  const [selected, setSelected] = useState<Profile | null>(null);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  // genera perros dummy (más adelante los cambias por usuarios reales)
  const loadMore = () => {
    const batch: Profile[] = Array.from({ length: 10 }, (_, i) => {
      const id = profiles.length + i;
      return {
        id,
        name: `Usuario ${id}`,
        age: 18 + (id % 15),
        bio: 'Me encanta el café, los perros y las buenas conversaciones.',
        avatar: `https://i.pravatar.cc/400?u=${id}`,
        photos: [
          `https://i.pravatar.cc/400?u=${id}`,
          `https://i.pravatar.cc/401?u=${id}`,
          `https://i.pravatar.cc/402?u=${id}`,
        ],
      };
    });
    setProfiles((prev) => [...prev, ...batch]);
  };

  useEffect(() => {
    loadMore();
  }, []);

  // scroll infinito
  useEffect(() => {
    const onScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 200) {
        loadMore();
      }
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [profiles.length]);

  // like / unlike
  const toggleLike = (id: number) => {
    setLikes((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  // navegación de fotos dentro del modal
  const nextPhoto = () => setCurrentPhotoIndex((i) => (i + 1) % selected!.photos.length);
  const prevPhoto = () => setCurrentPhotoIndex((i) => (i - 1 + selected!.photos.length) % selected!.photos.length);

  return (
    <div style={{ maxWidth: 480, margin: '0 auto', padding: 20 }}>
      <h2>Descubre perfiles</h2>

      {profiles.map((p) => (
        <div
          key={p.id}
          style={{
            border: '1px solid #ccc',
            borderRadius: 12,
            marginBottom: 20,
            padding: 16,
            background: likes.has(p.id) ? '#ffe5e5' : '#fff',
            cursor: 'pointer',
          }}
          onDoubleClick={() => toggleLike(p.id)}
        >
          {/* Foto principal (click abre modal) */}
          <img
            src={p.avatar}
            alt={p.name}
            style={{ width: '100%', borderRadius: 8 }}
            onClick={() => {
              setSelected(p);
              setCurrentPhotoIndex(0);
            }}
          />

          <h3>{p.name}, {p.age}</h3>
          <p>{p.bio}</p>
          {likes.has(p.id) && <small>❤️ Like</small>}
        </div>
      ))}

      {/* Modal de galería completa */}
      {selected && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.8)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 999,
          }}
          onClick={() => setSelected(null)}
        >
          <img
            src={selected.photos[currentPhotoIndex]}
            alt=""
            style={{ maxWidth: '90%', maxHeight: '70%', borderRadius: 8 }}
            onClick={(e) => e.stopPropagation()}
          />
          <div style={{ marginTop: 12 }}>
            <button onClick={prevPhoto}>◀</button>
            <span style={{ margin: '0 10px', color: '#fff' }}>
              {currentPhotoIndex + 1} / {selected.photos.length}
            </span>
            <button onClick={nextPhoto}>▶</button>
          </div>
          <button onClick={() => setSelected(null)} style={{ marginTop: 12 }}>
            Cerrar
          </button>
        </div>
      )}
    </div>
  );
}