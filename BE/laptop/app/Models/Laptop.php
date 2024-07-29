<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Laptop extends Model
{
    use HasFactory;

    public function brand(){
        return $this->belongsTo(Brand::class);
    }
    public function feedbacks(){
        return $this->hasMany(Feedback::class);
    }
    public function images(){
        return $this->hasMany(Image::class);
    }
    public function videos(){
        return $this->hasMany(Video::class);
    }
    public function orderDetails(){
        return $this->hasMany(OrderDetail::class);
    }
    public function categories()
    {
        return $this->belongsToMany(Category::class,'laptop_category');
    }
}
