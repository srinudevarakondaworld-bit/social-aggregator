import json
import streamlit as st
import firebase_admin
from firebase_admin import credentials, firestore

# 1. సీక్రెట్స్ నుండి డేటా తీసుకోండి
secrets_data = st.secrets["FIREBASE_JSON"]

# 2. ఒకవేళ అది స్ట్రింగ్ అయితే, JSON లోడ్ చేయండి
if isinstance(secrets_data, str):
    key_dict = json.loads(secrets_data)
else:
    key_dict = secrets_data

# 3. private_key లో \n లేకపోతే దాన్ని సరిచేయండి
if "private_key" in key_dict and "\\n" not in key_dict["private_key"]:
    key_dict["private_key"] = key_dict["private_key"].replace("\n", "\\n")

# 4. Firebase ఇనిషియలైజేషన్
if not firebase_admin._apps:
    cred = credentials.Certificate(key_dict)
    firebase_admin.initialize_app(cred, {
        'databaseURL': 'https://social-aggregator-automation-default-rtdb.firebaseio.com/'
    })

db = firestore.client()
