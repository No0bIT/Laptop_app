<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    private $user;
    public function __construct(){
        $this->user = new User();
    }
    //
    public function getUser(){
        //can update
        $user= Auth::user();
        $response =  $this->user->getUser($user->id);

        return response()->json($response);
    }
}
