from selenium import webdriver
from selenium.webdriver.common.by import By

driver = webdriver.Firefox()

driver.get("https://twelve.dynamify.com/store/16709")
driver.implicitly_wait(5)
buttons = driver.find_elements(By.CLASS_NAME, "main-nav-new.mb-3.ng-scope").find_element(By.CLASS_NAME, "ng-scope").find_element(By.CLASS_NAME, "button-bar.menu-category-selection").find_elements(By.CLASS_NAME,"app-border.text-center.menu-category-box.button.button-small.capitalize.white.ng-binding.ng-scope")
print(len(buttons))

driver.quit()