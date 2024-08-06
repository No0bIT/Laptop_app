<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Repositories\RepositoriesImpl\OrderRepositoryImpl;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class OrderController extends Controller
{
    //
    private $orderRepository;
    public function __construct(){
        $this->orderRepository = new OrderRepositoryImpl();
    }


    public function createOrder(Request $request){
        try{
            $data = $request->data;
            $response = [
                'data' => $this->orderRepository->createOrder($data),
                // 'data' => $data,

                'status' => 200,
                'message' => 'success',
            ];
            return response()->json($response);

        }
        catch(Exception $e){
            $response = [ 
                'status' => $e->getCode(),
                'message' => $e->getMessage(),
            ];
            return response()->json($response);
        }
    }


    public function getOrder(Request $request){
        try{
            $userReq= Auth::user();
            $status = $request->status;

            $response = [
                'data' => $this->orderRepository->getOrderUser($userReq->id, $status),
                // 'data' => $data,
                'status' => 200,
                'message' => 'success',
            ];
            return response()->json($response);
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
