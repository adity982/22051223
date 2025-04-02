from fastapi import FastAPI, HTTPException
import httpx
import time
from collections import deque
import logging

app = FastAPI()

# Configuration
WINDOW_SIZE = 10
THIRD_PARTY_API = "http://20.244.56.144/numbers/"
VALID_IDS = {"p", "f", "e", "r"}

# Store numbers in a deque with max size WINDOW_SIZE
number_window = deque(maxlen=WINDOW_SIZE)

def fetch_numbers(numberid: str) -> list:
    """
    Fetch numbers from the third-party API with a timeout.
    Returns an empty list if the request fails or times out.
    """
    url = f"{THIRD_PARTY_API}{numberid}"
    try:
        start_time = time.time()
        response = httpx.get(url, timeout=0.5)  # 500ms timeout
        response.raise_for_status()  # Raise exception for bad status codes
        data = response.json()
        if not isinstance(data, dict) or "numbers" not in data:
            logging.warning(f"Unexpected response format from {url}")
            return []
        return data["numbers"]
    except httpx.RequestError as e:
        logging.error(f"Request failed for {url}: {str(e)}")
        return []
    except httpx.TimeoutException:
        logging.warning(f"Request timed out for {url}")
        return []
    except ValueError as e:
        logging.error(f"Invalid JSON response from {url}: {str(e)}")
        return []