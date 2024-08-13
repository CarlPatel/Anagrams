import requests
from bs4 import BeautifulSoup
import string

def extract_text_from_url(url):
    # Send a GET request to the URL
    response = requests.get(url)
    
    # Check if the request was successful
    if response.status_code == 200:
        # Parse the HTML content with BeautifulSoup
        soup = BeautifulSoup(response.content, 'html.parser')
        
        # Find all <a> elements with the class "pb-4 pr-4 d-block"
        links = soup.find_all('a', class_="pb-4 pr-4 d-block")
        
        # Extract and return the inner text of each <span> inside the <a> tags
        texts = [link.find('span').get_text() for link in links if link.find('span')]
        
        # Check if this is the last page by looking for "page X of Y"
        page_counter = soup.find('span', class_='counters')
        if page_counter:
            if "of" in page_counter.get_text():
                current_page, total_pages = page_counter.get_text().split("of")
                current_page = current_page.strip().split()[-1]
                total_pages = total_pages.strip()
                
                if current_page == total_pages:
                    print(f"Reached the last page: {current_page} of {total_pages}")
                    return texts, True  # Indicate that this is the last page
        
        return texts, False  # Not the last page yet
    else:
        print(f"Failed to retrieve content from {url}. HTTP Status code: {response.status_code}")
        return [], True  # Stop further processing in case of an error

def is_normal_word(word):
    # Check if the word contains only alphabetic characters
    return word.isalpha()

def append_to_file(filename, words, seen_words):
    with open(filename, 'a') as file:
        for word in words:
            # Only append words that are one word long, contain only alphabetic characters, and are not already seen
            if len(word.split()) == 1 and is_normal_word(word) and word not in seen_words:
                file.write(f"{word}\n")
                seen_words.add(word)  # Add the word to the set of seen words

def scrape_dictionary_by_alphabet():
    base_url = "https://www.merriam-webster.com/browse/dictionary/"
    output_file = "valid_words.txt"
    seen_words = set()  # A set to store words that have already been added
    
    # Clear the content of the file by opening in write mode
    with open(output_file, 'w') as file:
        pass  # This will clear the file
    
    for letter in string.ascii_lowercase:  # Loop through 'a' to 'z'
        page_num = 1
        while True:  # Loop through pages until the last page is reached
            url = f"{base_url}{letter}/{page_num}"  # Construct URL for each page of each letter
            print(f"Scraping {url}...")
            extracted_texts, is_last_page = extract_text_from_url(url)
            
            # Append only unique one-word alphabetic entries to the file
            if extracted_texts:
                append_to_file(output_file, extracted_texts, seen_words)
                print(f"Appended unique normal one-word entries from page {page_num} starting with '{letter}' to {output_file}.\n")
            else:
                print(f"No words found on page {page_num} for '{letter}'.\n")
            
            # If this is the last page, break the loop
            if is_last_page:
                break
            
            # Move to the next page
            page_num += 1

# Run the scraper
if __name__ == "__main__":
    scrape_dictionary_by_alphabet()