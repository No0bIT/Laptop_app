<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Repositories\RepositoriesImpl\AddressRepositoryImpl;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AddressController extends Controller
{
    //
    private $addressRepository;
    private $user;
    
    public function __construct(){

        $this->addressRepository  = new AddressRepositoryImpl();
        $this->user = new User();
    }
    
    public function updateAddress(Request $request){


        try{
            $userReq=Auth::user();
            $addressReq = $request->address;
            $address =  $this->addressRepository->createOrGetAddress($addressReq);
            $user = $this->user->getUser($userReq->id);

            $user->address_id = $address->id;
            $user->save();


            return response()->json($address);
        }
        catch(Exception $e){
            $response = [ 
                'status' => $e->getCode(),
                'message' => $e->getMessage(),
            ];
            return response()->json($response);
        }
    }
}
