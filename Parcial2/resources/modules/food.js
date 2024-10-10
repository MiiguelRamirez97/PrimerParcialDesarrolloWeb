export default class Food{
    constructor(ingredients, image, id, description, name){
        this.ingredients = ingredients;
        this.image = image;
        this.id = id;
        this.description = description;
        this.name = name;
    }

    static async getFoods() {
        try {
            const response = await fetch('http://ec2-3-138-183-128.us-east-2.compute.amazonaws.com:4010/foods');
            const data = await response.json();
            const foods = data.slice(0,3).map(food => new Food(
                food.ingredients,
                food.image,
                food.id,
                food.description,
                food.name
            ));
            return foods;
        } catch (error) {
            console.error('Hubo un problema con la solicitud:', error);
            throw error;
        }
    }

    static async addFood(newFood) {
        try {
            const response = await fetch('http://ec2-3-138-183-128.us-east-2.compute.amazonaws.com:4010/foods', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newFood)
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            return new Food(
                data.ingredients,
                data.image,
                data.id,
                data.description,
                data.name
            );
        } catch (error) {
            console.error('Hubo un problema con la solicitud:', error);
            throw error;
        }
    }

    static async putFood(id, updatedFood) {
        try {
            const response = await fetch(`http://ec2-3-138-183-128.us-east-2.compute.amazonaws.com:4010/foods/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedFood)
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            return new Food(
                data.ingredients,
                data.image,
                data.id,
                data.description,
                data.name
            );
        } catch (error) {
            console.error('Hubo un problema con la solicitud:', error);
            throw error;
        }
    }

}