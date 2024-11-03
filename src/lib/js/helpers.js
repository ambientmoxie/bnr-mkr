// Capitalize value
export function capitalize(title) {
  return title.charAt(0).toUpperCase() + title.slice(1);
}

/* Generate basic favicon */
export function generateFavIcon(color) {
  const canvas = document.createElement("canvas");
  // Set favicon size
  canvas.width = 64;
  canvas.height = 64;
  const context = canvas.getContext("2d");

  // Draw the shape
  context.beginPath();
  context.arc(32, 32, 32, 0, 2 * Math.PI);
  context.fillStyle = color;
  context.fill();

  // Create and append favicon link
  const link = document.createElement("link");
  link.rel = "icon";
  link.href = canvas.toDataURL("image/png");
  document.head.appendChild(link);
}

// Truncate after x characters
export function truncateString(string, nbr) {
  const trunc = string.substr(0, nbr) + "\u2026";
  return trunc;
}
