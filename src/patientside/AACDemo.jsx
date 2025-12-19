import React from "react";
<<<<<<< HEAD
import { useNavigate } from "react-router-dom";
=======
>>>>>>> 95f49840ce41efa044abbde449f2143982384982

const data = {
  greetings: [
    { code: "gm", en: "good morning", hi: "सुप्रभात", ta: "காலை வணக்கம்" },
    { code: "ga", en: "good afternoon", hi: "शुभ दोपहर", ta: "மதிய வணக்கம்" },
    { code: "ge", en: "good evening", hi: "शुभ संध्या", ta: "மாலை வணக்கம்" },
    { code: "gn", en: "good night", hi: "शुभ रात्रि", ta: "இரவு வணக்கம்" },
    { code: "hi", en: "hello", hi: "नमस्ते", ta: "வணக்கம்" }
  ],
  family: [
    { en: "father", hi: "पिता", ta: "அப்பா" },
    { en: "mother", hi: "माँ", ta: "அம்மா" },
    { en: "brother", hi: "भाई", ta: "அண்ணன்" },
    { en: "sister", hi: "बहन", ta: "சகோதரி" },
    { en: "son", hi: "बेटा", ta: "மகன்" },
    { en: "daughter", hi: "बेटी", ta: "மகள்" },
    { en: "grandfather", hi: "दादा", ta: "தாத்தா" },
    { en: "grandmother", hi: "दादी", ta: "பாட்டி" },
    { en: "husband", hi: "पति", ta: "கணவர்" },
    { en: "wife", hi: "पत्नी", ta: "மனைவி" }
  ],
  food: [
    { en: "milk", hi: "दूध", ta: "பால்" },
    { en: "water", hi: "पानी", ta: "தண்ணீர்" },
    { en: "rice", hi: "चावल", ta: "அரிசி" },
    { en: "bread", hi: "रोटी", ta: "ரொட்டி" },
    { en: "vegetable", hi: "सब्ज़ी", ta: "காய்கறி" },
    { en: "fruit", hi: "फल", ta: "பழம்" },
    { en: "banana", hi: "केला", ta: "வாழைப்பழம்" },
    { en: "apple", hi: "सेब", ta: "ஆப்பிள்" },
    { en: "egg", hi: "अंडा", ta: "முட்டை" },
    { en: "tea", hi: "चाय", ta: "தேநீர்" }
  ],
  transport: [
    { en: "road", hi: "सड़क", ta: "சாலை" },
    { en: "car", hi: "कार", ta: "கார்" },
    { en: "bus", hi: "बस", ta: "பஸ்" },
    { en: "train", hi: "ट्रेन", ta: "ரயில்" },
    { en: "bike", hi: "साइकिल", ta: "மிதிவண்டி" },
    { en: "auto rickshaw", hi: "ऑटो", ta: "ஆட்டோ" },
    { en: "truck", hi: "ट्रक", ta: "லாரி" },
    { en: "ship", hi: "जहाज़", ta: "கப்பல்" },
    { en: "airplane", hi: "हवाई जहाज़", ta: "விமானம்" },
    { en: "station", hi: "स्टेशन", ta: "நிலையம்" }
  ],
  emotions: [
    { en: "happy", hi: "खुश", ta: "மகிழ்ச்சி" },
    { en: "sad", hi: "दुखी", ta: "வருத்தம்" },
    { en: "angry", hi: "गुस्सा", ta: "கோபம்" },
    { en: "hurt", hi: "दर्द", ta: "வலி" },
    { en: "scared", hi: "डर लगा", ta: "பயம்" },
    { en: "tired", hi: "थका हुआ", ta: "சோர்வு" },
    { en: "surprised", hi: "आश्चर्यचकित", ta: "ஆச்சரியம்" },
    { en: "worried", hi: "चिंतित", ta: "கவலை" }
  ],
  festivals: [
    { en: "Diwali",      hi: "दिवाली",            ta: "தீபாவளி" },
    { en: "Pongal",      hi: "पोंगल",             ta: "பொங்கல்" },
    { en: "Holi",        hi: "होली",              ta: "ஹோலி" },
    { en: "Eid",         hi: "ईद",               ta: "ஈத்" },
    { en: "Christmas",   hi: "क्रिसमस",          ta: "கிறிஸ்துமஸ்" },
    { en: "New Year",    hi: "नया साल",          ta: "புத்தாண்டு" },
    { en: "Navratri",    hi: "नवरात्रि",         ta: "நவராத்திரி" },
    { en: "Ganesh Chaturthi", hi: "गणेश चतुर्थी", ta: "விநாயகர் சதுர்த்தி" },
    { en: "Onam",        hi: "ओणम",              ta: "ஓணம்" },
    { en: "Raksha Bandhan", hi: "रक्षा बंधन",    ta: "ரக்ஷா பந்தன்" }
  ]
};

function speak(text, langCode) {
  const u = new SpeechSynthesisUtterance(text);
  u.lang = langCode;
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(u);
}

export default function AACDemo() {
<<<<<<< HEAD
  const navigate = useNavigate();

  return (
    <div style={{ padding: 20, fontFamily: "sans-serif" }}>
      <button 
        onClick={() => navigate(-1)}
        style={{
          padding: '8px 12px',
          borderRadius: '8px',
          border: 'none',
          background: 'rgba(200,200,200,0.9)',
          cursor: 'pointer',
          fontSize: '18px',
          marginBottom: '16px'
        }}
      >
        ⬅ Back
      </button>
=======
  return (
    <div style={{ padding: 20, fontFamily: "sans-serif" }}>
>>>>>>> 95f49840ce41efa044abbde449f2143982384982
      <h1>English–Hindi–Tamil AAC Demo</h1>
      <div id="aac-app">
        {Object.entries(data).map(([categoryName, items]) => (
          <div key={categoryName} style={{ marginBottom: 20 }}>
            <h2>{categoryName.charAt(0).toUpperCase() + categoryName.slice(1)}</h2>
            {categoryName === "festivals" && (
              <div style={{ marginBottom: 12 }}>
                <strong>Interactive Activities:</strong>
                <div>
                  <a href="teacher.html" style={{ marginRight: 20 }}>Create Matching Worksheet (Teacher)</a>
                  <a href="student.html">Play Latest Matching Worksheet (Student)</a>
                </div>
              </div>
            )}

            {items.map((item, i) => (
              <div key={i} style={{ margin: "6px 0" }}>
                <span style={{ minWidth: 120, display: "inline-block" }}>{item.en}</span>
                <button onClick={() => speak(item.en, "en-IN")}>{item.en}</button>
                {item.hi && <button onClick={() => speak(item.hi, "hi-IN")}>{item.hi}</button>}
                {item.ta && <button onClick={() => speak(item.ta, "ta-IN")}>{item.ta}</button>}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
