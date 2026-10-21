// Prevent NoSQL injection by cleaning keys containing $ or .
export const sanitizeInput = (req, res, next) => {
  const clean = (obj) => {
    if (!obj || typeof obj !== 'object') return obj;
    if (Array.isArray(obj)) return obj.map(clean);

    const sanitized = {};
    for (const key of Object.keys(obj)) {
      // Remove mongo operator keys like $where, $gt, etc.
      if (key.startsWith('$') || key.includes('.')) {
        continue;
      }
      sanitized[key] = clean(obj[key]);
    }
    return sanitized;
  };

  if (req.body) req.body = clean(req.body);
  if (req.query) req.query = clean(req.query);
  if (req.params) req.params = clean(req.params);

  next();
};

// Safe string escaping for HTML rendering
export const escapeHtml = (str) => {
  if (typeof str !== 'string') return str;
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
};
