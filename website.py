import streamlit as st
import json
import firebase_admin
from firebase_admin import credentials, firestore

# Firebase ఇనిషియలైజేషన్
if not firebase_admin._apps:
    key_dict = json.loads(st.secrets["FIREBASE_JSON"])
    cred = credentials.Certificate(key_dict)
    firebase_admin.initialize_app(cred, {
        'databaseURL': 'https://social-aggregator-automation-default-rtdb.firebaseio.com/'
    })

db = firestore.client()

st.set_page_config(page_title="ప్రజా వార్తలు", layout="wide")
st.title("ప్రజా వార్తలు")
st.markdown("---")

ref = db.reference('published_news')
published_news = ref.get()

if published_news:
    news_items = list(published_news.values())[::-1]
    for news in news_items:
        st.subheader(news.get('title', 'శీర్షిక లేదు'))
        st.write("---")
else:
    st.info("ప్రస్తుతానికి ఎటువంటి వార్తలు పబ్లిష్ కాలేదు.")
