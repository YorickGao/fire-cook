const httpOptions = {
  headers: {
    //You need to use your own key to fetch data
    'X-Mashape-Key': 'e5bc36f030msh68fb5daef8565e4p103ca9jsndc15ca09ea94',
    'Accept': 'application/json'
  }
};

const DinnerModel = function () {
  let numberOfGuests = retrieveNumberOfGuestsFromCache();
  var selectedDishes = retrieveSelectedDishesFromCache();
  var observers = [];

  // Conditions
  this.GUESTS = "guests";
  this.DISH = "dish";

  // Error messages
  this.ERROR_SUFFIX = "Something went wrong...";
  this.ERROR_PRICE_OF_DISH = "Cannot get price of dish.";
  this.ERROR_ADD_DISH = "Cannot add dish to menu.";
  this.WEB_ERROR_MESSAGE = "<div class=\"row equal\" style=\"text-align:center;\">Ooops, something went wrong, please try again in a few seconds...</div>";

  // Sets the number of guests.
  this.setNumberOfGuests = (num) => {
    if (isNaN(num)) {
      return;
    }
    numberOfGuests = num;
    localStorage.setItem("app_NumberOfGuests", num);
    notifyObservers(this.GUESTS);
  };

  // Retrieve the number of guests.
  this.getNumberOfGuests = () => numberOfGuests;

  // Returns the dish that is on the menu for selected type
  this.getSelectedDish = (type) => {
    for (let dish in selectedDishes) {
      if (dish.dishTypes[0] === type) {
        return dish;
      }
    }
  };

  // Returns all the dishes on the menu.
  this.getSelectedDishes = () => selectedDishes;

  // Returns all ingredients for all the dishes on the menu.
  this.getAllIngredients = () => {
    let ingredients = [];
    for (let i = 0; i < selectedDishes.length; i++) {
      for (let j = 0; j < selectedDishes[i].ingredients.length; j++) {
        ingredients.push(selectedDishes[i].ingredients[j]);
      }
    }
    return ingredients;
  };

  // Returns the total price of the menu (all the ingredients multiplied by
  // number of guests) rounded to 2 decimal places.
  this.getTotalMenuPrice = () => Math.round(selectedDishes.reduce((price, dish) => price + this.getPriceOfDish(dish), 0) * 100) / 100;

  // Returns the price of a dish rounded to 2 decimal places.
  this.getPriceOfDish = (dish) => Math.round(dish.pricePerServing * dish.servings * numberOfGuests * 100) / 100;

  // Adds the passed dish to the menu. If the dish of that type already exists
  // on the menu it is removed from the menu and the new one added.
  this.addDishToMenu = (dish) => {
    selectedDishes.push(dish);
    localStorage.setItem("app_SelectedDishes", JSON.stringify(selectedDishes));
    notifyObservers(this.DISH);
  };

  // Removes dish from menu
  this.removeDishFromMenu = (id) => {
    for (let i = 0; i < selectedDishes.length; i++) {
      if (selectedDishes[i].id === id) {
        selectedDishes.splice(i, 1);
        notifyObservers(this.DISH);
        return;
      }
    }
  };

  // Function that returns all dishes of specific type (i.e. "starter", "main
  // dish", "dessert"). You can use the filter argument to filter out the dish
  // by name or ingredient (use for search). If you don't pass any filter all
  // the dishes will be returned.
  this.getAllDishes = (category='', filter='') => {
    const url = `https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/search?type=${category}&query=${filter}&number=16`;
    return fetch(url, httpOptions)
      .then(processResponse)
      .catch(handleError);
  };

  // Function that returns a dish of specific ID
  this.getDish = (id) => {
    const url = 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/' + id + '/information';
    return fetch(url, httpOptions)
      .then(processResponse)
      .catch(handleError);
  };

  // Helper function to process API responses.
  const processResponse = (response) => {
    if (response.ok) {
      return response.json();
    }
    throw response;
  };

  // Helper function to handle errors on failed API calls.
  const handleError = (error) => {
    if (error.json) {
      error.json().then((error) => {
        console.error('getAllDishes() API Error:', error.message || error);
      });
    } else {
      console.error('getAllDishes() API Error:', error.message || error);
    }
  };

  // Add observer to list of observers.
  this.addObserver = (observer) => observers.push(observer);

  // Find and remove observer from list of observers.
  this.removeObserver = (observer) => observers = observers.filter(obs => obs !== observer);

  // Notify all observers that they need to be updated.
  const notifyObservers = (condition) => observers.forEach(obs => obs.update(condition));

  this.resetCache = () => {
    localStorage.removeItem("app_NumberOfGuests");
    localStorage.removeItem("app_SelectedDishes");
    numberOfGuests = 4;
    selectedDishes = [];
  };

  function retrieveSelectedDishesFromCache() {
    if (localStorage.getItem("app_SelectedDishes") === null) {
      return [];
    }
    return JSON.parse(localStorage.app_SelectedDishes);
  }

  function retrieveNumberOfGuestsFromCache() {
    if (localStorage.getItem("app_NumberOfGuests") === null) {
      return 4;
    }
    return parseInt(localStorage.app_NumberOfGuests);
  }
};

export const modelInstance = new DinnerModel();
