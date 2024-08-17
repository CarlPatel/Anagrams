# Merriam-Webster Dictionary Scraper

This Python script scrapes valid words from the Merriam-Webster dictionary's website and stores them in a text file. The script iterates through the dictionary pages for each letter of the alphabet, extracts words, and ensures that only unique, single-word, alphabetic entries are stored.

## Features

- **Web Scraping**: Utilizes the `requests` library to send HTTP requests and `BeautifulSoup` for parsing HTML content.
- **Data Filtering**: Filters out words that are not single, alphabetic entries to ensure clean data.
- **File Output**: Writes valid words to a text file (`valid_mw_words.txt`) and avoids duplicate entries using a set to track seen words.
- **Page Navigation**: Automatically navigates through multiple pages for each letter and stops when the last page is reached.

## Prerequisites

To run this script, you need to have Python 3 installed, along with the following Python libraries:

- `requests`
- `beautifulsoup4`

You can install the required libraries using pip:

```
pip install requests beautifulsoup4
```

## How to Use
1.	Clone the repository (if applicable) or download the script to your local machine.
2.	Run the script:
    ```
    python3 scrape_mw_dict.py
    ```
3. Check the output: The script will create (or overwrite) a file named `valid_mw_words.txt` in the same directory where the script is located. This file will contain all the unique, valid words extracted from the Merriam-Webster dictionary.


## Notes
- This script assumes that the structure of the Merriam-Webster dictionary website does not change. If the structure changes, the script may require updates.
- The script currently targets a specific class (pb-4 pr-4 d-block) for the `<a>` tags. This may need to be adjusted if the website’s HTML structure is altered.

## Disclaimer
This script is intended for educational purposes only. Please ensure that your use of this script complies with the website’s terms of service. Be cautious of sending too many requests in a short period, as this may result in your IP address being temporarily or permanently banned from the website. To avoid this, consider implementing a delay between requests or limiting the frequency of script execution.