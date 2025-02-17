<?php

namespace App\Http\Controllers;

use App\TypeEnum;
use App\Models\Movie;
use App\Models\MoviePossession;
use App\Models\MovieRenting;
use App\Models\Payment;
use App\Models\User;
use App\ResponseHelper;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class MovieController extends Controller
{
    private function makePayment(int $user_id, int $movie_id, TypeEnum $type, string $card_number)
    {
        $movie = Movie::find($movie_id);
        if ($movie === null) {
            throw new \Exception("Movie not found");
        }

        $user = User::find($user_id);
        if ($user === null) {
            throw new \Exception("User not found");
        }

        if ($type === TypeEnum::RENT) {
            $amount = $movie->rent_price;
        } else {
            $amount = $movie->buy_price;
        }

        Payment::create([
            'user_id' => $user_id,
            'movie_id' => $movie_id,
            'type' => $type,
            'card_number' => $card_number,
            'amount' => $amount,
            'created_at' => Carbon::now()
        ]);
    }

    public function rent(Request $request, string $id)
    {
        if (!$request->_auth_user) {
            return ResponseHelper::buildUnauthorizedResponse();
        }
        $validator = Validator::make($request->all(), [
            'card_number' => 'required|string|max:50',
        ]);

        if ($validator->fails()) {
            return ResponseHelper::buildValidationErrorResponse($validator->errors());
        }

        $user = auth()->user();

        try {
            $this->makePayment($user->id, $id, TypeEnum::RENT, $request->input('card_number'));
        } catch (\Exception $e) {
            return ResponseHelper::buildNotFoundResponse($e->getMessage());
        }

        MovieRenting::create([
            'user_id' => $user->id,
            'movie_id' => $id,
            'starts_at' => Carbon::now(),
            'ends_at' => Carbon::now()->addDays(7)
        ]);

        return ResponseHelper::buildSuccessResponse();
    }

    public function buy(Request $request, string $id)
    {
        if (!$request->_auth_user) {
            return ResponseHelper::buildUnauthorizedResponse();
        }
        $validator = Validator::make($request->all(), [
            'card_number' => 'required|string|max:50',
        ]);

        if ($validator->fails()) {
            return ResponseHelper::buildValidationErrorResponse($validator->errors());
        }

        $user = auth()->user();

        try {
            $this->makePayment($user->id, $id, TypeEnum::BUY, $request->input('card_number'));
        } catch (\Exception $e) {
            return ResponseHelper::buildNotFoundResponse($e->getMessage());
        }

        MoviePossession::create([
            'user_id' => $user->id,
            'movie_id' => $id
        ]);

        return ResponseHelper::buildSuccessResponse();
    }

    public function createMovie(Request $request)
    {
        if (!$request->_auth_user || !$request->_auth_user->is_admin) {
            return ResponseHelper::buildUnauthorizedResponse();
        }
        $validator = Validator::make($request->all(), [
            'mb_id' => 'integer',
            'genres' => 'string',
            'age_restriction' => 'required|string|max:50',
            'title' => 'required|string|max:255',
            'description' => 'string',
            'poster_url' => 'required|string',
            'video_url' => 'required|string',
            'directors' => 'required|string',
            'cast' => 'required|string',
            'release_date' => 'required|date',
            'movie_duration' => 'required|integer',
            'trailer_url' => 'required|string',
            'rent_price' => 'required|numeric',
            'buy_price' => 'required|numeric',
        ]);

        if ($validator->fails()) {
            return ResponseHelper::buildValidationErrorResponse($validator->errors());
        }

        // return ResponseHelper::buildErrorResponse($request->input("directors"));

        $mb_id = $request->input('mb_id');

        if ($mb_id) {
            // check if mb_id is unique
            $movie = Movie::where("mb_id", $mb_id)->first();

            if ($movie !== null) {
                return ResponseHelper::buildErrorResponse("Movie with this mb_id already exists");
            }
        }

        $movie = Movie::create([
            'mb_id' => $mb_id,
            'genres' => $request->input('genres'),
            'age_restriction' => $request->input('age_restriction'),
            'title' => $request->input('title'),
            'description' => $request->input('description'),
            'poster_url' => $request->input('poster_url'),
            'video_url' => $request->input('video_url'),
            'directors' => $request->input('directors'),
            'cast' => $request->input('cast'),
            'release_date' => $request->input('release_date'),
            'movie_duration' => $request->input('movie_duration'),
            'trailer_url' => $request->input('trailer_url'),
            'rent_price' => $request->input('rent_price'),
            'buy_price' => $request->input('buy_price'),
        ]);

        return ResponseHelper::buildSuccessResponse($movie);
    }

    public function editMovie(Request $request, string $id)
    {
        if (!$request->_auth_user || !$request->_auth_user->is_admin) {
            return ResponseHelper::buildUnauthorizedResponse();
        }

        $movie = Movie::find($id);

        if ($movie === null) {
            return ResponseHelper::buildNotFoundResponse();
        }

        $validator = Validator::make($request->all(), [
            'mb_id' => 'integer',
            'genres' => 'string',
            'age_restriction' => 'required|string|max:50',
            'title' => 'required|string|max:255',
            'description' => 'string',
            'poster_url' => 'required|string',
            'video_url' => 'required|string',
            'directors' => 'required|string',
            'cast' => 'required|string',
            'release_date' => 'required|date',
            'movie_duration' => 'required|integer',
            'trailer_url' => 'required|string',
            'rent_price' => 'required|numeric',
            'buy_price' => 'required|numeric',
        ]);

        if ($validator->fails()) {
            return ResponseHelper::buildValidationErrorResponse($validator->errors());
        }

        $mb_id = $request->input('mb_id');

        if ($mb_id) {
            // check if mb_id is unique
            $movie = Movie::where("mb_id", $mb_id)->where("id", "!=", $id)->first();

            if ($movie !== null) {
                return ResponseHelper::buildErrorResponse("Movie with this mb_id already exists");
            }
        }

        $movie->update([
            'mb_id' => $mb_id,
            'genres' => $request->input('genres'),
            'age_restriction' => $request->input('age_restriction'),
            'title' => $request->input('title'),
            'description' => $request->input('description'),
            'poster_url' => $request->input('poster_url'),
            'video_url' => $request->input('video_url'),
            'directors' => $request->input('directors'),
            'cast' => $request->input('cast'),
            'release_date' => $request->input('release_date'),
            'movie_duration' => $request->input('movie_duration'),
            'trailer_url' => $request->input('trailer_url'),
            'rent_price' => $request->input('rent_price'),
            'buy_price' => $request->input('buy_price'),
        ]);

        return ResponseHelper::buildSuccessResponse($movie);
    }

    public function deleteMovie(Request $request, string $id)
    {
        if (!$request->_auth_user || !$request->_auth_user->is_admin) {
            return ResponseHelper::buildUnauthorizedResponse();
        }
        $movie = Movie::find($id);

        if ($movie === null) {
            return ResponseHelper::buildNotFoundResponse();
        }

        $movie->delete();

        return ResponseHelper::buildSuccessResponse();
    }

    public function getMovies()
    {
        $movies = Movie::get();

        return ResponseHelper::buildSuccessResponse(['movies' => $movies]);
    }

    public function getMovie(Request $request, string $id)
    {
        $movie = Movie::find($id);

        if ($movie === null) {
            return ResponseHelper::buildNotFoundResponse();
        }

        $allowedToWatchMovie = false;

        if (!$request->_auth_user) {
            $allowedToWatchMovie = false;
        } else {
            if ($request->_auth_user->is_admin) $allowedToWatchMovie = true;
            else {
                $moviePossession = MoviePossession::where('movie_id', $id)
                    ->where('user_id', auth()->user()->id)
                    ->first();

                if (!$allowedToWatchMovie && $moviePossession !== null) $allowedToWatchMovie = true;

                if (!$allowedToWatchMovie) {
                    $movieRenting = MovieRenting::where('movie_id', $id)
                        ->where('user_id', auth()->user()->id)
                        ->whereDate('ends_at', '>', Carbon::now())
                        ->first();

                    if ($movieRenting !== null) $allowedToWatchMovie = true;
                }
            }
        }

        $movie->makeVisibleIf($allowedToWatchMovie, ['video_url']);

        return ResponseHelper::buildSuccessResponse(["movie" => $movie]);
    }
}
