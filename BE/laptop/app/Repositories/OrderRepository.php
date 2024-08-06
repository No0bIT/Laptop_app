<?php

namespace App\Repositories;

interface OrderRepository{

    public function createOrder($data);
    public function getOrderUser($idUser,$status);
}