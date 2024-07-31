<?php

namespace App\Repositories;

interface LaptopRepository{

    public function getAll();
    public function getFilters($filters);
}