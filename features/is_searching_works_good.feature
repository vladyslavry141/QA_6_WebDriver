Feature: Is Github searching work well ?

Scenario Outline: searching
  Given I am on Github main page
  When I search for <searchTerm>
  Then Repository name or description should include <keyWords>

  Examples:
    | searchTerm          | keyWords       |
    | 'QA_6_WebDriver'    | 'qa,webdriver' |
    | 'matrix-bot'        | 'matrix,bot'   |
    | 'impress'           | 'impress'      |