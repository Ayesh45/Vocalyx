import { useState, useEffect } from "react";
import { searchResources, getAACResourcesByCategory } from "./resourceService";
import { getFirebaseImageUrl } from "../services/imageService";
import audioData from "../data/audioData.json";

export default function SidePanel() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [view, setView] = useState("categories"); // "categories", "search", or "audio"
  const [categories, setCategories] = useState([]);
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [imageUrls, setImageUrls] = useState({});
  const [audioCategories, setAudioCategories] = useState([]);
  const [expandedAudioCategory, setExpandedAudioCategory] = useState(null);

  // Load categories on mount
  useEffect(() => {
    const cats = getAACResourcesByCategory();
    setCategories(cats);
    setAudioCategories(audioData.categories);
  }, []);

  // Handle search
  useEffect(() => {
    const delay = setTimeout(async () => {
      if (query.trim()) {
        setView("search");
        const res = await searchResources(query);
        setResults(res);
      } else {
        setView("categories");
        setResults([]);
      }
    }, 300);

    return () => clearTimeout(delay);
  }, [query]);

  const onDragStart = (e, resource) => {
    e.dataTransfer.effectAllowed = "copy";
    e.dataTransfer.setData("aac-token", JSON.stringify({
      id: resource.id || resource.itemId,
      label: resource.label,
      type: resource.type || "image",
      url: resource.url || resource.imageRef,
      imageRef: resource.imageRef || resource.url
    }));
  };

  const onAudioDragStart = (e, audioItem) => {
    e.dataTransfer.effectAllowed = "copy";
    e.dataTransfer.setData("aac-token", JSON.stringify({
      id: audioItem.id,
      label: audioItem.en,
      type: "audio",
      audioText: audioItem.en,
      audioHi: audioItem.hi,
      audioTa: audioItem.ta
    }));
  };

  const toggleCategory = (categoryId) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
  };

  const toggleAudioCategory = (categoryId) => {
    setExpandedAudioCategory(expandedAudioCategory === categoryId ? null : categoryId);
  };

  // Get image URL, fetching from Firebase if needed
  const getImageUrl = async (gsUrl) => {
    if (imageUrls[gsUrl]) {
      return imageUrls[gsUrl];
    }
    try {
      const downloadUrl = await getFirebaseImageUrl(gsUrl);
      setImageUrls(prev => ({ ...prev, [gsUrl]: downloadUrl }));
      return downloadUrl;
    } catch (error) {
      console.error('Failed to load image:', gsUrl);
      return null;
    }
  };

  return (
    <div className="side-panel">
      <div style={{ display: 'flex', gap: '8px', marginBottom: '12px', borderBottom: '2px solid #f0f0f0', paddingBottom: '8px' }}>
        <button 
          onClick={() => { setView("categories"); setQuery(""); }}
          style={{
            flex: 1,
            padding: '6px',
            border: 'none',
            borderBottom: view === 'categories' ? '3px solid #ec4899' : '3px solid transparent',
            background: 'transparent',
            cursor: 'pointer',
            fontSize: '12px',
            fontWeight: view === 'categories' ? 'bold' : 'normal',
            color: view === 'categories' ? '#ec4899' : '#999'
          }}
        >
          🖼️ Images
        </button>
        <button 
          onClick={() => setView("audio")}
          style={{
            flex: 1,
            padding: '6px',
            border: 'none',
            borderBottom: view === 'audio' ? '3px solid #ec4899' : '3px solid transparent',
            background: 'transparent',
            cursor: 'pointer',
            fontSize: '12px',
            fontWeight: view === 'audio' ? 'bold' : 'normal',
            color: view === 'audio' ? '#ec4899' : '#999'
          }}
        >
          🔊 Audio
        </button>
      </div>

      {view === 'categories' || view === 'search' ? (
        <>
          <div className="search-container">
            <input
              className="search-box"
              placeholder="Search images..."
              value={query}
              onChange={e => setQuery(e.target.value)}
            />
            {query && (
              <button
                className="clear-search-btn"
                onClick={() => {
                  setQuery("");
                  setView("categories");
                }}
              >
                ✕
              </button>
            )}
          </div>

          <div className="resource-list">
            {view === "search" ? (
              // Search Results View
              <>
                {results.length > 0 ? (
                  results.map(resource => (
                    <div
                      key={resource.id}
                      className="token token-with-image"
                      draggable
                      onDragStart={e => onDragStart(e, resource)}
                    >
                      <img 
                        src={imageUrls[resource.url || resource.imageRef] || 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="52" height="52"%3E%3Crect fill="%23f0f0f0" width="52" height="52"/%3E%3C/svg%3E'} 
                        alt={resource.label}
                        className="token-image"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'block';
                        }}
                        onLoad={() => {
                          const gsUrl = resource.url || resource.imageRef;
                          if (!imageUrls[gsUrl]) {
                            getImageUrl(gsUrl);
                          }
                        }}
                      />
                      <span className="token-fallback">🖼</span>
                      <span className="token-label">{resource.label}</span>
                    </div>
                  ))
                ) : (
                  <div className="no-results">No results found</div>
                )}
              </>
            ) : (
              // Categories View
              <>
                {categories.map(category => (
                  <div key={category.id} className="category-section">
                    <div
                      className="category-header"
                      onClick={() => toggleCategory(category.id)}
                    >
                      <span className="category-toggle">
                        {expandedCategory === category.id ? "▼" : "▶"}
                      </span>
                      <span className="category-title">
                        {category.names["en-IN"]}
                      </span>
                      <span className="category-count">
                        {category.items.length}
                      </span>
                    </div>

                    {expandedCategory === category.id && (
                      <div className="category-items">
                        {category.items.map(item => {
                          const label = item.names["en-IN"] || item.id;
                          return (
                            <div
                              key={item.id}
                              className="token token-with-image"
                              draggable
                              onDragStart={e => onDragStart(e, {
                                id: item.id,
                                label: label,
                                type: "image",
                                url: item.imageRef,
                                imageRef: item.imageRef
                              })}
                            >
                              <img
                                src={imageUrls[item.imageRef] || 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="52" height="52"%3E%3Crect fill="%23f0f0f0" width="52" height="52"/%3E%3C/svg%3E'}
                                alt={label}
                                className="token-image"
                                onError={(e) => {
                                  e.target.style.display = 'none';
                                  e.target.nextSibling.style.display = 'block';
                                }}
                                onLoad={() => {
                                  if (!imageUrls[item.imageRef]) {
                                    getImageUrl(item.imageRef);
                                  }
                                }}
                              />
                              <span className="token-fallback">🖼</span>
                              <span className="token-label">{label}</span>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                ))}
              </>
            )}
          </div>
        </>
      ) : view === 'audio' ? (
        // Audio View
        <div className="audio-categories">
          {audioCategories.map(category => (
            <div key={category.id} className="category">
              <div
                className="category-header"
                onClick={() => toggleAudioCategory(category.id)}
                style={{
                  padding: '8px',
                  backgroundColor: '#f5f5f5',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  marginBottom: '4px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  userSelect: 'none'
                }}
              >
                <span style={{ fontSize: '14px', fontWeight: '600' }}>🔊 {category.id}</span>
                <span style={{ fontSize: '12px', color: '#999' }}>
                  {expandedAudioCategory === category.id ? '▼' : '▶'}
                </span>
              </div>
              {expandedAudioCategory === category.id && (
                <div className="category-items" style={{ paddingLeft: '8px', marginBottom: '8px' }}>
                  {category.items.map(item => (
                    <div
                      key={item.id}
                      className="token token-audio"
                      draggable
                      onDragStart={(e) => onAudioDragStart(e, item)}
                      style={{
                        padding: '6px 8px',
                        margin: '4px 0',
                        backgroundColor: '#fff3e0',
                        border: '1px solid #ffb74d',
                        borderRadius: '4px',
                        cursor: 'move',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        userSelect: 'none',
                        fontSize: '13px'
                      }}
                    >
                      <span>🔊</span>
                      <span>{item.en}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
