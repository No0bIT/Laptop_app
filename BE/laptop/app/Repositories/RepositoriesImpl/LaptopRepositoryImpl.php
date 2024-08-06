<?php
namespace App\Repositories\RepositoriesImpl;

use App\Models\Laptop;
use App\Repositories\LaptopRepository;
use Illuminate\Support\Facades\DB;

class LaptopRepositoryImpl implements LaptopRepository{
    // private $laptop;

    // public function __construct(){
    //     $this->laptop =  new Laptop();
    // }
    public function getAll($filters=[]){


        $laptops = Laptop::select('laptops.*')
                    ->selectSub(function ($query) {
                        $query->from('feedback')
                            ->selectRaw('coalesce(avg(star), 5)')
                            ->whereColumn('feedback.laptop_id', 'laptops.id');
                    }, 'average_rating')
                    ->selectSub(function ($query) {
                        $query->from('order_details')
                            ->selectRaw('coalesce(sum(quantity), 0)')
                            ->whereColumn('order_details.laptop_id', 'laptops.id');
                    }, 'total_sold');
        if(count($filters)>0){
            $laptops=$laptops->filter($filters);
        }
        return $laptops->paginate(20);
    }
    
    public function getFilters($filters){
        $laptops = Laptop::filter($filters)
                    ->select('laptops.*')
                    ->selectSub(function ($query) {
                        $query->from('feedback')
                            ->selectRaw('coalesce(avg(star), 5)')
                            ->whereColumn('feedback.laptop_id', 'laptops.id');
                    }, 'average_rating')
                    ->selectSub(function ($query) {
                        $query->from('order_details')
                            ->selectRaw('coalesce(sum(quantity), 0)')
                            ->whereColumn('order_details.laptop_id', 'laptops.id');
                    }, 'total_sold')
                    ->paginate(20);
        return $laptops;
    }


    public function dataFilter(){
        $minSalePrice = Laptop::min('sale_price');
        $maxSalePrice = Laptop::max('sale_price');

        // Lấy tất cả các giá trị duy nhất của ram, cpu, storage, system
        $ramValues = Laptop::distinct()->pluck('ram');
        $cpuValues = Laptop::distinct()->pluck('cpu');
        $storageValues = Laptop::distinct()->pluck('storage');
        $systemValues = Laptop::distinct()->pluck('system');

        // Tạo mảng dữ liệu để trả về
        $data = [
            'min_sale_price' => $minSalePrice,
            'max_sale_price' => $maxSalePrice,
            'rams' => $ramValues,
            'cpus' => $cpuValues,
            'storages' => $storageValues,
            'systems' => $systemValues,
        ];

        return $data;
    }

    public function store($id){
        $laptop =  Laptop::with(['feedbacks.user', 'brand','categories','images','videos'])
                    ->select('laptops.*')
                    ->selectSub(function ($query) {
                        $query->from('feedback')
                            ->selectRaw('coalesce(avg(star), 5)')
                            ->whereColumn('feedback.laptop_id', 'laptops.id');
                    }, 'average_rating')
                    ->selectSub(function ($query) {
                        $query->from('order_details')
                            ->selectRaw('coalesce(sum(quantity), 0)')
                            ->whereColumn('order_details.laptop_id', 'laptops.id');
                    }, 'total_sold')
                    ->find($id);
        return $laptop;
    }

    public function getLaptopCart($carts){
        $laptopIds =collect($carts)->pluck('id')->unique();
        $laptops = Laptop::whereIn('id', $laptopIds)->get();

        return $laptops;
    }

}