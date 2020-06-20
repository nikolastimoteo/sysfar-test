<?php

namespace App\Http\Controllers\API\v1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\API\v1\LoginFormRequest;
use App\Http\Resources\User as UserResource;
use JWTAuth;

class AuthController extends Controller
{
    /**
     * Logs a User in.
     * 
     * @author Níkolas Timóteo <nikolastps@hotmail.com>
     * @param  LoginFormRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(LoginFormRequest $request)
    {
        $credentials = $request->only('email', 'password');
        if (!$token = JWTAuth::attempt($credentials)) {
            return response()->json([
                'message' => 'E-mail e/ou senha incorretos.'
            ], 401);
        }

        return $this->respondWithToken($token);
    }

    /**
     * Get the authenticated User.
     *
     * @author Níkolas Timóteo <nikolastps@hotmail.com>
     * @return \Illuminate\Http\JsonResponse
     */
    public function getUser()
    {
        return response([
            'user' => new UserResource(auth('api')->user()),
        ], 200);
    }

    /**
     * Logs the User out (Invalidate the token).
     *
     * @author Níkolas Timóteo <nikolastps@hotmail.com>
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        auth('api')->logout();

        return response()->json([
            'message' => 'Token invalidado.'
        ], 200);
    }

    /**
     * Get the token array structure.
     *
     * @author Níkolas Timóteo <nikolastps@hotmail.com>
     * @param  string $token
     * @return \Illuminate\Http\JsonResponse
     */
    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type'   => 'bearer',
            'expires_in'   => auth('api')->factory()->getTTL() * 60
        ], 200);
    }
}
