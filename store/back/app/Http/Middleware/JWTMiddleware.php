<?php

namespace App\Http\Middleware;

use Closure;
use Tymon\JWTAuth\Facades\JWTAuth;
use Exception;
use Illuminate\Http\JsonResponse;

class JWTMiddleware
{
    public function handle($request, Closure $next): JsonResponse
    {
        try {
            if (!$request->hasHeader('Authorization')) {
                return response()->json(['error' => 'Authorization header not found'], 400);
            }

            $authHeader = $request->header('Authorization');
            if (!str_starts_with($authHeader, 'Bearer ')) {
                return response()->json(['error' => 'Authorization header is not formatted correctly'], 400);
            }

            $token = str_replace('Bearer ', '', $authHeader);

            if (!$token) {
                return response()->json(['error' => 'Token not provided'], 401);
            }

            $auth = new JWTAuth($token);

            $auth->authenticate();
        } catch (Exception $e) {
            if ($e instanceof \Tymon\JWTAuth\Exceptions\TokenInvalidException) {
                return response()->json(['error' => 'Token is Invalid'], 401);
            } elseif ($e instanceof \Tymon\JWTAuth\Exceptions\TokenExpiredException) {
                return response()->json(['error' => 'Token has Expired'], 401);
            } else {
                dd($e);
                return response()->json(['error' => 'Authorization Token not found'], 401);
            }
        }

        return $next($request);
    }
}
