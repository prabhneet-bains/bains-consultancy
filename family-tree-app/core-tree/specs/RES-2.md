Developer ticket created by the PM agent for RES-1 (https://bains-consultancy.atlassian.net/browse/RES-1)
Technical specification (Confluence): https://bains-consultancy.atlassian.net/wiki/spaces/SD/pages/557074/RES-1+Technical+Specification+-+Family+Tree+App+-+core+tree+first+version
Repository folder: family-tree-app/core-tree
Technical specification
# Technical Specification: RES-1 – Family Tree App – Core Tree (first version)

## Objective
Build a lightweight, client‑only web application that lets a single user record family members, define parent/child and partner relationships, and visualise the resulting family tree. All data must persist locally, be exportable/importable as JSON, and the UI must be usable on desktop and mobile browsers.

## Deliverable Type
code

## Functional Requirements
1. **Person Management**  
   1.1. Add a person with **full name** (required), gender, date of birth, date of death, and a short note.  
   1.2. Edit any field of an existing person.  
   1.3. Delete a person after a confirmation dialog; deletion also removes all relationships that involve the person.

2. **Relationship Management**  
   2.1. Link two people as **parent → child** (directional).  
   2.2. Link two people as **partners/spouses** (bidirectional).  
   2.3. Enforce the following rules with clear error messages:  
   - No person may be linked to themselves.  
   - A person may have **at most two parents**.  
   - Date of death cannot be earlier than date of birth.  
   - Adding a relationship that would create a cycle (making someone their own ancestor) is rejected.

3. **Tree Visualisation**  
   3.1. Render the family tree as a diagram with generations in rows: parents above children, partners side‑by‑side, lines connecting them.  
   3.2. Clicking a node selects the person and displays their details (name, gender, dates, note, parents, partners, children) in a side panel.  
   3.3. The diagram must be responsive: it fits on phone‑size screens and supports pinch‑zoom/pan.

4. **Search**  
   4.1. Provide a case‑insensitive name search box. Selecting a result scrolls/centers the tree on that person.

5. **Persistence**  
   5.1. Store the entire tree (persons + relationships) in **`localStorage`** under a fixed key.  
   5.2. On app load, initialise from `localStorage` if present; otherwise load a **sample three‑generation family**.  
   5.3. Offer a **“Clear all data”** button that wipes `localStorage` and reloads the sample data.

6. **Export / Import**  
   6.1. Export the current tree as a downloadable **JSON** file.  
   6.2. Import a JSON file (matching the internal schema) to replace the current tree after user confirmation.

7. **Testing & Documentation**  
   7.1. Automated unit tests covering all relationship‑validation rules.  
   7.2. README with instructions to run, test, and deploy to Vercel (static site).

## Technical Approach
- **Language & Framework**: TypeScript + React (function components, hooks).  
- **Build Tool**: Vite (fast static‑site bundling, zero‑config).  
- **Tree Layout**: `d3-hierarchy` (specifically `d3.tree`) for automatic generation of node positions; simple SVG rendering.  
- **State Management**: React context for the tree model; persisted to `localStorage` on every change (debounced).  
- **Styling**: CSS Modules (or plain CSS) with Flexbox/Grid for responsive layout; mobile‑first breakpoints.  
- **File I/O**: Browser `FileReader` for import; `Blob` + `URL.createObjectURL` for export download.  
- **Testing**: Jest + @testing-library/react for component rendering; Jest unit tests for relationship‑validation logic (`src/tests/relationships.test.ts`).  
- **Project Structure**: All source files live under `family-tree-app/core-tree/`. The app is a pure static site, suitable for Vercel deployment.

## Files To Produce
- `index.html` – entry point loading the bundled script.  
- `src/main.tsx` – Vite bootstrap, renders `<App />`.  
- `src/App.tsx` – top‑level component, provides context, layout (toolbar, tree view, side panel).  
- `src/models.ts` – TypeScript interfaces for `Person`, `Relationship`, and the overall `FamilyTree`.  
- `src/storage.ts` – helpers to load/save the tree from/to `localStorage`.  
- `src/sampleData.ts` – JSON object containing a three‑generation sample family.  
- `src/components/PersonForm.tsx` – modal form for add/edit person.  
- `src/components/RelationshipForm.tsx` – modal for linking parent/child or partners.  
- `src/components/TreeView.tsx` – SVG tree rendering using d3‑tree, handles node click & zoom.  
- `src/components/PersonDetails.tsx` – side panel showing selected person and their immediate relations.  
- `src/components/SearchBar.tsx` – name search input with result list.  
- `src/components/ExportImport.tsx` – buttons for export, import, and clear‑data.  
- `src/tests/relationships.test.ts` – Jest tests for all validation rules.  
- `README.md` – build/run/test/deploy instructions.  
- `vite.config.ts` – Vite configuration (static site).  
- `package.json` – dependencies (react, react‑dom, d3, typescript, jest, testing‑library, etc.).

## Acceptance Criteria
- [ ] Adding, editing, and deleting a person works as described; UI updates instantly.  
- [ ] Parent/child and partner links can be created; invalid attempts show a clear error toast/message.  
- [ ] The tree diagram correctly displays at least three generations with parents above children and partners side‑by‑side.  
- [ ] Selecting a node shows the correct details in the side panel.  
- [ ] Searching by name jumps to the matching node and highlights it.  
- [ ] Data persists across browser reloads (localStorage).  
- [ ] “Clear all data” restores the sample family.  
- [ ] Export produces a JSON file that, when imported into a fresh app, reproduces the exact same tree.  
- [ ] All relationship rules (self‑link, max two parents, death‑before‑birth, ancestor cycles) are enforced with user‑friendly messages.  
- [ ] The UI is usable on a phone‑sized screen (no horizontal overflow, controls reachable).  
- [ ] Automated tests for relationship validation pass (`npm test` returns success).  
- [ ] README contains clear steps to `npm install`, `npm run dev`, `npm run build`, `npm test`, and deploy to Vercel.  

## Assumptions
- The app is **single‑user**; no authentication or server‑side storage is required.  
- Browser support is limited to modern evergreen browsers (Chrome, Edge, Safari, Firefox) on desktop and mobile.  
- Maximum expected tree size is a few hundred persons; performance optimisations for thousands are out of scope.  
- The sample family is hard‑coded and contains three generations (grandparents → parents → children).  
- No image or document upload functionality is needed now.  
- The UI design will be minimalistic; no branding or custom theme is required beyond basic responsiveness.
