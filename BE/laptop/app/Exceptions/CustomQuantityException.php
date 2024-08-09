<?php

namespace App\Exceptions;

use Exception;

class CustomQuantityException extends Exception
{
    //
    public function __construct($message = "Custom exception message", $code = 0, Exception $previous = null)
    {
        parent::__construct($message, $code, $previous);
    }

    public function report()
    {
        // log loi
    }

    public function render($request)
    {
        return response()->json([
            'error' => $this->getMessage()
        ], 500);
    }
}
