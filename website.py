import streamlit as st
import firebase_admin
from firebase_admin import credentials, db

# Firebase ఇనిషియలైజేషన్
if not firebase_admin._apps:
    cred = credentials.Certificate("social-aggregator-automation-firebase-adminsdk-fbsvc-1b90a4a37d.json")
    firebase_admin.initialize_app(cred, {
        'databaseURL': 'https://social-aggregator-automation-default-rtdb.firebaseio.com/'
    })

st.set_page_config(page_title="ప్రజా వార్తలు", layout="wide")
st.title("🌍 లేటెస్ట్ అప్‌డేట్స్")
st.markdown("---")

# అప్రూవ్ అయిన వార్తలను 'published_news' నుండి తీసుకుంటుంది
ref = db.reference('published_news')
published_news = ref.get()

if published_news:
    # వార్తలను రివర్స్ ఆర్డర్‌లో చూపిస్తుంది (కొత్తవి పైన వస్తాయి)
    news_items = list(published_news.values())[::-1]
    for news in news_items:
        # వార్త టైటిల్‌ను చూపిస్తుంది
        st.subheader(news.get('title', 'శీర్షిక లేదు'))
        st.write("---")
else:
    st.info("ప్రస్తుతానికి ఎటువంటి వార్తలు పబ్లిష్ కాలేదు.")