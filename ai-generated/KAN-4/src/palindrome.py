"""
Palindrome utility module.

Provides a single function `is_palindrome` that checks whether a given
string reads the same forwards and backwards. The check is case‑sensitive
and includes all characters (no stripping of whitespace or punctuation).
"""

def is_palindrome(s: str) -> bool:
    """
    Return True if `s` is a palindrome, otherwise False.

    Parameters
    ----------
    s : str
        The string to evaluate.

    Returns
    -------
    bool
        True if `s` reads the same forwards and backwards; False otherwise.
    """
    # Simple slice reversal works for any string, preserving case and all characters.
    return s == s[::-1]
