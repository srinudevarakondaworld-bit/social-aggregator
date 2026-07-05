import streamlit as st
import json
import firebase_admin
from firebase_admin import credentials, firestore

# Firebase ఇనిషియలైజేషన్
if not firebase_admin._apps:
    # Secrets నుండి డేటా తీసుకుంటుంది
    key_dict = json.loads(st.secrets["FIREBASE_JSON"])
    cred = credentials.Certificate(key_dict)
    firebase_admin.initialize_app(cred, {
        'databaseURL': 'https://social-aggregator-automation-default-rtdb.firebaseio.com/'
    })

db = firestore.client()
st.title("ప్రజా వార్తలు")
