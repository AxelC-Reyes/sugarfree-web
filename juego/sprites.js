// ======================================================
// SPRITES.JS — arte por código (pixel art), reutilizable en TODOS los episodios
// ======================================================

// Chico: playera negra, pantalón azul, tenis blancos, cabello negro
window.PAL_BOY = {
  0: null,
  1: '#2b2b2b', // pelo
  2: '#e8b48c', // piel
  3: '#111111', // playera
  4: '#274b9e', // pantalón
  5: '#f5f5f5', // tenis
};

// Chica: blusa negra, jeans, zapatos rojos, cabello pelirrojo
window.PAL_GIRL = {
  0: null,
  1: '#c0431f', // pelo pelirrojo
  2: '#f0c19c', // piel
  3: '#161616', // blusa
  4: '#3a5a86', // jeans
  5: '#b8231f', // zapatos rojos
};

// sprite 8 ancho x 13 alto — cuerpo plano (torso y pantalón mismo ancho, sin marcar cadera)
// pelo clásico: copete pequeño arriba, lados cortos
window.SPRITE_BOY = [
"00011000", // copete
"01111110", // pelo (tapa la cabeza)
"01222210", // lados de pelo cortos + cara
"00222200", // cara (corte corto, sin pelo en los lados)
"03333330", // playera (hombros)
"03333330", // playera
"03333330", // playera
"04444440", // pantalón (mismo ancho que la playera, sin taper de cadera)
"04444440", // pantalón
"04444440", // pantalón
"00040400", // piernas
"00050500", // tenis
"00050500", // tenis
];

window.SPRITE_GIRL = [
"01111110", // pelo pelirrojo, corte con volumen arriba
"11222211", // pelo lados largos + cara
"11222211", // pelo lados + cara
"01222210", // cara
"03333330", // blusa (hombros)
"03333330", // blusa
"03333330", // blusa
"04444440", // jeans (mismo ancho que la blusa, sin taper de cadera)
"04444440", // jeans
"04444440", // jeans
"00040400", // piernas
"00050500", // zapatos rojos
"00050500", // zapatos rojos
];

// dibuja un sprite (array de filas de 8 caracteres) en el canvas dado
window.drawSprite = function(ctx, sprite, palette, x, y, w, h, facing){
  const rows = sprite.length;
  const cols = sprite[0].length;
  const pw = w/cols, ph = h/rows;
  for(let r=0;r<rows;r++){
    for(let c=0;c<cols;c++){
      const col = facing===-1 ? cols-1-c : c;
      const code = sprite[r][col];
      const color = palette[code];
      if(!color) continue;
      ctx.fillStyle = color;
      ctx.fillRect(Math.round(x + c*pw), Math.round(y + r*ph), Math.ceil(pw), Math.ceil(ph));
    }
  }
};