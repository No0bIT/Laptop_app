<?php

namespace App\Http\Controllers\api;


use App\Http\Controllers\Controller;
use App\Repositories\RepositoriesImpl\LaptopRepositoryImpl;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class LaptopController extends Controller
{   
    private $laptopRepository ;
    public function __construct(){
        $this->laptopRepository =  new LaptopRepositoryImpl();
    }
    //
    public function index(){
        try{
        //     $data = Cache::remember('laptops', 1440, function () {
        //        return $this->laptopRepository->getAll();
        //    });
        //     return $data;
            return $this->laptopRepository->getAll();
        }
        catch(Exception $e){
            return $e->getMessage();
        }
    }
}
