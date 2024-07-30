<?php
namespace App\Repositories\RepositoriesImpl;

use App\Models\Laptop;
use App\Repositories\LaptopRepository;

class LaptopRepositoryImpl implements LaptopRepository{
    // private $laptop;

    // public function __construct(){
    //     $this->laptop =  new Laptop();
    // }
    public function getAll(){
        return Laptop::paginate(20);
    }
}