<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Laptop>
 */
class LaptopFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->word,
            'price' => $this->faker->numberBetween(500, 5000),
            'dale_price' => $this->faker->numberBetween(400, 4000),
            'quantity' => $this->faker->numberBetween(1, 100),
            'model' => $this->faker->bothify('Model-####'),
            'width' => $this->faker->randomFloat(2, 20, 40),
            'height' => $this->faker->randomFloat(2, 1, 3),
            'weight' => $this->faker->randomFloat(2, 1, 5),
            'ram' => $this->faker->randomElement(['8GB', '16GB', '32GB']),
            'system' => $this->faker->randomElement(['Windows 10', 'Windows 11', 'macOS', 'Linux']),
            'width_screen' => $this->faker->randomFloat(2, 13, 17),
            'height_screen' => $this->faker->randomFloat(2, 7, 9),
            'fps_max' => $this->faker->numberBetween(30, 240),
            'resolution_max' => $this->faker->numberBetween(720, 2160),
            'cpu' => $this->faker->randomElement(['Intel i5', 'Intel i7', 'AMD Ryzen 5', 'AMD Ryzen 7']),
            'gpu' => $this->faker->randomElement(['NVIDIA GTX 1650', 'NVIDIA RTX 3060', 'AMD Radeon RX 580']),
            'storage' => $this->faker->randomElement(['256GB SSD', '512GB SSD', '1TB SSD', '2TB HDD']),
            'pin' => $this->faker->randomElement(['3-cell', '4-cell', '6-cell']),
            'wifi' => $this->faker->randomElement(['802.11ac', '802.11ax']),
        ];
    }
}
