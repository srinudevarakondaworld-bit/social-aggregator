import time
import requests
from bs4 import BeautifulSoup
import firebase_admin
from firebase_admin import credentials, db

# 1. Firebase కాన్ఫిగరేషన్
FIREBASE_JSON_FILE = "social-aggregator-automation-firebase-adminsdk-fbsvc-1b90a4a37d.json"
FIREBASE_DB_URL = "https://social-aggregator-automation-default-rtdb.firebaseio.com/"

if not firebase_admin._apps:
    cred = credentials.Certificate(FIREBASE_JSON_FILE)
    firebase_admin.initialize_app(cred, {'databaseURL': FIREBASE_DB_URL})

# 2. వార్తల సేకరణ - కొత్త పద్ధతి
def auto_scrape_telugu_news():
    print("🌐 వార్తల కోసం వెతుకుతున్నాను...")
    url = "https://telugu.oneindia.com/news/andhra-pradesh/"
    headers = {'User-Agent': 'Mozilla/5.0'}
    
    try:
        response = requests.get(url, headers=headers)
        soup = BeautifulSoup(response.text, 'html.parser')
        
        # 'a' ట్యాగుల లోపల వార్తలను వెతకడం
        articles = soup.find_all('a')
        
        scraped_list = []
        for art in articles:
            title = art.text.strip()
            # హెడ్‌లైన్ పొడవు 15 అక్షరాల కంటే ఎక్కువ ఉంటేనే తీసుకుంటుంది
            if title and len(title) > 15:
                scraped_list.append(title)
                print(f"✅ దొరికింది: {title}")
                if len(scraped_list) >= 3:
                    break
        return scraped_list
    except Exception as e:
        print(f"❌ లోపం: {e}")
        return []

# 3. Firebase కు పంపడం
def send_to_db(titles):
    try:
        ref = db.reference('pending_news_queue')
        for title in titles:
            ref.push({'title': title, 'status': 'pending'})
            print(f"🚀 డేటాబేస్‌కి పంపబడింది: {title}")
    except Exception as e:
        print(f"❌ డేటాబేస్ లోపం: {e}")

# 4. మెయిన్ ప్రోగ్రామ్
if __name__ == "__main__":
    print("🚀 బాట్ రన్ అవుతోంది...")
    while True:
        items = auto_scrape_telugu_news()
        if items:
            send_to_db(items)
        else:
            print("⚠️ ప్రస్తుతానికి వార్తలు దొరకలేదు, 60 సెకన్ల తర్వాత మళ్ళీ ప్రయత్నిస్తాను.")
        
        time.sleep(60)