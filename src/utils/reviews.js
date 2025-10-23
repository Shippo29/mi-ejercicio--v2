export function getReviews() {
  try {
    const global = JSON.parse(localStorage.getItem("reviews")) || [];
    // también recoger reseñas almacenadas por producto (compatibilidad antigua)
    const extra = [];
    try {
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (!key) continue;
        if (key.startsWith("reviews_prod_")) {
          try {
            const arr = JSON.parse(localStorage.getItem(key) || "[]");
            const idStr = key.replace("reviews_prod_", "");
            const pid = isNaN(Number(idStr)) ? idStr : Number(idStr);
            (arr || []).forEach((r) => {
              extra.push(Object.assign({ productId: pid }, r));
            });
          } catch (err) {
            // ignorar entradas malformadas
          }
        }
      }
    } catch (e) {
      // ignorar errores de iteración
    }
    // combinar y devolver (global primero, luego extra)
    const merged = global.concat(extra);
    return merged;
  } catch (e) {
    return [];
  }
}

export function saveReviews(list) {
  localStorage.setItem("reviews", JSON.stringify(list));
}

export function addReview(productId, userName, ratingOrRatings, comment) {
  const reviews = getReviews() || [];
  const id = Date.now();
  let ratings = null;
  let global = 0;
  if (typeof ratingOrRatings === "number") {
    global = ratingOrRatings;
  } else if (ratingOrRatings && typeof ratingOrRatings === "object") {
    ratings = ratingOrRatings.ratings || ratingOrRatings;
    global =
      typeof ratingOrRatings.global === "number"
        ? ratingOrRatings.global
        : ratingOrRatings.global || 0;
  }
  const entry = {
    id,
    productId,
    userName: userName || "Anónimo",
    rating: global,
    ratings: ratings,
    comment: comment || "",
    date: new Date().toISOString(),
  };
  reviews.push(entry);
  saveReviews(reviews);
  // también mantener clave por-producto para compatibilidad con código antiguo
  try {
    const key = `reviews_prod_${productId}`;
    const prev = JSON.parse(localStorage.getItem(key) || "[]");
    prev.push({
      text: entry.comment,
      ratings: entry.ratings,
      rating: entry.rating,
      userName: entry.userName,
      date: entry.date,
    });
    localStorage.setItem(key, JSON.stringify(prev));
  } catch (e) {
    // ignorar fallos al guardar clave legacy
  }
  return entry;
}

export function getReviewsForProduct(productId) {
  return getReviews().filter((r) => r.productId === productId);
}

// Exponer en window para compatibilidad con código antiguo
window.addReview = addReview;
window.getReviewsForProduct = getReviewsForProduct;
