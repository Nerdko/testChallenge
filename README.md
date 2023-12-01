# testChallenge

test challenge for QA automation
If you downloaded this package and you are not interested in evaluating my automation skills, sorry, this package is just for that.

Running automation:
For running the test, please run the next command:
npx cypress run

For running automation with browser open, run the next command:
npx cypress run --headless:false

Test will run headless as default and report will be saved in:
mochawesome-report\challenge-report.html
or
mochawesome-report\challenge-report.json

Test definition:
Test include comments for better options to use in a real scenario, since I don't have access to the swagger, I cannot make faster custom commands for login and clean up before test execution
When possible, test wait for server side communication to complete before running assertion on the UI
Focus and should methods are used as waits hooks for test reliability
Each element with ID is found by that selector, other elements are found using the nearest parent with an ID or class as selector and then filtering with a contains command for selecting the specific element.
By using a should after each element selector allows for maintainability in the future, since the report will have exactly which element was not found or which value changed
