import tweepy
import os
import json
import time
from dotenv import load_dotenv
from textblob import TextBlob
import sys
import openai  # Groq AI uses OpenAI-compatible API

sys.stdout.reconfigure(encoding='utf-8')  # Force UTF-8 support

# Load environment variables
load_dotenv()

BEARER_TOKEN = os.getenv("TWITTER_BEARER_TOKEN")
GROQ_API_KEY = os.getenv("GROQ_API_KEY")

if not BEARER_TOKEN:
    print("ERROR: Missing Twitter Bearer Token in .env")
    exit(1)

if not GROQ_API_KEY:
    print("ERROR: Missing Groq AI Key in .env")
    exit(1)

client = tweepy.Client(bearer_token=BEARER_TOKEN)

def analyze_sentiment(text):
    """Returns sentiment label based on TextBlob analysis."""
    analysis = TextBlob(text)
    polarity = analysis.sentiment.polarity
    return "positive" if polarity > 0 else "negative" if polarity < 0 else "neutral"

def get_live_tweets(keyword):
    """Fetches tweets from Twitter API and analyzes sentiment."""
    try:
        query = f"{keyword} -is:retweet lang:en"
        tweets = client.search_recent_tweets(query=query, max_results=10)

        if not tweets.data:
            print(f"⚠️ No tweets found for: {keyword}")
            return json.dumps([])

        sentiments = []
        for tweet in tweets.data:
            sentiments.append({
                "tweet": tweet.text,
                "sentiment": analyze_sentiment(tweet.text)
            })

        return json.dumps(sentiments)

    except tweepy.TooManyRequests:
        print("⚠️ Rate limit exceeded. Using Groq AI to generate tweets...")

    except Exception as e:
        print(f"ERROR: {str(e)}")
        return json.dumps([])

if __name__ == "__main__":
    keyword = "NFT"
    print(get_live_tweets(keyword))
