export function getReviews() {
  try {
    return JSON.parse(localStorage.getItem("reviews")) || [];
  } catch (e) {
    return [];
  }
}

export function saveReviews(list) {
  localStorage.setItem("reviews", JSON.stringify(list));
}

export function addReview(productId, userName, rating, comment) {
  const reviews = getReviews();
  reviews.push({
    id: Date.now(),
    productId,
    userName,
    rating,
    comment,
    date: new Date().toISOString(),
  });
  saveReviews(reviews);
}

export function getReviewsForProduct(productId) {
  return getReviews().filter((r) => r.productId === productId);
}

// Expose to window for compatibility with legacy code
window.addReview = addReview;
window.getReviewsForProduct = getReviewsForProduct;
