import Food from "./food.js";

export default class App {
    constructor() {
        this.selectedFoodId = null;
        this.#initializeEventListeners();
    }

    #initializeEventListeners() {
        document.getElementById("consult-button").addEventListener("click", this.#getFoods.bind(this));
        document.getElementById('food-form').addEventListener('submit', this.#handleFormSubmit.bind(this));
    }

    async #getFoods(ev) {
        const foodList = document.getElementById('food-list');
        foodList.innerHTML = '';
        try {
            this.foods = await Food.getFoods();
            this.#renderFoodList();
        } catch (error) {
            console.error('Error fetching foods:', error);
        }
    }

    #renderFoodList() {
        const foodList = document.getElementById('food-list');
        foodList.innerHTML = '';
        this.foods.forEach(food => this.#createFoodListItem(food, foodList));
        this.#updateFoodList();
    }

    #createFoodListItem(food, foodList) {
        const listItem = document.createElement('li');
        listItem.className = 'food-item card';

        const nameElement = document.createElement('h3');
        nameElement.textContent = food.name;

        const imageElement = document.createElement('img');
        imageElement.src = food.image;
        imageElement.alt = food.name;

        const descriptionElement = document.createElement('p');
        descriptionElement.textContent = food.description;

        const ingredientsElement = document.createElement('p');
        ingredientsElement.textContent = `Ingredientes: ${food.ingredients.join(', ')}`;

        const modifyButton = document.createElement('button');
        modifyButton.textContent = 'Modificar';
        modifyButton.addEventListener('click', () => this.#populateForm(food));

        listItem.append(nameElement, imageElement, descriptionElement, ingredientsElement, modifyButton);
        foodList.appendChild(listItem);
    }

    #updateFoodList() {
        const foodList = document.getElementById('food-list');
        const offset = -this.currentIndex * 100;
        foodList.style.transform = `translateX(${offset}%)`;
    }

    #populateForm(food) {
        document.getElementById('name').value = food.name;
        document.getElementById('description').value = food.description;
        document.getElementById('image').value = food.image;
        document.getElementById('ingredients').value = food.ingredients.join(', ');
        this.selectedFoodId = food.id;
    }

    async #handleFormSubmit(event) {
        event.preventDefault();
        const { name, description, image, ingredients } = this.#getFormData();

        if (!this.#isFormDataValid(name, description, image, ingredients)) {
            alert('Por favor, complete todos los campos del formulario.');
            return;
        }

        const id = this.selectedFoodId !== null ? this.selectedFoodId : Math.floor(Math.random() * 1000000);
        const foodData = new Food(ingredients, image, id, description, name);

        try {
            if (this.selectedFoodId !== null) {
                await this.#updateFood(foodData);
            } else {
                await this.#addNewFood(foodData);
            }

            this.#resetForm();
            this.#getFoods();
        } catch (error) {
            console.error('Error al enviar los datos:', error);
            alert('Hubo un error al enviar los datos. Por favor, intente nuevamente.');
        }
    }

    #getFormData() {
        const name = document.getElementById('name').value;
        const description = document.getElementById('description').value;
        const image = document.getElementById('image').value;
        const ingredients = document.getElementById('ingredients').value.split(',');
        return { name, description, image, ingredients };
    }

    #isFormDataValid(name, description, image, ingredients) {
        return name && description && image && ingredients.length > 0;
    }

    async #updateFood(foodData) {
        console.log('Modificando food:', this.selectedFoodId, foodData);
        await Food.putFood(this.selectedFoodId, foodData);
        alert(`Food "${foodData.name}" modificado exitosamente.`); 
    }

    async #addNewFood(foodData) {
        console.log('Agregando nuevo food:', foodData);
        await Food.addFood(foodData);
        alert(`Nuevo Food "${foodData.name}" agregado exitosamente.`);
    }

    #resetForm() {
        document.getElementById('food-form').reset();
        this.selectedFoodId = null;
    }
}