<?php

namespace App\Repositories;

interface AddressRepository{

    // ham nay de kiem tra xem address da ton tai hay chua neu chua thi tao moi con co roi thi lay ra
    public function createOrGetAddress($data);
}