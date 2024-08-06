<?php
namespace App\Repositories\RepositoriesImpl;

use App\Models\Address;
use App\Models\Laptop;
use App\Models\Order;
use App\Models\OrderDetail;
use App\Models\User;
use App\Repositories\OrderRepository;
use Exception;
use Illuminate\Support\Facades\DB;

class OrderRepositoryImpl implements OrderRepository{


    public function createOrder($data){
        DB::beginTransaction();
        try{
            // lay ra dia chi neu chua co thi to dia chi moi
            $addressReq = $data['address'];


            $address = Address::where('city', $addressReq['city'])
                        ->where('district', $addressReq['district'])
                        ->where('ward', $addressReq['ward'])
                        ->where('detail',$addressReq['detail'])
                        ->first();
            if (!$address) {
                $address = new Address();
                $address->city = $addressReq['city'];
                $address->district = $addressReq['district'];
                $address->ward = $addressReq['ward'];
                $address->detail =$addressReq['detail'];

                $address->save();
            }


            // lay ra user neu chua co thi tao user moi voi password = ""
            $userRe= $data['user'];

            $user = User::where('phone', $userRe['phone'])->first();

            if(!$user){
                $user= new User();
                $user->name = $userRe['name'];
                $user->password = "";
                $user->phone = $userRe['phone'];
                $user->email = $userRe['phone']."@gmail.com";

            }
            $user->address_id = $address->id;
            $user->save();

            
            // tao mot order moi
            $order = new Order();
            $order->user_id = $user->id;
            $order->address_id = $address->id;
            $order->note = $data['note'] || "*";
            // set tam trang thai thanh toan la PENDING
            $order->status = 'PENDING';
            $order->amount=0;
            $order->save();


            $carts = $data['carts'];
            $amount=0;
            foreach($carts as $cart){
                $orderDetail =  new OrderDetail();

                $orderDetail->laptop_id = $cart['id'];
                $orderDetail->user_id = $user->id;
                $orderDetail->order_id = $order->id;
                $orderDetail->quantity= $cart['quantity'];
                $orderDetail->status= true;

                $laptop = Laptop::find($cart['id']);
                $orderDetail->price_sold= $laptop->sale_price;

                $amount += $orderDetail->price_sold;


                $orderDetail->save();
            }
            $order->amount=$amount;
            $order->save();


            DB::commit();
            return $order;
        }
        catch(Exception $e){
            DB::rollBack();
            throw $e;
        }
       
    }


    public function getOrderUser($idUser,$status){
        $orderQuery = Order::with(['orderDetails.laptop'])
                ->where('user_id',$idUser);

        if($status!="ALL") {
            $orderQuery = $orderQuery->where('status',$status);
        }    
        $order= $orderQuery->orderBy('id', 'desc')->get();      
        return $order;
    }
}