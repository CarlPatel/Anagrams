def filter_words(input_file, output_file, max_word_length):
    # Read the words from the input
    with open(input_file, 'r') as file:
        words = file.readlines()

    # Filter the words based on length and alphabetic characters
    filtered_words = []
    for word in words:
        word = word.upper().strip()
        if len(word) >= 3 and word.isalpha():
            if len(word) <= max_word_length:
                filtered_words.append(word)

    # Sort the filtered words by length and then alphabetically
    filtered_words.sort(key=lambda x: (len(x), x))

    # Write the filtered words to the output file
    with open(output_file, 'w') as file:
        for word in filtered_words:
            file.write(f"{word}\n")

if __name__ == "__main__":
    input_file = 'all_aspell_words.txt'
    output_file = 'valid_dict_words.txt'
    max_word_length = 999999                # Set the maximum word length
    filter_words(input_file, output_file, max_word_length)