# Security Specification (`security_spec.md`)

## 1. Access Control Model
- **Default Deny**: All unmatched paths are rejected (`allow read, write: if false;`).
- **Strict User Ownership**: Every collection resides under `/users/{userId}` and requires `request.auth != null && request.auth.uid == userId`.
- **Immutable Ownership**: All documents require `request.resource.data.uid == userId` on create and `request.resource.data.uid == resource.data.uid` on update.

## 2. Collections & Validation Rules
1. **`/users/{userId}` (`UserProfile`)**:
   - Allowed keys: `['uid', 'displayName', 'email', 'photoURL', 'primaryCategory', 'role', 'createdAt', 'updatedAt']`
   - `role` is restricted to `'client'` or `'producer'` and cannot be escalated once created.
2. **`/users/{userId}/tasks/{taskId}` (`DirectiveTask`)**:
   - Allowed keys: `['uid', 'title', 'due', 'dueCls', 'desc', 'category', 'priority', 'done', 'createdAt']`
   - `title` must be a non-empty string `<= 300` chars; `priority` in `['high', 'normal']`; `done` is a boolean.
3. **`/users/{userId}/events/{eventId}` (`CelebrationBlueprint`)**:
   - Allowed keys: `['uid', 'name', 'typology', 'venue', 'date', 'countdown', 'guests', 'budget', 'vibe', 'createdAt']`
   - `name` and `venue` must be strings `<= 200` chars; `guests` (`1..10000`) and `budget` (`0..10000000`) must be valid numbers.
4. **`/users/{userId}/messages/{messageId}` (`ChatMessage`)**:
   - Allowed keys: `['uid', 'role', 'text', 'persona', 'model', 'timeStr', 'transcribedFromAudio', 'createdAt']`
   - `role` in `['user', 'model']`; `text` must be a non-empty string `<= 8000` chars.
