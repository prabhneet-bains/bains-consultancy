import unittest
from src.palindrome import is_palindrome

class TestIsPalindrome(unittest.TestCase):
    def test_empty_string(self):
        self.assertTrue(is_palindrome(""))

    def test_single_character(self):
        self.assertTrue(is_palindrome("a"))

    def test_simple_palindrome(self):
        self.assertTrue(is_palindrome("radar"))

    def test_non_palindrome(self):
        self.assertFalse(is_palindrome("hello"))

    def test_case_sensitive_mismatch(self):
        # "Racecar" is not the same as "racecar" when case‑sensitive
        self.assertFalse(is_palindrome("Racecar"))
        self.assertTrue(is_palindrome("racecar"))  # control: lower‑case version is a palindrome

if __name__ == "__main__":
    unittest.main()
