<?php
namespace App\Repositories\RepositoriesImpl;

use App\Models\Address;
use App\Repositories\AddressRepository;

class AddressRepositoryImpl implements AddressRepository{


    public function createOrGetAddress($dataReq){
            $addressReq = $dataReq;


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

            return $address;
    }
}