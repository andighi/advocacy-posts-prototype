# advocacy-posts-prototype
A prototype of a new posts feed.


What could have been done better:

### 1. Generate ids better
I used Date.now() to generate an id when adding a new comment. This could have been done with a 3rd party library.


### 2. Testing
For the input, I tried to test when you click on Comment button, input goes into focus. I could't do it as I used a doFocus() from Catalyst.


### 3. Data fetching
I used localStorage as a mock API.


### 4. Form use
At the comment subission, I could have used a form, but the submit event was not working as expected.


### 5. Catalyst
There was a problem with sanitization of Fonts when I tried to import them.

### 6. Error handling
Error handling could be done better. In case a param is missing, there should be a specific handling for each param.

### 7. Other
Could have used Husky for branching naming enforcement.