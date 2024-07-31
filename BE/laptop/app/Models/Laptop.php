<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
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


    /**
     * Áp dụng tất cả các bộ lọc cho truy vấn.
     *
     * @param Builder $query
     * @param array $filters
     * @return Builder
     */
    public function scopeFilter(Builder $query, array $filters)
    {
        if (isset($filters['name']) && !empty($filters['name'])) {
            $query->where('name', 'like', '%' . $filters['name'] . '%');
        }
        // Áp dụng bộ lọc theo khoảng giá bán
        if (isset($filters['min_sale_price']) && isset($filters['max_sale_price'])) {
            $query->whereBetween('sale_price', [$filters['min_sale_price'], $filters['max_sale_price']]);
        } elseif (isset($filters['min_sale_price'])) {
            $query->where('sale_price', '>=', $filters['min_sale_price']);
        } elseif (isset($filters['max_sale_price'])) {
            $query->where('sale_price', '<=', $filters['max_sale_price']);
        }

        // Áp dụng bộ lọc theo RAM nếu là mảng
        if (isset($filters['ram']) && is_array($filters['ram']) && !empty($filters['ram'])) {
            $query->whereIn('ram', $filters['ram']);
        }

        // Áp dụng bộ lọc theo hệ điều hành nếu là mảng
        if (isset($filters['system']) && is_array($filters['system']) && !empty($filters['system'])) {
            $query->whereIn('system', $filters['system']);
        }

        // Áp dụng bộ lọc theo CPU nếu là mảng
        if (isset($filters['cpu']) && is_array($filters['cpu']) && !empty($filters['cpu'])) {
            $query->whereIn('cpu', $filters['cpu']);
        }

        // Áp dụng bộ lọc theo dung lượng lưu trữ nếu là mảng
        if (isset($filters['storage']) && is_array($filters['storage']) && !empty($filters['storage'])) {
            $query->whereIn('storage', $filters['storage']);
        }

        return $query;
    }
}
