<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'phone',
        'address_id'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
        'address_id'
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];



    public function feedbacks(){
        return $this->hasMany(Feedback::class);
    }
    public function orderDetails(){
        return $this->hasMany(OrderDetail::class);
    }
    public function orders(){
        return $this->hasMany(Order::class);
    }

    public function address(){
        return $this->belongsTo(Address::class);
    }


    public function roles()
    {
        return $this->belongsToMany(Role::class,'role_user');
    }


    public static function createUser($data){
        return User::create($data);
    }

    public function getUser($id){
        $user = User::with(['address','roles'])->find($id);
        return $user;
    }
}
