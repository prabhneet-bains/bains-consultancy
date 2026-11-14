# Technical Specification: KAN-4 - Palindrome  

## Objective  
Create a small, self‑contained Python module that provides a function to determine whether a given string is a palindrome, accompanied by unit tests and a README that explains usage.

## Deliverable Type  
code  

## Functional Requirements  

1. **Palindrome Function**  
   - Implement `def is_palindrome(s: str) -> bool` in `src/palindrome.py`.  
   - The function returns `True` if `s` reads the same forwards and backwards, otherwise `False`.  
   - The check is **case‑sensitive** and includes all characters (no stripping of whitespace or punctuation).  

2. **Unit Tests**  
   - Provide a test suite in `tests/test_palindrome.py` using the standard `unittest` framework.  
   - Tests must cover at least the following cases:  
     1. Empty string (`""`) → `True`  
     2. Single‑character string (`"a"`) → `True`  
     3. Simple palindrome (`"radar"`) → `True`  
     4. Non‑palindrome (`"hello"`) → `False`  
     5. Case‑sensitive mismatch (`"Racecar"` vs `"racecar"`) → `False`  

3. **README**  
   - Create `README.md` that:  
     - Describes the purpose of the module.  
     - Shows a short code example of how to import and call `is_palindrome`.  
     - Explains how to run the test suite (`python -m unittest discover`).  

4. **Packaging**  
   - The repository layout must be simple and runnable without additional dependencies beyond the Python standard library.  

## Technical Approach  

- **Language:** Python 3 (≥3.8)  
- **Libraries:** Only the Python standard library (`unittest`).  
- **Structure:**  
  - `src/` contains the implementation module.  
  - `tests/` contains the test module.  
  - Root contains `README.md`.  
- No external packages or build tools are required.

## Files To Produce  

- `src/palindrome.py` – Implements `is_palindrome`.  
- `tests/test_palindrome.py` – Unit tests for the function.  
- `README.md` – Documentation and usage instructions.  

## Acceptance Criteria  

- [ ] `src/palindrome.py` defines `is_palindrome(s: str) -> bool` with the described behavior.  
- [ ] All tests in `tests/test_palindrome.py` pass (`python -m unittest discover` returns 0 failures).  
- [ ] `README.md` exists, is clear, and includes usage example and test execution instructions.  
- [ ] No external dependencies are required; the code runs on a vanilla Python 3 installation.  

## Assumptions  

- The palindrome check is **case‑sensitive** and does **not** ignore whitespace, punctuation, or other non‑alphanumeric characters (the ticket did not specify otherwise).  
- The environment already has Python 3 installed; no virtual environment or packaging configuration is needed.  
- The repository root is the working directory when running tests (`python -m unittest discover`).
