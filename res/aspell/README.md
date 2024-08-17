# Aspell Dictionary

GNU Aspell is a Free and Open Source spell checker that includes multiple dictionaries.

This guide provides instructions on how to extract the Aspell dictionary and parse it to get all valid anagram words. 

# Aspell Installation
## Prerequisites

- A UNIX-like operating system (Linux, macOS)
- Command-line tools (bash, make)
- An internet connection

## Step 1: Download Aspell

1. Open your terminal.

2. Navigate to the [Aspell download page](http://aspell.net/).

3. Download the latest stable release of Aspell:
    ```
    wget ftp://ftp.gnu.org/gnu/aspell/aspell-0.60.8.tar.gz
    ```

4.	Extract the downloaded tarball:
    ```
    tar -xzf aspell-0.60.8.tar.gz
    ```

5.	Change into the extracted directory:
    ```
    cd aspell-0.60.8
    ```

## Step 2: Configure and Build Aspell

1.	Run the ./configure script to set up the build environment:
    ```
    ./configure
    ```
    - Note: If you encounter any missing dependencies, install them using your package manager (e.g., apt-get on Ubuntu, brew on macOS).

2.	Once the configuration is complete, compile Aspell by running:
    ```
    make
    ```
    - This will build the Aspell binaries. The process may take a few minutes depending on your system.

## Step 3: Generate a Custom Dictionary

To generate a custom dictionary file using the English language, run the following command:

```
aspell -d en dump master | aspell -l en expand > all_aspell_words.txt
```
**Explanation**:
* `aspell -d en dump master`: Dumps the master list of English words.
* `| aspell -l en expand`: Expands the dumped list into individual words.
* `> all_aspell_words.txt`: Redirects the output into a file named my.dict.

## Step 4: Verify the Dictionary

You can verify the contents of your generated dictionary by opening it with a text editor or displaying the first few lines in the terminal:
```
head all_aspell_words.txt
```
This will display the first 10 words in your dictionary file.

## Additional Information

For more details on using Aspell and its options, you can refer to the official [Aspell documentation](http://aspell.net).


# Parse Aspell Dictionary
To parses the Aspell dictionay to get all the valid anagram words, run the python script `parse_dict.py`:
```
python3 parse_dict.py
```
### Parameters
* **Word Length**: If you only want words of a certain length enter that number in it's respective line
    * Commenting this line out will give all valid words