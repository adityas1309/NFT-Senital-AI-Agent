import sys
import json
import requests
import os
import re

GROQ_API_KEY = os.getenv("GROQ_API_KEY")
keyword = sys.argv[1] if len(sys.argv) > 1 else "NFT"

def get_fake_tweets(keyword):
    """Generates fake tweets using Groq AI and ensures sentiment labels are correctly assigned."""
    if not GROQ_API_KEY:
        return json.dumps([{"tweet": "AI tweet generation failed: Missing API key", "sentiment": "error"}])

    prompt = f"""Generate 7 realistic tweets about {keyword} (an NFT project). Each tweet should:

- Be natural and engaging, like a real Twitter post.
- Reflect real user behavior, including excitement, skepticism, or neutral observations.
- Include hashtags and emojis where relevant.
- End with a sentiment label: Positive, Negative, or Neutral.

Ensure that:
- Positive tweets express excitement or bullish sentiment.
- Negative tweets express doubt, frustration, or complaints.
- Neutral tweets are observational or open-ended.

### Example Output:
1. "Just minted a {keyword} NFT, and the art is 🔥! Can't wait to see where this project goes! 🚀 #{keyword} #NFTCommunity" - Sentiment: Positive

2. "Another day, another NFT project... Is {keyword} actually legit or just another cash grab? 🤔" - Sentiment: Negative

3. "Big names are talking about {keyword} NFT. Might be worth checking out. #NFTs #{keyword}" - Sentiment: Neutral

4. "Bruh, gas fees were more than my {keyword} NFT mint price. This ain't it. 💀" - Sentiment: Negative

5. "Floor price of {keyword} NFT is holding steady. Might be a solid long-term hold. #NFTMarket" - Sentiment: Neutral

6. "The {keyword} team just dropped a sneak peek of their upcoming project and it's 🔥 Can't wait to hear more! #{keyword} #NFTCommunity" - Sentiment: Positive

7. "Does anyone know if buying a {keyword} NFT will get you perks or access to exclusive content? 🤔 Would be cool to get some extra benefits. #{keyword} #NFTPerks" - Sentiment: Neutral

Now, generate 7 more tweets following this format. Ensure sentiment labels are **correct and varied**.
"""

    try:
        response = requests.post(
            "https://api.groq.com/openai/v1/chat/completions",
            headers={
                "Authorization": f"Bearer {GROQ_API_KEY}",
                "Content-Type": "application/json",
            },
            json={
                "model": "llama3-8b-8192",  # Use Groq's model
                "messages": [{"role": "user", "content": prompt}]
            },
        )

        data = response.json()

        if "choices" not in data or not data["choices"]:
            raise ValueError("❌ No valid response from Groq AI.")

        tweets_text = data["choices"][0]["message"]["content"]

        # Regular expression to extract tweet text and sentiment
        tweet_pattern = re.compile(r'^\d+\.\s*"(.+?)"\s+- Sentiment:\s*(Positive|Negative|Neutral)', re.MULTILINE)

        tweets = []
        for match in tweet_pattern.finditer(tweets_text):
            tweet_text = match.group(1).strip()
            sentiment = match.group(2).strip().lower()
            tweets.append({"tweet": tweet_text, "sentiment": sentiment})

        # Debugging: Ensure sentiment values are correct
        valid_sentiments = {"positive", "negative", "neutral"}
        for t in tweets:
            if t["sentiment"] not in valid_sentiments:
                print(f"⚠️ Invalid sentiment detected: {t['sentiment']} for tweet: {t['tweet']}")

        return json.dumps(tweets, indent=2)

    except requests.exceptions.RequestException as e:
        print(f"❌ ERROR with Groq AI:", str(e))
        return json.dumps([{"tweet": "AI tweet generation failed", "sentiment": "error"}])

    except ValueError as e:
        print(f"❌ ERROR:", str(e))
        return json.dumps([{"tweet": "AI response parsing failed", "sentiment": "error"}])

if __name__ == "__main__":
    print(get_fake_tweets(keyword))
