/**
 * Formats text containing link placeholders into proper HTML hyperlinks
 * @param {string} text - Text containing [LINK:...] placeholders
 * @returns {string} - HTML string with proper <a> tags
 */
export const formatTextWithLinks = (text) => {
  if (!text) return '';
  
  // Check if text contains link placeholders
  if (!text.includes('[LINK:')) {
    return text;
  }
  
  // Find all link placeholders using regex
  const regex = /\[LINK:(.*?)\]/g;
  let result = text;
  let match;
  
  // Process each link placeholder
  while ((match = regex.exec(text)) !== null) {
    try {
      // Parse the JSON data inside the placeholder
      const linkData = JSON.parse(match[1]);
      
      // Handle different link data formats
      const url = linkData.url || linkData.href;
      const text = linkData.text || linkData.title || url;
      
      if (!url) {
        // Skip links without URLs
        result = result.replace(match[0], text || '');
        continue;
      }
      
      // Replace the placeholder with a proper hyperlink using CSS classes and inline styles for better override
      const hyperlink = `<a href="${url}" target="_blank" rel="noopener noreferrer" class="blog-hyperlink" style="color: #2563eb !important; text-decoration: underline !important;">${text}</a>`;
      
      result = result.replace(match[0], hyperlink);
    } catch {
      // If parsing fails, remove the placeholder
      result = result.replace(match[0], '');
    }
  }
  
  // Additional step: Find and style plain URLs anywhere in the text
  const urlRegex = /\b((?:https?:\/\/)?(?:www\.)?[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+(?:\/[^\s]*)?)\b/g;
  result = result.replace(urlRegex, function(match) {
    // Make sure URL has proper protocol prefix
    const href = match.startsWith('http') ? match : 'https://' + match;
    return `<a href="${href}" target="_blank" rel="noopener noreferrer" class="blog-hyperlink" style="color: #2563eb !important; text-decoration: underline !important;">${match}</a>`;
  });
  
  // Also find plain "Google" word at the end of a sentence and make it a link
  result = result.replace(/([.\s])Google(\s|\.|$)/g, '$1<a href="https://www.google.com" target="_blank" rel="noopener noreferrer" class="blog-hyperlink" style="color: #2563eb !important; text-decoration: underline !important;">Google</a>$2');
  
  return result;
};

/**
 * Formats text for preview purposes (used in CreateBlog component)
 * @param {string} text - Text containing [LINK:...] placeholders
 * @returns {string} - HTML string with styled preview text
 */
export const formatTextForPreview = (text) => {
  if (!text) return '';
  
  // Check if text contains link placeholders
  if (!text.includes('[LINK:')) return text;
  
  // Find all link placeholders using regex
  const regex = /\[LINK:(.*?)\]/g;
  let result = text;
  let match;
  
  // Process each link placeholder
  while ((match = regex.exec(text)) !== null) {
    try {
      // Parse the JSON data inside the placeholder
      const linkData = JSON.parse(match[1]);
      
      // Handle different link data formats
      const url = linkData.url || linkData.href;
      const text = linkData.text || linkData.title || url;
      
      // Replace the placeholder with styled text for preview using CSS classes
      result = result.replace(
        match[0],
        `<span class="blog-hyperlink-preview">${text}</span>`
      );
    } catch {
      // If parsing fails, remove the placeholder
      result = result.replace(match[0], '');
    }
  }
  
  return result;
};
