
def filter_words(input_file, output_file):
    with open(input_file, 'r') as file:
        words = file.readlines()

    filtered_words = []
    for word in words:
        word = word.upper().strip()
        if len(word) >= 3 and len(word) <= 6 and word.isalpha():
            filtered_words.append(word)

    filtered_words.sort(key=lambda x: (len(x), x))

    with open(output_file, 'w') as file:
        for word in filtered_words:
            file.write(f"{word}\n")

if __name__ == "__main__":
    input_file = 'dict_words.txt'  # Replace with your input file name
    output_file = 'valid_dict_words.txt'  # Replace with your desired output file name
    filter_words(input_file, output_file)