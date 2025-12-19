import aacData from "../data/aacResources.json";
import legacyData from "../data/resources.json";

/**
 * Flatten categorized AAC resources into searchable format
 */
function flattenAACResources() {
  const flattened = [];

  aacData.categories.forEach(category => {
    category.items.forEach(item => {
      const names = item.names || {};
      const primaryLabel = names["en-IN"] || Object.values(names)[0] || item.id;

      flattened.push({
        id: `${category.id}_${item.id}`,
        label: primaryLabel,
        type: "image",
        url: item.imageRef,
        imageRef: item.imageRef,
        categoryId: category.id,
        categoryLabel: category.names["en-IN"],
        itemId: item.id,
        names: item.names,
        tags: [
          primaryLabel.toLowerCase(),
          category.names["en-IN"].toLowerCase(),
          ...(item.type ? [item.type.toLowerCase()] : [])
        ]
      });
    });
  });

  return flattened;
}

/**
 * Local resource search (mock Firebase)
 * Used by SidePanel
 * Searches both legacy resources and AAC resources
 */
export async function searchResources(keyword) {
  if (!keyword) return [];

  const q = keyword.toLowerCase();
  const aacResources = flattenAACResources();

  // Search in AAC resources
  const aacMatches = aacResources.filter(resource =>
    resource.label.toLowerCase().includes(q) ||
    resource.tags.some(tag => tag.includes(q))
  );

  // Search in legacy resources
  const legacyMatches = legacyData.filter(resource =>
    resource.label.toLowerCase().includes(q) ||
    resource.tags.some(tag => tag.toLowerCase().includes(q))
  );

  return [...aacMatches, ...legacyMatches];
}

/**
 * Get all AAC resources grouped by category
 */
export function getAACResourcesByCategory() {
  return aacData.categories;
}
