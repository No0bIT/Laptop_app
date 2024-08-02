<?php

namespace App\Repositories;

interface LaptopRepository{

    public function getAll();
    public function getFilters($filters);
    public function store($id);
    public function getLaptopCart($carts);
}