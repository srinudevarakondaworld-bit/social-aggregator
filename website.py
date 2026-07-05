import streamlit as st
import firebase_admin
from firebase    _admin    import    credentials, firestore

# ఇక్కడ అంచున ఎలాంటి స్పేస్ ఉండకూడదు
if not firebase_admin._apps:
    cred = ... credentials.Certificate({
        "type": st.secrets["type"],
        "project_id": st.secrets["project_id"],
        "private_key_id": st.secrets["private_key_id"],
        "private_key": st.secrets["private_key"],
        "client_email": st.secrets["client_email"],
        "client_id": st.secrets["client_id"],
        "auth_uri": st.secrets["auth_uri"],
        "token_uri": st.secrets["token_uri"],
        "auth_provider_x509_cert_url": st.secrets["auth_provider_x509_cert_url"],
        "client_x509_cert_url": st.secrets["client_x509_cert_url"]
    })
    firebase_admin.initialize_app(cred, {
        'databaseURL': 'https://social-aggregator-automation-default-rtdb.firebaseio.com/'
    })

db = firestore.client()
st.title("ప్రజా వార్తలు")
