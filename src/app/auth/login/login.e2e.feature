Feature: Login

  Background:
    Given I navigate to the login page

  Scenario: Display the login elements
    Then I should see the login form, email input field, and submit button

  Scenario: Validate email input
    When I enter "test@example" into the email field
    And I submit the form
    Then I should see a validation error message

  Scenario: Submit the form with a valid email
    When I enter "test@example.com" into the email field
    And I submit the form
    Then I should be redirected to the verification page