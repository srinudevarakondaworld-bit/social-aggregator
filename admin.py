import streamlit as st
import firebase_admin
from firebase_admin import credentials, db

# మీ ఫైల్ పేరును ఇక్కడ కూడా సరిచేశాను
if not firebase_admin._apps:
    cred = credentials.Certificate("social-aggregator-automation-firebase-adminsdk-fbsvc-1b90a4a37d.json")
    firebase_admin.initialize_app(cred, {
        'databaseURL': 'https://social-aggregator-automation-default-rtdb.firebaseio.com/'
    })

st.title("వార్తల అప్రూవల్ డ్యాష్‌బోర్డ్")

try:
    ref = db.reference('pending_news_queue')
    news_data = ref.get()

    if news_data:
        for key, value in news_data.items():
            st.write(f"### {value.get('title', 'No Title')}")
            if st.button(f"Approve {key}", key=key):
                db.reference('published_news').push(value)
                ref.child(key).delete()
                st.success("వార్త అప్రూవ్ అయ్యింది!")
                st.rerun()
    else:
        st.write("ప్రస్తుతం అప్రూవల్ కోసం వార్తలు ఏమీ లేవు.")
except Exception as e:
    st.error(f"డేటాబేస్ ఎర్రర్: {e}")