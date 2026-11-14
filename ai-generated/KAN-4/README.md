# Palindrome Module

A tiny, self‑contained Python module that determines whether a given string is a palindrome.

## Features

- **Case‑sensitive** check – `"Racecar"` is **not** a palindrome, while `"racecar"` is.
- Includes **all characters** (whitespace, punctuation, etc.) in the evaluation.
- No external dependencies; uses only the Python standard library.

## Installation

No installation required. Simply copy the `src/` directory into your project or add it to your Python path.

## Usage

```python
from src.palindrome import is_palindrome

print(is_palindrome("radar"))      # True
print(is_palindrome("hello"))      # False
print(is_palindrome("Racecar"))    # False (case‑sensitive)
print(is_palindrome(""))           # True (empty string is a palindrome)
```

## Running the Test Suite

The repository includes a small unit‑test suite using Python’s built‑in `unittest` framework.

```bash
python -m unittest discover
```

Running the command from the repository root will discover and execute all tests under the `tests/` directory. All tests should pass.

## License

This code is released into the public domain (CC0). Feel free to use, modify, and distribute it without restriction.
