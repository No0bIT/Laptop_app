<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Feedback extends Model
{
    use HasFactory;
    public function laptop(){
        return $this->belongsTo(Laptop::class);
    }
    public function user(){
        return $this->belongsTo(User::class);
    }
}
