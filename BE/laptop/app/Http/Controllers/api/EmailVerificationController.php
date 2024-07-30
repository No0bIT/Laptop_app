<?php

namespace App\Http\Controllers\api;


use App\Models\User;
use Illuminate\Auth\Events\Verified;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;

class EmailVerificationController extends Controller
{
    //
    public function verify(Request $request, $id, $hash)
    {
            $user = User::find($id);

            if (!$user) {
                return response()->json(['message' => 'User not found.'], 404);
            }

            if (sha1($user->getEmailForVerification()) !== $hash) {
                return response()->json(['message' => 'Invalid verification link.'], 400);
            }

            if ($user->hasVerifiedEmail()) {
                return response()->json(['message' => 'Email already verified.'], 200);
            }

            if ($user->markEmailAsVerified()) {
                event(new Verified($user));
            }

            return response()->json(['message' => 'Email has been verified.'], 200);
    }
}
